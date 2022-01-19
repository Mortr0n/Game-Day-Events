const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established connection to the ${process.env.DB_NAME} Database`))
    .catch((err) => console.log(`Something has gone wrong with the connection to ${process.env.DB_NAME} Database`));