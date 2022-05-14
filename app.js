/////// RESTFUL API ////////





const express = require("express");
var users = require("./users");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(express.json());

// app.get("/api/users", (req, res) => {
//   res.json({
//     data: users,
//     message: "ok",
//   });
// });

/////// GET API ////////


app.get("/api/users/:id", (req, res) => {
  const user = users.find((p) => p.id == req.params.id);
  if (user) {
    res.json({
      data: user,
      message: "ok",
    });
  } else {
    res.json({
      data: null,
      message: "Not Find",
    });
  }
});

// app.post('/api/users',(req,res)=>{
//   console.log(req.body);
//   res.send('developing ...')
// })

// app.post('/api/users',(req,res)=>{
//  users.push({id: users.length + 1 , ...req.body})
//  res.json({data: users, message: 'ok'})

// })

/////// POST API ////////


app.post(
  "/api/users",
  [
    body("email", "Email is not Valid").isEmail(),
    body("first_name", "Name can not be Empty").notEmpty(),
    body("last_name", "LastName can not be Empty").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({data: null , errors: errors.array() , message: 'validation faild'})
    }
    users.push({id: users.length + 1 , ...req.body})
    res.json({ data: users, message: "ok" });
  }
);

/////// PUT API ////////

app.put(
  "/api/users/:id",
  [
    body("email", "Email is not Valid").isEmail(),
    body("first_name", "Name can not be Empty").notEmpty(),
    body("last_name", "LastName can not be Empty").notEmpty(),
  ],
  (req, res) => {
    const user = users.find(u => u.id == req.params.id)
    if (!user){
      return res.status(404).json({
        data: null,
        message: 'User Not Found'
      })
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({data: null , errors: errors.array() , message: 'validation faild'})
    }
  
     users = users.map(user =>{
      if(user.id == req.params.id){
        return { ...user , ...req.body}
      }
      return user; 
    })
    res.json({ data: users , message: "ok" });
  }
);

/////// DELETE API ////////
app.delete("/api/users/:id", (req, res) => {

  const user = users.find(u => u.id == req.params.id)
  if (!user){
    return res.status(404).json({
      data: null,
      message: 'User Not Found'
    })
  }
  const index = users.indexOf(user)
  users.splice(index,1)
  res.json({ data: users , message: "ok" });
  })



// app.get('/',(req,res)=>{
// res.send("hello express")
// console.log(req.query)
// });

// app.get('/api/users',(req,res)=>{
//   res.send([
//     {id:1,name:'user1'},
//     {id:2,name:'user3 '},
//   ])
//   });

//   app.get('/api/users/:id',(req,res)=>{
//     res.send([
//       {id:req.params.id,name:`user ${req.params.id}`},
//     ])
//     });

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log("Listening to port 3000");
});
