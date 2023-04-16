const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 9000 ;


app.listen(PORT, ()=>{
    console.log(`App Run on Port:${PORT}`);
})