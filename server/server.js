const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const schema = require('./schema/schema');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');


connectDB()

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log('Server is running'))