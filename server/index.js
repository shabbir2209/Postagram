// initializing the express server
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// for the cross origin referencing between the api and the frontend
import cors from 'cors';

// importing the routes from the routes folder
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// the api which pulls up the different routes according to the api endpoint
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req,res) => {
  res.send('POSTAGRAM')
})

// mongo db connection
const CONNECTION_URL = 'mongodb+srv://shabbir:shabbir53@places.o1wcl.mongodb.net/Places?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Connected to the db and Server Running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);