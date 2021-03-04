const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')

const app = express();
const port = process.env.PORT || 3001;

const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'twTR9Q3d2t',
    password: 'QDQFCdT0nl',
    database: 'twTR9Q3d2t',
    port: 3306
 });

let cars = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('DB Ready.');
    }
 });

 connection.on('error', err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Wellcome');
});

app.get('/cars', (req, res) => {
    var query = connection.query("select * from cars", [], function(error, result){
        if(error)
           throw error;
        res.json(result);
    });    
});

app.get('/maintenancePerson/:idc', (req, res) => {
    const idc = req.params.idc;
    var query = connection.query("select * from maintenance where idcar="+idc, [], function(error, result){
        if(error)
           throw error;
        res.json(result);
    });    
});

app.post('/register', (req, res) => {
    const obj = req.body;
    console.log(obj);
    var query = connection.query("insert into maintenance(idcar,person,date) values(?, ?, ?)", [obj.idCar,obj.person,obj.date], function(error, result){
        if(error)
           throw error;        
    });

    var query = connection.query("update cars set inMaintenance = 1 where id = ?", [obj.idCar], function(error, result){
        if(error)
           throw error;        
    });
});

app.listen(port, () => console.log("Listening on port " + port));
