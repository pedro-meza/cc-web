<template>
  <div class="rules">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Rules</md-dialog-title>
      <div class="editDialog" style="width: 500px">

        <div class="md-layout-item md-size-25">
          <md-field>
            <md-select v-model="selected.categoryId" name="category" id="category" placeholder="Category">
              <md-option v-for="option in categoryList" :key="option._id" :value="option._id">{{option.name}}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item md-size-25">
          <md-field>
            <md-select v-model="selected.match" name="matchValue" id="matchValue" placeholder="Match">
              <md-option v-for="item in matchList" :key="item.name" :value="item.name">{{item.name}}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item md-size-50">
        <md-field>
          <label>Value</label>
          <md-input v-model="selected.value"></md-input>
        </md-field>
        </div>
      </div>


        <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Cancel</md-button>
        <md-button class="md-accent" @click="showDialog = false; deleteRec()">Delete</md-button>
        <md-button class="md-primary" @click="showDialog = false; save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="menuBar">
      <md-button  @click="onSelect({})" class="md-raised md-primary">Add</md-button>
    </div>

    <md-table v-model="dataList" md-card md-fixed-header @md-selected="onSelect">
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" @md-selected="onSelect">
        <md-table-cell md-label="Category" align="left">{{item.category}}</md-table-cell>
        <md-table-cell md-label="Match" align="left">{{item.match}}</md-table-cell>
        <md-table-cell md-label="Value" align="left">{{item.value}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
  import RulesService from './rulesService'
  import CategoryService from '../category/categoryService'
  import MatchService from '../match/matchService'

  export default {
    name: 'rules',
    data: () => ({
      matchList: [],
      categoryList: [],
      dataList: [],
      editObj: {},
      showDialog: false,
      selected: {}
    }),
    methods: {
      fetchData () {
        RulesService.fetchAll()
          .then(results => {
            this.dataList = results.data
          })
      },
      fetchMatchData () {
        MatchService.fetchAll()
          .then(results => {
            this.matchList = results.data
          })
      },
      fetchCategoryData () {
        CategoryService.fetchAll()
          .then(results => {
            this.categoryList = results.data
          })
      },
      onSelect (item) {
        this.selected = item
        this.showDialog = true
      },
      save () {
        console.log('selected=' + JSON.stringify(this.selected))
        RulesService.save(this.selected)
          .then(result => {
            console.log('new rule=' + JSON.stringify(result))
            this.fetchData()
          })
      },
      deleteRec () {
        RulesService.deleteRec(this.selected)
          .then(result => {
            this.fetchData()
          })
      }
    },
    beforeMount () {
      this.fetchData()
      this.fetchMatchData()
      this.fetchCategoryData()
    }
  }
</script>
<style>
  .menuBar {
    text-align: right
  }
  .editDialog {
    margin-left: 30px;
    margin-right: 30px;

  }
  .rules {
    margin-left: 150px;
    margin-right: 150px;
  }
  .md-select-menu {
    z-index: 10;
  }
</style>
