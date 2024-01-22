import request from "./utils/request";

class Api {
    
    static urlAPI() {
        return  process.env.REACT_APP_BACKEND_URL
    }

    // Begin :: Auth
    static Login(username, password) {
        let path = 'login';
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

    // Relawan

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
    // Masyarakat

    static GetMasyarakat(token, keyword) {
        let path = `masyarakat/get?search=${keyword}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetMasyarakatById(token, id) {
        let path = `masyarakat/get-detail/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateMasyarakat(token, data) {
        let path = `masyarakat/create`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdateMasyarakat(token, data, id) {
        let path = `masyarakat/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeleteMasyarakat(token, id) {
        let path = `masyarakat/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Kecamatan dan Desa

    static GetKecamatanDesa(token, id) {
        let path = `list-kecamatan-desa?districts_id=${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // Form Type
    static GetTypeForm(token) {
        let path = `type-formulir/get`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetTypeFormById(token, id) {
        let path = `type-formulir/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateTypeForm(token, data) {
        let path = `type-formulir/create`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdateTypeForm(token, data, id) {
        let path = `type-formulir/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static DeleteTypeForm(token, id) {
        let path = `type-formulir/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Form

    static CreateForm(token, data) {
        let path = `formulir/create`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static GetForm(token) {
        let path = `formulir/get`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetFormByTypeForm(token, id) {
        let path = `formulir/get/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetIndikator(token) {
        let path = `indikator`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetDetailIndikator(token, id) {
        let path = `indikator-detail/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetBatasArea(token) {
        let path = `batas-area-map`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }




}

export default Api