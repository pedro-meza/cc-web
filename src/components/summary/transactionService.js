import axios from 'axios'

const BASE_URL = 'http://localhost:3003'

export default {
  fetchByMonthYear (monthYear) {
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/transaction?monthYear=${monthYear}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  fetchMonthlyData (dataList) {
    let graphData = []
    let sumObj = {}
    for (let data of dataList) {
      let val = sumObj[data.category]
      if (val) {
        sumObj[data.category] = val + parseInt(data.amount)
      } else {
        sumObj[data.category] = parseInt(data.amount)
      }
    }
    let keys = Object.keys(sumObj)
    for (let key of keys) {
      let val = sumObj[key]
      if (val < 0) val = val * -1
      let data = [key, val]
      graphData.push(data)
    }
    return {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: {
        text: 'Monthly Spending'
      },
      subtitle: {
        text: 'per Category'
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45
        }
      },
      series: [{
        name: 'Delivered amount',
        data: graphData
      }]
    }
  }
}
