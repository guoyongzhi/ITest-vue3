import { param } from '@/utils'
import request from '@/utils/request'

export function taskAll() {
  return request({
    url: '/report/task/all',
    method: 'get'
  })
}

export function activatereportList(query) {
  return request({
    url: '/auto-test/report/activate',
    method: 'get',
    params: { ...query }
  })
}

export function activatereportdetails(data) {
  return request({
    url: '/auto-test/report/details',
    method: 'get',
    params: { ...data }
  })
}

export function activatefiledetails(data) {
  return request({
    url: '/auto-test/activate/file',
    method: 'get',
    params: { ...data }
  })
}

export function updatetask(data) {
  return request({
    url: '/report/task',
    method: 'put',
    data
  })
}

export function deletetask(data) {
  return request({
    url: '/report/task',
    method: 'delete',
    params: { ...data }
  })
}

export function itaskAll() {
  return request({
    url: '/report/iTask/all',
    method: 'get'
  })
}

export function itaskList(query) {
  return request({
    url: '/report/iTask',
    method: 'get',
    params: { ...query }
  })
}

export function createitask(data) {
  return request({
    url: '/report/iTask',
    method: 'post',
    data
  })
}

export function updateitask(data) {
  return request({
    url: '/report/iTask',
    method: 'put',
    data
  })
}

export function deleteitask(data) {
  return request({
    url: '/report/iTask',
    method: 'delete',
    params: { ...data }
  })
}

export function operatorTypeList() {
  return request({
    url: '/auto-test/operator/module',
    method: 'get'
  })
}

export function operatorLogList(param) {
  return request({
    url: '/auto-test/logger',
    method: 'get',
    params: { ...param }
  })
}

// 获取所有测试报告
export function testReportAll(param) {
  return request({
    url: '/auto-test/test-report/get',
    method: 'get',
    params: { ...param }
  })
}

// 获取所有启动数据
export function activateAll() {
  return request({
    url: '/auto-test/test-report/activateAll',
    method: 'get',
    params: { ...param }
  })
}
