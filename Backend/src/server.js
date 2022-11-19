import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
// gọi đến hàm config() của thư viện dotenv
require('dotenv').config();

// query param: /user?id=7 => để lấy được id=7 thì ta phải dùng body-parser
let app = express();

// config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

// ConnectDB
connectDB();

// Để chạy được app chúng ta thì dùng app.listen
// Port === undefined (nếu chưa khai trong .env) => port 6969
let port = process.env.PORT || 6969; // Để lấy được tham số trong .env thì dùng process.env. và để không chết ứng dụng thì ta dùng cổng 6969 bằng || 6969
app.listen(port, () => {
    // Callback
    console.log("Backend NodeJS is running on the port: " + port)
})