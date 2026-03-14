import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    function fetchCartItems() {
        // Placeholder for fetching cart items from localStorage or backend
        try {
            const items = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(items);
        } catch (err) {
            console.error('Error fetching cart items:', err);
        }
    }

    async function buyNow() {
        try {
            const productList = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }));
            const res = await fetch('http://localhost:5000/orders/create', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ productList })
            });
            console.log('Checkout response:', res);
            if (!res.ok) {
                const errorData = await res.json();
                console.error('Checkout failed:', errorData);
            } else {
                localStorage.removeItem('cart');
                fetchCartItems();
            }
            
        } catch (err) {
            console.error('Error during checkout:', err);
        }
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Container className='cart-container'>
            <Button variant="secondary" onClick={() => window.location.href = '/products'} className="cart-button">Go to Products</Button>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is currently empty.</p>
            ) : (
                <Row>
                    <Col sm={8}>
                    {cartItems.map((item, index) => (
                        <Card body key={index} className='cart-card'>
                            <Card.Header>{item.name}</Card.Header>
                            <Card.Body>
                             <b>Quantity:</b> {item.quantity} <br/>
                             <b>Price:</b> Rs. {item.price}
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="danger" onClick={() => {
                                    const updatedCart = cartItems.filter((_, i) => i !== index);
                                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    setCartItems(updatedCart);
                                }}>Remove</Button>
                            </Card.Footer>
                         </Card>
                    ))}
                    </Col>
                    <Col sm={4}>
                            <Card className='total-card'>
                            <Card.Header>Total Amount</Card.Header>
                            <Card.Body>
                                <h3>Rs. {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
                            </Card.Body>
                            <Card.Footer>
                                <button className='checkout-button' onClick={() => buyNow()}>Buy Now</button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Cart;