const express=require('express');
require('dotenv').config();
const authRoutes=require("./routes/auth");
const cors=require("cors")

const app=express();
require('./database/index');

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())

const PORT= process.env.PORT ||3007

app.use("/auth",authRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
