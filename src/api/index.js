// 所有http请求
import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const successCode = 10000
const http = axios.create({
  // change in mock mode
  baseURL: 'http://10.95.38.32:5200/mock/5a0d51c073e6fc457433451f/example'
})

// 配置拦截器与错误处理
http.interceptors.response.use(function (response) {
  if (window._.get(response, 'data.code') !== successCode) {
    isDev && console.error(response, `请求返回状态码不为${successCode}`)
    throw new Error('1')
  } else {
    return response.data.data
  }
}, function (error) {
  if (error.response) {
    if (isDev) {
      console.group('请求发生错误')
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      console.groupEnd()
    }
    throw new Error('2')
  } else if (error.request) {
    if (isDev) {
      console.group('请求发生错误')
      console.log(error.request)
      console.groupEnd()
    }
    throw new Error('3')
  } else {
    if (isDev) {
      console.group('请求发生错误')
      console.error('Error', error.message)
      console.groupEnd()
    }
    throw new Error('4')
  }
})

export default http
