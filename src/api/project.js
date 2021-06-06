import request from '@/utils/request'

export function projectAll() {
  return request({
    url: '/iTest/project/all',
    method: 'get',
    baseURL: 'http://192.168.1.100:8080'
  })
}

export function projectList(query) {
  return request({
    url: '/iTest/project',
    method: 'get',
    baseURL: 'http://192.168.1.100:8080',
    params: { ...query }
  })
}

export function createproject(data) {
  return request({
    url: '/iTest/project',
    method: 'post',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}

export function updateproject(data) {
  return request({
    url: '/iTest/project',
    method: 'put',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}

export function deleteproject(data) {
  return request({
    url: '/iTest/project',
    method: 'delete',
    baseURL: 'http://192.168.1.100:8080',
    data
  })
}
