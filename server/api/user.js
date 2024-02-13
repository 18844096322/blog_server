// src/server/spi/user.js 处理用户相关请求

// 用户列表（因为没有连数据库，先用假数据）
let userList = [
    { username: 'Aubrey', password: '123456' },
    { username: 'Gabriel', password: '654321' },
];

const login = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let user = userList.find(item => item.username === username && item.password === password )
    
    if (user) {
        ctx.response.status = 200
        // 根据用户信息生成一个token
        const cardId = Math.random().toString(36).substring(2, 10)
        // 存到cookie中，有效期为30天
        ctx.cookies.set('SESSIONID', cardId, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        ctx.response.body = { code: 0, message: '登录成功' }
    } else {
        ctx.response.body = { code: -1, error: `用户名 ${username} 不存在，或者密码错误` }
    }
}

/**
 * 处理用户登录成功/失败
 */
const loginSuccess = async (ctx, next) => {
    // ctx.body === ctx.response.body 
    ctx.body = `类型：${ctx.query.type}`
}
const loginFail = async (ctx, next) => {
    ctx.body = `类型：${ctx.query.type}`
}

/**
 * 判断用户登录是否过期
 */
const checkLogin = async (ctx, next) => {
    let sessionId = ctx.cookies.get(SESSION_ID);
    if (!sessionId) {
        // 用户未登录，跳转到登录页面
        ctx.redirect('/login')
    } else {
        await next()
    }
}

module.exports = {
    'POST /api/login': login,
    'GET /api/login/success': loginSuccess,
    'GET /api/login/fail': loginFail
}
