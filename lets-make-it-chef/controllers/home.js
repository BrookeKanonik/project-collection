//exporting the homepage

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    }
}