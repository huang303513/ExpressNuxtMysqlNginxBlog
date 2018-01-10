import PostModule from './posts.js';
import SigninModule from './signin.js';

export function startRouter(app) {
    
        //实现登陆拦截
       // app.use('/api', jwtAuth)
    
        // app.get('/api', (req, res) => {
        //     res.json({ message: '欢迎使用黄成都的API服务！' });
        // })
        app.get('/', function(req, res) {
            res.redirect('/posts');
        });
    
        // app.use('/api/user', require('./user'))
    
        // app.use('/api/post', require('./post'))
    
        // app.use('/api/tag', require('./tag'))
    
        // app.use('/api/post/tag', require('./postTag'))

        // app.get('/', function(req, res) {
        //     res.redirect('/posts');
        // });
        // app.use('/signup', require('./signup'));
        // app.use('/api/login', function(req,res) {
        //     console.log("======到了======",req.fields,req.params,req.body,req.query,req.cookies,req.headers);
        //     console.log("======到了======",res.fields,res.params,res.body);
        //     console.log("==================");
        //     let name = req.params.name;
        //     let password = req.params.password;
        //     console.log("========用户名和密码====",name,password);
        //     res.send({name:"hehe"});
        // });
        app.use('/api/login', SigninModule);
        app.use('/api/posts', PostModule);

        // 404 page
        // app.use(function(req, res) {
        //     if (!res.headersSent) {
        //         res.status(404).render('404');
        //     }
        // });
    
    }