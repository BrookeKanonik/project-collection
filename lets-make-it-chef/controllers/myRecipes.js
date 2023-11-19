const cloudinary = require("../middleware/cloudinary");
const Recipes = require('../models/Recipes')
const User = require('../models/User') //MAYBE GET THE USERNAME THIS WAY??

module.exports = {
    getMyRecipes: async (req,res)=>{
        //console.log(req.user)
        try{
            const recipeItems = await Recipes.find({user: req.user.id}).sort({createdAt: "desc"}).lean() //needs adjusting
            const userInfo = await User.find({ _id: req.user.id })
            console.log(userInfo)
            console.log('IS IT WORKING??? USERINFO ABOVE?')
            //const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) //needs adjusting
            res.render('myRecipes.ejs', {recipes: recipeItems, user: req.user, info: userInfo})//, {todos: todoItems, left: itemsLeft, user: req.user}) //needs adjusting
            
        }catch(err){
            console.log(err)
        }
    },

    getAllRecipes: async (req,res) =>{
        try{
            const allRecipes = await Recipes.find().sort({createdAt: "desc"}).lean()
            res.render('recipes.ejs', {allRecipes: allRecipes})
        }
        catch (err){
            console.log(err);
        }

    },
    deleteRecipe: async (req,res) =>{
        try {
            // Find post by id
            let recipe = await Recipes.findById({ _id: req.params.id });
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(recipe.cloudinaryId);
            // Delete post from db
            await Recipes.deleteOne({ _id: req.params.id });
            console.log("Deleted Post");
            res.redirect("/my-recipes");
          } catch (err) {
            res.redirect("/recipes");
            console.log(err)
            //is an error so it is coming here for the delete button. will check out.
          }
        },
}