//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use file-upload
const fileUpload = require('express-fileupload');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
//use express express session 
const session = require('express-session');
//use express flash 
const flash= require('express-flash');

const cool = require('cool-ascii-faces');

const app = express();
 
//Create connection
const conn = mysql.createConnection({
  host: 'korobd.mysql.database.azure.com',
  user: 'koro@korobd',
  password: 'Kevin1975@',
  database: 'korodb',
  port: 3306,
	ssl: true
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
app.use(flash());
  
app.use(session( {
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
hbs.registerPartials(__dirname + '/views/partials');
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));
//for uploading images
app.use(fileUpload());

app.get('/cool', (req, res) => res.send(cool()));
 
//route for homepage
app.get('/',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
  let sql = "SELECT * FROM properties where remaining_units>0 limit 4";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('guest/home',{
      results: results
    });
  });
});

app.get('/about',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
    res.render('guest/about',{ });  
});

app.get('/contact',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
    res.render('guest/contact',{ }); 
});

app.get('/login',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
    res.render('guest/login',{ });  
});

app.get('/register',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
    res.render('guest/register',{  }); 
});

app.post('/search_property',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
  var category=req.body.category;
  var type=req.body.type;
  var location=req.body.location;
  var p1=req.body.bt1;
  var p2=req.body.bt2;
  conn.query('SELECT * FROM properties WHERE category = ? AND type=? AND location=? AND amount BETWEEN '+ p1+ ' AND '+ p2, [category,type,location], function(err, results, fields) {
    if(err) throw err;
    res.render('guest/searched_property',{ results:results}); 
  
  });
});

app.get('/properties',(req, res) => {
  if(req.session.role){
    res.redirect('/index');
  }
  let sql = "SELECT * FROM properties where remaining_units>0";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('guest/properties',{ results:results  });
    });
});

app.get('/home',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  let sql = "SELECT * FROM properties where remaining_units>0 AND NOT user_id="+user_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('client/home',{
      results: results
    });
  });
});

app.get('/add_property',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var success="";
  success=req.session.add_property;
  req.session.add_property=null;

  let sql = "SELECT * FROM properties";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('client/add_property',{
      results: results,success:success,user_id:req.session.user_id
    });
  });
});

app.get('/client_edit_property',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var property_id=req.query.id;
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, results, fields) {
      if(err) throw err;
      res.render('client/edit_property',{
      results: results
       });
         
    }); 
});

app.get('/view_property',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var property_id=req.query.id;
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, results, fields) {
      if(err) throw err;
      res.render('client/view_property',{
      results: results
       });
         
    }); 
});

app.get('/property_details',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var property_id=req.query.id;
  conn.query('SELECT * FROM booking JOIN users ON booking.user_id=users.user_id WHERE booking.property_id = ? ', [property_id], function(err, bookings, fields) {
  conn.query('SELECT * FROM payment JOIN users ON payment.user_id=users.user_id WHERE payment.property_id = ? ', [property_id], function(err, payments, fields) {
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, property, fields) {
      if(err) throw err;
      res.render('client/property_details',{
      bookings:bookings,payments:payments,property:property
       });
      }); 
      }); 
         
    }); 
});

app.get('/rent_details',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var property_id=req.query.id;
  var status="booked";
   conn.query('SELECT * FROM rent JOIN users ON rent.user_id=users.user_id WHERE rent.property_id = ? ', [property_id], function(err, tenants, fields) {
  conn.query('SELECT * FROM booking JOIN users ON booking.user_id=users.user_id JOIN properties ON booking.property_id=properties.property_id WHERE booking.property_id = ? AND booking.status=?', [property_id,status], function(err, bookings, fields) {
  conn.query('SELECT * FROM payment JOIN users ON payment.user_id=users.user_id WHERE payment.property_id = ? ', [property_id], function(err, payments, fields) {
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, property, fields) {
      if(err) throw err;
      res.render('client/rent_details',{
      bookings:bookings,payments:payments,property:property,tenants:tenants
       });
      }); 
      }); 
       });   
    }); 
});

