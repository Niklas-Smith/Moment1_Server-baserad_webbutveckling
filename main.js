const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/courses.db');
const bodyParser = require("body-parser")

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true  }))

app.get("/", (req, res) => {

db.all("SELECT * FROM courses ORDER BY id ASC;",(error, rows)=> {
  if(error) {
console.error(error.message);

  }
  res.render("index",{
error:"",
   rows: rows

  } );


}) ;
});

/*
res.render("index");
}

) ;
*/


app.get("/addcourse", (req, res) => {

res.render("addcourse",{
error: "" 
});
}

) ;

app.get("/about", (req, res) => {

res.render("about");
}

) ;

app.post("/addcourse", (req, res) => {
let name = req.body.name;
let code = req.body.code;
let url = req.body.url;
let progression = req.body.progression;
let error = "";

if(name != "" && code != "" && url != ""  && progression != ""){

    const coursesValues = db.prepare("INSERT INTO courses(name, code, url, progression)VALUES(?,?,?,?)")
    coursesValues.run(name, code, url, progression);
    coursesValues.finalize();

}else {

    error = "All fields must be filled in "
}


    res.render("addcourse",{
        error: error
    })

}

) ;

app.get("/delete/:id", (req, res)=> {
let id = req.params.id;


db.run("DELETE FROM courses WHERE id=?;", id , (error)=> {
if (error) {
    console.error(error.message);
}

res.redirect("/");
} )

})

app.listen(port, () => 
{
console.log("app is on port " + port);

}
);