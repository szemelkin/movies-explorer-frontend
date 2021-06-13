export class Api {
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

  getAbout(data) {
    return fetch(`${this._address}/`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getMovies(data) {
    return fetch(`${this._address}/movies`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getSavedMovies(data) {
    return fetch(`${this._address}/saved-movies`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getProfile(data) {
    return fetch(`${this._address}/saved-movies`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  login(data) {
    return fetch(`${this._address}/signin`,{
      method: 'POST',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }


  register(data) {
    return fetch(`${this._address}/signup`,{
      method: 'POST',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

}

//   changeLikeCardStatus(data, putLike) {
//     if (putLike) {
//       return fetch(`${this._address}/cards/likes/${data}`,{
//         method: 'PUT',
//         headers: {
//           authorization: this._token
//         }
//       })
//       .then(this._checkResponse)
//     } else {
//       return fetch(`${this._address}/cards/likes/${data}`,{
//         method: 'DELETE',
//         headers: {
//           authorization: this._token
//         }
//       })
//       .then(this._checkResponse)
//     }
//   }


//   addLike(data) {
//     return fetch(`${this._address}/cards/likes/${data}`,{
//       method: 'PUT',
//       headers: {
//         authorization: this._token
//       }
//     })
//     .then(this._checkResponse)
//   }


//   removeLike(data) {
//     return fetch(`${this._address}/cards/likes/${data}`,{
//       method: 'DELETE',
//       headers: {
//         authorization: this._token
//       }
//     })
//     .then(this._checkResponse)
//   }


//   getCards() {
//     return fetch(`${this._address}/cards`,{
//       method: 'GET',
//       headers: {
//         authorization: this._token
//       }
//     })
//     .then(this._checkResponse)
//   }


//   getUserInfo() {
//     return fetch(`${this._address}/users/me`,{
//       method: 'GET',
//       headers: {
//         authorization: this._token
//       }
//     })
//     .then(this._checkResponse)
//   }


//   addCard(data) {
//     return fetch(`${this._address}/cards`,{
//       method: 'POST',
//       headers: {
//         authorization: this._token,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: data.name,
//         link: data.link
//       })
//     })
//     .then(this._checkResponse)
//   }

//   deleteCard(data) {
//     return fetch(`${this._address}/cards/${data}`,{
//       method: 'DELETE',
//       headers: {
//         authorization: this._token
//       },
//     })
//     .then(this._checkResponse)
//   }

//   editProfile(data) {
//     return fetch(`${this._address}/users/me`,{
//       method: 'PATCH',
//       headers: {
//         authorization: this._token,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: data.name,
//         about: data.about
//       })
//     })
//     .then(this._checkResponse)
//     .catch((err)=>{
//       console.log(`Ошибка при загрузке данных пользователя: ${err}`)
//     })
//   }


//   addAvatar(link) {
//     return fetch(`${this._address}/users/me/avatar`,{
//       method: 'PATCH',
//       headers: {
//         authorization: this._token,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         avatar: link.avatar
//       })

//     })
//     .then(this._checkResponse)
//   }
// }


// const api = new Api({
//   address: 'https://mesto.nomoreparties.co/v1/cohort-19',
//   token: '2a94bf63-3818-4ae4-afdc-14a08472aae2'
// });
// export default api;
