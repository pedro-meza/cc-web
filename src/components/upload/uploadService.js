import axios from 'axios'

export default {

  uploads (dataList) {
    const URL = 'http://localhost:3003/transactions'

    let postObj = {
      month: 1,
      year: 2018,
      transactionList: dataList
    }

    console.log('postObj=' + JSON.stringify(postObj))

    return new Promise((resolve, reject) => {
      let myOptions = {
        'headers': {
          'Content-Type': 'application/json'
        }
      }

      axios.post(URL, postObj, myOptions)
        .then(result => resolve(result.body))
    })
  }
}
