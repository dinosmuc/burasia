import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch('http://127.0.0.1:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          props.onLogin(true);
          navigate('/home');
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Container fluid className="p-0 m-0">
      <Col xs={12} md={6} lg={4} className="m-auto">
        <h1 className="text-center mt-4 mb-5">Login</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="text-center mt-4">
            <Button type="submit" variant="primary" className="text-center rounded-0 px-5">
              Log In
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default LoginForm;