# Login/Logout Workflow

This project consists of client and server. Requires npm, node.js and Docker installed.

## Client

To run client use following commands from the corresponding directory in terminal:

```
npm install
npm run dev
```

## Server

Building and running server:

```
npm install
npm run build
npm start
```

## Docker

Alternatively can be built and run with Docker from the root directory:

```
docker-compose up
```

## Internal users

Server contains the following users which can be accessed from client app:

| username  | password |
| --------- | -------- |
| user1     | pass123  |
| Test      | aaa      |
| test!     | secret   |
| test?user | 1234     |


## TODO
1. create extensible form validation mechanism
2. install and launch project with Docker
3. enchance design
