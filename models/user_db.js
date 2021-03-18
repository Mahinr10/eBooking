const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    password: 'abcd',
    user:'root',
    database:'ebooking'
})

function login_validation(user_input){
    let Query = `select * from users where Email = '${user_input.email}' and Password = '${user_input.pass}'`;
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                throw err;
            }
            if(rows.length > 0){
                resolve(JSON.parse(JSON.stringify(rows)));
            }
            else{
                reject('User Not Found');
            }
        })
    })
    
}

module.exports.login_validation = login_validation;
