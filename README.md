# Ecommerce App Frontend

#### Backend Repository : [node-backend-ecommerce](https://github.com/rishank-shah/node-backend-ecommerce)

### Requirements for running project 
- [Node.js](https://nodejs.org/en/)
- [Cloudinary account](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) or [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
- [Firebase account](https://firebase.google.com/)

##### Note: Start the backend [node.js](https://github.com/rishank-shah/node-backend-ecommerce) server before running this project

### Steps for running project
```bash
git clone https://github.com/rishank-shah/react-frontend-ecommerce
cd react-frontend-ecommerce
cp .env.example .env
```
###### Fill the .env file with correct credentials.

##### Firebase config
```bash
cd react-frontend-ecommerce/src/
cp firebase.example.js firebase.js 
```
###### Fill ```firebase.js``` with the necessary credentials

##### Installing dependencies
```bash
npm i
```

##### Running server
```bash
npm run start
```

#### If there are no errors website will be running on [localhost:3000](http://localhost:3000) (default)