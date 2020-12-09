import React,{ useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

export default function Login({history}) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });


  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(proxy, result){
      console.log(result)
      history.push('/')
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);    
    },
    variables: values
  });

  function loginUserCallback(){
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 style={{marginTop: "10px"}}>Login</h1>
        <Form.Input
          type="text"
          name="username"
          label="Username"
          placeholder="Username.."
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
          />

          <Form.Input
          name="password"
          type="password"
          label="Password"
          placeholder="Password.."
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          />
          <Button type="submit" primary>
            Login
          </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username,
        password: $password,
    ){
      id email username createdAt token
    }
  }
`;