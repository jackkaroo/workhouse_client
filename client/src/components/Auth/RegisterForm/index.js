import React, { useState } from 'react';
import {Form, Button, Segment, Dropdown} from 'semantic-ui-react'
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export default function RegisterForm({login: signIn}) {
  let history = useHistory();

  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const roles = [{key: 0, text: "Worker", value: 0},{key: 1, text: "House Owner", value: 1} ]

  const roleChanged = (event, {value}) => {
    setRole(value);
  }

  const nameChanged = data => {
    setName(data);
  };

  const phoneChanged = data => {
    setPhone(data);
  };

  const emailChanged = data => {
    setEamil(data);
  };

  const passwordChanged = data => {
    setPassword(data);
  };

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {

      const obj = {
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role
      }
      console.log(obj);

      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(obj)
      })
      .then(res => {
        if(res.status === 201) {
          alert('You successfully registered new user. Login now.')
        }
        else {
          alert('You entered invalid information. Try again.')
        }
      })

    } catch {
      alert('Sorry. Error')
      setIsLoading(false);
    }

  };

  return (
    <Form name="loginForm" className={"loginForm"} onSubmit={handleLoginClick}>
      <h1>Register</h1>
      <Segment>
        <Form.Input
          fluid
          iconPosition="left"
          placeholder="Enter Name"
          onChange={ev => nameChanged(ev.target.value)}
        />
        <Form.Input
          fluid
          iconPosition="left"
          placeholder="Enter Phone"
          onChange={ev => phoneChanged(ev.target.value)}
        />
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
        <Dropdown
          placeholder='Select Role'
          fluid
          search
          selection
          options={roles}
          onChange={roleChanged}
        />
        <button className="btn btn-primary mt-30" type="submit" loading={isLoading} >
          Register
        </button>
      </Segment>
    </Form>
  );
}
