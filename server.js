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


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/:articleName', function (req,res){
    var articleName =req.params.articleName;
 res.send(createTemplate(article[articleName])); 

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
