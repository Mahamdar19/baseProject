'use strict';

const Post=require('./postModel');
const User=require('../user/userModel');
const express = require('express');
const _ = require('lodash');
const mongoose  = require('mongoose');
const appRoute = new express.Router();

const responseHandler =  require('../../util/responseHandler')



module.exports = function () {

    appRoute.post('/:id',function (req,res) {
        try{    
            let userId= req.params.id
            let promise = User.findOne({_id:userId}).exec();
            promise.then(function(data){
    
                let responseBody = {}  
                responseBody = _.isEmpty(req.body) ? responseHandler.success("request body can not be  empty ",[],400,res)  : req.body 
    
                req.checkBody("title", "please provide a title ").notEmpty();
                req.checkBody("body", "please provide body for your post ").notEmpty();
    
                const post = new Post();
                post.title = responseBody.title;
                post.body = responseBody.body;
                post.userId = userId;
                post.save().then(function(err, doc){
                    console.log(err);
                    console.log(doc);
                    responseHandler.success("post created successfully",post,200,res)
                
                });
               
            });
    
        }catch(exception){
            console.log('error    ',exception)
            responseHandler.error("internal server error",exception,500,res);
    
        }
    });
    

    //get post data by user id
    appRoute.get('/:id',function (req,res) {

        try{

            let userId= req.params.id
            let promise = Post.find({userId:userId}).exec();
            promise.then(function(data){
            responseHandler.success("post data retrieved successfully",data,200,res)
         })

         //try{
           // let userId= req.params.id
           // let promise = Post.findById({_id:userId}).exec();
            //promise.then(function(data){
            //   responseHandler.success("post data retrieved successfully",data,200,res)
           // })
   

        }catch(exception){
            console.log('error',exception)
            responseHandler.error("internal server error",exception,500,res);

        }
    });


    appRoute.delete('/:id',function (req,res) {
    
        try{
    
                let userId= req.params.id
                let promise= Post.deleteOne({'_id':userId}).exec();
                promise.then(function(err, result){
                        console.log('errr',err)
                    if(!err.deletedCount) responseHandler.error("post not found",err,400,res);
                    responseHandler.success("post deleted successfully",[],200,res)
                    
                })

            } catch(exception){
                console.log('error    ',exception)
                responseHandler.error("internal server error",exception,500,res);
    
            }
        });


    
    return appRoute;

}