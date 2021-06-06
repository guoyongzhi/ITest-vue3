<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.project_id" placeholder="项目" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="100" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.project_id }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="模块名称" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级模块" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.parent_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <!-- <el-button v-if="row.password!='1'" size="mini" type="success" @click="handleModifyStatus(row,'1')">
            发表
          </el-button>
          <el-button v-if="row.password!='2'" size="mini" @click="handleModifyStatus(row,'2')">
            草稿
          </el-button> -->
          <el-button v-if="row.password!='3'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!-- <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item> -->
        <el-form-item label="名称" prop="name" placeholder="请输入模块名称">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="项目">
          <el-select v-model="temp.project_id" class="filter-item" placeholder="请选择项目">
            <el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="上级模块">
          <el-select v-model="temp.parent_id" class="filter-item" placeholder="请选择模块">
            <el-option v-for="item in moduleOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          继续
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { moduleAll, moduleList, createmodule, updatemodule, deletemodule } from '@/api/module'
import { projectAll } from '@/api/project'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

// console.log(waves)
// console.log(Pagination)
export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        project_id: undefined,
        name: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      projectOptions: [{ name: '请选择项目', id: 0 }],
      moduleOptions: [{ name: '请选择上级模块', id: 0 }],
      ModuleAll: null,
      showReviewer: false,
      temp: {
        id: 0,
        parent_id: 0,
        name: '',
        project_id: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        name: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getAllproject()
    this.getAllmodule()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      // 查找
      moduleList(this.listQuery).then(response => {
        var newList = []
        response.data.items.forEach(item => {
          item.project_id = this.projectOptions.find(m => m.id === item.project_id).name
          if (item.parent_id === 0) {
            item.parent_id = '-'
          } else {
            item.parent_id = this.moduleOptions.find(m => m.id === item.parent_id).name
          }
          item.parent_id
          newList.push(item)
        })
        this.list = newList
        this.total = response.data.total
        // console.log(response.data.items)
        // console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, this.total / 200 * 1000)
      })
    },
    getAllproject() {
      projectAll().then(response => {
        // console.log(response)
        // console.log(this.projectOptions)
        var newList = []
        response.data.items.forEach(function(item, index) {
          newList.push({ name: item.name, id: item.id })
        })
        this.projectOptions = this.projectOptions.concat(newList)
        // this.projectOptions += response.data.items
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    getAllmodule() {
      moduleAll().then(response => {
        console.log(response)
        var newList = []
        this.ModuleAll = response.data.items
        response.data.items.forEach(function(item, index) {
          // console.log(item)
          newList.push({ name: item.name, id: item.id })
        })
        // console.log(newList)
        this.moduleOptions = this.moduleOptions.concat(newList)
        // console.log(this.moduleOptions)
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    // 主动查找
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 修改状态
    handleModifyStatus(row, status) {
      console.log(row, status)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.password = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        parent_id: 0,
        project_id: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 创建新的
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = 0 // mock a id
          this.temp.author = 'vue-element-admin'
          createmodule(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.listQuery.page = 1
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      if (this.temp.parent_id === '-') {
        this.temp.parent_id = 0
      } else if (this.temp.parent_id === 0) {
        this.temp.parent_id = 0
      } else {
        this.temp.parent_id = this.moduleOptions.find(m => m.name === this.temp.parent_id).id
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改内容
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          if (tempData.parent_id === '-') {
            tempData.parent_id = 0
          } else if (tempData.parent_id === 0) {
            tempData.parent_id = 0
          } else {
            console.log(tempData.parent_id)
            if (typeof tempData.parent_id === 'string') {
              tempData.parent_id = this.moduleOptions.find(m => m.name === tempData.parent_id).id
            }
          }
          if (typeof tempData.project_id === 'string') {
            tempData.project_id = this.projectOptions.find(m => m.name === tempData.project_id).id
          }
          if (tempData.project_id === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Fail',
              message: '修改失败，项目不可为空',
              type: 'fail',
              duration: 2001
            })
            return false
          }
          console.log(tempData)
          updatemodule(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            if (typeof this.temp.project_id === 'number') {
              this.temp.project_id = this.projectOptions.find(m => m.id === this.temp.project_id).name
            }
            if (this.temp.parent_id === 0) {
              this.temp.parent_id = '-'
            } else {
              this.temp.parent_id = this.moduleOptions.find(m => m.id === this.temp.parent_id).name
            }
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 删除
    handleDelete(row, index) {
      deletemodule(row).then(() => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
      this.list.splice(index, 1)
    },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'fullname', 'name', 'password', 'status']
        const filterVal = ['timestamp', 'fullname', 'name', 'password', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
