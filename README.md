# Seat Randomizer

## Setup

### Clone the repository

`git clone git@gitlab.com:ac-bootcamp-materials/next-seats.git`

### Install dependencies

`npm install`

### Setup environment variables

*   `PORT` should be set for the port to be used. If not set defaults to `3000`
*   `ADMIN_NAME` should be set for username to use on login. If not set defaults to `admin`
*   `ADMIN_PASSWORD` should be set for password to use on login. If not set defaults to `admin`
*   `MONGODB_URL` should be set for the connect string to mongo database. If not set defaults to `mongodb://127.0.0.1:27017/ac-seats`
*   `JWT_SECRET` should contain a secret which will be used to sign authentication tokens.

### Start server in dev mode

`npm run dev`
(server will automatically restart when files change)