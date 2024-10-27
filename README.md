# Techno-Functional Document: Categorization App Backend

## Backend Development Approach:
- Completed setting up the development environment with **Node.js** and **Express.js** for creating **RESTful APIs** to handle requests and responses.
- Completed setting up **MongoDB** for Register, OTP Verification, Login, Fetch Categories, Fetch Selected Categories and Update Categories.
- Implemented **JWT** and **Bcrypt** for secure access.

## Postman Documentation:
[Postman Documentation](https://documenter.getpostman.com/view/34987093/2sA3dxEXmC)

## Technologies Used:
- **Backend Language**: Node.js
- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Other Technologies**: Postman for API documentation

## API Endpoints:
- `/api/auth/login-user` - This API is used to **Login** as a user
  - **METHOD**: POST

- `/api/auth/register-user` - This API is used to **Register** as a user
  - **METHOD**: POST

- `/api/auth/verify` - This API is used to validate the **verification code** entered by the user
  - **METHOD**: POST

- `/categories?page=${page}` - This API is used to **fetch the categories** based on **Pagination**
  - **METHOD**: GET

- `/categories/selected/:userId` - This API is used to **fetch the selected categories**
  - **METHOD**: GET

- `/categories/select` - This API is used to **update the categories selection**
  - **METHOD**: POST
