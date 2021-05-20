# NuxtBoard - English
  This is a message board based on nuxt.js, Node.js (Express) and MySQL. We also use Element-UI. At present, we have completed the login, registration and message (not including reply function, everyone is welcome to make and submit). 
  If you have any questions about the project, please submit issues or go to QQ group: 1097759683 to ask questions. 
  Welcome to Bilibili: Nan Xiao Nun
  
# How to run?
  It is highly recommended to use NPM instead of CNPM!
  It is highly recommended to use NPM instead of CNPM!
  It is highly recommended to use NPM instead of CNPM!
  First you need to make sure that Node.js is native and that the version is greater than v14 (running). If you want to make changes to the code then your computer should also have a VUE2 environment, because NUXT is based on VUE2, as of now (2021.05.20).
The first step is to prepare the database. It is recommended to use a remote database or PHPStudy to simulate the database environment with a minimum of 5.7.28 and a minimum of 8.0. Restore the board. SQL in the root directory to the database
  The second step is to run the background, the corresponding folder is API. Enter the terminal in this directory and use NPM I to download the dependency. If you fail to download the dependency, you can also unzip the node_modules.zip in the directory to use, and then enter NPM start to run the background.
  The third step is to run the foreground, and the corresponding folder is Board. If you fail to download the dependency, you can also unzip it from the directory node_modules.zip to use, and then enter NPM run dev to run the foreground.

# Why doesn't it work when I run the browser?
  The browser doesn't work, the TAB just keeps spinning so 99% of the time it's not connected to the database.
  The first check database version, whether lower than 5.7.28 or higher than 8.0;
  The second check the user name, password and database name is correct, whether in API /config/msg.config.js change;
  Third check whether the firewall release 3306 port;



# NuxtBoard - 中文简体
  这是一个基于Nuxt.js、Node.js（Express）以及MySQL写的留言板。同时也用到了Element-UI。目前已完成了登录、注册、留言（不包含回复功能，欢迎大家制作提交）。
  如果对项目有任何问题欢迎提交issues或者前往QQ群：1097759683提问。
  欢迎关注Bilibili：南小濡

# 如何运行这个项目？
  强烈推荐使用NPM而非CNPM！
  强烈推荐使用NPM而非CNPM！
  强烈推荐使用NPM而非CNPM！
  首先你需要确保本机装有Node.js且版本大于v14（运行）。如果你想要对代码进行修改那么你的电脑还应该有Vue2的环境，因为Nuxt是基于Vue2开发的，目前为止（2021.05.20）。
  第一步是准备数据库。推荐使用远程数据库或phpstudy模拟数据库环境，要求不低于5.7.28，不高于8.0。将根目录下的board.sql还原到数据库即可；
  第二步是运行后台，对应的文件夹为api。该目录下进入终端，使用npm i下载依赖，如果你下载依赖失败也可以将目录下的node_modules.zip解压出来使用，然后终端输入npm start运行后台；
  第三步运行前台，对应文件夹为board。该目录下进入终端，使用npm i下载依赖，如果你下载依赖失败也可以将目录下的node_modules.zip解压出来使用，然后终端输入npm run dev运行前台。
  
# 为什么项目在浏览器没有效果？
  浏览器没有效果，标签页一直在转圈那么99%是因为没有连接到数据库。
  第一检查数据库版本，是否低于5.7.28或高于8.0；
  第二检查用户名、密码以及数据库名称是否正确，是否在api/config/msg.config.js里修改；
  第三检查防火墙是否放行3306端口；