app.get('/rent_payment',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  var property_id=req.query.id;
  conn.query('SELECT * FROM payment JOIN users ON payment.user_id=users.user_id WHERE payment.user_id = ? AND payment.property_id=?', [user_id,property_id], function(err, payments, fields) {
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, property, fields) {
      if(err) throw err;
      res.render('client/rent_payment',{
      payments:payments,property:property
       });
      }); 
      });  
});

app.get('/my_property',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM properties WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('client/my_property',{
      results: results
       });
         
    }); 
});

app.get('/assign_room',(req, res) => {
  var property_id=req.query.p;
  var user_id=req.query.u;
  var booking_id=req.query.id;
  var amount=req.query.a;
  var status="payed";
  let sql = "UPDATE booking SET status='payed' WHERE booking_id ='"+booking_id+"' ";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    });
 var booking_date=new Date();
  let data = {user_id: user_id, property_id: property_id,balance:amount,assigned_date:booking_date};
  let sql1 = "INSERT INTO rent SET ?";
  let query1 = conn.query(sql1, data,(err, results) => {
    if(err) throw err;
     res.redirect("/rent_details?id="+property_id+"");
  
  });
});

app.get('/rent',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query("SELECT * FROM properties WHERE user_id="+user_id+" AND type='rent'", function(err, results, fields) {
    conn.query("SELECT * FROM booking JOIN users ON booking.user_id=users.user_id JOIN properties ON booking.property_id=properties.property_id WHERE booking.user_id="+user_id+" AND properties.type='rent'", function(err, result, fields) {
      if(err) throw err;
      res.render('client/rent',{
      results: results,result:result
       });
    });   
    }); 
});

app.post('/add_payment',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.body.user_id;
  var property_id=req.body.property_id;
  var status="payed";
  var balance=req.body.balance-req.body.amount;
  let sql = "UPDATE rent SET balance='"+balance +"' WHERE id="+req.body.id+ "";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    });
  var payment_date=new Date();
  var purpose="rent";
  var booking_id=null;
  var amount=req.body.amount;
  var payment_method=req.body.payment_method;
  let data ={amount:amount,payment_method:payment_method,user_id: user_id, property_id: property_id,booking_id:booking_id, payment_date:payment_date,purpose:purpose};
  let sql1 = "INSERT INTO payment SET ?";
  let query1 = conn.query(sql1, data,(err, results) => {
    if(err) throw err;
    res.redirect("/rent_details?id="+property_id+"");
  
  });
});

app.get('/client_payment_form',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var status="booked";
  var booking_id=req.query.id;
  var property_id=req.query.pi;
  conn.query('SELECT * FROM booking WHERE booking_id = ? ', [booking_id], function(err, results, fields) {
      if(err) throw err;
      conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, result, field) {
      if(err) throw err;
      var amount=result[0].amount;
      res.render('client/payment_form',{
      results: results,amount:amount
       });
      }); 
         
    }); 
  
});


app.get('/client_bookings',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
    var success="";
  if(req.session.booking_success){
    success=req.session.booking_success;
  }
  req.session.booking_success=null;
  var user_id=req.session.user_id;
    conn.query("SELECT * FROM payment JOIN users ON payment.user_id=users.user_id JOIN properties ON payment.property_id=properties.property_id  WHERE payment.user_id="+user_id+"", function(err, payments, fields) {
    conn.query("SELECT * FROM booking JOIN users ON booking.user_id=users.user_id JOIN properties ON booking.property_id=properties.property_id WHERE booking.user_id="+user_id+" AND booking.status='booked'", function(err, bookings, fields) {
    res.render('client/bookings',{
      bookings:bookings,payments:payments,success:success
    });
    });
  });
});

app.get('/print_receipt',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var payment_id=req.query.id;
    conn.query('SELECT * FROM payment JOIN users ON payment.user_id=users.user_id JOIN properties ON payment.property_id=properties.property_id  WHERE payment_id=?',[payment_id], function(err, results, fields) {
    res.render('client/print_receipt',{
      results:results
    });
  });
});

app.get('/edit_details',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('client/edit_details',{
      results: results
       });
         
    }); 
});



app.get('/my_details',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('client/my_details',{
      results: results
       });
         
    }); 
});

