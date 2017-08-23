abstract class BaseCtrl {
//abstract class objects can't be created.

  abstract model: any;
//can take anytype of model as it is abstract and any is used



  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }
/*'this.model' will consider the model by which the getAll function is called in routes file. 'find' method of mongoose returns all the collections from db into docs and which is then converted into json and passed to client in our case to Angular */



  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }
  //uses 'count' method to count all data in that db model.



  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }
  /* a new object of particular schema type is created using the data sent by user in req.body variable and is then saved to database using save 'method' of mongoose.*/



  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }
/* get particular item from db using 'findOne' method passing it id in req.params.id parameter and comparing it with _id stored in database*/



  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
//uses 'findOneAndUpdate' to first find a record and then update it with values provided in 'req.body'



  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}
//uses 'findOneAndRemove' to find and remove data from database.

export default BaseCtrl;
