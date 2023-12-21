const http = require("http");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// 创建一个服务器
const server = http.createServer((request, response) => {
    let { pathname } = new URL(request.url, 'http://127.0.0.1');

    if (pathname === '/') {
        let html = fs.readFileSync(path.join(__dirname, '../compfinal/index.html'));
        response.setHeader("Content-Type", "text/html");
        response.end(html);
    } else if (pathname === '/css/index.css') {
        let css = fs.readFileSync(path.join(__dirname, '../compfinal/css/index.css'));
        response.setHeader("Content-Type", "text/css");
        response.end(css);
    } else if (pathname === '/function.html') {
        let html = fs.readFileSync(path.join(__dirname, '../compfinal/function.html'));
        response.setHeader("Content-Type", "text/html");
        response.end(html);
    } else if (pathname === '/css/base.css') {
        let css = fs.readFileSync(path.join(__dirname, '../compfinal/css/base.css'));
        response.setHeader("Content-Type", "text/css");
        response.end(css);
    } else if (pathname === '/picture.html') {
        let html = fs.readFileSync(path.join(__dirname, '../compfinal/picture.html'));
        response.setHeader("Content-Type", "text/html");
        response.end(html);
    } else if (pathname === '/css/picture.css') {
        let css = fs.readFileSync(path.join(__dirname, '../compfinal/css/picture.css'));
        response.setHeader("Content-Type", "text/css");
        response.end(css);
    } else if (pathname === '/css/function.css') {
        let css = fs.readFileSync(path.join(__dirname, '../compfinal/css/function.css'));
        response.setHeader("Content-Type", "text/css");
        response.end(css);
    } else if (pathname === '/index.html') {
        let html = fs.readFileSync(path.join(__dirname, '../compfinal/index.html'));
        response.setHeader("Content-Type", "text/html");
        response.end(html);
    }
    else if (pathname === '/css/account.css') {
        let css = fs.readFileSync(path.join(__dirname, '../compfinal/css/account.css'));
        response.setHeader("Content-Type", "text/css");
        response.end(css);
    }


    else if (pathname === '/account.html') {
        // response.statusCode = 302; // 重定向状态码
        // response.setHeader("Location", "http://localhost:9000"); // 重定向到9000窗口
        // response.end();

        axios.get("http://127.0.0.1:9000/images").then(
            res => {
                html_rs = res.data
                // console.log(html_rs)
                response.setHeader("Content-Type", "text/html");
                response.end(html_rs);
            });


    } else if (pathname.startsWith('/compfinal/')) {
        let imagePath = path.join(__dirname, '..', pathname);
        let image = fs.readFileSync(imagePath);
        let imageExtension = path.extname(pathname).substring(1);
        response.setHeader("Content-Type", `image/${imageExtension}`);
        response.end(image);
    } else {
        response.statusCode = 404;
        response.end('<h1>404 Not found</h1>');
    }
});

// 监听端口，启动服务
server.listen(7000, () => {
    console.log('服务已经启动...');
});