const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/event.routes')(app);


const port = 8000;
app.listen(port, ()=>{console.log(`Listening at Port ${port}`)});