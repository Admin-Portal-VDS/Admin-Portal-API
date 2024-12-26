import express from 'express';
const app = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Admin Portal API\n');
})

app.listen(port,()=>{
    return console.log(`Sever is listening at http://localhost:${port}`);
})
