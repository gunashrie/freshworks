const mysql=require('mysql'); //A connection to the MYsql
const express=require('express');
var app_obj=express();
const bodyparser=require('body-parser');

app_obj.use(bodyparser.json());
//Connection to Database

var mysqlCon=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'freshment'
});

mysqlCon.connect((err)=>{
    if(!err)
        console.log("Success in Connecting to the Database!!");
    else    
        console.log("Connection failed::"+JSON.stringify(err, undefined , 2));

});

//Giving a port number to listen at for the node server
app_obj.listen(8005,()=>console.log("Runninggg Goood at 8005!"));

//CREATE:
app_obj.get('/Create',(request,response)=>{
    var create_query="create table FreshThree (u_name varchar(100),u_data varchar(16000),u_pwd varchar(64) not null ,primary key(u_pwd))";
    mysqlCon.query(create_query,(err) =>{
        if(!err)
            //console.log(rows[0].user_name); Particular field
            //console.log(rows); Displays in our monitoring console
            response.send("Table Created for FreshWorks!");
        else    
            console.log(err);
    })
});





//The  get function should have the parameters Request and then Response.
// app_obj.get('/freshworksnu',(request,response)=>{
//     mysqlCon.query('Select * from freshworks',(err, rows, fields) =>{
//         if(!err)
//             //console.log(rows[0].user_name); Particular field
//             //console.log(rows); Displays in our monitoring console
//             response.send(rows);
//         else    
//             console.log(err);
//     })
// });

//Duplicating the above columns

app_obj.get('/Read/:pwd',(request,response)=>{
    mysqlCon.query('Select * from freshworks where pwd=?',[request.params.pwd],(err, rows, fields) =>{
        if(!err)
            //console.log(rows[0].user_name); Particular field
            //console.log(rows); Displays in our monitoring console
            {
            response.send(rows);
            response.send("You have read your Table for FreshWorks!")
            }
        else    
            console.log(err);
    })
});

//Deleting the Particular Record using the Key
app_obj.delete('/Delete/:pwd',(request,response)=>{
    mysqlCon.query('delete from freshworks where pwd= ?',[request.params.pwd],(err, rows, fields) =>{
        if(!err)
            //console.log(rows[0].user_name); Particular field
            //console.log(rows); Displays in our monitoring console
           { 
            response.send('Error:404 JK you have deleted the record!');
            console.log("deleted successfully!");
        }
        else    
            console.log(err);
    })
});