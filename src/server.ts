import bodyParser from 'body-parser';
import express from 'express'; 
import { cors } from 'cors';
import { morgan } from 'morgan';
import * as http from 'http';
import * as dotenv from 'dotenv';
var packagejson = require('../package.json');

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


// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(payload);
  });


const port = process.env.PORT || 30000;
app.listen(port, () => {
    console.log("Express Server is running on " + port);
});
