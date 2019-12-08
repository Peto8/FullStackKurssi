import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const edit = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, add, remove, edit}