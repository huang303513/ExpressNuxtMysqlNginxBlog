## 项目说明

项目使用Express+mysql+nuxt+nginx写的一个项目。nuxt用于实现服务端渲染。nginx做代理服务器对静态资源代理</br>
项目环境是node的8.5。</br>
现在实现了常用的登陆、注册、列表、详情、评论、添加文章等功能。</br>
详情页使用markdown语法，使用ejs模板来渲染。</br>
项目线上部署地址: www.huangchengdu.com 。还原访问。
项目地址：https://github.com/huang303513/ExpressNuxtMysqlNginxBlog.git 。
这个项目是我玩node一年以来的结晶。O(∩_∩)O~。


## 项目运行

````javascript
//部署
npm install
npm run build
npm run start
//开发
npm run dev
````

最后需要把.nuxt/dist/(build以后生成的)目录下面的所有文件和static目录下的所有文件都放到代理服务器的静态资源根目录。这样才能完整的使用样式表，如果不使用代理服务器就不用了。


## 关于nuxt

nuxt是vue官方的服务端渲染框架。犹豫还是比较新颖的东西，坑比较多，我做的过程中也是踩坑不段。</br>
本来还有一些功能想添加进去，精力有限暂且搞一个段落。</br>

## 演示

![](https://github.com/huang303513/ExpressNuxtMysqlNginxBlog/master/gif/19.gif)




