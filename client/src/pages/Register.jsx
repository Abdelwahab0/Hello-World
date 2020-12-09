import React,{ useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

export default function Register({history}) {
  const [errors, setErrors] = useState({});


  const {onChange, onSubmit, values} = useForm(registerUser, {
    username: '',
    email: '',
    password:'',
    confirmPassword: '',
  });


  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result){
      console.log(result)
      history.push('/')
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);    
    },
    variables: values
  });
  function registerUser(){
    addUser();
  }


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 style={{marginTop: "10px"}}>Register</h1>
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
          type="email"
          name="email"
          label="Email"
          placeholder="Email.."
          value={values.email}
          error={errors.email ? true : false}
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
          <Form.Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password.."
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          />
          <Button type="submit" primary>
            Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username,
        email: $email,
        password: $password,
        confirmPassword: $confirmPassword,
      }
    ){
      id email username createdAt token
    }
  }
`;