const crypto=require('crypto');

exports.createHash=(password)=>{
    let salt=crypto.randomBytes(32).toString('hex')
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return{
        salt,
        hash
    }
}

exports.verfiyPassword=(password,hash,salt)=>{
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
   return genHash==hash;
}