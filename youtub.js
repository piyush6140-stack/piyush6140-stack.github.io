const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));

app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
	console.log(user);
	if(user=="piyush")
	{
		res.send(user);
	}
	else
	{
		//res.status(401).send({ error: "Wrong username or password" });
		res.redirect('/');
		//res.send('<script>window.alert("Enter again")</script>');
	}
    res.sendStatus(200);
});
app.post('/qrform_post', (req, res) => {
	console.log('Got body:', req.body);
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/qrcode";
	MongoClient.connect(url, function(err, db) 
	{
		if (err) throw err;
		var dbo = db.db("qrcode");
		var email=req.body.Batch_Number;
		var pass=req.body.Product_Name;
		var use=req.body.Name_of_Manufacture;
		var myobj = { Username:use,Password:pass,Email:email };
		dbo.collection("user").insertOne(myobj, function(err, res) 
		{
			if (err) throw err;
			db.close();
		});
	});  
	res.redirect('/login.html');
    res.sendStatus(200);
});

app.post('/login_post', (req, res) => 
{
	
    console.log('Got body:', req.body);
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/qrcode";
	MongoClient.connect(url, function(err, db) 
	{
		if (err) throw err;
		var dbo = db.db("qrcode");
		var email=req.body.Email;
		var pass=req.body.Password;
		var query = { Email: email,Password:pass };
		dbo.collection("user").find(query).toArray(function(err, result) 
		{
			if (err) 
			{
				res.redirect('/login.html');
			}
			if(result.length==0)
			{
				console.log(result)
				res.redirect('/login.html');
			}
			else
			{
				
				res.redirect('/form.html');
			}
			db.close();
		});
	});  
    
});

app.post('/signup_post', (req, res) => {
    console.log('Got body:', req.body);
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/qrcode";
	MongoClient.connect(url, function(err, db) 
	{
		if (err) throw err;
		var dbo = db.db("qrcode");
		var email=req.body.Email;
		var pass=req.body.Password;
		var use=req.body.Username;
		var myobj = { Username:use,Password:pass,Email:email };
		dbo.collection("user").insertOne(myobj, function(err, res) 
		{
			if (err) throw err;
			db.close();
		});
	});  
	res.redirect('/form.html');
    res.sendStatus(200);
});

app.get('/',function(req,res){
	res.sendfile('index.html');
});
app.get('/login.html',function(req,res){
	res.sendfile('login.html');
});
app.get('/form.html',function(req,res){
	//console.log(req.session.user);
	res.sendfile('form.html');
});
app.get('/signup.html',function(req,res){
	res.sendfile('signup.html');
});
app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));