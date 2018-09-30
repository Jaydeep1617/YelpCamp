var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    seedDB         = require("./seeds"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    User           = require("./models/user"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash"),
    port           = 1617;

//Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
//setup environment variable using export in cmd line \
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
// mongoose.connect("mongodb://jaydeep:eraniya1617@ds027519.mlab.com:27519/yelpcamp1617");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//enter data into database
//seedDB();

app.use(require("express-session")({
    secret:"Any  String you wanted.",
    resave:false,
    saveUninitialized:false
}));

//PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new  localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass current user to all the routes
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(port, function(){ 
  console.log('YelpCamp,listening on port - ' + port)
});
// app.listen(process.env.PORT,process.env.IP,function(){
//    console.log("YelpCamp Server has started"); 
// });