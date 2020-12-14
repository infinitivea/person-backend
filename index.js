require('dotenv').config();
const db = require('./models');
const express = require('express');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Connected Database');
});