app.get('/change_password',(req, res) => {
  if(req.session.role!='client'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('client/change_password',{
      results: results
       });
         
    }); 
});

app.get('/book',(req, res) => {
  var status="booked";
  var property_id=req.query.id;
  var r=req.query.r;
  r=r-1;
  var user_id=req.session.user_id;
  let sql = "UPDATE properties SET status='"+status +"', remaining_units='"+r+"' WHERE property_id="+property_id+ "";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    });
 var booking_date=new Date();
  let data = {user_id: user_id, property_id: property_id,booking_date:booking_date};
  let sql1 = "INSERT INTO booking SET ?";
  let query1 = conn.query(sql1, data,(err, results) => {
    if(err) throw err;
    req.session.booking_success="You have successfully booked this property,you can now pay via mpesa, bank or cash";
     res.redirect('/client_bookings');
  
  });
});


app.post('/admin_add_payment',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var booking_id=req.body.booking_id;
  var user_id=req.body.user_id;
  var property_id=req.body.property_id;
  var status="payed";
  let sql = "UPDATE booking SET status='"+status +"' WHERE booking_id="+booking_id+ "";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    });
  var payment_date=new Date();
  var amount=req.body.amount;
  var payment_method=req.body.payment_method;
  let data = {amount:amount,payment_method:payment_method,user_id: user_id, property_id: property_id,booking_id:booking_id, payment_date:payment_date};
  let sql1 = "INSERT INTO payment SET ?";
  let query1 = conn.query(sql1, data,(err, results) => {
    if(err) throw err;
    res.redirect('/admin_bookings');
  
  });
});


app.get('/admin_home',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  let sql = "SELECT * FROM properties ";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    
    conn.query('SELECT COUNT(*) AS userCount FROM users', function(err, users, fields) {
      var userCount= users[0].userCount;
      conn.query("SELECT COUNT(*) AS adminCount FROM users WHERE role ='admin'",  function(err, admins, fields) {
      var adminCount= admins[0].adminCount;
      conn.query("SELECT COUNT(*) AS staffCount FROM users WHERE role ='staff'",  function(err, staff, fields) {
      var staffCount= staff[0].staffCount;
      conn.query("SELECT COUNT(*) AS clientCount FROM users WHERE role ='client'",  function(err, clients, fields) {
      var clientCount= clients[0].clientCount;
      conn.query("SELECT COUNT(*) AS companyCount FROM users WHERE role ='company'",  function(err, company, fields) {
      var companyCount= company[0].companyCount;
    res.render('admin/home',{
      results: results,users:userCount,admins:adminCount,staff:staffCount,clients:clientCount,company:companyCount
    });
    });
    });
    });
    });
    });
  });
});

app.get('/admin_users',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    var user_id=req.session.user_id;
    conn.query('SELECT * FROM users WHERE NOT user_id = ? ',[user_id], function(err, users, fields) {
      if(err) throw err;
    res.render('admin/users',{
      users:users
    });
  });
});

app.post('/search_user',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    var user_id=req.session.user_id;
    conn.query("SELECT * FROM users WHERE role= '"+req.body.role+"' AND location='"+req.body.location+"' AND registration_date BETWEEN '"+req.body.bt1+"' AND '"+req.body.bt2+"'", function(err, users, fields) {
      if(err) throw err;
    res.render('admin/user_reports',{
      users:users
    });
  });
});

app.post('/admin_search_property',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    conn.query("SELECT * FROM properties JOIN users ON properties.user_id=users.user_id WHERE properties.category= '"+req.body.category+"' AND properties.type='" +req.body.type+"' AND properties.location='"+req.body.location+"' AND properties.date_uploaded BETWEEN '"+req.body.bt1+"' AND '"+req.body.bt2+"'", function(err, properties, fields) {
      if(err) throw err;
    res.render('admin/property_reports',{
      properties:properties
    });
  });
});

app.post('/search_payment',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    conn.query("SELECT * FROM payment JOIN users ON payment.user_id=users.user_id JOIN properties ON payment.property_id=properties.property_id WHERE payment.payment_method= '"+req.body.mode+"'  AND payment.payment_date BETWEEN '"+req.body.bt1+"' AND '"+req.body.bt2+"'", function(err, payments, fields) {
      if(err) throw err;
    res.render('admin/payment_reports',{
      payments:payments
    });
  });
});
 


