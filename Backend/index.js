const express = require("express");
const cors = require("cors");
const App = express();
require("dotenv").config();
const registration = require("./routes/routers")
const productsRouters = require("./routes/Product_router");
const {db_connection} = require("./databases/mongoose")

const port = process.env.PORT || 7001 || 7002 || 7003
App.use(express.json());
App.use(cors());
// App.use(cors({
//     origin:"http://mycomweb.s3-website.ap-south-1.amazonaws.com",
//     methods: ['GET', 'POST'],
// }))

App.use("/user",registration);
App.use("/products",productsRouters)
db_connection();
App.listen(port,()=>{console.log(`server is running on port ${port}`)})


