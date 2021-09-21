export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('userInfo'));
    
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }