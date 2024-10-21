const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express();
app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'aarti123',
    database:'travel'
});

conn.connect((err)=>{
    if(err){
        console.log('Erro!');
        return;
    }else{
        console.log('Done!');
        
    }
})

//  signup details storage
app.post('/Signup',(req,res)=>{
    const insertquery = "insert into signup(`username`,`email`,`password`) values(?)";
    const value = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
conn.query(insertquery,[value],(err,result)=>{
    if(err){
        console.log('Error!');
        return res.json(err)
        
    }
    return res.json(result)
})
})


//contact us page 
app.post('/Contact',(req,res)=>{
    const insertquery = "insert into contact(`name`,`email`,`message`) values(?)";
    const value = [
        req.body.name,
        req.body.email,
        req.body.message
    ];
conn.query(insertquery,[value],(err,result)=>{
    if(err){
        console.log('Error!');
        return res.json(err)
        
    }
    return res.json(result)
})

})
//contact us page data show on admin panal
app.get('/Contactt', (req, res) => {
    const query = 'SELECT * FROM  contact'; // No need for values here
    const value = [
        req.body.name,
        req.body.email,
        req.body.message    
    ];
    conn.query(query,[value], (err, results) => {
      if (err) {
        return res.json(err);
      }
      return res.json(results); // Return the results from the query
    });
});
//dashkboard database show
app.get('/admin/DashboardData', (req, res) => {
    // Simulated data, in real use case fetch from DB
    const dashboardData = {
      totalProfit: 150000,
      totalUsers: 2000,
      totalGrowth: '65%',
      newBookings: 19,
      topClients: [
        { name: 'Gaurav Kumath', value: 45000 },
        { name: 'Sayam ranka', value: 30000 }
      ]
    };
  
    res.json(dashboardData);
  });

//database show
// app.post('/SignupDetails', (req, res) => {
//     const query = 'SELECT * FROM signup'; 
//     const value =[
//         req.body.username,
//         req.body.email,
//         req.body.password
//     ];
//     conn.query(query,[value],(err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       return  res.json(results);
//     });
//   });
app.get('/Signupdetails', (req, res) => {
    const query = 'SELECT * FROM signup'; // No need for values here
    const value = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    conn.query(query,[value], (err, results) => {
      if (err) {
        return res.json(err);
      }
      return res.json(results); // Return the results from the query
    });
});


//Login datastorage
app.post('/Login',(req,res)=>{
    const sql = "SELECT * from signup WHERE `email` = ? AND `password` = ?";
    conn.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("error!")
        }
        if(data.length > 0)
{
    return res.json("success!!")
}
else{
    return res.json("Error")
}
    })
})

//bookingdeatils storagge area

// app.post('/Booking', (req, res) => {
//     const { firstname, lastname, email, phone, checkin, checkout } = req.body;
  
//     const query = 'INSERT INTO bookingdetails (firstname, lastname, email, phone, checkin, checkout) VALUES (?, ?, ?, ?, ?, ?)';
//     conn.query(query, [firstname, lastname, email, phone, checkin, checkout], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.status(200).json({ message: 'Booking details saved successfully.' });
//     });
//   });

app.post('/Booking',(req,res)=>{
    const insertquery = "insert into bookdetails(`firstname`,`lastname`,`email`,`phone`,`checkin`,`checkout`) values(?)";
    const value = [
        req.body.firstname,
        req.body.lastname,
        req.body.email, 
        req.body.phone,
        req.body.checkin,
        req.body.checkout
    ];
conn.query(insertquery,[value],(err,result)=>{
    if(err){
        console.log('Error!');
        return res.json(err)
        
    }
    return res.json(result)
})
})

app.get('/Details', (req, res) => {
    const query = 'SELECT * FROM  bookdetails'; // No need for values here
    const value = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phone,
        req.body.checkin,
        req.body.checkout
    ];
    conn.query(query,[value], (err, results) => {
      if (err) {
        return res.json(err);
      }
      return res.json(results); // Return the results from the query
    });
});

const port = 8081;
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
    
})