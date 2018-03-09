var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article ={
 'article-1' :{
    title:'Article 1 | Raju',
    heading: 'Article 1',
    content: `
    <p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p>

<p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p>

<p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p> `
}, 
'article-2' :{
    title:'Article 2 | Raju',
    heading: 'Article 2',
    content: `
    <p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p>

<p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p>
`
},
 'article-3' :{
    title:'Article 3| Raju',
    heading: 'Article 3',
    content: `
    <p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p>

<p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p>

<p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p> 
<p>this is the content of article onethis is the content of article onethis is the content of article one
this is the content of article onethis is the content of article onethis is the content of article one</p> `
}
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    
var htmlTemplate = `
<html>

<head>
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
<div class="container">
<div>
<a href="/">Home</a>
</div>
<h1> ${heading} </h1>

${content}  

</div>    

</body>

</html>
`;
return htmlTemplate;
}

var Pool = require('pg').Pool;
var config = {
    user: 'krkraju997',
    database: 'krkraju997',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    pool.query("SELECT * FROM test", function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req,res){
    pool.query("SELECT * FROM articles WHERE title = $1", [req.params.articleName], function(err,result){
       if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(404).send("Article not found");
            }
            else{
                 var articleData = result.rows[0];
                 res.send(createTemplate(articleData)); 
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
