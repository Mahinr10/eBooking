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

function get_user_info(user_id){
    return new Promise((resolve, reject)=>{
        Query = `select * from users where Person_id = ${user_id};`;
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in finding user id');
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}

function update_user_info(user_id, user_info){
    return new Promise((resolve, reject)=>{
        Query = `update users set Name='${user_info.name}', Profession='${user_info.profession}', Organization = '${user_info.organization}', Phone = '${user_info.phone}',  Email='${user_info.email}', Address='${user_info.address}' where Person_id = ${user_id}`;
        console.log(Query);
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in updating');
            }
            resolve('happy updating');
        })
    })
}

module.exports.login_validation = login_validation;
module.exports.register_eligibility = register_eligibility;
module.exports.do_register = do_register;
module.exports.get_user_info = get_user_info;
module.exports.update_user_info = update_user_info;
