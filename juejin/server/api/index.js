import PostModule from './posts.js';
import SigninModule from './signin.js';
import SignoutModule from './signout.js';
import SignupModule from './signup.js';

export function startRouter(app) {
        app.get('/', function(req, res) {
            res.redirect('/posts');
        });
        app.use('/api/posts', PostModule);
        app.use('/api/login', SigninModule);
        app.use('/api/signup', SignupModule);
        app.use('/api/signout', SignoutModule);
    }