//exporting the add recipe page

module.exports = {
    getAddRecipe: (req,res)=>{
        res.render('addRecipe.ejs')
    }
}