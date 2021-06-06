import request from '@/utils/request'

export function moduleAll() {
  return request({
    url: '/iTest/module/all',
    method: 'get',
    baseURL: 'http://192.168.1.100:8080'
  })
}

export function moduleList(query) {
  return request({
    url: '/iTest/module',
    method: 'get',
    baseURL: 'http://192.168.1.100:8080',
    params: { ...query }
  })
}

export function createmodule(data) {
  return request({
    url: '/iTest/module',
    method: 'post',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}

export function updatemodule(data) {
  return request({
    url: '/iTest/module',
    method: 'put',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}

export function deletemodule(data) {
  return request({
    url: '/iTest/module',
    method: 'delete',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}
