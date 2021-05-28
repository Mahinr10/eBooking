const { resolveInclude } = require('ejs');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'ebooking'
});

function make_interest(Person_id, Post_id){
    Query = `insert into interest (Person_id, Post_id) values (${Person_id}, ${Post_id})`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in inserting data in interest');
            }
            resolve('succesfully inserted in interest');
        })
    })
}

function loose_interest(Person_id, Post_id){
    Query = `delete from interest where Person_id = ${Person_id} AND Post_id = ${Post_id}`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in deleting data from interest');
            }
            resolve('succesfully deleted data from interest');
        })
    })
}

function get_all_interest(user_id){
    let Query = `SELECT dt1.Person_id as other_user, dt1.Name, dt1.Email, dt1.Phone, dt1.Address, dt1.Profession, dt1.Organization, dt1.Post_id, dt2.text_body, dt2.Person_id as self_user, dt2.Amount, dt2.start_time, dt2.end_time, dt2.post_time from (SELECT users.Person_id, users.Name, users.Email, users.Phone, users.Address, users.Profession, users.Organization, interest.Post_id from users JOIN interest on interest.Person_id = users.Person_id) dt1 JOIN (SELECT * from posts where Person_id = ${user_id}) dt2 on dt1.Post_id = dt2.Post_id`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in fetching all interests');
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}

function make_invoice({post_id, buyer_id, seller_id}){
    let Query = `Delete from interest where Post_id = ${post_id}`
    console.log(Query);
    return new Promise((reject, resolve)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in deleting interest');
            }
            Query = `insert into invoice (Post_id, Buyer_id, Seller_id) values (${post_id}, ${buyer_id}, ${seller_id})`
            console.log(Query);
            connection.query(Query, (err, rows, fields)=>{
                if(err){
                    reject('error in inserting into invoice');
                }
                resolve('done inserting');
            })
        })
    })
}

function get_history(user_id){
    let Query = `select * from (SELECT dt1.BuyerEmail, dt1.BuyerPhone, dt1.BuyerName, users.Email as SellerEmail, users.Name as SellerName, users.Phone as SellerPhone, dt1.Post_id, dt1.Seller_id, dt1.Buyer_id from (select users.Email as BuyerEmail, users.Phone as BuyerPhone, users.Name as BuyerName, invoice.Post_id, invoice.Seller_id, invoice.Buyer_id FROM invoice join users on users.Person_id = invoice.Buyer_id) dt1 JOIN users on dt1.Seller_id = users.Person_id) dt2 join posts ON posts.Post_id = dt2.Post_id WHERE Seller_id = ${user_id} or Buyer_id = ${user_id}`
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in loading payments');
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}

module.exports.make_interest = make_interest;
module.exports.loose_interest = loose_interest;
module.exports.get_all_interest = get_all_interest;
module.exports.make_invoice = make_invoice;
module.exports.get_history = get_history;