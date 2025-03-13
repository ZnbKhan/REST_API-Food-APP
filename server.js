const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// dot env configuration
dotenv.config();

// DB Connection
connectDB();

// rest object create -- takey express k use kr paye
const app = express();

// middleware
app.use(cors());
app.use(express.json()); //client se data ko acess krne k liye
app.use(morgan("dev"));


// route
// URL: http://localhost:8080
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/restaurant', require('./routes/restaurantRoute'));
app.use('/api/v1/category',require('./routes/categoryRoutes'));

app.get("/", (req,res)=>{
    return res.status(200).send({success:true, message:"Food App server is running.."})
});

// PORT
const PORT = process.env.PORT || 5000;

// listen

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT} port`);
})