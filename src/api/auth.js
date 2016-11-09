const auth = {
    parseJwt (token) {
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        var result = JSON.parse(window.atob(base64))
        console.log('parse jwt', result)
        return result
    },
    saveToken (token) {
        console.log('save token')
        window.localStorage['jwtToken'] = token
    },
    getToken () {
        return window.localStorage['jwtToken']
    },
    isAuthed () {
        var token = this.getToken()
        if (token) {
            var params = this.parseJwt(token)
            return Math.round(new Date().getTime() / 1000) < params.exp
        } else {
            return false
        }
    },
    logout () {
        window.localStorage.removeItem('jwtToken')
    }
}

module.exports = auth
