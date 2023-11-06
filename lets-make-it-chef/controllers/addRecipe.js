const Recipes = require('../models/Recipes') //we will use this when looking at other recipes

module.exports = {
    getAddRecipe: (req,res)=>{
        res.render('addRecipe.ejs')
    },

    addRecipe: async (req, res)=>{
        try{
            await Recipes.create({instructions: req.body.instructions, ingredient: req.body.ingredient, amount: req.body.amount, userId: req.user.id}) //change Todo later
            console.log('Recipe Has Been Added!')
            res.redirect('/my-recipes') //CREATE A YOUR RECIPE HAS BEEN CREATED SUCCESS MESSAGE
        }catch(err){
            console.log(err)
            console.log(req.body)
            //GETING CAUGHT HERE so it looks like it is not taking in the instructions, amount, etc check the add-recipes and compare. 
           
        }
    },
}