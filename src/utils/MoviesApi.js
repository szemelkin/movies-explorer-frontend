export class MoviesApi {
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

    getMovies(data) {
        return fetch(`https://api.nomoreparties.co/beatfilm-movies`,{
          method: 'GET',
          headers: {
            // authorization: this._token
          }
        })
        .then(this._checkResponse)
      }
}

const moviesApi = new MoviesApi({
    // address: 'https://api.zmovies.nomoredomains.icu/',
    address: 'https://api.nomoreparties.co/beatfilm-movies',
    // token: `Bearer ${localStorage.getItem('token')}`
    token: '2a94bf63-3818-4ae4-afdc-14a08472aae2'  
  });
  export default moviesApi;