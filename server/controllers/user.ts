import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;
 //specify model = User so that this contains reference to user in basectrl methods because it extends that class.

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        /* the token is signed and sent to client which client stores and checks every time to access any page on server. a token consists of 3 parts a header(jwt), payload(user), signature(sign) */

        res.status(200).json({ token: token });
      });
    });
  }

}
