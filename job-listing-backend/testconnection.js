// testConnection.js
const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
