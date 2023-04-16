const usuarioValido = {
    'user': 'admin',
    'pass': 'admin'
  }


//Verify if credentials match witch hash
exports.verifyCredentials = (user, pass) => {
    if(user == usuarioValido.user && pass == usuarioValido.pass){
        return new Promise(async (resolve) => { resolve(true)});
    }
    else{
        return new Promise(async (resolve) => { resolve(false)});
    }
    
}

exports.getPrivateKey = () => 'SECRET-KEY;'