import express from "express"; // === var express = require('express')

let configViewEngine = (app) => {
    // Cấu hình đến thư mục static của chúng ta => static là cái gì?
    // Sau này khi ta muốn lấy 1 cái ảnh trên server thì bắt buộc phải cho nó biết ảnh trên server chỉ được lấy trong thư mục public => bắt buộc phải cấu hình như này
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); // gõ được logic trong file HTML: if..else, for
    // Tất cả các file views sẽ nằm trong thư mục src/views => không cần trỏ đường dẫn bên trong controller với render
    app.set("views", "./src/views") // set cái đường link mà ta sẽ lấy viewEngine
}

module.exports = configViewEngine;