const { MongoClient } = require("mongodb");
const Db = process.env.DB_CONNECTION;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("Invoices_db");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },
  //create Invoices_db
  //users collection, insert into .env file
  getDb: function () {
    return _db;
  },
};
