<template>
  <div class="category">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Category</md-dialog-title>
      <div class="editDialog" style="width: 500px">
        <md-field>
          <label>Name</label>
          <md-input v-model="selected.name"></md-input>
        </md-field>

        <md-field>
          <label>Description</label>
          <md-textarea v-model="selected.description" required></md-textarea>
          <span class="md-helper-text">Helper text</span>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-accent" @click="showDialog = false; deleteRec()">Delete</md-button>
        <md-button class="md-primary" @click="showDialog = false; save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="menuBar">
      <md-button  @click="onSelect({})" class="md-raised md-primary">Add</md-button>
    </div>

    <md-table v-model="categoryList" md-card md-fixed-header @md-selected="onSelect">
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" @md-selected="onSelect">
        <md-table-cell md-label="Name" align="left">{{item.name}}</md-table-cell>
        <md-table-cell md-label="Description" align="left">{{item.description}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
  import CategoryService from './categoryService'

  export default {
    name: 'category',
    data: () => ({
      categoryList: [],
      editObj: {},
      showDialog: false,
      selected: {}
    }),
    methods: {
      fetchData () {
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
        CategoryService.save(this.selected)
          .then(result => {
            console.log('new category=' + JSON.stringify(result))
            this.fetchData()
          })
      },
      deleteRec () {
        CategoryService.deleteRec(this.selected)
          .then(result => {
            this.fetchData()
          })
      }
    },
    beforeMount () {
      this.fetchData()
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
  .category {
    margin-left: 150px;
    margin-right: 150px;
  }
</style>
