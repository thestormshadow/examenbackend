const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')

const app = express();
const port = process.env.PORT || 3001;

let mysql_query = require('./mysqlconn');

let cars = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/cars', (req, res) => {
    mysql_query("select * from cars", [], function(error, result){
        if(error)
            console.log(error); 
        res.json(result);
    });    
});

app.get('/maintenancePerson/:idc', (req, res) => {
    const idc = req.params.idc;
    mysql_query("select * from maintenance where idcar="+idc, [], function(error, result){
        if(error)
            console.log(error); 
        res.json(result);
    });    
});

app.post('/register', (req, res) => {
    const obj = req.body;
    console.log(obj);
    if(obj != null){
        mysql_query("insert into maintenance(idcar,person,date) values(?, ?, ?)", [obj.idCar,obj.person,obj.date], function(error, result){
            if(error)
                console.log(error);     
            
            mysql_query("update cars set inMaintenance = 1 where id = ?", [obj.idCar], function(error, result){
                if(error)
                    console.log(error);    
            });
        });   
        
    }
    
});

app.listen(port, () => console.log("Listening on port " + port));
