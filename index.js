// Routing
var express = require("express");
var xmlparser = require("express-xml-bodyparser");
var app = express();
var User = require("./User");
var router = express.Router();

app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());

app.get("/", function(request, response) {
  response.send("Khushboo Verma");
});

app.post("/", function(request, response) {
  console.log(request.body.name);
  response.send(request.headers["authorization"]);
});

app.param(["userid", "bookid"], function(req, res, next, id) {
  next();
});

app.get("/users/:userid/books/:bookid", function(req, res) {
  var userid = req.params.userid;
  var bookid = req.params.bookid;
  res.send("user " + userid + " book " + bookid);
});

app.param(["username", "password"], function(req, res, next, id) {
  next();
});

app.get("/login/username/:username/password/:password", function(req, res) {
  var username = req.params.username;
  var password = req.params.password;
  res.send("username " + username + " password " + password);
});

router.param("user_id", function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: "TJ"
  };
  next();
});

router
  .route("/users/:user_id")
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(function(req, res, next) {
    res.json(req.user);
  })
  .put(function(req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(function(req, res, next) {
    next(new Error("not implemented"));
  })
  .delete(function(req, res, next) {
    next(new Error("not implemented"));
  });

app.listen(process.env.PORT);
