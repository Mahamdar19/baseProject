
const User = require('./userModel');


const persist = (parrams)=>{

    const user = new User();
    user.name = parrams.name;
    user.email = parrams.email;
    user.password = parrams.password;
    user.gender = parrams.gender;
    return user.save()

}


const findById = (parrams)=>{
   return User.findById({_id:parrams}).exec()
    }

const list = ()=>{
    return User.find().exec()
}

const update = (parrams)=>{
    User.findOne({'_id':parrams}).exec();
    promise.then(function(user){
    //console.log(user)
    user.name = parrams.name;
    user.email = parrams.email;
    user.password = parrams.password;
    user.gender = parrams.gender; 
    return user.save()
    });
}

const remove = (parrams)=>{
   return User.deleteOne({'_id':parrams})
}

const search = ()=>{
    
}



module.exports ={
    persist,
    findById,
    list,
    remove,
    search,
    update
}