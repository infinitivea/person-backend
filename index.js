require('dotenv').config();
const db = require('./models');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Connected Database');
});
