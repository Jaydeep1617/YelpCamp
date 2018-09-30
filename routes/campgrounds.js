var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX - SHOW ALL Campgrounds
router.get("/", function(req, res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});    
        }
    });
});

//CREATE ROUTE
router.post("/",middleware.isLoggedIn ,function(req, res){
    // var name = req.body.name;
    // var image = req.body.image;
    // var desc = req.body.description;
    // var newCampground = {name:name,image:image,description:desc};
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    req.body.campground.author=author;
    Campground.create(req.body.campground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }    
        else{
            //console.log(newlyCreated);
            req.flash("success","Campground added successfully.");
            res.redirect("/campgrounds");    
        }
    });
});

router.get("/allphotos",function(req, res) {
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/all",{campgrounds:allCampgrounds});    
        }
    });
});

//NEW ROUTE
router.get("/new",middleware.isLoggedIn ,function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW ROUTE
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } 
       else{
            res.render("campgrounds/show",{campground:foundCampground});    
       }
    });
});


//Edit campground route-Show edit form
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});   
    });
});
//Upadate campground route-update logic
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update in single function
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
           req.flash("success","Campground updated successfully.");
           res.redirect("/campgrounds/"+req.params.id);
       }
   });
});

//Destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground deleted successfully.");
            res.redirect("/campgrounds");    
        }
   });
});

module.exports = router;
