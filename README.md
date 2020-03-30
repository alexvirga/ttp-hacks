# React Starter Kit with Firebase Authentication
**React-firebase-auth-starter-kit** is a simple project template for React applications using Firebase authentication with minimal setup. 

## Includes:
- Landing page with Login/Signup (Email & Google)
- Authenticated Routing
- Dashboard for authenticated users
- Simple Navbar with sign out

## Built with:
- [Create-React-App](https://github.com/facebook/create-react-app)
- [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- [React-firebaseui](https://github.com/firebase/firebaseui-web-react)


<img width="1228" alt="Screen Shot 2020-03-30 at 4 55 23 PM" src="https://user-images.githubusercontent.com/49658469/77961155-67838980-72a7-11ea-89a7-4dc0a3c8a7f4.png">

## Getting Started

```bash
$ git clone https://github.com/alexvirga/react-firebase-auth-starter-kit.git react-firebase-auth
$ cd react-firebase-auth
$ npm install
```

### ```Firebase Console```
- In the [Firebase console](https://console.firebase.google.com/), navigate into your App's authentication page and enable **Email/Password** and **Google**
- Next, go to your App's settings and find the **Firebase SDK snippet** Select "Config" and copy the firebaseConfig snippet.

```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```

### ```firebaseConfig.js```
In your firebaseConfig.js file, paste your firebaseConfig data and save

Run the app
```bash
$ npm start
```
