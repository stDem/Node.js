const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const pathToFile = path.join(__dirname, 'count.json');
const data = fs.readFileSync(pathToFile, 'utf8');
const parsedData = JSON.parse(data);

app.get('/', (req, res) => {
    parsedData.main += 1;
    res.send(`
    <h1>This is main page!</h1>
    <a href = '/about'>Go to page /about</a>
    <p>Count = ${parsedData.main}</p>
    `);
});
app.get('/about', (req, res) => {
    parsedData.about += 1;
    res.send(`
    <h1>This is ABOUT page!</h1>
    <a href = '/'>Go to main page </a>
    <p>Count = ${parsedData.about}</p>
    `);
});
fs.writeFileSync(pathToFile, JSON.stringify(parsedData, null, 2));
const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});