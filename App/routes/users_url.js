module.exports = (app)=>{
    require('../controllers/common.controller')(app)
    app.get('/user',(req,res)=>{

        res.render('dashboard/index')
    })

}