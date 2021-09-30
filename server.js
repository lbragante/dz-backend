const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
require('dotenv/config');

app.use(cors());

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan('tiny'));

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const balanceRoutes = require('./routes/balance.routes');
const statementRoutes = require('./routes/statement.routes');
const addressRoutes = require('./routes/address.routes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/statement', statementRoutes);
app.use('/api/address', addressRoutes);

mongoose.connect(process.env.DB_CONNECTION_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => {
    console.log('Database connect error');
});

db.once('open', () => {
    console.log('Database is connected');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});
