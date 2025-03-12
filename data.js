// data.js

const fs = require('fs');
const dataFile = 'data.json';

function getData(req, res) {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.send(JSON.parse(data));
    });
}

function saveData(req, res) {
    const newData = req.body;
    fs.writeFile(dataFile, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            res.status(500).send('Error writing data file');
            return;
        }
        res.send('Data saved successfully');
    });
}

module.exports = { getData, saveData };
