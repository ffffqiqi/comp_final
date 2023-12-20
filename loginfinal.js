const http = require("http");
const fs = require("fs");
const path = require("path");

// 创建一个服务器
const server = http.createServer((request, response) => {
    let { pathname } = new URL(request.url, 'http://127.0.0.1');

    if (pathname === '/') {
        let html = fs.readFileSync(path.join(__dirname, 'register.html'));
        response.setHeader("Content-Type", "text/html");
        response.end(html);
    } else if (pathname === '/css/register.css') {
        let css = fs.readFileSync(path.join(__dirname, 'css/register.css'));
        response.setHeader("Content-Type", "text/css");
        response.end(css);
    } else if (pathname.startsWith('/compfinal/')) {
        let imagePath = path.join(__dirname, '..', pathname);
        let image = fs.readFileSync(imagePath);
        let imageExtension = path.extname(pathname).substring(1);
        response.setHeader("Content-Type", `image/${imageExtension}`);
        response.end(image);
    }
});

// 监听 3000 端口
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});