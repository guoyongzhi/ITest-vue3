import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/auto-test/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/auto-test/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/auto-test/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/auto-test/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/auto-test/role/${id}`,
    method: 'delete'
  })
}

export function usersAll() {
  return request({
    url: '/auto-test/permission/users/all',
    method: 'get'
  })
}

export function usersList(query) {
  return request({
    url: '/auto-test/permission/users',
    method: 'get',
    params: { ...query }
  })
}

export function createusers(data) {
  return request({
    url: '/auto-test/permission/user',
    method: 'post',
    data
  })
}

export function updateusers(data) {
  return request({
    url: '/auto-test/permission/user',
    method: 'put',
    data
  })
}

export function deleteusers(data) {
  return request({
    url: '/auto-test/permission/user',
    method: 'delete',
    params: { ...data }
  })
}
