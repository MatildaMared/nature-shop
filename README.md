<h1 align="center">Wild Posters</h1>

<p align="center">Wild posters is a (fictionary) webshop that sells nature themed posters.</p>

---

## Links 🌍

- [GitHub Repo](https://github.com/MatildaMared/nature-shop "Github Repo")

- [Live Demo](https://matildamared-nature-shop.herokuapp.com/ "Live View")

---

## Screenshots 📸

Coming soon...

---

## About the app 📝

Coming soon...

---

## User stories 👩🏼‍⚕️👩🏼‍🎤👷🏽‍♀️

* As a guest I would like to be able to browse posters so that I can find something I'm interested in buying.

* As a guest I would like to be able to search the posters by title so that I can find what I'm looking for.

* As a guest I would like to be able to sort posters by category so that I can look for posters that suits my taste.

* As a guest I would like to be able to register as a user so that I can make purchases.

* As a user I would like to be able to log in so that I can make purchases.

* As a logged in user I would like to add products to a cart so that I can use the cart to place an order.

* As a logged in user I would like to be able to log out so that I can leave my computer feeling safe about my personal data.

* As an admin I would like to be able to add new posters so that I can update my supply with new products.

* As an admin I would like to be able to delete posters so that I can remove posters that I no longer want to sell.

* As an admin I would like to be able to update posters so that I can give the correct information to the customers.

---

## Technologies used 💻

- HTML
- CSS
- JavaScript
- React
- styled-components
- MongoDB
- express
- Node.js
- jest
- react-testing-library
- supertest

---

## Getting Started 🛫

Coming soon...

---

## API routes 🗺

### Users API

```
// Creates a new user. Requires email, password, name, address: {street, city, postalCode} to be sent in request body.
POST /api/users

// Log in an existing user. Requires email and password to be sent in request body.
POST /api/users/login

// Get user data. Requires a valid JWT to be sent in Authorization http headers
// (belonging to the user requested to be sent back).
GET /api/user/:userId

// Update a user. Requires a valid JWT to be sent in Authorization http headers
// (belonging to the user requested to be updated).
PUT /api/user/:userId

// Deletes a user. Requires a valid JWT to be sent in Authorization http headers
// (belonging to the user requested to be deleted).
DELETE /api/user/:userId
```

### Products API

```
// Creates a new product. Requires title, description, imageUrl, price and inStock to be sent in request body.
// Requires a valid JWT to be sent in Authorization http headers, belonging to a user with admin role.
POST /api/products

// Returns an array of all products
GET /api/products

// Returns a single product based on ID
GET /api/products/:productId

// Updates a single product. Requires a valid JWT to be sent in Authorization http headers,
// belonging to a user with admin role.
PUT /api/products/:productId

// Deletes a single product. Requires a valid JWT to be sent in Authorization http headers,
// belonging to a user with admin role.
DELETE /api/products/:productId
```

---

## Icons 🎨

This app is using icons from https://feathericons.com/

---

## Author 👩‍💻

**Matilda Mared**

- [GitHub Profile](https://github.com/MatildaMared "MatildaMared")
- [LinkedIn Profile](https://www.linkedin.com/in/matilda-mared "MatildaMared")
- [Email](mailto:rohitjain19060@gmail.com?subject=Hi "Hi!")

---

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
