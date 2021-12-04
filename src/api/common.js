import request from '@/utils/request'

export function parameterAll() {
  return request({
    url: '/auto-test/parameter/all',
    method: 'get'
  })
}

export function parameterList(data) {
  return request({
    url: '/auto-test/parameter',
    method: 'get',
    params: { ...data }
  })
}

export function createparameter(data) {
  return request({
    url: '/auto-test/parameter',
    method: 'post',
    data
  })
}

export function updateparameter(data) {
  return request({
    url: '/auto-test/parameter',
    method: 'put',
    data
  })
}

export function deleteparameter(data) {
  return request({
    url: '/auto-test/parameter',
    method: 'delete',
    params: { ...data }
  })
}

export function headerAll() {
  return request({
    url: '/auto-test/headers/all',
    method: 'get'
  })
}

export function headerList(data) {
  return request({
    url: '/auto-test/headers',
    method: 'get',
    params: { ...data }
  })
}

export function createheader(data) {
  return request({
    url: '/auto-test/headers',
    method: 'post',
    data
  })
}

export function updateheader(data) {
  return request({
    url: '/auto-test/headers',
    method: 'put',
    data
  })
}

export function deleteheader(data) {
  return request({
    url: '/auto-test/headers',
    method: 'delete',
    params: { ...data }
  })
}
