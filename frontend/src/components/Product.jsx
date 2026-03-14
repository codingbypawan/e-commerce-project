import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function Product() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/products/list', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setProducts(data.products);
                console.log('Fetched products:', data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const addItemToCart = async (product) => {
        try {
            const item = {
                productId: product._id,
                name: product.name,
                quantity: 1,
                price: product.price - product.discount
            };
            localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart') || '[]'), item]));
            products.find(p => p._id === product._id).isAddedToCart = true;
            console.log(products);
            setProducts([...products]);
        } catch (err) { 
            console.error('Error adding item to cart:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container className='product-container'>
            <Button variant="secondary" onClick={() => window.location.href = '/cart'} className="cart-button">Go to Cart</Button>
            <h1>Products</h1>
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                <Row>
                {products.map((product) => (
                    <Col sm={4} key={product._id}>
                    <Card style={{ width: '18rem' }} key={product.id}>
                        <Card.Img variant="top" src={product.productImage} className="product-image" />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                            {product.description} <br />
                            <b>Price:</b> Rs. 
                             {product.discount > 0 && <s>{product.price}</s>} 
                             &nbsp;{product.price - product.discount} <br/>
                            </Card.Text>
                            {product.isAddedToCart ? (
                                <Button variant="success" onClick={() => window.location.href="/cart"}>Go to Cart</Button>
                            ) : (
                                <Button variant="primary" onClick={() => addItemToCart(product)}>Add to Cart</Button>
                            )}
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            )}
        </Container>
    );
}

export default Product;