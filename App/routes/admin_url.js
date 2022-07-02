module.exports = (app) => {

    require('../controllers/common.controller')(app)



    app.get('/admin',(req,res)=>{
       
        res.render('dashboard/index');
    })

}