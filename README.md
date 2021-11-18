# Login as a Service

This application provides login using SMS OTP as a service

---

- Pre-requisites:
    * node
    * npm
    * postgresql

- Development Setup:
    * Installing dependencies:
    ```
        npm install
    ```

    * Database setup: Create a Postgres database named `login_service`

    * Configuration:
        * Create the file config/development.js from the provide template
        * Update the Database configuration variabled accordingly
    
    * AWS Configuration:
        * Create a User on IAM which has access to the policy`AmazonSNSFullAccess`
        * Download and update the following as environment variables:
            * `AWS_ACCESS_KEY_ID`
            * `AWS_SECRET_ACCESS_KEY`
            * `AWS_REGION`
        * If it is a sandbox account, do verify and add the phone number you want to test the service out with
    
    * Use `npm run dev` to start the service

- Production setup:
    * Follow all the steps from Development setup except the last step
    * Add the following environment variables:
        * `APP_PORT`
        * `APP_COOLDOWN`
        * `APP_VALIDITY`
        * `APP_SENDER_ID`
        * `DB_HOST`
        * `DB_USERNAME`
        * `DB_PASSWORD`
        * `DB_NAME`
    * Set `NODE_ENV` to `production`
    * Use `npm run start` to start the service
    

