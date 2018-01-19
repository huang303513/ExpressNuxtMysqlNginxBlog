## 项目说明

1项目使用Express+mysql+nuxt+nginx写的一个项目。nuxt用于实现服务端渲染。nginx做代理服务器对静态资源代理</br>
2项目环境是node的8.5。</br>
3详情页使用markdown语法，使用ejs模板来渲染。兼容移动端和桌面端</br>
4项目线上部署地址: www.huangchengdu.com 。欢迎访问。</br>
5整个项目的配置在config目录下面。可以根据自己的情况修改配置。比如端口号、域名等等。</br>
6这个项目是我玩node一年以来的结晶。O(∩_∩)O~。</br>
7整个项目布局都是less写的，没有使用任何第三方框架。</br>


## 项目运行

````javascript
//部署,具体细节看下面
npm install
npm run build
npm run start
//开发
npm run dev
````

## 关于nginx代理配置

nginx的配置文件如下：</br>

````javascript
user www www;
worker_processes 2;#设置值和CPU核心数一致
error_log /usr/local/webserver/nginx/logs/nginx_error.log crit; #日志位置和日志级别
pid /usr/local/webserver/nginx/nginx.pid;
#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;
events
{
    use epoll;
    worker_connections 65535;
}
http
{
    include mime.types;
    default_type application/octet-stream;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" $http_x_forwarded_for';

    #charset gb2312;

    server_names_hash_bucket_size 128;
    client_header_buffer_size 32k;
    large_client_header_buffers 4 32k;
    client_max_body_size 8m;

    sendfile on;
    tcp_nopush on;
    keepalive_timeout 60;
    tcp_nodelay on;
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript text/css application/xml;
    gzip_vary on;

    #limit_zone crawler $binary_remote_addr 10m;
    upstream sample {  
          server localhost:5389;
	      #server 127.0.0.1:5389;  
          #server 127.0.0.1:3001;  
          keepalive 64;  
    } 
    #下面是server虚拟主机的配置
    server
    {
        listen 80;#监听端口
        server_name www.huangchengdu.com;
	rewrite ^(.*)$  https://$host$1 permanent;  
    }
    server
    {
        listen 443;#监听端口
        server_name www.huangchengdu.com;
	ssl on;
        index index.html index.htm index.php;
        root /usr/local/webserver/nginx/html;#站点目录
        ssl_certificate   cert/214353122570188.pem;
        ssl_certificate_key  cert/214353122570188.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
	location / {  
               proxy_redirect off;  
               proxy_set_header X-Real-IP $remote_addr;  
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
               proxy_set_header Host $http_host;  
               proxy_set_header X-NginX-Proxy true;
               proxy_set_header Connection "";
               proxy_http_version 1.1;    
               proxy_pass http://sample;
        }
        location ~ .*\.(gif|jpg|JPG|jpeg|png|bmp|swf|ico)$
        {
	    root /usr/local/webserver/nginx/static;
            expires 30d;
	    #access_log off;
        }
        location ~ .*\.(js|css)?$
        {
	    root /usr/local/webserver/nginx/static;
            expires 15d;
	    #access_log off;
        }
	location ~ .*\.(html|htm)?$
        {
            root /usr/local/webserver/nginx/static;
            expires 30d;
           # #access_log off;
        }   
        access_log off;
    }

}
````

`npm run build`以后,然后`npm run start`启动服务器。最后需要把`.nuxt/dist/`(build以后生成的)目录下面的所有文件和static(我这里是`/usr/local/webserver/nginx/static`)目录下的所有文件都放到代理服务器的静态资源根目录。</br>
这样才能完整的使用样式表，如果不使用代理服务器就不用了。


## 关于nuxt

nuxt是vue官方的服务端渲染框架。犹豫还是比较新颖的东西，坑比较多，我做的过程中也是踩坑不段。</br>
本来还有一些功能想添加进去，精力有限暂且搞一个段落。</br>

## 演示

![](https://github.com/huang303513/ExpressNuxtMysqlNginxBlog/blob/master/19.gif)




