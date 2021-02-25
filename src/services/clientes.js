import { http } from './config'

let auth = 'zpk_prod_i67EJ3UOyTQkn9aLhkWdxQxM';


// let webApiUrl = 'example.com/getStuff';
// let tokenStr = 'xxyyzz';
// axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

// const headers = { Authorization: `Bearer ${token}` };
// return axios.get(URLConstants.USER_URL, { headers });

export default {
    listar: () => {
        return http.get('sellers')
    }
}