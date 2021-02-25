import axios from 'axios'


export const http = axios.create({
    baseURL: 'https://api.zoop.ws/v1/marketplaces/8d7c012aeea14c659cc50e8dadcec4e2/',
    auth: {
        username: 'zpk_prod_i67EJ3UOyTQkn9aLhkWdxQxM',
        password: ''
      },
})

