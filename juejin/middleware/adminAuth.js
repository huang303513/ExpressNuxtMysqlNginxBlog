

export default function ({ isClient, isServer, route, req, res, redirect }) {
    //在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
    console.log("============呵呵----",req.session,"====时间=====",new Date());
    // console.log("======到了======",req.fields,req.params,req.body,req.query,req.cookies,req.headers,req.files);
    // console.log("==========呵呵=================",isClient,isServer,redirect,route,req,res);
    //在客户端判读是否需要登陆
    
}