app.get('/admin_bookings',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  
    conn.query("SELECT * FROM booking JOIN users ON booking.user_id=users.user_id JOIN properties ON booking.property_id=properties.property_id WHERE booking.status='booked'", function(err, bookings, fields) {
    res.render('admin/bookings',{
      bookings:bookings
    });
  });
});

app.get('/admin_property',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  let sql = "SELECT * FROM properties ORDER BY date_uploaded DESC ";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    
    res.render('admin/properties',{
      results: results
    });
   
  });
});

app.get('/admin_add_property',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var success="";
  success=req.session.add_property;
  req.session.add_property=null;
  let sql = "SELECT user_id,full_name  FROM users WHERE role='client' OR role='company'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('admin/add_property',{
      results: results,success:success
    });
  });
});

app.get('/admin_add_user',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    res.render('admin/add_user',{ 
    });
});

app.get('/user_reports',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    res.render('admin/user_reports',{ 
    });
});

app.get('/property_reports',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    res.render('admin/property_reports',{ 
    });
});

app.get('/payment_reports',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
    res.render('admin/payment_reports',{ 
    });
});

app.get('/admin_property',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM properties WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('admin/my_property',{
      results: results
       });
         
    }); 
});

app.get('/admin_edit_details',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('admin/edit_details',{
      results: results
       });
         
    }); 
});

app.get('/admin_edit_property',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var property_id=req.query.id;
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, results, fields) {
      if(err) throw err;
      res.render('admin/admin_edit_property',{
      results: results
       });
         
    }); 
});

app.get('/admin_edit_user',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var user_id=req.query.id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('admin/edit_user',{
      results: results
       });
         
    }); 
});

app.get('/admin_change_password',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('admin/change_password',{
      results: results
       });
         
    }); 
});

app.post('/admin_add_payment',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  var booking_id=req.body.booking_id;
  var user_id=req.body.user_id;
  var property_id=req.body.property_id;
  var status="payed";
  let sql = "UPDATE booking SET status='"+status +"' WHERE booking_id="+booking_id+ "";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    });
  var payment_date=new Date();
  var amount=req.body.amount;
  var payment_method=req.body.payment_method;
  let data = {amount:amount,payment_method:payment_method,user_id: user_id, property_id: property_id,booking_id:booking_id, payment_date:payment_date};
  let sql1 = "INSERT INTO payment SET ?";
  let query1 = conn.query(sql1, data,(err, results) => {
    if(err) throw err;
    res.redirect('/admin_bookings');
  
  });
});

app.post('/staff_add_payment',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var booking_id=req.body.booking_id;
  var user_id=req.body.user_id;
  var property_id=req.body.property_id;
  var status="payed";
  let sql = "UPDATE booking SET status='"+status +"' WHERE booking_id="+booking_id+ "";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    });
  var payment_date=new Date();
  var amount=req.body.amount;
  var payment_method=req.body.payment_method;
  let data = {amount:amount,payment_method:payment_method,user_id: user_id, property_id: property_id,booking_id:booking_id, payment_date:payment_date};
  let sql1 = "INSERT INTO payment SET ?";
  let query1 = conn.query(sql1, data,(err, results) => {
    if(err) throw err;
    res.redirect('/staff_bookings');
  
  });
});

app.get('/payment_form',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var status="booked";
  var booking_id=req.query.id;
  var property_id=req.query.pi;
  conn.query('SELECT * FROM booking WHERE booking_id = ? ', [booking_id], function(err, results, fields) {
      if(err) throw err;
      conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, result, field) {
      if(err) throw err;
      var amount=result[0].amount;
      res.render('staff/payment_form',{
      results: results,amount:amount
       });
      }); 
         
    }); 
  
});


app.get('/staff_home',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  let sql = "SELECT * FROM properties ORDER BY date_uploaded DESC limit 4";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    conn.query("SELECT * FROM users WHERE  role='client' ORDER BY registration_date DESC limit 4", function(err, clients, fields) {
    res.render('staff/home',{
      results: results,clients:clients
    });
    });
  });
});

