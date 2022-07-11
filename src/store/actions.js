const axios = require('axios')
// const apiUrl = 'http://10.10.12.183:3000/api/'
const apiUrl = "https://truhelix.com/node/api/"

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).success
                                                    ? JSON.parse(localStorage.getItem('userInfo')).accessToken 
                                                    : null;

const actions = {
	signup(context, payload){
		return new Promise((resolve, reject) => {
			var signupUser = {
				first: payload.firstname,
				last: payload.lastname,
				username: payload.username,
				email: payload.email,
				password: payload.password,
				wallet: payload.wallet,
			}

			axios.post(`${apiUrl}auth/signup`, signupUser).then((res) => {
				console.log(res);
				resolve(res);
			}).catch((err) => {
				console.log(err)
				reject(new Error(err))
			})
		})
	},

	login(context, payload){
		return new Promise((resolve, reject) => {
			var loginData = {
				username: payload.username,
				password: payload.password,
			}
			
			axios.post(`${apiUrl}auth/signin`, loginData).then((res) => {
				if( res.data.success ) {
					context.commit('UPDATE_SIGNED', true);
					context.commit('UPDATE_USER_INFO', res.data);
	
					axios.defaults.headers.common['x-access-token'] = res.data.accessToken					
				}
				
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},

    requestReset( context, payload ) {
        return new Promise(( resolve, reject ) => {
            axios.post(`${apiUrl}auth/requestPasswordReset`, payload).then((res) => {
                resolve(res);
            }).catch(err => {
                reject( new Error(err) );
            })
        })
    },

    resetPassword( context, payload ) {
        return new Promise(( resolve, reject ) => {
            axios.post(`${apiUrl}auth/resetPassword`, payload).then((res) => {
                resolve(res);
            }).catch(err => {
                reject( new Error(err) );
            })
        })
    },

	updateProfileImage(context, payload){
		return new Promise((resolve, reject) => {
			var profileData = {
				profileImg: payload
			}

			axios.post(`${apiUrl}user/profileImage`, profileData).then((res) => {
				context.commit('UPDATE_USER_INFO', res.data);
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},

	updateProfileData(context, payload)	{
		return new Promise((resolve, reject) => {
			var profileData = {
				email: payload.email,
				firstname: payload.firstname,
				lastname: payload.lastname,
				username: payload.username,
			}

			axios.post(`${apiUrl}user/profileUpdate`, profileData).then((res) => {
				context.commit('UPDATE_USER_INFO', res.data);
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	generateNFT(context, payload) {
		return new Promise((resolve, reject) => {
			var nftdata = {
				datalink: payload.dataUrl,
				title: payload.title,
				detail: payload.detail,
				price: payload.price,
			}

			axios.post(`${apiUrl}nftdata/create/`, nftdata).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	getNFTs() {
		return new Promise((resolve, reject) => {
			axios.get(`${apiUrl}nftdata/getall/`).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	getNFTById(context, payload) {
		return new Promise((resolve, reject) => {
			axios.get(`${apiUrl}nftdata/get/${payload.id}`).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	getNFTCollections() {
		return new Promise((resolve, reject) => {
			axios.get(`${apiUrl}nftdata/getbyUser`).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	logout(context){
		return new Promise((resolve) => {
			context.commit('LOGOUT');
			delete axios.defaults.headers.common['Authorization']
			resolve('loged out')
		})
	},
	setLoading( context, payload ) {
		return new Promise((resolve) => {
			context.commit('SETLOADING', payload)
			resolve('Set Loading')
		}).catch(err => {
			console.warn('setLoading error: ', err);
		})
	},
	getBadWordList( ) {
		return new Promise(( resolve, reject ) => {
			axios.post(`${apiUrl}app/getBadWordList`).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	sendTicketAction( context, payload ) {
		return new Promise(( resolve, reject ) => {
			axios.post(`${apiUrl}app/sendTicket`, payload).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
	fetchChats() {
		return new Promise((resolve, reject) => {
			axios.post(`${apiUrl}user/getContacts`).then(res => {
				resolve(res);
			}).catch(err => {
				reject( new Error(err) );
			})
		})
	},
	openChat(context, payload) {
		return new Promise((resolve, reject) => {
			axios.get(`${apiUrl}user/getUserChat/${payload.userId}`).then(res => {
				resolve(res);
			}).catch(err => {
				reject( new Error(err) );
			})
		})
	},
	sendChatMessage( context, payload ) {
		return new Promise((resolve, reject) => {
			axios.post(`${apiUrl}user/chat/sendUserMessage`, payload).then(res => {
				resolve(res);
			}).catch(err => {
				reject( new Error(err) );
			})
		})
	},
	saveTransactionHistory( context, payload ) {
		console.error(payload);
		return new Promise((resolve, reject) => {
			axios.post(`${apiUrl}app/saveTransactionHistory`, payload).then(res => {
				resolve(res);
			}).catch(err => {
				reject( new Error(err) );
			})
		})
	},
	convertPicture(context, payload) {
		return new Promise((resolve, reject) => {
			const imageData = payload.imageData;
			axios.post(`${apiUrl}nftdata/convertPicture`, {imageData: imageData}).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(new Error(err));
			})
		})
	},
}

export default actions
