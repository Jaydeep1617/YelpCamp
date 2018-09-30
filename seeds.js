var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name:"Kriti Sanon",
        image:"https://images.mid-day.com/images/2018/feb/Kriti-Sanon-Black.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non roident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Deepika Padukone",
        image:"https://i0.wp.com/www.eventznu.com/wp-content/uploads/2017/11/DeepikaPadukone-GQFashion1.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non roident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Disha Patani",
        image:"http://latesthdpictures.com/wp-content/uploads/2018/04/Disha-Patani-Beautiful-HD-Wallpaper-Latest-free.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non roident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        } 
        else{
            console.log("campgrounds removed");
            data.forEach(function(seed) {
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    } 
                    else{
                        console.log("campground addeed");
                        Comment.create({
                            text:"Very nice Photo",
                            author:"anonymous"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Comment added");
                            }
                        });
                    }
                });
            })
        }
    });    
};

module.exports = seedDB;
