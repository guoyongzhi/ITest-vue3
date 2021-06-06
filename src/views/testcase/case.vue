<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.module_id" placeholder="模块" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in moduleOptions" :key="item.id" :label="item.name" :value="item.id" />
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
      <el-table-column label="模块名称" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.module_id }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="用例名称" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预期结果" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.result }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作明细" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="定位类型" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="定位数据" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.locator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调整页码" width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="输入内容" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.input }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否点击" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Check }}</span>
        </template>
      </el-table-column>
      <el-table-column label="等待时长" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件地址" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.file }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <!-- <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item> -->
        <el-form-item label="名称" prop="name" placeholder="请输入模块名称">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="模块">
          <el-select v-model="temp.module_id" class="filter-item" placeholder="请选择模块">
            <el-option v-for="item in moduleOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="预期结果" prop="result" placeholder="请输入">
          <el-input v-model="temp.result" />
        </el-form-item>
        <el-form-item label="操作明细" prop="keyword" placeholder="请输入">
          <el-input v-model="temp.keyword" />
        </el-form-item>
        <el-form-item label="定位类型" prop="type" placeholder="请输入">
          <el-input v-model="temp.type" />
        </el-form-item>
        <el-form-item label="定位数据" prop="locator" placeholder="请输入">
          <el-input v-model="temp.locator" />
        </el-form-item>
        <el-form-item label="调整页码" prop="Index" placeholder="请输入">
          <el-input v-model="temp.Index" />
        </el-form-item>
        <el-form-item label="模拟输入内容" prop="input" placeholder="请输入">
          <el-input v-model="temp.input" />
        </el-form-item>
        <el-form-item label="是否点击" prop="Check" placeholder="请输入">
          <el-input v-model="temp.Check" />
        </el-form-item>
        <el-form-item label="等待时长" prop="time" placeholder="请输入">
          <el-input v-model="temp.time" />
        </el-form-item>
        <el-form-item label="文件地址" prop="file" placeholder="请输入">
          <el-input v-model="temp.file" />
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
import { moduleAll } from '@/api/module'
import { caseAll, caseList, createcase, updatecase, deletecase } from '@/api/case'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import AES from '@/utils/aes'
// import RSA from '@/utils/rsa'

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
        module_id: undefined,
        name: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      moduleOptions: [{ name: '请选择模块', id: 0 }],
      caseOptions: [{ name: '请选择上级用例', id: 0 }],
      ModuleAll: null,
      showReviewer: false,
      temp: {
        id: 0,
        module_id: 0,
        name: '',
        result: '',
        keyword: '',
        type: '',
        locator: '',
        Index: '',
        input: '',
        Check: '',
        time: '',
        file: ''
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
        locator: [{ required: true, message: '这是必填项', trigger: 'change' }],
        type: [{ required: true, message: '定位类型必填', trigger: 'change' }],
        name: [{ required: true, message: '名称必填', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getAllcase()
    this.getAllmodule()
    this.getList()
  },
  methods: {
    getList() {
      // var keys = AES.generatekey(16);
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      // 不传key值，就默认使用上述定义好的key值
      // var cars = '123456'
      // var encrypts = AES.encrypt(cars)
      // var dess = JSON.parse(AES.decrypt(encrypts))
      // var encrypts = AES.encrypt('1234asdasd');
      // var dess = AES.decrypt(encrypts);
      // console.log(encrypts)
      // console.log(encrypts.length)
      // console.log(dess)
      // var str = '123456'
      // var en = RSA.RSAencrypt(str)
      // var de = RSA.RSAdecrypt(en)
      // console.log(en)
      // console.log(de)
      this.listLoading = true
      // 查找
      caseList(this.listQuery).then(response => {
        var newList = []
        response.data.items.forEach(item => {
          item.module_id = this.moduleOptions.find(m => m.id === item.module_id).name
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
    getAllcase() {
      caseAll().then(response => {
        // console.log(response)
        // console.log(this.projectOptions)
        var newList = []
        response.data.items.forEach(function(item, index) {
          newList.push({ name: item.name, id: item.id })
        })
        this.caseOptions = this.caseOptions.concat(newList)
        // this.projectOptions += response.data.items
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    getAllmodule() {
      moduleAll().then(response => {
        // console.log(response)
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
        module_id: 0,
        name: '',
        result: '',
        keyword: '',
        type: '',
        locator: '',
        Index: '',
        input: '',
        Check: '',
        time: '',
        file: ''
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
          if (this.temp.module_id === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Fail',
              message: '修改失败，模块不可为空',
              type: 'fail',
              duration: 2001
            })
          }
          createcase(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          //   console.log(tempData)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          if (typeof tempData.module_id === 'string') {
            tempData.module_id = this.moduleOptions.find(m => m.name === tempData.module_id).id
          }
          if (tempData.module_id === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Fail',
              message: '修改失败，模块不可为空',
              type: 'fail',
              duration: 2001
            })
            return false
          }
          // console.log(tempData)
          updatecase(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            if (typeof this.temp.module_id === 'number') {
              this.temp.module_id = this.moduleOptions.find(m => m.id === this.temp.module_id).name
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
      deletecase(row).then(() => {
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
        const tHeader = ['id', 'remark', 'timestamp', 'module_id', 'name', 'result', 'keyword', 'type', 'locator', 'Index', 'input', 'Check', 'time', 'file']
        const filterVal = ['id', 'remark', 'timestamp', 'module_id', 'name', 'result', 'keyword', 'type', 'locator', 'Index', 'input', 'Check', 'time', 'file']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list-' + new Date().valueOf()
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
