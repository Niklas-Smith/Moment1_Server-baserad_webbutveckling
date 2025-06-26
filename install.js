const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/courses.db');

db.serialize(()=> {

db.run("DROP TABLE IF EXISTS courses;")

db.run(
    
    `
  CREATE TABLE courses (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
code TEXT NOT NULL,
link TEXT NOT NULL,
progression TEXT NOT NULL
);
`);

}
);



db.close();