import request from '@/utils/request'

export function projectAll() {
  return request({
    url: '/auto-test/project/all',
    method: 'get'
  })
}

export function projectList(query) {
  return request({
    url: '/auto-test/project',
    method: 'get',
    params: { ...query }
  })
}

export function createproject(data) {
  return request({
    url: '/auto-test/project',
    method: 'post',
    data
  })
}

export function updateproject(data) {
  return request({
    url: '/auto-test/project',
    method: 'put',
    data
  })
}

export function deleteproject(data) {
  return request({
    url: '/auto-test/project',
    method: 'delete',
    params: { ...data }
  })
}
