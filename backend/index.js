const express = require('express');
const cors = require('cors');
const app = express();

require('./db/config')
const User = require('./db/user')
app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>{
    try {
        const user = new User(req.body);
        const result = await User.insertMany(user)
        res.send(result) 
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/show',async(req,res)=>{
    try {
        const user = await User.find(req.body)
        res.send(user)
    } catch (error) {
        console.log(error.message)
    }
});


app.delete('/delete/:id', async(req,res)=>{
    // console.log("param",req.params)
    try {
        const user = await User.deleteOne({ _id: req.params.id})
        res.send(user)
    } catch (error) {
        console.log(error.message)
    }
});



app.get('/update/:id',async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id})
        if(user){
            res.send(user)
        }else{
            res.send("sorry")
        }
    } catch (error) {
        console.log(error.message)
    }
})





app.put('/update/:id',async(req,res)=>{
    try {
        const user = await User.updateOne(
            {_id:req.params.id},
            {$set : req.body}
            )
            res.send(user)
    } catch (error) {
        console.log(error.message)
    }
})



app.listen(8080);