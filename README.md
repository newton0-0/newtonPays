# Payment App

This is a full-stack payment application developed using the MVC (Model-View-Controller) architecture. It provides a seamless and interactive user experience for money transfers, balance inquiries, transaction history tracking, and exclusive coupon offers.

##Sample User
- **phone** 9486781245
- **password** 12345
- **friend phone number for transaction** 9546782345 , 7856231245

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Communication:** CORS (Cross-Origin Resource Sharing)

## Features

1. **Money Transfer:**
   Users can initiate money transfers to other users by specifying the recipient's phone number and the transfer amount.

2. **Fetch Balance:**
   Users can check their current account balance to keep track of their financial status.

3. **Transaction History:**
   A comprehensive transaction history is available, detailing all previous transactions, including date, amount, and transaction status.

4. **Coupon Offers:**
   - Users receive exclusive coupons if the transfer amount is a multiple of 500.
   - Enjoy a 5% discount on transactions above 1000.
   - Avail a 2% discount on transactions below 1000.

5. **User Authentication:**
   - Secure user login using a combination of phone and password.
   - JWT tokens are used for authentication to ensure a secure and seamless user experience.

6. **User Registration:**
   - New users can register with essential details such as name, phone, email, password, and PIN.
   - Upon successful registration, users receive a random dummy bank balance between 100 to 10000.

7. **Interactive User Experience:**
   - The application offers a user-friendly interface with intuitive controls for easy navigation.
   - Real-time updates and feedback enhance the overall user experience.

8. **Error Handling:**
   - Robust error handling mechanisms are implemented to provide meaningful error messages to users.
   - Graceful degradation ensures a smooth user experience even in the presence of errors.

## Project Structure

The project is structured with a clear separation between the frontend and backend components, facilitating modularity and maintainability.

```
payment-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── views/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utilities/
│   │   └── ...
│   ├── config/
│   ├── app.js
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/newton0-0/newtonPays.git
   cd newtonPays
   ```

2. **Install dependencies:**
   ```bash
   # For frontend
   cd front
   npm install

   # For backend
   cd ../back
   npm install
   ```

3. **Run the application:**
   ```bash
   # For frontend
   cd frontend
   npm start

   # For backend
   cd ../backend
   npm start
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

---

Feel free to customize this README according to your project structure and additional details.
