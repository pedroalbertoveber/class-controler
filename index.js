/* importing modules */
const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const app = express();

/* allowing js to get infos from html page */
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

/* handle-bars config */
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));


/* routes */
app.get("/class", (req, res) => {

  const sql = "SELECT * FROM students";
  
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const students = data;
    res.render("class", { students });
  })
});

app.get("/students/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM students WHERE id=${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const student = data[0];
    res.render("edit", { student });
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/students/insertstudent", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const sql = `INSERT INTO students (name, age) VALUES ("${name}", "${age}")`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.post("/student/edit", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;

  const sql = `UPDATE students SET name="${name}", age="${age}" WHERE id=${id}`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/");
  });
});

app.post("/student/delete", (req, res) => {
  const id = req.body.id;

  const sql = `DELETE FROM students WHERE id=${id}`;
  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});

/* initialization */
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Conectou ao MySQL!");
});