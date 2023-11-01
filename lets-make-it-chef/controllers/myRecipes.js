const MyRecipes = require('../models/MyRecipes')

module.exports = {
    getMyRecipes: async (req,res)=>{
        console.log(req.user)
        try{
            // const todoItems = await Todo.find({userId:req.user.id}) //needs adjusting
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) //needs adjusting
            res.render('myRecipes.ejs')//, {todos: todoItems, left: itemsLeft, user: req.user}) //needs adjusting
        }catch(err){
            console.log(err)
        }
    },
}