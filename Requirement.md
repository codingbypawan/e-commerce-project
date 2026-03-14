# E-Commerce Application
Author : Pawan Kushwaha

Date : 09 March, 2026

## Requirement
### Users
- Sellers
- Customers

### Features
- Seller should be able to list/view/update product
- Seller should be able to see all orders
- Seller should be able to update status of orders
- Seller should be able to add account details (this can be used to display on payment page)
- Seller should be able to display any discount
- Seller should be able to view/edit profile

- Customers should be able to see all products
- Customers should be able to add products to cart
- Customers should be able to buy products
- Customers should be able to see all orders created by him/her
- Customer should be able to view/edit profile

### Architecture
- Backend Application (NodeJs)
- MongoDb database
- Frontend Application (ReactJs)

#### DB Schema
- User (name, email, password, userType, phone, createdAt)
- Product (name, description, productImage, price, discount, discountValidFrom, discountValidTo, sellerId, inventoryQuantity, createdAt)
- Order (productList, amount, status(PENDING, INPROGRESS, DISPATCHED, DELIVERED), customerId, sellerId)
- Account (sellerId, accountNumber, IFSCCode, UPIId, qrCodeImage, balance)


## API Details
### Authentication APIs
- Register
- Login
- Profile (View, update)

### Product APIs
- Create Product (only seller)
- View products
- View product by Id
- Update product (only seller)

### Order APIs
- Create Order (only customer)
- View all orders (should be able to see orders associated with him/her)


## Frontend
### Auth section
- Login
- Register

### Dashboard
- Display all products
- For seller, add product
- For seller, update product
- For Customer, add to cart
- for customer, buy order
- Display profile
- delete product from cart
