import React, { useState } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export default function LoginForm({login: signIn}) {
  let history = useHistory();

  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailChanged = data => {
    setEamil(data);
  };

  const passwordChanged = data => {
    setPassword(data);
  };

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      const data = await signIn({ email, password });
      const token = data.data.auth_token;
      const tokenData = jwt_decode(token);
      console.log(tokenData)
      localStorage.setItem('token', token);
      localStorage.setItem('id', tokenData.user_id);
      localStorage.setItem('role', tokenData.user_role);

      history.push('/houses');
    } catch {
      alert('Sorry. User not found.')
      setIsLoading(false);
    }
  };

  return (
    <Form name="loginForm" className="loginForm" onSubmit={handleLoginClick}>
      <h1>Login</h1>
      <Segment>
        <Form.Input
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Enter email"
          onChange={ev => emailChanged(ev.target.value)}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Enter Password"
          type="password"
          onChange={ev => passwordChanged(ev.target.value)}
        />
        <button className="btn btn-primary mt-30" type="submit" loading={isLoading} >
          Login
        </button>
      </Segment>
    </Form>
  );
}
