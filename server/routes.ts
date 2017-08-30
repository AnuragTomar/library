import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import BookCtrl from './controllers/book';
import AuthorCtrl from './controllers/author';

import Cat from './models/cat';
import User from './models/user';
import Book from './models/book';
import Author from './models/author';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const bookCtrl = new BookCtrl();
  const authorCtrl = new AuthorCtrl();
  
  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Book
  router.route('/books').get(bookCtrl.getAll);
  router.route('/books/count').get(bookCtrl.count);
  router.route('/books').post(bookCtrl.insert);
  router.route('/books/:id').get(bookCtrl.get);
  router.route('/books/:id').put(bookCtrl.update);
  router.route('/books/:id').delete(bookCtrl.delete);

  //Author
  router.route('/author').get(authorCtrl.getAll);
  router.route('/author/count').get(authorCtrl.count);
  router.route('/auhtor').post(authorCtrl.insert);
  router.route('/author/:id').get(authorCtrl.get);
  router.route('/auhtor/:id').put(authorCtrl.update);
  router.route('/author/:id').delete(authorCtrl.delete);

  
  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
