<template>
  <div class="upload">
    <form enctype="multipart/form-data">
      <div class="dropbox">
        <input type="file" :name="uploadFieldName" :disabled="isSaving"
               @change="onFileChange($event.target.name, $event.target.files)"
               accept=".csv" class="input-file">
        <p v-if="isInitial">
          Drag your file(s) here to begin<br> or click to browse
        </p>
        <p v-if="isSaving">
          File {{fileName}} is saving...
        </p>
        <p v-if="isSuccess">
          File {{fileName}} was saved successfully!
        </p>
      </div>

    </form>
  </div>
</template>

<script>
  import UploadService from './uploadService'

  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  export default {
    name: 'upload',
    data () {
      return {
        fileinput: null,
        fileName: null,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: ''
      }
    },

    computed: {
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      }
    },

    methods: {
      validate (myFile) {
        // validate headers
        const HEADERS = ['Type', 'Trans Date', 'Post Date', 'Description', 'Amount']
        let rows = myFile.split('\r\n')
        let header = rows[0]
        let hCols = this.getColumns(header)

        // validate
        for (let i = 0; i < hCols.length; i++) {
          if (HEADERS[i] === hCols[i]) {
            let myRows = rows.slice(1, rows.length)
            return myRows
          } else {
            return false
          }
        }
      },
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      onFileChange (name, files) {
        if (!files.length) return
        this.currentStatus = STATUS_SAVING
        let myFile = files[0]
        this.fileName = myFile.name
        this.createInput(myFile)
      },
      createInput (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          let myFileinput = reader.result
          let isValid = this.validate(myFileinput)
          if (isValid) {
            this.processRows(isValid)
          }
        }
        reader.readAsText(file)
        this.currentStatus = STATUS_SUCCESS
      },
      processRows (rows) {
        let COLUMNS = ['type', 'transDate', 'postDate', 'description', 'amount']
        let transArray = []
        for (let i = 0; i < rows.length; i++) {
          let cols = this.getColumns(rows[i])
          let transObj = {}
          for (let j = 0; j < cols.length; j++) {
            transObj[COLUMNS[j]] = cols[j]
          }
          if (cols.length === 5) {
            transArray.push(transObj)
          }
        }
        UploadService.uploads(transArray)
          .then(results => {
            console.log('results=' + JSON.stringify(results))
          })
      },

      getColumns (row) {
        return row.split(',')
      }
    },

    mounted () {
      this.reset()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #42b983;
  }

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
    margin-top: 25px;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>
