
module.exports = (app)=>{
    app.use((req,res,next)=>{
        let url_name = req.url;
        let url_params = url_name.split('/');
        let url_param = url_params[1];
        app.locals.url_usename = url_param;
        next();
        
    })
}
   
