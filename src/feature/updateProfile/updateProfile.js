import axios from 'axios'

const API_URL="http://localhost:8080/api/auth/users/update"

class updateProfile{
    update(user){
    return axios.put(API_URL, user);
    }
}

export default new updateProfile();