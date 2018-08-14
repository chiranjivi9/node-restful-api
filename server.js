// server settings

const http = require('http');

const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);


//
// <script src="https://www.gstatic.com/firebasejs/5.3.1/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//               apiKey: "AIzaSyAaT_vgM4jjTxkXa2nx48kjVt1RxJ7BUdI",
//               authDomain: "rest-api-5e8a6.firebaseapp.com",
//               databaseURL: "https://rest-api-5e8a6.firebaseio.com",
//               projectId: "rest-api-5e8a6",
//               storageBucket: "",
//               messagingSenderId: "135498282666"
//             };
//   firebase.initializeApp(config);
// // </script>
// const firebaseDB = firebase.database()
