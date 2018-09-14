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
    // 请自己尝试，将cb(data)注释掉之后回调是否跑得通？
    cb(data)
  })
}