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


function register_eligibility(user_input){
    const {name, email, pass, organization, address, phone } = user_input;
    let Query = `select * from users where Email = '${user_input.email}'`;
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                throw err;
            }
            if(rows.length == 0 && (name && email && pass && organization && address && phone)){
                resolve('User is eligible');
            }
            else{
                reject('Users exists');
            }
        })
    });
}

function do_register(user_input){
    const {name, email, pass, organization, address, phone } = user_input;
    let Query = `insert into users (Name, Email, Password, Phone, Organization, Address) values('${name}', '${email}', '${pass}', '${phone}', '${organization}', '${address}' )`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject("error raised")
            }
        });
        console.log("done insertion");
        Query = `select * from users where Email = '${email}'`
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in inserting');
            }
            if(rows.length > 0){
                resolve(JSON.parse(JSON.stringify(rows)));
            }
            else{
                reject('User Not Found');
            }
        })
    });
}

module.exports.login_validation = login_validation;
module.exports.register_eligibility = register_eligibility;
module.exports.do_register = do_register;
