import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    setError('');
    setIsLoggedIn(false);
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', (await res.json()).token);
        navigate('/products');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed');
    }
  }
  return (
    <Container className='login-container'>
        <h1>Login</h1>
        <Form onSubmit={(e) => { e.preventDefault(); login(); }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isLoggedIn && <p style={{ color: 'green' }}>Login successful!</p>}
    </Container>
  )
}

export default Login;