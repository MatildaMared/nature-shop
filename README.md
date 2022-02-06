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

Coming soon...

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
