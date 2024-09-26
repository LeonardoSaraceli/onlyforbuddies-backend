# onlyforbuddies-backend

The application provides essential functionalities for managing an online shopping system, such as user authentication, product management, order processing, and payment integration.

## Technologies Used

- **Node.js**
- **Express**
- **PostgreSQL**
- **Prisma**
- **JWT (JSON Web Token)**
- **Bcrypt**
- **Dotenv**

## Future Implementations

- **Stripe**

## How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/LeonardoSaraceli/onlyforbuddies-backend.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in the .env file:

   ```bash
   DATABASE_URL=""
   PORT=""
   SECRET_KEY=""
   ```

4. Integrate the database:

    ```bash
    npx prisma migrate dev
    npx prisma migrate deploy
    ```

5. Start the server:

   ```bash
   npm start
   ```
