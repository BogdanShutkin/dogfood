const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject (`Error: ${res.status}`);
}

class Api {
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProductsList() {
        return fetch (`${this._baseUrl}/products?limit=250`, {
            headers: this._headers,
        }).then(onResponse)
    }

    getProductById(idProduct) {
        return fetch(`${this._baseUrl}/products/${idProduct}`, {
            headers: this._headers,
        }).then(onResponse)
    }

    getListBySearch(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers,
        }).then(onResponse)
    }
    
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(onResponse)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: this._headers,
        }).then(onResponse)
    }

    makeRewiew(productId) {
        return fetch(`${this._baseUrl}/rewiew/${productId}`, {
            method: 'POST',
            headers: this._headers,
        }).then(onResponse)
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNkYjc1ZmFhMzk3MTIxODNmYzdiYTUiLCJncm91cCI6ImZyb250MTAiLCJpYXQiOjE2ODE3NjYyODgsImV4cCI6MTcxMzMwMjI4OH0.3j_m2kuQeMMW4r-QUu3_n7cyDRDf-GYvnyiyfvZ5hXQ'
    }
}

export const api = new Api(config);