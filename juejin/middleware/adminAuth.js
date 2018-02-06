

export default function ({ isClient, isServer, route, req, res, redirect }) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powered-By', ' 3.2.1');
    //在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
    console.log("============呵呵----",req.session,"====时间=====",new Date());
}