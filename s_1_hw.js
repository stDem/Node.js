const http = require('http');
const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Главная</h1> <a href="/about">About</a>');
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>About</h1> <a href="/">Главная</a>');

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Error</h1>');
    }
});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


// document.addEventListener("DOMContentLoaded", function() {
//     var num = Number(localStorage.num) || 0;
//     if (sessionStorage.today === "yes") return;
//     sessionStorage.today = "yes";
//     localStorage.num = ++num;
//     if (num % 3 === 0) alert("3");
// });