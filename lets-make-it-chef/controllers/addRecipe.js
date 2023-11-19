const cloudinary = require("../middleware/cloudinary");
const Recipes = require('../models/Recipes') //we will use this when looking at other recipes

module.exports = {
    getAddRecipe: (req,res)=>{
        res.render('addRecipe.ejs')
    },

    addRecipe: async (req, res)=>{
        try{
            const result = await cloudinary.uploader.upload(req.file.path);
            await Recipes.create({instructions: req.body.instructions.trim().split('\n'), ingredient: req.body.ingredient.trim().split('\n'),  user: req.user.id, title: req.body.title, image: result.secure_url, cloudinaryId: result.public_id}) //change Todo later //amount: req.body.amount,
            console.log('Recipe Has Been Added!')
            res.redirect('/my-recipes') //CREATE A YOUR RECIPE HAS BEEN CREATED SUCCESS MESSAGE
        }catch(err){
            console.log(err)
            console.log(req.body)
            //GETING CAUGHT HERE so it looks like it is not taking in the instructions, amount, etc check the add-recipes and compare. 
           
        }
    },
}