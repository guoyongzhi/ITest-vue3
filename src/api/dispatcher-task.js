import request from '@/utils/request'

export function dispatchAll(data) {
  return request({
    url: '/auto-test/dispatch/get',
    method: 'get',
    params: { ...data }
  })
}

export function dispatchDelete(data) {
  return request({
    url: '/auto-test/dispatch/delete',
    method: 'post',
    params: { ...data }
  })
}

export function dispatchSort(param) {
  return request({
    url: '/auto-test/dispatch/saveSort',
    method: 'post',
    params: { ...param }
  })
}

export function dispatchDeskAll() {
  return request({
    url: '/auto-test/dispatch/desk/all',
    method: 'get'
  })
}
