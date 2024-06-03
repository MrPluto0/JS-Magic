# 知识记录

## CSS

**瀑布流**

- `Multi-column`多栏布局
  - `column-count`
  - `column-width`
  - `column-gap`
- `grid`布局，动态计算高度
  - `grid-row-start`
  - `grid-row-end`
- `flex` 布局

**视差滚动**

- 不同图层以不同速度移动

**块级格式化上下文 BFC**

- 提供一个完全独立的布局环境
- 触发条件
  - `overflow: hidden`
  - `float: left,/right `
  - `position: fixed/absolute`
  - `display:table-cell/flex/inline-block/../`
- 应用场景
  - 高度塌陷 `.clearfix::after`
  - 边距重叠 `.clearfix::before`
- `clearfix`
  - `clear: both` 清除浮动
  - `display: table ` 不占位

**层叠上下文 Stacking Context**

- 触发条件
  - 除`static`外的定位
- `z-index`调整同一个层叠上下文中元素顺序

**图层 Layer**

- 分离高低频计算，CPU和GPU渲染
- 触发条件
  - `transform` 3D图形
  - `position: fixed` 脱离文档流
  - `z-index` 为负数
  - 元素重叠
  - `will-change` 为某些值的时候

**相对百分比**

- `padding` 百分比相对于包含块的宽度
- `background-position` 百分比相对于本身的宽高

## JavaScript

**Symbol**

- **类型判断**

- `typeof`
  
  - 判断基本数据类型

- `instanceof`
  
  - 匹配父类型

- `constructor`
  
  - 匹配当前类型

- 对象自定义判断方案
  
  - `Array.isArray()`

- `toString` 最优方案
  
  - `get [Symbol.toStringTag]() {}` 自定义类型的`toString()`

**实现`JS`的常用模块**

- `Promise`
- `Async` `Generator`
- `Inherit` 六种类型
- `Throttle` `Debounce`
- `Trigger` 

**垃圾回收机制**

- 标记清除算法（标记整理算法）
- 引用计数算法
- 弱引用
  - `WeakSet`
  - `WeakMap`

**`JS`执行机制**

- 宏任务 macrotask
- 微任务 microtask
- 宏任务 -> 微任务 -> GUI渲染

**代理Proxy**

- 拦截对象操作
  - `get`
  - `set` 完成数据双向绑定 
  - `has` 对应`in`操作符
- `Reflect` 简化`Proxy`
- 撤销`Proxy`: `{proxy, revoke} = Proxy.revocable(target, handler)`

## Http

**从`URL`输入到返回请求的过程**

1. `URL`解析
   
   - 概念`URL` `URN` `URI`
   - 编码`utf-8`，扩展`ascii` `unicode` `gb2313` `gbk`
   - 编码规则…

2. `DNS`域名解析
   
   - 递归，迭代查询
   - 过程`browser cache` `hosts` `local cache` `dns server` `root dns server`
   - `DNS`优化：`DNS`缓存  `DNS`负载均衡

3. 发起`TCP`连接
   
   - 三次握手，原因
   
   - 四次分手，原因
   
   - 数据传输过程
     
     - `OSI` 模型

4. 发送`http`请求
   
   - `post` 和 `get` 
   - 状态码
   - 各种字段
     - 缓存`cache`

5. 解析渲染
   
   - `HTML`解析为`DOM Tree`
   - `CSS`解析为`Rule DOM`（规则树）
   - `JS`加载，操作`DOM`和`Rule DOM`
   - 通过`DOM Tree`和`Rule Dom`构造`Rendering Tree`
   - 布局`layout`（回流  `reflow`）和重绘`repaint`
     - 优化策略：`JS`优化，`CSS`优化

**`Http`报头字段**

- `Accept`系列字段
  
  - 数据格式`Content-Type` `Accept` 
  - 压缩方式`Content-Encoding` `Accept-Encoding`
  - 支持语言`Content-Language` `Accept-Language`
  - 字符集`Content-Type` `Accept-Charset`

- 传输数据长度（服务端）
  
  - 定长 `Content-Length`
  - 不定长 `Tranfer-Encoding`（长连接）

- 大文件断点续传
  
  - 客户端 `Range:bytes=x-x,y-y` 
  - 服务端 `Accept-Ranges:bytes`

- 表单提交
  
  - `application/x-www-form-urlencoded` 将对象进行URL编码
  - `multipart/form-data` 每一个表单元素都是独立的资源表述

- `HTTP` 队头阻塞
  
  - 并发连接，一个域名分配多个长连接
  - 域名分片，多个域名指向同一个服务器

- `Cookie`
  
  - 请求 `Cookie: xxx`  / 响应`Set-Cookie: xxx`
  - 生命周期：`Expires` `Max-Age`
  - 作用域：`Domain` `Path`

- `Http`代理
  
  - `Via` 记录代理服务器的身份
  - `X-Forwarded-For` 记录请求方的IP
  - `X-Real-IP` 记录最初客户端的IP

- **缓存**（流程）
  
  - 强缓存字段 `expires` `Cache-Control:max-age=`
    - `memory cache` `disk cache`
  - 协商缓存字段 `Etag` `If-None-Match`  /  `Last-Modified` `If-Modified-Since`
  - *代理缓存*
    - `Cache-Control: private/public` 是否使用代理服务器
    - `proxy-revalidate` 代理服务器资源过期后去服务器获取
    - `Cache-Control: s-maxage` 缓存在代理服务器存放时间

**跨域问题**

- 同源策略

- 解决：
  
  - `CORS` 跨域资源共享
    
    - `Origin` 和 `Access-Control-Allow-Origin: *`
  
  - `JSONP` 借助`script`标签发出`GET`
  
  - `Nginx` 反向代理，`Vue Proxy`

**Http发展**

- `Http1.0`
  
  - 支持多类型文件，引入请求头和响应头
  - 仅能保持短暂连接，连接无法重用
  - 存在队头阻塞问题

- `Http1.1`
  
  - 带流水线的持久连接
    - `Connection:keep-alive/close` 
  - 管道化，缓解队头阻塞，会引起服务端队头阻塞
  - `Host`头的处理
  - 缓存的处理（优化）

- `Http2.0`
  
  - 基于`SPDY ` 协议
  - 头部压缩：
    - *`HPACK`算法* 建立哈希表
    - 对数字和字符进行哈夫曼编码
  - 二进制分帧
    - 报文转化二进制01串传输
    - 分解`Header`帧，`Data`帧
    - 不同流间乱序传输（解决队头阻塞）
  - 多路复用（流）
    - 二进制帧为可双向传输的序列，即为**流**
    - 额外：二进制帧结构，流的特性
  - 服务器推送
    - 服务器主动向客户端发送内容
  - 请求优先级
    - 优化传输顺序提高性能

- `Https` = `Http` + `SSL/TLS`
  
  - 解决安全问题

**WebSocket**

**CDN**

- 内容分发网络
  
  - 中心节点
  - 边缘节点

- 相关技术
  
  - 内容分发
  - 内容存储
  - 内容路由
  - 内容管理

**TCP和UDP**

## Browser

**浏览器渲染进程**

- `GUI`渲染线程
  - 功能即上述的解析渲染
- `JS`引擎线程（JS内核）
  - `V8引擎`
  - 解析执行`JS`脚本
  - 与`GUI`渲染线程互斥，导致渲染时间长
- 事件触发线程
  - 控制事件循环
- 定时器触发线程
  - 定时结束，回调函数进入事件触发线程
- 异步`Http`请求线程
  - `XMLHttpRequest`
  - 异步请求获取响应后，回调函数进入事件触发线程
