module.exports = (app)=>{
    app.get('/user',(req,res)=>{

        res.render('dashboard/index')
    })

}