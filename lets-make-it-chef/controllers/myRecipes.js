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

    }
}