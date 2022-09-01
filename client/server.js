const express = require('express');
const cors = require('cors');
const { response } = require('express');
// const bodyParser = require("body-parser");
const dbOperation = require('../dbFiles/dbOperation');

//Call the database operation:
dbOperation.getData().then(res => {
    return res;
})
dbOperation.getNoms().then(res => {
    return res;
})

dbOperation.getEntPkg().then(res => {
    return res;
})

dbOperation.getBidPkg().then(res => {
    return res;
})

//Set API port and Express server:
const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//send data to the front end:
app.get('/cityApi', async (req, res) => {
    console.log(response);
    const result = await dbOperation.getData(req)
    res.send(result)
})

app.get('/noms', async (req, res) => {
    console.log(response);
    const result = await dbOperation.getNoms(req.body)
    res.send(result)
})

app.get('/entPkg', async (req, res) => {
    console.log(response);
    const result = await dbOperation.getEntPkg(req.body)
    res.send(result)
})

app.get('/bidPkg', async (req, res) => {
    console.log(response);
    const result = await dbOperation.getEntPkg(req.body)
    res.send(result)
})

app.get('/facilities', async (req, res) => {
    const result = await dbOperation.getData(req)
    res.send(result)
})

//Kept for reference's sake:
// app.get('/quit', function (req, res) {
//     console.log('called it quits');
//     res.send({ result: 'Goodbye!' })
// })


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));