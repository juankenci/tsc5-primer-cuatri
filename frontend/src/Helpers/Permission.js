import axios from "./API";


class Permission {
    constructor(conf) {
        this.modulo = conf.modulo
        this.pantalla = conf.pantalla
        this.setAllowedAction = conf.setAllowedAction ? conf.setAllowedAction : null
        this.setLoadingPermisos = conf.setLoadingPermisos
        this.history = conf.history
        this.url = '/seguridad/usuarios/permisos/listarAccciones'
    }

    _getUserData() {
        return localStorage.getItem("usuariosDataTOC") ? JSON.parse(localStorage.getItem("usuariosDataTOC")) : null;
    }

    _getToken() {
        const userData = this._getUserData()
        return userData && userData.token ? userData.token : ''
    }

    _isToken() {
        return this._getToken() === '' ? false : true
    }
    _handlePermissions(data) {
        // si no tiene ningun permiso no tiene acceso
        if (data.permisos.length === 0) {
            this.history.push("/accesoDenegado")
        } else {
            const permisos = data.permisos
            if (permisos.includes("acceso")) {
                //seteo de acciones permitidas
                if (this.setAllowedAction) { this.setAllowedAction(permisos) }
                this.setLoadingPermisos(false)
            } else {
                this.history.push("/accesoDenegado")
            }
        }
    }

    _tokenExpired(data) {
        const MSG_API_TOKEN = 'Token vencido. Inicie sesion de nuevo.'
        const isWordInMsg = data.msg.indexOf("vencido") === -1 ? false : true
        return data.msg === MSG_API_TOKEN || isWordInMsg
    }

    _handleError(data) {
        if (this._tokenExpired(data)) {
            //Si el token vencio desloguea al usuario
            this.history.push('/logout');
        } else if (data.msg === 'Cambiar password') {
            //si el usuario tiene pendiente un cambio de contraseña, lo redirige a cambio de contraseña
            this.history.push({
                pathname: "/cuenta/cambiarClave",
                state: { showSidebar: false }
            })
        } else {
            console.log("Fallo al validar permisos. Error de API: " + data.msg);
        }
    }

    _responseOK(data) {
        return data.status === 'error' ? false : true
    }

    async applyPermission() {
        //si no tiene token, el usuario no esta logueado
        if (!this._isToken()) {
            this.history.push("/login");
            return;
        }
        try {
            const response = await axios.post(this.url, { modulo: this.modulo, pantalla: this.pantalla })
            if (this._responseOK(response.data)) {
                this._handlePermissions(response.data)
            } else {
                this._handleError(response.data)
            }
        } catch (error) {
            console.log(error)
            this.history.push('/logout');
        }
    }
}

export default Permission;