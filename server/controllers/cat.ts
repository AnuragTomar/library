import Cat from '../models/cat';
import BaseCtrl from './base';

export default class CatCtrl extends BaseCtrl {
  model = Cat;
 //specify model = cat so that this contains reference to cat in basectrl methods because it extends that class.
}
