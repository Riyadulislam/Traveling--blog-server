const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;
require('dotenv').config();
const app=express();


app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1pxon9n.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const blogCollection=client.db('travelingBlog').collection('blogoptions')
        app.get('/blogOptions',async(req,res)=>{
            const query={}
            const blogOptions=await blogCollection.find(query).toArray();
            res.send(blogOptions);
        })
        app.post('/addblog',async(req,res)=>{
            const blog=req.body;
           
            const result=await blogCollection.insertOne(blog)
            res.send(result)
        })
    }
    finally{

    }
}run().catch(console.dir);
app.get('/',async(req,res)=>{
    res.send('traveling blog is running')
})
app.listen(port,()=>{
    console.log(`traveling blog is running ${port}`)
})