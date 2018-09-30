var middlewareObj={};
var Comment=require("../models/comment");
var Campground=require("../models/campground");

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        //If user is logged in
        Comment.findById(req.params.comment_id,function(err,foundComment){
           if(err || !foundComment){
               res.redirect("back");
           } 
           else{
               if(foundComment.author.id.equals(req.user._id)){
                   //if user is author of comment
                    next();   
               }
               else{
                   //if user is not author of comment
                   req.flash("error","You do not have permission to do that!!");
                   res.redirect("back");
               }
           }
        });
    }
    else{
        //if user is not logged in
        req.flash("error","You need to be login first!!");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnership=function (req,res,next){
    if(req.isAuthenticated()){
        //If user is logged in
        Campground.findById(req.params.id,function(err,foundCampground){
           if(err || !foundCampground){
               req.flash("error","Campground not found.");
               res.redirect("back");
           } 
           else{
               if(foundCampground.author.id.equals(req.user._id)){
                   //if user is author of campground
                    next();   
               }
               else{
                   //if user is not author of campground
                   req.flash("error","You do not have permission to do that!!");
                   res.redirect("back");
               }
           }
        });
    }
    else{
        //if user is not logged in
        req.flash("error","You need to be login first!!!");
        res.redirect("back");
    }
}
//login check middleware
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be login first!!!");
    res.redirect("/login");
}

module.exports = middlewareObj;