### Vue 3 + Vite
网站由vite+Vue3构建，Web端和移动端自适应，采用nginx部署前端，docker部署后端的方式在ubuntu服务器上搭建，接口由SpringBoot编写，部分为nginx转发。管理员角色可注册用户，用户默认角色为访客，部分操作隐藏或受限。登录信息分别存储于浏览器cookie和Vuex中，cookie用于两小时内自动登录，Vuex则可以根据用户角色的不同显示不同页面。密码采用md5加盐加密。
### 使用方法
yarn install、yarn dev
### 1.首页
首页折叠句子分为上下不同语言的两行，存储于数据库中，每次刷新自动随机返回8条，点击添加按钮可添加句子，其中外文可通过翻译功能自动翻译为多国语言，或者也可以通过手动输入。点击添加日程可选择日期，记录日程和进度，有日程的日期下会有横线显示，不同进度的日程颜色不一。未登录只能创建公共访客事件，登录之后才可创建账号的单独日程。点击两个事件可交换顺序，但只可交换当天事件。点击隐藏按钮可隐藏操作按钮，再次点击此位置可重新显示。
![image](https://user-images.githubusercontent.com/66810804/196639157-a67d19d7-ec53-4a92-be56-9d814d6410fd.png)
![image](https://user-images.githubusercontent.com/66810804/196639331-674b492d-e055-4061-82bc-6ef513ab01cc.png)
### 2.博客
博客可根据不同分类显示对应博文摘要，支持模糊搜索并高亮，点击可跳转至CSDN查看详情。
![image](https://user-images.githubusercontent.com/66810804/196637724-db002bc9-4f40-4f61-a8d7-243c668d5e33.png)
### 3.动画
动画采用纯css编写，通过大量span标签和伪元素实现各种物体，如太阳、云朵、风、树、风车的塑造。
![image](https://user-images.githubusercontent.com/66810804/196637725-79b9e0e4-0a3b-4bc7-926d-37025b0484da.png)
### 4.句子
句子的接口为开源接口转发而来，点击句子可复制到剪切板，点击添加可跳转到首页添加此句子。
![image](https://user-images.githubusercontent.com/66810804/196637741-bdd266a9-8bb0-4b24-891a-c75bd2850fa0.png)
### 5.图标
图标中心支持图标的增删改查和组件代码复制，图标采用后端接口调用图标，数据库存储图标，前端图标组件化复用等方式，统一管理，极大提升了开发与维护效率，节约时间成本，为图标的使用提供了新的解题思路。网站图标均从数据库调用。
![image](https://user-images.githubusercontent.com/66810804/196637767-a7feec03-f3c1-47ca-8a76-30ebbad549c2.png)
### 6.关于
关于页显示所有访客浏览记录，同一设备同一浏览器10分钟之内仅记录一次,并根据时间段和设备类型作出图表统计。
![image](https://user-images.githubusercontent.com/66810804/196637783-f058d464-8a31-46b8-a891-dbf9dcb30eec.png)


