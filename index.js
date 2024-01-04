const express = require("express");

const app = express();

app.get('/', (req, res)=>{
    res.send({bye: 'dude'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server Running on http://127.0.0.1:${PORT}`)});