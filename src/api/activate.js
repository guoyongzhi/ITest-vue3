import request from '@/utils/request'

export function activateAll() {
  return request({
    url: '/auto-test/activate/all',
    method: 'get'
  })
}

export function activateList(query) {
  return request({
    url: '/auto-test/activate',
    method: 'get',
    params: { ...query }
  })
}

export function createactivate(data) {
  return request({
    url: '/auto-test/activate',
    method: 'post',
    data
  })
}

export function updateactivate(data) {
  return request({
    url: '/auto-test/activate',
    method: 'put',
    data
  })
}

export function deleteactivate(data) {
  return request({
    url: '/auto-test/activate',
    method: 'delete',
    params: { ...data }
  })
}

export function doJob(data) {
  return request({
    url: '/auto-test/activate/doJob',
    method: 'post',
    data
  })
}

