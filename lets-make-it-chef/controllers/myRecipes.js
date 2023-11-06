const Recipes = require('../models/Recipes')

module.exports = {
    getMyRecipes: async (req,res)=>{
        console.log(req.user)
        try{
            const recipeItems = await Recipes.find({userId:req.user.id}) //needs adjusting
            //const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) //needs adjusting
            res.render('myRecipes.ejs', {recipes: recipeItems, user: req.user})//, {todos: todoItems, left: itemsLeft, user: req.user}) //needs adjusting
        }catch(err){
            console.log(err)
        }
    },
}