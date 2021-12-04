import request from '@/utils/request'

export function taskAll(data) {
  return request({
    url: '/auto-test/task/all',
    method: 'get',
    params: { ...data }
  })
}

export function taskList(query) {
  return request({
    url: '/auto-test/task',
    method: 'get',
    params: { ...query }
  })
}

export function createtask(data) {
  return request({
    url: '/auto-test/task',
    method: 'post',
    data
  })
}

export function updatetask(data) {
  return request({
    url: '/auto-test/task',
    method: 'put',
    data
  })
}

export function deletetask(data) {
  return request({
    url: '/auto-test/task',
    method: 'delete',
    params: { ...data }
  })
}

export function itaskAll() {
  return request({
    url: '/auto-test/iTask/all',
    method: 'get'
  })
}

export function itaskList(query) {
  return request({
    url: '/auto-test/iTask',
    method: 'get',
    params: { ...query }
  })
}

export function createitask(data) {
  return request({
    url: '/auto-test/iTask',
    method: 'post',
    data
  })
}

export function updateitask(data) {
  return request({
    url: '/auto-test/iTask',
    method: 'put',
    data
  })
}

export function deleteitask(data) {
  return request({
    url: '/auto-test/iTask',
    method: 'delete',
    params: { ...data }
  })
}
