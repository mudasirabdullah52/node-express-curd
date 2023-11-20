const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// const axios = require('axios');

const app = express();
app.use(cors());
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mudasir@1231',
    database: 'appointment-db',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Express middleware
app.use(express.json());

// Create
app.post('/create', (req, res) => {
    const { userName, phoneNo, email } = req.body;
    const sql = 'INSERT INTO users (userName, phoneNo, email) VALUES (?, ?, ?)';
    db.query(sql, [userName, phoneNo, email], (err, result) => {
        if (err) {
            res.status(500).send('Error creating user');
        } else {
            res.status(201).send('User created successfully');
        }
    });
});

// Read
app.get('/read/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching user');
        } else {
            res.status(200).json(result);

        }
    });
});
// read whoe data form the data base

app.get('/read/', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching user');
        } else {
            res.status(200).json(result);

        }
    });
});

// Update
app.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { userName, phoneNo, email } = req.body;
    const sql = 'UPDATE users SET userName = ?, phoneNo =?, email = ? WHERE id = ?';
    db.query(sql, [userName, phoneNo, email, userId], (err, result) => {
        if (err) {
            res.status(500).send('Error updating user');
        } else {
            res.status(200).send('User updated successfully');
        }
    });
});

// Delete
app.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting user');
        } else {
            res.status(200).send('User deleted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const express = require('express')
// const bodyParser = require('body-parser');

// const connection = require('./connection');


// const app = express();
// // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const port = 3000;

// // getting all user from the database
// app.get('/create', (req, res) => {
//     connection.query('SELECT * FROM users', (err, rows) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(rows)
//         }
//     })
// })
// // getting single user from the data base
// app.get('/read/:id', (req, res) => {
//     const userid = req.params.id;
//     connection.query('SELECT * FROM users WHERE id=?', [userid], (err, rows) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(rows)
//         }
//     })
// })
// // insert data into the table
// app.post('/create', (req, res) => {
//     console.log(req.body);
//     const userDetails = req.body;
//     // const userData = [userDetails.userName, userDetails.phoneNo, userDetails.email]
//     connection.query('INSERT INTO users (userName, phoneNo, email) values(?)', [userDetails], (err, rows) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(rows)
//         }
//     })
// })
// // update data into the table
// app.patch('/add-users', (req, res) => {
//     const userDetails = req.body;
//     // const userData = [userDetails.userName, userDetails.phoneNo, userDetails.email]
//     connection.query('UPDATE users SET ? WHERE id = ' + userDetails.id, [userDetails], (err, rows) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(rows)
//         }
//     })
// })
// app.put('/add-users', (req, res) => {
//     const userDetails = req.body;
//     // const userData = [userDetails.userName, userDetails.phoneNo, userDetails.email]
//     connection.query('UPDATE users SET ? WHERE id = ' + userDetails.id, [userDetails], (err, rows) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             if (rows.affectedRows === 0) {
//                 const userDetails = req.body;
//                 const userData = [userDetails.userName, userDetails.phoneNo, userDetails.email]
//                 connection.query('INSERT INTO users (userName, phoneNo, email) values(?)', [userData], (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         res.send(rows)
//                     }
//                 });
//             }
//             res.send(rows)
//         }
//     })
// })

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



// // const userController = require('./controllers/Users');

// // // /admin/add-product => GET
// // app.post('/addUser', userController.addUser);


// // // app.get('/', (req, res) => {
// // //     res.send(`<body><h4> </h4> <form action="/massage" method="POST"> <input type="text" name="massage"> <button type="submit">Send</button></form></body>`);
// // // });

// // app.post('/massage', (req, res) => {
// //     console.log(req.body.massage);
// // });

