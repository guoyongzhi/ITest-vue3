import request from '@/utils/request'

export function configAll() {
  return request({
    url: '/auto-test/config/all',
    method: 'get'
  })
}

export function configList(query) {
  return request({
    url: '/auto-test/config',
    method: 'get',
    params: { ...query }
  })
}

export function createconfig(data) {
  return request({
    url: '/auto-test/config',
    method: 'post',
    data
  })
}

export function updateconfig(data) {
  return request({
    url: '/auto-test/config',
    method: 'put',
    data
  })
}

export function deleteconfig(data) {
  return request({
    url: '/auto-test/config',
    method: 'delete',
    params: { ...data }
  })
}
