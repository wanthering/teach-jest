> facebook三大项目：yarn jest metro，有横扫宇宙之势。 这个项目的宗旨为：减少测试一个项目所花费的时间成本和认知成本。 ——其实，它在让你当一个好老师。

> jest文档还在初期，非常简陋，老实说一般人都会看得想死，所以才有了这篇文章。 jest是vue和vue-cli技术栈的重要一环，也是当前最值得掌握的测试框架，对此你需要达到很熟悉的程度。

教育和测试，是相通的。

你可以野路子自学，但掌握系统化、体系化的知识，终归离不开一个好老师。

测试可以不写，但当你面对大型复杂的项目之时，没有测试框架寸步难行。

现在，你可以跟我一步一步学会jest，你将懂得：为什么jest是优雅、简洁而符合人性的，并且终将成为测试界的唯一的、最佳的解决方案。

## 第一课：乘法的初步认识

想象一下，当你走上讲台，五十多个孩子静静地看着你。红扑扑的脸蛋，大大的眼睛。

![image](http://img.hb.aicdn.com/1714cca480f9e56df70df1f1c4b0ba2d3c3b31081c611f-r96W4a_fw658)

接下来，你将课本上知识教给他们了一遍，

函数运行过程，就相当于你的教学过程。

请同学们跟我一起敲下代码：


(请在项目下创建一个文件：`lesson1.js`)

**lesson1.js**
```
/**
 * 加法，即是将多个数值逐个累加
 */
exports.sum = (...args) => {
  let res = 0
  for (let i of args) {
    res += i
  }
  return res
}

/**
 * 乘法，即是将b个重复的数值a，进行累加
 */
exports.times = (a, b) => {
  let resArr = (new Array(b)).fill(a)
  return exports.sum(...resArr)
}

```
> 以上文件涉及es6和nodejs模块化的基础知识，初看可能并不好理解，但相信我，你敲完以下的测试代码，就会理解它的含义——就像教会一个学生一样。

就像你js工程师面临的永恒难题一样——真的能跑通吗？

当老师的你，内心也无比惶恐，第一次教这些，他们真的能懂吗？

这时需要用上jest进行测试，使用npm安装：
```
npm i jest -S
```

**一个合格的老师，会做这几个步骤：**
1. 提问： 清晰地注明问题.
2. 叫人回答： 给予一个函数体，运行测试。
3. 期待答案： expect()
4. 校验答案： toBe()、toEqual()

创建一个`lesson1.test.js`

**lesson1.test.js**
```
const {sum, times} = require('./lesson1')

test('同学，请问这个累加的结果是什么？',()=>{
  expect(sum(2+2+2+2+2+2)).toBe(12)
})

test('同学，请问这个乘法的结果是什么？',()=>{
  expect(times(2,6)).toBe(12)
})

test('那么，两个数值的结果是否相等呢？',()=>{
  expect(times(2,6)).toEqual(sum(2+2+2+2+2+2))
})
```

#### 运行测试方法1：
这时需要运行jest命令，你可以全局安装jest:
```
npm i jest -g
```
然后

```
jest lesson1.test.js
```
#### 运行测试方法2：
也可以在`package json的test字段下写入`
```
  ...
  "scripts": {
    "test": "jest"
  },
  ...
```
然后命令行输入
```
npm test
```
#### 运行测试方法3：
如果你使用的webstorm等IDE的话，文档中直接显示绿色小键头，点击就是了。

#### 测试结果：
接下来，会看到一路pass，证明lesson1.js文件无误。


我们读书这么多年，深知好老师和坏老师的区别：

上课照本宣科，就像直接写下满纸js代码一样，这是赖皮狗老师的专长。

但一个优秀的老师，他会：
- 步步为营： 分解成很多个子测试，把知词点逐个击破。
- 版书清晰： 标明需要测试什么，让知识易学易记。
- 课堂互动： 回调函数中运行测试，调动孩子们的课堂积极性。
- 题型丰富： 通过匹配器，即toBe、toEqual等校验不同格式数据。

如果你不是很熟悉jest框架提供的各类匹配器，这里有一份小抄送给你：[jest-cheat-sheet](https://github.com/sapegin/jest-cheat-sheet)

你看，jest所做的，没有一丝多余步骤，也没少一个必要步骤，这正是我们这些年遇到的好老师的共有特征，也正是jest测试的极致之处。

## 第二课：异步测试获取数据

jest在异步过程中也非常方便！

我们先使用`json-server`建立服务器，再使用`axios`获取数据。

这两个npm包使用非常广泛，熟悉的axios封装的可以直接拷贝`server.js`和`request.js`代码。

下载:
```
npm i json-server axios -S
```

创建server.js文件

**server.js**
```
const jsonServer = require('json-server')

const defaultData = () => ({
  'lesson': [
    { 'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang' },
    { 'id': 2, 'title': 'how to multiply', 'teacher': 'Mr Liu' },
    { 'id': 3, 'title': 'how to subtract', 'teacher': 'Ms Han' }
  ],
  'homework': [
    { 'id': 1, 'works': ['add','multiply'], 'student': 'Jim Green' },
    { 'id': 2, 'title': ['add','subtract'], 'student': 'lily' },
    { 'id': 3, 'title': ['add','subtract'], 'student': 'lucy' },
    { 'id': 4, 'title': ['add','subtract','multiply'], 'student': 'Han Mei Mei' },
    { 'id': 5, 'title': ['subtract','multiply'], 'student': 'Li Lei' }
  ],
  'exam': { 'name': 'primary school final exam' }
})

const createJSONServer = (data = defaultData()) =>{
  const server = jsonServer.create()
  const router = jsonServer.router(data)
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)
  return server
}

createJSONServer().listen(3000)
console.log('3000端口已联通')
```

创建request.js文件

**request.js**
```
const axios = require( 'axios' )

class HttpRequest {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl
  }

  /**
   * 返回默认配置
   */
  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {}
    }
  }

  /**
   * 响应栏截，返回指定格式信息
   */
  interceptors(instance) {
    instance.interceptors.response.use(res => {
      const {data} = res
      return data
    }, error => {
      return Promise.reject(error)
    })
  }

  /**
   * 处理网络请求
   */
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}


/**
 * 导出request模块
 */
exports.requestPromise =  (port,method='get')=>{
  const Http = new HttpRequest('http://localhost:3000')
  return Http.request({
    url: port,
    method
  })
}

exports.requestCallback = (cb,port,method='get')=>{
  const Http = new HttpRequest('http://localhost:3000')
  Http.request({
    url: port,
    method
  }).then(data=>{

    // ▽请注释掉下面一行，再试一试回调能否跑通？
    cb(data)
  })
}
```

使用`node server`跑起服务，我们就可以开始测试异步回调了。


### 老师的困扰： 坏学生“异步回调函数”

班上来了一个坏学生，上课从不好好听课，偏偏人缘又特别好。

这时，你提问让坏学生回答，他只是安静地站起来，什么都不做，然后过了一会对你说：“老师，这道题我回答过了啊！”

同时，全班同学都点头“嗯嗯他回答过了”。

这时候，你，该怎么办？ 有没有感受到深深的绝望？

看一看以下的例子。创建lesson2.test.js，并写入

**lesson2.test.js**
```
const {requestPromise, requestCallback} = require('./request')

test('异步callback方式检测', () => {
  // 下面进行了抛出了两次断言，在断言之前可以
  function callback (data){
    expect(data).toStrictEqual({'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang'})
  }

  requestCallback(callback,'lesson/1')
})
```
跑通了，似乎一切正常。。。

但当我们回到`request.js`注释掉`cb(data)`时，我们知道回调函数并不返回数据，测试理应不通过。然而。。

还是跑通了！

这是因为requestCallback根本就没有进入函数体，而测试函数，只要不报错，都算通过。

异步回调，就是这样一个坏透了的学生，经常装作回答过了蒙混过关。

### 异步回调的正确测试方法：

作为老师，弄死坏学生的方法可能你自己想到了：

“上黑板写，写完告诉我！”

你可以提供一个在测试函数内提供一个done，done必须要调用后，才能算做测试通过。


**lesson2.test.js**
```
test('异步callback方式检测', done => {
  // 下面进行了抛出了两次断言，在断言之前可以
  function callback (data){
    expect(data).toStrictEqual({'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang'})
    done()
  }

  requestCallback(callback,'lesson/1')
})
```
这样，就必须要运行了callback才能通过测试了，否则就会超时报错。


除了以上方式以外，你还可以检验函数体内的断言跑了几次
```
test('异步callback方式检测,无done', () => {
  // 下面进行了抛出了两次断言，在断言之前可以
  expect.assertions(1);
  function callback (data){
    expect(data).toStrictEqual({'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang'})
  }

  requestCallback(callback,'lesson/1')
})
```

`expect.assertions(1)`表示， 断言语句`expect(xxx).toXXX(xxx)`必须跑通一次，将要检验多个“坏学生”异步回调的时候，这招犹其有效。

### 平庸学生：异步Promise

有坏学生，自然有好学和平庸学生，promise就是一名“平庸的学生”

**lesson2.test.js**
```
test('异步Promise方式检测', () => {
  expect.assertions(1);
  return requestPromise('exam').then(data => {
    expect(data).toStrictEqual({'name': 'primary school final exam'})
  })
})
```
检验异步Promise时，必须要用`return`返回，否则它就像“坏学生”一样，直接蒙混过关溜走了。

你还可以使用使用.resolve/.reject形式

**lesson2.test.js**
```
test('异步Promise方式被成功resolve', () => {
  expect.assertions(1);
  return expect(requestPromise('exam')).resolves.toStrictEqual({'name': 'primary school final exam'})
});
```
如果需要检验Promise被reject:
```
test('异步Promise方式被reject', () => {
  expect.assertions(1);
  return expect(requestPromise('exam')).rejects.toMatch('error')
});
```

### 三好学生：async/await异步

上课从不迟到、校服永远一尘不染、作业按时永远上交、上课认真做笔记、回答问题天衣无缝、别人不听课她还会打！小！报！告！

这就是我们的async/await，我们应该多一些这样的三好学生。

**lesson2.test.js**
```
test('异步async/await方式检测', async () => {
// 下面进行了抛出了两次断言，在断言之前可以
expect.assertions(2)

const lesson1 = await requestPromise('lesson/1')
const homework3 = await requestPromise('homework/3')

expect(lesson1).toStrictEqual({'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang'})
expect(homework3).toMatchObject({'student': 'lucy'})
})
```
**优雅，舒适、简洁、大方，无需多言，async/await值得你拥有。**

虽然我们很多时候还是在和异步回调、异步Promise打交道...


## 第三课：Mock函数，袖口五道杠的风纪委员

**假如不是简单的测试同步返回、测试异步返回，而是需要记录执行过程中的状态呢？**

```
const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
```
假如遇到这样一个循环函数，内部的运行状态就不太可能通过返回值来知晓了。这时，你需要Mock函数。

### Mock函数，随时记录函数运行状态

测试同步返回值、异步返回值，就像是上课，这只是老师的本份。

而学生大部分时间，都是自习、吃饭、宿舍，老师想管到这一部分，就需要派出让人闻风丧脸的存在——五道杠·无间道·小报告之王·风纪委员。

她平时混迹在普通学生之中，或者说，她就是一名再普通不过的学生。但，当她遇到老师——即在test()测试体内——一点儿陈芝麻烂谷的破事，都会被抖露出来。


**lesson3.test.js**
```
//通过jest.fn()创建Mock Function
const mockCallback = jest.fn(x => 42 + x);
//将mockCallback代入forEach运行一次，即可记录下所有的值
forEach([0, 1], mockCallback);

test('记录mockCallback函数运行过程',()=>{
  // mockCallback上报函数运行了两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // mockCallback上报函数第一次运行的输入为0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // mockCallback上报函数第二次运行的输入为1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
  // mockCallback上报函数第一次运行的结果为42
  expect(mockCallback.mock.results[0].value).toBe(42);
})

```

## 结语
提起教师，随处可见的朋友圈、公众号、贺卡
短信里面，尽是鸡汤般的口号：“人类灵魂工程师”、“燃烧自己，照亮他人”“无私”“奉献”“爱心”。

但，教师的本职——最高效率地辅助学生构建的完整知识体系。 专业性的观点却被选择性忽视。

软件开发也是，人人在谈测试驱动，人人都在强调测试的重要性，测试似乎成了一个形而上学的感性概念。

但时间和人力成本上、框架的专业性、框架的掌握成本的诸多限制，使大多数项目测试相当于无。另一方面，少数高度测试覆盖的项目又显得十分笨拙，测试耗费的精力居然比coding还长...

幸之，得益于jest测试框架的产生，一个极致简洁
功能强大、语义清晰的测试终于呈现在我们面前。让开发与测试相辅相成，而非时间加倍。

而最新的vue技术栈正在全面采用jest测试框架。

从此，testing之对于coding，如同孤独的钢琴曲中，缓缓传来小提琴的和弦，顿时锦瑟和鸣，心灵震颤无以复加。

![image](http://img.hb.aicdn.com/ff15e9d9eecf0be7c24bbcfbffb3cfc54afe4b0e55f50-vqcDwy_fw658)

> 前面我已经介绍了[AST抽象语法树，点击链接地址](https://segmentfault.com/a/1190000016231512)，下一期，将结合AST带来测试驱动开发实战，这，将是读懂vue-cli3、并掌握vue全方位技术栈的第一步。



### vue-cli3技术栈补全预告：
- [x] [AST抽象语法树： 童年的玩具](https://segmentfault.com/a/1190000016231512)
- [x] jest测试框架：  行为人师，学为世范
- jest测试驱动开发实战： js配置文件的更新
- yaml配置文件： 至爱之信
- config文件导入全配置： 万能钥匙
- vue-share-utils：实用小工具
- Generator: vue-cli3核心引擎，机械之心
- jest+Generator： 测试驱动vue-cli3引擎

