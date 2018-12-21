import axios from 'axios'

const BASE_URL = 'http://localhost:3003'

export default {
  fetchAll () {
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/category`)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  create (myCategory) {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/category`, myCategory)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  update (myCategory) {
    return new Promise((resolve, reject) => {
      axios.put(`${BASE_URL}/category`, myCategory)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  save (myCategory) {
    if (myCategory._id) {
      return this.update(myCategory)
    } else {
      return this.create(myCategory)
    }
  },
  deleteRec (myCategory) {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/category/${myCategory._id}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

}
