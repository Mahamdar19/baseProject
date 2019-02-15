/**
 * Created by damjad on 12/5/17.
 */
'use strict';

const User = require('./userModel');
const Post = require('../post/postModel');
const Address=require('./addressModel');
//const Post=require('./postModel');
const express = require('express');
const _ = require('lodash');
const mongoose  = require('mongoose');
const appRoute = new express.Router();

const responseHandler =  require('../../util/responseHandler')

const userService = require('./userService')

module.exports = ()=> {

    /**
     * Function to get list of all users
      */

    appRoute.get('/',(req,res)=> {

         try {
       
         let promise= userService.list()
         promise.then((data)=>{
         console.log('data', data)
         responseHandler.success("List of users retrieved successfully",data,200,res)
         })


        } catch(exception){
            console.log('error    ',exception)
            responseHandler.error("internal server error",exception,500,res);

        }

    });


    /**
     * Function to get user by id
      */
    
    appRoute.get('/:id',(req,res)=> {

        try{
         let userId= req.params.id
         let promise = userService.findById(userId)
         promise.then((data)=>{
            responseHandler.success("user's data retrieved successfully",data,200,res)
         })    

        }catch(exception){
            console.log('error',exception)
            responseHandler.error("internal server error",exception,500,res);

        }

});

    /**
     * Function to create user
      */
    
     appRoute.post('/',(req,res)=>{
        try{        

            let responseBody = {}  
            /* validations*/
            responseBody = _.isEmpty(req.body) ? responseHandler.success("request body can not be  empty ",[],400,res)  : req.body 
    
            req.checkBody("name", "plaese provide name ").notEmpty();
            req.checkBody('email', 'Must be a valid email').isEmail();
            req.checkBody("password", "plaese provide password ").notEmpty();
            req.checkBody("gender", "plaese provide gender ").notEmpty();

            let errorValidations = req.validationErrors();
            if (errorValidations) {
                responseHandler.error(errorValidations,[],400,res)
                return;
            }

            let promise = userService.persist(responseBody)
            promise.then((user)=>{
                responseHandler.success("user created successfully",user,200,res)
            })
            

        }catch(exception){
            console.log('error    ',exception)
            responseHandler.error("internal server error",exception,500,res);

        }
});

 

   /**
     * Function to delete user by id
      */

appRoute.delete('/:id',(req,res) =>{
    
    try{

            let userId= req.params.id
            console.log(userId)
            
            let promise= userService.remove(userId)
            promise.then((err, result)=>{
                    console.log('errr',err)
                if(!err.deletedCount) responseHandler.error("user not found",err,400,res);
                responseHandler.success("user deleted successfully",[],200,res)
                })

         
    } catch(exception){
        console.log('error    ',exception)
        responseHandler.error("internal server error",exception,500,res);

    }

}); 
    
     /**
     * Function to update user
      */

appRoute.put('/:id',(req,res)=> {
    try{        
        let responseBody = {}  
        /* validations*/
        responseBody = _.isEmpty(req.body) ? responseHandler.success("request body can not be  empty ",[],400,res)  : req.body 
        
           req.checkBody("name", "plaese provide name ").notEmpty();
            req.checkBody('email', 'Must be a valid email').isEmail();
            req.checkBody("password", "plaese provide password ").notEmpty();
            req.checkBody("gender", "plaese provide gender ").notEmpty();

        let errorValidations = req.validationErrors();
            if (errorValidations) {
                responseHandler.error(errorValidations,[],400,res)
                return;
            }

            let userId= req.params.id
            let promise = userService.update(userId)
            promise.then((user)=>{
                responseHandler.success("user updated successfully",user,200,res)
            })
            
            
}catch(exception){
        console.log('error ',exception)
        responseHandler.error("internal server error",exception,500,res);

    }
});







    appRoute.get('/signup',(req,res) =>{
        // check params

        const user = new User();
        user.name = req.body.name;
        user.save()
        res.send(user);
        res.status(200).send({'msg' : 'I am Workign Fine', "user": user});

    });


    


 return appRoute;

}
