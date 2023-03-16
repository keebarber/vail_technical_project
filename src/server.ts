import bodyParser from 'body-parser';
import express from 'express'; 
import cors from 'cors';
import morgan from 'morgan';
import * as http from 'http';
import * as dotenv from 'dotenv';
const querystring = require('querystring')
const packagejson = require('../package.json');

const app = express();
const router = express.Router();
const errorCallback = console.error.bind(console);
dotenv.config();


app.use(bodyParser.json());
// serve files
app.use(express.static("/dist"));
// enabling CORS for all requests
app.use(cors());
// log HTTP requests
app.use(morgan('combined'));

// defining an array to work as the database (temporary solution)
const payload = [
    {
      packageJsonVersion: packagejson.version,
      timeStamp: Date.now()
    }
  ];

/*
*
* Below is basic router w/ping
*
*/
app.use('/api/v1', router);
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});


// Test GET
router.get('/status', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  res.status(200).send(data);
  console.log(JSON.stringify(data))
});


// POST
app.post('/', (req, res) => {

  // handle errors
  req.on('error', (err) => {
    if(err) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('An error occurred');
        res.end();
    }
  });

  const echoMsg = JSON.stringify(req.query.message);
  const payload = {
    message: 'Ok',
    packageJsonVersion: packagejson.version,
    timeStamp: Date.now(),
    echoMsg,
    env: JSON.stringify(process.env),
  }

  console.log(JSON.stringify(payload))
  return res.status(200).send(payload);
});


// Spin up server
const server = http.createServer(app);
const port = process.env.PORT || 30000;
server.listen(port, () => {
      console.log("Express Server is running on " + port);
  });