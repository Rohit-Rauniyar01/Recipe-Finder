// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'recipe_finder'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
  
//   // Create recipe_table if it doesn't exist
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS recipe_table (

//       name VARCHAR(255) NOT NULL,
//       category VARCHAR(100) NOT NULL,
//       image_url VARCHAR(255),
//       ingredients TEXT NOT NULL,
//       instructions TEXT NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;

//   connection.query(createTableQuery, (err) => {
//     if (err) {
//       console.error('Error creating table:', err);
//       return;
//     }
//     console.log('Recipe table is ready');
//   });
// });

// module.exports = connection; 