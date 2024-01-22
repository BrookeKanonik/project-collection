module.exports = {
    getMyList: (req,res)=>{
        res.render('myList.ejs')
    },

    addItem: async (req, res)=>{
        try{
            console.log('Grocery Item Has Been Added!')
            res.redirect('/list') 
        }catch(err){
            console.log(err)
            console.log(req.body)
            //GETING CAUGHT HERE so it looks like it is not taking in the instructions, amount, etc check the add-recipes and compare.           
        }
    },
}