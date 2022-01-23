require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');



app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
    // adding the ability to use credentials with cookies
    credentials: true,
    origin: 'http://localhost:3000'
}));
// configuring app to use and update cookies
app.use(cookieParser());
// configuring express app server


require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/event.routes')(app);
require('./routes/comment.routes')(app);



const port = process.env.MY_PORT;
app.listen(port, ()=>{console.log(`Listening at Port ${port}`)});