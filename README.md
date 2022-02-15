<h1 align="center">Wild Posters</h1>

<p align="center">Wild posters is a (fictionary) webshop that sells nature themed posters.</p>

---

## Links 🌍

- [GitHub Repo](https://github.com/MatildaMared/nature-shop "Github Repo")

- [Live Demo](https://matildamared-nature-shop.herokuapp.com/ "Live View")

---

## Screenshots 📸

<img alt="Screenshot of Wild Posters" src="https://user-images.githubusercontent.com/43721548/154129306-06ae5520-1ad2-414b-8fe4-66ddcc793fd4.png">

---

## About the app 📝

Wild posters is a fictionary webshop that sells nature themed posters. 🌿 A guest can browse the posters, filter by categories/favorites, search the posters by title and add posters to the cart. A user can register on the page to make a purchase (not a real purchase of course). A logged in user can change his or hers personal information and get an overview of placed orders on the account page. A logged in admin user can edit and add new posters to the shop.

---

## User stories 👩🏼‍⚕️👩🏼‍🎤👷🏽‍♀️

1. As a guest I would like to be able to browse posters so that I can find something I'm interested in buying.

2. As a guest I would like to be able to search the posters by title so that I can find what I'm looking for.

3. As a guest I would like to be able to sort posters by category so that I can look for posters that suits my taste.

4. As a guest I would like to be able to mark a single poster as a favorite on the poster page, so that I can remember which posters I liked the most.

5. As a guest I would like to be able to sort posters by those I have marked as a favorite so that I can more easily find my favorite posters.

6. As a guest I would like to be able to register as a user so that I can make purchases.

7. As a guest I would like to add products to a cart so that I can use the cart to place an order.

8. As a user I would like to be able to log in so that I can make purchases.

9 As a logged in user I would like to be able to log out so that I can leave my computer feeling safe about my personal data.

10. As a logged in user I would like to be able to place an order with the items in my cart so that I can buy the posters I want.

11. As a logged in user I would like to be able to change my name and address on an account page so that I can update my personal information when needed.

12. As a logged in user I would like to be able to see an overview of my already placed orders on the account page, so that I can look up when I placed an order.

13. As an admin I would like to be able to add new posters so that I can update my supply with new products.

14. As an admin I would like to be able to delete posters so that I can remove posters that I no longer want to sell.

15. As an admin I would like to be able to update posters so that I can give the correct information to the customers.

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

1. Fork or download the code to your computer.

2. Begin by installing all dependencies by running `npm install` in both the `server` and `client` folder.

3. Start the backend development server by running `npm run dev` in the server folder. The backend is running on port 8080.

4. Start the frontend by running `npm run start` in the client folder. The frontend is running on port 3000.

5. Open your browser on `http://localhost:3000` to see the app running.

6. The app require an .env-file to be placed in the `server` folder with the following variables:

- MONGODB_URI – the url to your mongoDB atlas (or local) database

- JWT_SECRET - a secret to string to decode jason web tokens

- JWT_EXPIRE - how long the jason web tokens should be valid, e.g "24h"

---

## API routes 🗺

### Users API

```
// Creates a new user. Requires email, password, name, address: {street, city, postalCode} to be sent in request body.
POST /api/users

// Log in an existing user. Requires email and password to be sent in request body.
POST /api/users/login

// Get user data based on decoded token. Requires a valid JWT to be sent in Authorization http headers.
GET /api/user/getByToken

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

### Orders API

```
// Places a new order. Requires an array of cart items to be sent in request body,
// and a valid JWT to be sent in Authorization http headers
POST /api/orders
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
