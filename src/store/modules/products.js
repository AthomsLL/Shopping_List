import axios from 'axios'

const state = {
  urlAPI: "http://localhost:3000/api/products",
  products: [],
}

const getters = {
  allProducts: state => state.products
}

const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}