const express=require('express')
const app=express()
const mysql_connector=require('mysql')
const modifyFunction = require('./modifyFunction')
const port=3001

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const connection = mysql_connector.createConnection({
    host : 'localhost',
    user : 'root',
    password  :'',
    database : 'frejun'
  })
app.listen(port,()=>console.log("err Running"),()=>{
    console.log(`Server is running on ${port}`)
})
connection.connect((err)=>{
if (err) console.log(err)
else console.log("connected to db")
})

app.post("/addblogs",(req,res)=>{
const qr=`insert into Posts(Title,Body,Category) values("${req.body.Title}","${req.body.Body}","${req.body.Category}")`
connection.query(qr,(err,result)=>{
 if(!err) res.status(200).send("successfully added")
 else res.status(400).send("some err occured")
})
})

app.get("/",(req,res)=>{
  res.send("backend")
})

app.get("/paginationposts",(req,res)=>{
 const qr=`select * from Posts limit 1 offset ${req.body.page-1}`
connection.query(qr,(err,result)=>{
  if(!err) res.status(200).send(result)
  else res.status(400).send(err)
})
})

app.get("/getposts",(req,res)=>{
  console.log("working")
  console.log(req.body.id)
  let qr=`select Body from Posts where Id = "${req.body.id}"`
  connection.query(qr,(err,result)=>{
   if(!err){
  let data= modifyFunction(result[0].Body)
  qr= `update posts set body= "${data[1]}" where id= "${req.body.id}"`
  connection.query(qr,(err,result)=>{
    if(!err){
      res.status(200).send(data[0])}else{
        res.status(400).send(err)
    }
  }) 
}else{
      res.status(400).send(err)
    }
  })
})






