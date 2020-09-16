//  For handling Authentication. Callback function pushes path to props.history. 
// (When logout pushes '/' to history and 
// so can't simply redirect to dashboard without login)

class Auth {
    constructor(){
        this.authenticated = false
    }
    
    login(callback){
        this.authenticated = true
        callback()
    }
    
    logout(callback){
        this.authenticated = false
        callback()
    }

    status(){
        return this.authenticated
    }
}


export default new Auth()