import PostModule from './posts.js';

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
        // app.use('/signin', require('./signin'));
        // app.use('/signout', require('./signout'));
        app.use('/api/posts', PostModule);

        // 404 page
        // app.use(function(req, res) {
        //     if (!res.headersSent) {
        //         res.status(404).render('404');
        //     }
        // });
    
    }