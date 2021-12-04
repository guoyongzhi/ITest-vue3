import request from '@/utils/request'

export function moduleAll(projectId) {
  return request({
    url: '/auto-test/module/all?projectId=' + projectId,
    method: 'get'
  })
}

export function moduleList(query) {
  return request({
    url: '/auto-test/module',
    method: 'get',
    params: { ...query }
  })
}

export function createmodule(data) {
  return request({
    url: '/auto-test/module',
    method: 'post',
    data
  })
}

export function updatemodule(data) {
  return request({
    url: '/auto-test/module',
    method: 'put',
    data
  })
}

export function deletemodule(data) {
  return request({
    url: '/auto-test/module',
    method: 'delete',
    params: { ...data }
  })
}
