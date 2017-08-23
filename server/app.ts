import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';
/*'.' stands for current directory so it will search routes in current directory and if required to access file in previous directory use '..' instead.*/

const app = express();
dotenv.load({ path: '.env' });
// loads the environment file .env into process.env.

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
/* '/' is for prefix in url, express.static is middleware method that serves the static contents, __dirname contains the directory where the file in which this code is written, path.join joins the __dirname to other argument.*/

app.use(bodyParser.json());// it tells application that you want to use json files.

app.use(bodyParser.urlencoded({ extended: false }));
// if specified true supports complex, deep parsing of objects in json files, else supports normal parsing.

app.use(morgan('dev'));
// it's a http request logger(various options like dev,tiny,combined,common are available)

mongoose.connect(process.env.MONGODB_URI);
//MONGODB_URI is specified in .env file and is loaded to process.env using dotenv.load.

const db = mongoose.connection;

(<any>mongoose).Promise = global.Promise;
//native promise can be used as mongoose.Promise=Promise; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('Angular Full Stack listening on port ' + app.get('port'));
  });

});

export { app };