app.get('/staff_print_receipt',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var payment_id=req.query.id;
    conn.query("SELECT * FROM payment JOIN users ON payment.user_id=users.user_id JOIN properties ON payment.property_id=properties.property_id  WHERE payment.payment_id=?",[payment_id], function(err, results, fields) {
    res.render('staff/print_receipt',{
      results:results
    });
  });
});

app.get('/staff_clients',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  
    conn.query("SELECT * FROM users WHERE  role='client' ORDER BY registration_date DESC", function(err, clients, fields) {
    res.render('staff/clients',{
      clients:clients
    });
  });
});

app.get('/staff_contact',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  
    conn.query("SELECT * FROM contact ", function(err, contact, fields) {
    res.render('staff/contact',{
      contact:contact
    });
  });
});


app.get('/staff_bookings',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  
    conn.query("SELECT * FROM booking JOIN users ON booking.user_id=users.user_id JOIN properties ON booking.property_id=properties.property_id WHERE booking.status='booked'", function(err, bookings, fields) {
    conn.query("SELECT * FROM payment JOIN users ON payment.user_id=users.user_id JOIN properties ON payment.property_id=properties.property_id ", function(err, payments, fields) { 
    res.render('staff/bookings',{
      bookings:bookings,payments:payments
    });
    });
  });
});

app.post('/send_reply',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var contact_id=req.body.contact_id;
  var reply=req.body.reply;
  var status="replied";
  let sql = "UPDATE contact SET status='"+status +"',reply='"+reply+"' WHERE contact_id="+contact_id+ "";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/staff_contact');
  
  });
});

app.get('/staff_property',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  let sql = "SELECT * FROM properties ORDER BY date_uploaded DESC ";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    
    res.render('staff/properties',{
      results: results
    });
   
  });
});

app.get('/staff_add_property',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var success="";
  success=req.session.add_property;
  req.session.add_property=null;
  let sql = "SELECT user_id,full_name  FROM users WHERE role='client' OR role='company'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('staff/add_property',{
      results: results,success:success
    });
  });
});

app.get('/staff_add_client',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
    res.render('staff/add_client',{ 
    });
}); 

app.get('/staff_property',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM properties WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('staff/my_property',{
      results: results
       });
         
    }); 
});

app.get('/staff_edit_details',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('staff/edit_details',{
      results: results
       });
         
    }); 
});

app.get('/staff_edit_property',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var property_id=req.query.id;
  conn.query('SELECT * FROM properties WHERE property_id = ? ', [property_id], function(err, results, fields) {
      if(err) throw err;
      res.render('staff/staff_edit_property',{
      results: results
       });
         
    }); 
});

app.get('/staff_edit_client',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var user_id=req.query.id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('staff/edit_client',{
      results: results
       });
         
    }); 
});

app.get('/staff_reply',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var contact_id=req.query.id;
  conn.query('SELECT * FROM contact WHERE contact_id = ? ', [contact_id], function(err, results, fields) {
      if(err) throw err;
      res.render('staff/staff_reply',{
      results: results
       });
         
    }); 
});

app.get('/staff_change_password',(req, res) => {
  if(req.session.role!='staff'){
    res.redirect('/login');
  }
  var user_id=req.session.user_id;
  conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, results, fields) {
      if(err) throw err;
      res.render('staff/change_password',{
      results: results
       });
         
    }); 
});

//route for insert contact data
app.post('/saveContact',(req, res) => {
  var status='send';
  let data = {full_name: req.body.full_name, email: req.body.email, phone: req.body.phone, message: req.body.message, status:req.body.status };
  let sql = "INSERT INTO contact SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    var feedback="We have received your message,we will get back to you soon";
    res.render('guest/contact',{ feedback:feedback
    });
  });
});

