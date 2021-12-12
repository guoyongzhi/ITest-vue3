<template>
  <section>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="任务明细" min-width="200">
        <template slot-scope="scope">
          <router-link :to="{ path:'/report/RunningDetails', query: { ID: scope.row.id } }">{{ scope.row.name | orderNoFilter }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="运行时间" min-width="195" align="center">
        <template slot-scope="scope">
          <router-link :to="{ path:'/report/RunningDetails', query: { ID: scope.row.id } }">{{ scope.row.runTime | formatDate }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="成功率" min-width="195" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.completenessSuccess | statusFilter">
            <router-link :to="{ path:'/report/RunningDetails', query: { ID: scope.row.id } }">{{ scope.row.completenessSuccess * 100 | toThousandFilter }}%</router-link>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="完成率" min-width="195" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.completeness | statusFilter">
            <router-link :to="{ path:'/report/RunningDetails', query: { ID: scope.row.id } }">{{ scope.row.completeness * 100 | toThousandFilter }}%</router-link>
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <footer class="footer">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNumber" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
    </footer>
  </section>
</template>

<script>
// import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { transactionList } from '@/api/remote-search'
import { formatDate } from '@/utils/date'

export default {
  name: 'TTable',
  components: { Pagination },
  // directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      if (status < 1) {
        if (status > 0.8) {
          return 'waring'
        }
        return statusMap[0]
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      if (str == null) {
        return ''
      }
      return str.substring(0, 50)
    },
    formatDate(time) {
      // time = time * 1000
      const date = new Date(time)
      // console.log(new Date(time))
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList(this.listQuery).then(response => {
        this.list = response.data.resultList
        this.total = response.data.totalSize
        console.log(this.list)
      })
    }
  }
}
</script>
