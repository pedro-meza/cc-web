import axios from 'axios'

const BASE_URL = 'http://localhost:3003'
const PATH = 'rules'

export default {
  fetchAll () {
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/${PATH}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  create (myRec) {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/${PATH}`, myRec)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  update (myRec) {
    return new Promise((resolve, reject) => {
      axios.put(`${BASE_URL}/${PATH}`, myRec)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  save (myRec) {
    if (myRec._id) {
      return this.update(myRec)
    } else {
      return this.create(myRec)
    }
  },
  deleteRec (myRec) {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/${PATH}/${myRec._id}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  normalizeRegex (text) {
    text = text.replace(/\//, '\\/')
    text = text.replace('.', '\\.')
    text = text.replace('*', '\\*')
    return text
  },
  matchTransToRule (dataList, ruleList, excludeFlag) {
    let resultList = []
    for (let data of dataList) {
      let include = true
      if (!dataList.category) {
        for (let item of ruleList) {
          let myRegex = new RegExp(this.normalizeRegex(item.value), 'g')
          if (myRegex.test(data.description)) {
            data.category = item.category
            if (excludeFlag) include = false
          }
        }
      }
      if (include) resultList.push(data)
    }
    return resultList
  },
  matchTransToRules (transData) {
    let excludeRuleList = []
    let exactRuleList = []
    let likeRuleList = []
    return new Promise((resolve, reject) => {
      this.fetchAll()
        .then((resultData) => {
          let result = resultData.data
          excludeRuleList = result.filter(item => item.match === 'Exclude')
          exactRuleList = result.filter(item => item.match === 'Exact')
          likeRuleList = result.filter(item => item.match === 'Like')
          console.log('excludeRuleList=' + JSON.stringify(excludeRuleList))
          let myData = this.matchTransToRule(transData, excludeRuleList, true)
          console.log('exactRuleList=' + JSON.stringify(exactRuleList))
          myData = this.matchTransToRule(myData, exactRuleList, false)
          console.log('likeRuleList=' + JSON.stringify(likeRuleList))
          myData = this.matchTransToRule(myData, likeRuleList, false)
          console.log('myData=' + JSON.stringify(myData))
          resolve(myData)
        })
    })
  }
}