//route for insert contact data
app.post('/addProperty',(req, res) => {
  var registration_date=new Date();
  var file=req.files.property_image;
  var image_name=file.name;
  if (file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype=="image/gif"){
    file.mv('public/images/property/'+file.name,function(err){
      if(err) throw err;
    });
  }
  var user_id=req.body.user_id;
  var date_uploaded=new Date();
  let data = {bedrooms:req.body.bedrooms,remaining_units:req.body.units,type:req.body.type,total_units:req.body.units,date_uploaded:date_uploaded,property_name: req.body.property_name, location: req.body.location, category: req.body.category,user_id:user_id, status:req.body.status, image:image_name, amount:req.body.price, description:req.body.description };
  let sql = "INSERT INTO properties SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    req.session.add_property="Property added";
    var role=req.session.role;
    if(role=='client'){
          return res.redirect('/add_property');
        }
        else if(role=='staff'){
          return res.redirect('/staff_add_property');
        }
        else if(role=='admin'){
          return res.redirect('/admin_add_property');
        }
        else if(role=='landlord'){
          return res.redirect('/landlord_add_property');
        }
  });
});

//route for insert contact data
app.post('/register',(req, res) => {
    conn.query('SELECT * FROM users WHERE email = ?', [ req.body.email], function(error, results, fields) {
      if (results.length > 0) {
        var error="Email already exists";
        if(req.session.role){
          var role=req.session.role;
          if(role=='staff'){
          res.render('staff/add_client',{
          error: error
          });
          }

          else if(role=='admin'){
          res.render('admin/add_user',{
          error: error
          });
          }
        }
        else{
           res.render('guest/register',{
          error: error
          });

        }
      }
      });
     conn.query('SELECT * FROM users WHERE username = ?', [ req.body.username], function(error, results, fields) {
      if (results.length > 0) {
        var error="Username already exists";
        if(req.session.role){
          var role=req.session.role;
          if(role=='staff'){
          res.render('staff/add_client',{
          error: error
          });
          }

          else if(role=='admin'){
          res.render('admin/add_user',{
          error: error
          });
          }
        }
        else{
           res.render('guest/register',{
          error: error
          });

        }

      }
       });
      
      
  var registration_date=new Date();
  let data = {full_name: req.body.full_name, email: req.body.email, phone: req.body.phone, location: req.body.location, username:req.body.username, password:req.body.password, role:req.body.role, registration_date:registration_date };
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data,(err, results) => {
     var success="Successfully registered";
      if(req.session.role){
        var role=req.session.role;
          if(role=='staff'){
          res.render('staff/add_client',{
          success:success
          });
          }

          else if(role=='admin'){
          res.render('admin/add_user',{
          success:success
          });
          }
        
        }
        else{
           res.render('guest/login',{
            success:success
          });

        }

  });
  
  
});
 
//route for delete data
app.get('/delete_user',(req, res) => {
  if(req.session.role!='admin'){
    res.redirect('/login');
  }
  let sql = "DELETE FROM users WHERE user_id="+req.query.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/admin_users');
  });
});

app.get('/delete_property',(req, res) => {
  if(!req.session.role){
    res.redirect('/login');
  }
  let sql = "DELETE FROM properties WHERE property_id="+req.query.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    var role=req.session.role;
    if(role=='admin'){
      res.redirect('/admin_property');
    }
    else if(role=='client'){
      res.redirect('/my_property');

    }
  });
});
app.post('/login', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        var user_id=results[0].user_id;
        request.session.loggedin = true;
        request.session.user_id = user_id;
        request.session.username = username;
        request.session.full_name = results[0].full_name;
        request.session.email=results[0].email;
        request.session.phone=results[0].phone;
        request.session.role=results[0].role;
        response.redirect('/index');

      }
        
        else {
        var error=" Wrong username or password";
           response.render('guest/login',{
           error: error
         });
      }
    });   
      
 }
  
});

app.get('/index', function(req, res) {
  if (req.session.loggedin) {
    var role=req.session.role;
    var user_id=req.session.user_id;
    
        if(role=='client'){
          return res.redirect('/home');
        }
        else if(role=='staff'){
          return res.redirect('/staff_home');
        }
        else if(role=='admin'){
          return res.redirect('/admin_home');
        }
        else if(role=='landlord'){
          return res.redirect('/landlord_home');
        }
        

      }
  else {
    res.redirect('/');
  }
  res.end();
  });

