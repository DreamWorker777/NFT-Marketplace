
const userState = {
    genTokenDate: '',
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    id: '',
    wallet: ''
}

const state = {
    AppActiveUser: userState,
    loggedState: false,
    web3: null,
    isLoading: false,
}

export default state