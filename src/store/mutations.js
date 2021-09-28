const mutations = {
  UPDATE_USER_INFO(state, payload) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser

    for (const property of Object.keys(payload)) {

      if (payload[property] != null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property]

        // Update key in localStorage
        userInfo[property] = payload[property]
      }
    }
    // Store data in localStorage
    userInfo['genTokenDate'] = new Date();
    console.log('updateer');
    console.log(state.AppActiveUser);
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  },
  
  UPDATE_SIGNED(state, payload) {
    const logged = localStorage.getItem("loggedState") || payload;
    localStorage.setItem('loggedState', payload);
    state.loggedState = logged;
  },

  INITWEB3(state, payload) {
    state.web3 = payload;
  },

  LOGOUT(state){
    state.loggedState = false;
    state.AppActiveUser = null;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('loggedState');
  },

  SETLOADING(state, payload) {
    state.isLoading = payload;
  } 
}

export default mutations