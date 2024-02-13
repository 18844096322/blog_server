// src/server/controller.js 控制器

const fs = require('fs'); // 引入 node 的 文件操作模块 fs
const router = require('koa-router')(); // 引入 koa-router

/**
 * 添加 GET/POST 请求
 * @param urlMapping 请求
 */
function handleUrl(urlMapping) {
    Object.entries(urlMapping).forEach(([url, handler]) => {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            router.get(path, handler);
            return;
        }
        if (url.startsWith('POST')) {
            let path = url.substring(5);
            console.log(`path: ${path}`);
            router.post(path, handler);
            return;
        }
        console.log(`invalid URL: ${url}`);
    })
}

/**
 * 读取所有 API 处理方法
 */
function addController (dir) {
    const files = fs.readdirSync(__dirname + dir);
    const jsFiles = files.filter(fileName => {
        return fileName.endsWith('.js');
    })

    for (let file of jsFiles) {
        console.log(`Process controller: ${file}...`);
        let mapping = require(__dirname + dir + file);
        handleUrl(mapping);
    }
}

module.exports = function (dir) {
    const controllerDir = dir || '/api/'; // 这里可以配置默认文件夹
    addController(controllerDir);
    return router.routes();
}
