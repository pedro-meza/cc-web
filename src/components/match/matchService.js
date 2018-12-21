import axios from 'axios'

const BASE_URL = 'http://localhost:3003'
const PATH = 'match'

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
  }
}
