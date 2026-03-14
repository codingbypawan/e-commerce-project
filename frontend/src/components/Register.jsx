import Container from "react-bootstrap/esm/Container";
import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const register = async () => {
        setError('');
        setIsRegistered(false);
        try {
            const res = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, phone, userType })
            });
            const data = await res.json();
            if (res.ok) {
                setIsRegistered(true);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        }
    };

  return (
    <Container className='register-container'>
      <h1>Register</h1>
        <Form onSubmit={(e) => { e.preventDefault(); register(); }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>User Type</Form.Label>
                <Form.Control type="text" placeholder="Enter your user type" value={userType} onChange={(e) => setUserType(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isRegistered && <p style={{ color: 'green' }}>Registration successful!</p>}
        </Form>
    </Container>
  )
}

export default Register;