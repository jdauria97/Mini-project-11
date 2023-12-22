const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.info(`${req.method} request received to submit a diagnostic`);
  // get the tip topic and username from the body
  // package them up in a new diagnostics object
    const newDiagnostic = {
      time: Date.now(),
      error_id: uuidv4(),
      errors: req.body
  };
  res.json(newDiagnostic);

  readAndAppend(newDiagnostic, "./db/diagnostics.json");
});

module.exports = diagnostics;
