import request from '@/utils/request'

export function TestRequest(query) {
  return request({
    url: query.url,
    method: query.RType,
    // headers: query.headers,
    params: { ...query.data }
  })
}

export function postmanList() {
  return request({
    url: '/auto-test/post-history/tree',
    method: 'get'
  })
}

export function createpostman(data) {
  return request({
    url: '/auto-test/post-history/tree',
    method: 'post',
    data
  })
}

export function updatepostman(data) {
  return request({
    url: '/auto-test/post-history/tree',
    method: 'put',
    data
  })
}

export function deletepostman(data) {
  return request({
    url: '/auto-test/post-history/tree',
    method: 'delete',
    params: { ...data }
  })
}
