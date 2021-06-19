export class MainApi {
  constructor({address, token}) {
    this._address = address;
    this._token = `Bearer ${localStorage.getItem('token')}`;
  }


  _checkResponse(res) {
    if (res.ok) {
        // console.log('_checkResponse', this._token)
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}


  delSavedMovies(data) {
    return fetch(`${this._address}/movies/${data._id}`,{
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`,{
      method: 'GET',
      headers: {
        // authorization: this._token
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkResponse)
  }

  postSavedMovies(data) {
    return fetch(`${this._address}/movies`,{
      method: 'POST',
      headers: {
        // authorization: this._token,
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        country: data.country,
        director: data.director,
        duration: Number(data.duration),
        year: Number(data.year),
        description: data.description,
        image: "https://api.nomoreparties.co" + data.image.url,
        trailer: data.trailerLink,
        thumbnail: "https://api.nomoreparties.co" + data.image.formats.thumbnail.url,
        movieId: Number(data.id),
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
  }

  getUserInfo(token) {
    return fetch(`${this._address}/users/me`,{
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(this._checkResponse)

  }

  renewUserInfo(data) {
    return fetch(`${this._address}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: data.name,
        email: data.email
      })
    })
  }


}


const mainApi = new MainApi({
  address: 'https://api.zmovies.nomoredomains.icu',
  token: `Bearer ${localStorage.getItem('token')}`
});
export default mainApi;