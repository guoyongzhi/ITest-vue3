import request from '@/utils/request'

export function caseAll() {
  return request({
    url: '/iTest/case/all',
    method: 'get',
    baseURL: 'http://192.168.1.100:8080'
  })
}

export function caseList(query) {
  return request({
    url: '/iTest/case',
    method: 'get',
    baseURL: 'http://192.168.1.100:8080',
    params: { ...query }
  })
}

export function createcase(data) {
  return request({
    url: '/iTest/case',
    method: 'post',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}

export function updatecase(data) {
  return request({
    url: '/iTest/case',
    method: 'put',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}

export function deletecase(data) {
  return request({
    url: '/iTest/case',
    method: 'delete',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}
