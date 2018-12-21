<template>
  <div class='summary'>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Rules</md-dialog-title>
      <div class="editDialog" style="width: 500px">

        <div class="md-layout-item md-size-25">
          <md-field>
            <md-select v-model="rule.categoryId" name="category" id="category" placeholder="Category">
              <md-option v-for="option in categoryList" :key="option._id" :value="option._id">{{option.name}}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item md-size-25">
          <md-field>
            <md-select v-model="rule.match" name="matchValue" id="matchValue" placeholder="Match">
              <md-option v-for="item in matchList" :key="item.name" :value="item.name">{{item.name}}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item md-size-50">
          <md-field>
            <label>Value</label>
            <md-input v-model="rule.value"></md-input>
          </md-field>
        </div>
      </div>


      <md-dialog-actions>
        <md-button @click="showDialog = false">Cancel</md-button>
        <md-button class="md-primary md-raised" @click="showDialog = false; saveRule()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div id="menu" class="md-layout md-alignment-space-between-left">

      <div class="md-layout-item md-size-25">
        <md-field>
          <md-select v-model="monthYear" name="month" id="month" placeholder="Month-Year">
            <md-option v-for="option in monthYearList" :key="option.value" :value="option.value">{{option.name}}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-size-10" style="position: relative; top: 10px">
        <md-button class="md-raised md-primary" v-on:click="getTransactions()">Submit</md-button>
      </div>
      <div class="md-layout-item md-size-25">
      </div>
      <div style="float: right; position: absolute;right: 120px">
        <md-button v-on:click="setView('Graph')">Graph<md-icon>show_chart</md-icon></md-button>
        <md-button v-on:click="setView('List')">List<md-icon>view_list</md-icon></md-button>
      </div>

    </div>

    <md-table v-if="viewType==='List'" v-model="expenseData" @md-selected="onSelect" md-sort="description" :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort" md-card md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" @md-selected="onSelect">
        <md-table-cell md-label="Trans Date" md-sort-by="transDate">{{item.transDate}}</md-table-cell>
        <md-table-cell md-label="Post Date" md-sort-by="postDate">{{item.postDate}}</md-table-cell>
        <md-table-cell md-label="Description" md-sort-by="description">{{item.description}}</md-table-cell>
        <md-table-cell md-label="Amount" md-sort-by="amount">{{item.amount}}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="category">{{item.category}}</md-table-cell>
      </md-table-row>
    </md-table>

    <div v-if="viewType==='Graph'">
      <B style="position: absolute; right: 150px; font-size: 20px;">Total: {{getTotal()}}</B>
      <vue-highcharts :options="pieData" ref="pieData"></vue-highcharts>
    </div>

  </div>

</template>

<script>
  import TransactionService from './transactionService'
  import MatchService from '../match/matchService'
  import CategoryService from '../category/categoryService'
  import RuleService from '../rules/rulesService'
  import VueHighcharts from 'vue2-highcharts'

  export default {
    name: 'expense-summary',
    components: {
      VueHighcharts
    },
    data: () => ({
      showDialog: false,
      currentSort: 'name',
      currentSortOrder: 'asc',
      isLoaded: true,
      monthYear: '',
      matchList: [],
      categoryList: [],
      graphData: [],
      monthYearList: [
        {name: '12-2017', value: '201712'},
        {name: '01-2018', value: '201801'},
        {name: '02-2018', value: '201802'}
      ],
      expenseData: [],
      selected: {},
      rule: {},
      viewType: 'List',
      pieData: {},
      total: 0
    }),

    methods: {
      onSelect (item) {
        this.fetchCategoryData()
        this.fetchMatchData()
        this.selected = item
        this.showDialog = true
        this.rule = {}
        this.rule.value = this.selected.description
      },
      fetchCategoryData () {
        CategoryService.fetchAll()
          .then(results => {
            this.categoryList = results.data
          })
      },
      fetchMatchData () {
        MatchService.fetchAll()
          .then(results => {
            this.matchList = results.data
          })
      },
      getTransactions () {
        TransactionService.fetchByMonthYear(this.monthYear)
          .then(results => {
            RuleService.matchTransToRules(results.data)
               .then((dataList) => {
                 this.expenseData = dataList
                 this.graphData = TransactionService.fetchMonthlyData(dataList)
                 console.log('this.graphData=' + JSON.stringify(this.graphData))
                 this.pieData = this.graphData
               })
          })
      },
      customSort (value) {
        return value.sort((a, b) => {
          const sortBy = this.currentSort

          let fn = (x) => x
          let strCompareFn = (a, b) => {
            if (!a) return -1
            if (!b) return 1
            return a.localeCompare(b)
          }
          let numbCompareFn = (a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 1
          }
          let dateCompareFn = (a, b) => {
            let dateA = new Date(a)
            a = dateA.getTime()
            let dateB = new Date(b)
            b = dateB.getTime()
            if (a < b) return -1
            if (a > b) return 1
            return 1
          }
          let compareFn = strCompareFn
          if (sortBy === 'amount') {
            fn = parseFloat
            compareFn = numbCompareFn
          }
          if (sortBy === 'transDate' || sortBy === 'postDate') compareFn = dateCompareFn
          let valA = fn(a[sortBy])
          let valB = fn(b[sortBy])
          if (this.currentSortOrder === 'desc') {
            return compareFn(valA, valB)
          }
          return compareFn(valB, valA)
        })
      },
      saveRule () {
        RuleService.save(this.rule)
          .then(result => {
            this.getTransactions()
          })
      },
      setView (viewType) {
        this.viewType = viewType
      },
      getTotal () {
        let total = 0
        if (this.graphData && this.graphData.series[0] && this.graphData.series[0].data) {
          for (let data of this.graphData.series[0].data) {
            total += data[1]
          }
        }
        return '$' + total.toFixed(2)
      }
    }

  }
</script>

<style>
  .summary {
    margin-left: 150px;
    margin-right: 150px;
  }
  .editDialog {
    margin-left: 30px;
    margin-right: 30px;

  }
  .md-select-menu {
    z-index: 10;
  }
  .highcharts {
    display: inline-block;
    margin: 2em auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.2);
    padding: 1.5em 0em;
    background: #fff;
  }
 </style>
