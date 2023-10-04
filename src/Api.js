import request from "./utils/request";

class Api {


    static urlAPI() {
        return 'http://localhost:5000/'
    }

    // Begin :: Auth
    static Login(username, password) {
        let path = 'admin/login';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data: {
                username,
                password,
            },
        })
    }

    static AccessToken() {
        let path = `admin/newToken`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
        })
    }

    static Fetch(token) {
        let path = `fetch`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CountDashboard(token) {
        let path = `count-dashboard`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetRelawan(token, keyword) {
        let path = `relawan/get?search=${keyword}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetRelawanById(token, id) {
        let path = `relawan/get-detail/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateRelawan(token, data) {
        let path = `relawan/create`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdateRelawan(token, data, id) {
        let path = `relawan/put/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeleteRelawan(token, id) {
        let path = `relawan/delete/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }



}

export default Api