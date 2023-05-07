import { configApi } from "./constants";

class Api {
  constructor({ baseUrl, cohortId, headers }) {
    this._baseUrl = baseUrl;
    this._cohortId = cohortId;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkStatus)
  }


  getUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  setUser({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  setUserAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
    }
    else {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

}

const api = new Api(configApi);

export default api;