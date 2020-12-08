import React,{ useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password:'',
    confirmPassword: '',
    
  });

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result){
      console.log(result)
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1 style={{marginTop: "10px"}}>Register</h1>
        <Form.Input
          type="text"
          name="username"
          label="Username"
          placeholder="Username.."
          value={values.username}
          onChange={onChange}
          />
          <Form.Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email.."
          value={values.email}
          onChange={onChange}
          />
          <Form.Input
          name="password"
          type="password"
          label="Password"
          placeholder="Password.."
          value={values.password}
          onChange={onChange}
          />
          <Form.Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password.."
          value={values.confirmPassword}
          onChange={onChange}
          />
          <Button type="submit" primary>
            Register
          </Button>
      </Form>
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