app.post('/edit_details', function(req, res) {
    var user_id=req.session.user_id;

    let sql = "UPDATE users SET full_name='"+req.body.full_name+"', location='"+req.body.location+"',phone='"+req.body.phone+"'WHERE user_id="+user_id+ "";
    let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    var role=req.session.role;
    
      if(role=='client'){
          return res.redirect('/edit_details');
        }
        else if(role=='staff'){
          return res.redirect('/staff_edit_details');
        }
        else if(role=='admin'){
          return res.redirect('/admin_edit_details');
        }
        else if(role=='landlord'){
          return res.redirect('/landlord_edit_details');
        }
        
    });   
});

app.post('/updateProperty', function(req, res) {
  var total_units=parseInt(req.body.total_units)+parseInt(req.body.more_units);
  var remaining_units=parseInt(req.body.remaining_units)+parseInt(req.body.more_units);
    let sql = "UPDATE properties SET property_name='"+req.body.property_name+"', location='"+req.body.location+"', description='"+req.body.description+"', total_units='"+total_units+"', remaining_units='"+remaining_units+"', bedrooms='"+req.body.bedrooms+"', category='"+req.body.category+"', type='"+req.body.type+"',amount='"+req.body.price+"'WHERE property_id="+req.body.property_id+ "";
    let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    var role=req.session.role;
      if(role=='client'){
          return res.redirect('/my_property');
        }
        else if(role=='staff'){
          return res.redirect('/staff_property');
        }
        else if(role=='admin'){
          return res.redirect('/admin_property');
        }
        else if(role=='landlord'){
          return res.redirect('/landlord_property');
        }
        
    });

      
});

app.post('/edit_client', function(req, res) {
    var user_id=req.body.id;
    
    let sql = "UPDATE users SET full_name='"+req.body.full_name+"', location='"+req.body.location+"',phone='" +req.body.phone+"' WHERE user_id="+user_id+ "";
    let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    var role=req.session.role;
       if(role=='staff'){
          return res.redirect("/staff_edit_client?id="+user_id+"");
        }
        else if(role=='admin'){
          return res.redirect("/admin_edit_user?id="+user_id+"");
        }
        else if(role=='landlord'){
          return res.redirect("/landlord_edit_client?id="+user_id+"");
        }
        
    });

      
});

app.post('/change_password', function(req, res) {
    var cp=req.body.cp;
    var np=req.body.np;
    var rnp=req.body.rnp;
    var role=req.session.role;
    var user_id=req.session.user_id;
    if(np !=rnp){
      var error="The two new passwords do not match";
      
      if(role=='client'){
          res.render('client/change_password',{
      error: error
    });
        }
        else if(role=='staff'){
          res.render('staff/change_password',{
      error: error
    });
        }
        else if(role=='admin'){
          res.render('admin/change_password',{
      error: error
    });
        }
        else if(role=='landlord'){
          res.render('landlord/change_password',{
      error: error
    }); 
        }

    }
    else{
      var user_id=req.session.user_id;
    conn.query('SELECT * FROM users WHERE user_id = ? ', [user_id], function(err, result, fields) {
      if(err) throw err;
         var password=result[0].password;
         if(password==cp){
           let sql = "UPDATE users SET password='"+np+ "' WHERE user_id="+user_id+ "";
           let query = conn.query(sql, (err, results) => {
            if(err) throw err;
            var success="Successfully changed password";
        if(role=='client'){
          res.render('client/change_password',{
      success: success
    });
        }
        else if(role=='staff'){
          res.render('staff/change_password',{
      success: success
    });
        }
        else if(role=='admin'){
          res.render('admin/change_password',{
      success: success
    });
        }
        else if(role=='landlord'){
          res.render('landlord/change_password',{
      success: success
    });
        }
          });

         }
         else{
          var error="Current password entered does not match the one in our records";
          if(role=='client'){
          res.render('client/change_password',{
      error: error
    });
        }
        else if(role=='staff'){
          res.render('staff/change_password',{
      error: error
    });
        }
        else if(role=='admin'){
          res.render('admin/change_password',{
      error: error
    });
        }
        else if(role=='landlord'){
          res.render('landlord/change_password',{
      error: error
    });
        }

         }
});
  }
});

    
    


app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){

    }
    else{
      res.redirect('/'); 
    }
  });
});
 
//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});