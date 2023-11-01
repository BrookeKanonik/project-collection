//const Recipes = require('../models/Recipes') we will use this when looking at other recipes

module.exports = {
    getAddRecipe: (req,res)=>{
        res.render('addRecipe.ejs')
    },

    addRecipe: async (req, res)=>{
        try{
            await Todo.create({recipe: req.body}) //change Todo later
            console.log('Recipe Has Been Added!')
            res.redirect('/') //CREATE A YOUR RECIPE HAS BEEN CREATED SUCCESS MESSAGE
        }catch(err){
            console.log(err)
        }
    },
}