import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            console.log("Im inside create user: the promise data: ",data);
            // axios.post('/api/auth/register', data)
            axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                email: data.email,
                username: data.username,
                password: data.password,
                role: data.role
            })
                .then(response => {
                    if ( response.data )
                    {
                        console.log("I'm inside axios post sign up: response data: ", response.data);
                        //this.setSession(response.data.token);
                        //resolve(response.data.user);
                    }
                    else
                    {
                        console.log(response);
                        reject(response.data.error);
                    }
                });

        });
    };

    signInWithEmailAndPassword = (email, password) => {
        console.log(email);
        console.log(password);
        let data = JSON.stringify({
            password: password,
            username: email
        })
        return new Promise((resolve, reject) => {
            // axios.get('/api/auth', {
               axios.post(`${process.env.REACT_APP_API_URL}/authenticate`,data,{
                 headers: {
                       'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log('RESPONSE DATA: ', response.data);
                if ( response.data )
                {
                    this.setSession(response.data.token);
                    resolve(response.data);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            // axios.get('/api/auth/access-token', {
               axios.get(`${process.env.REACT_APP_API_URL}/signinWithJWT`,{
                data: {
                    access_token: this.getAccessToken()
                }
            })
                .then(response => {
                    if ( response.data.user )
                    {   console.log(response.data);
                        this.setSession(response.data.token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if ( access_token )
        {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
