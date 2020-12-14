require('dotenv').config();
const db = require('./models');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log('Connected Database');
});
