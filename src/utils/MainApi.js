export class MainApi {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
  }


  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}


  delSavedMovies(data) {
    return fetch(`${this._address}/movies/${data._id}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getSavedMovies(data) {
    return fetch(`${this._address}/movies`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  postSavedMovies(data) {
    return fetch(`${this._address}/movies`,{
      method: 'POST',
      headers: {
        authorization: this._token,
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
        // authorization: this._token
        authorization: `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
    // .then(console.log('getUserInfo', res.json()))
  }

  renewUserInfo(data) {
    console.log(data)
    return fetch(`${this._address}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization:`Bearer ${(data)}`,
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
  // address: 'https://api.zmovies.nomoredomains.icu/',
  address: 'https://api.zmovies.nomoredomains.icu',
  token: `Bearer ${localStorage.getItem('token')}`
  // token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk5NGE2ZmE5ZGIzYzI3OGIyNmE0NzciLCJpYXQiOjE2MjA2NTg4ODB9.F5m6CYsPpN3J-ALiUvtA3PVlYjdHSVFxPK6_8A7pOWc'  
});
export default mainApi;