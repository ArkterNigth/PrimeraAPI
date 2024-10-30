const indexRouter={}

const Index={
    usuarioRouter:require('./usuarioRouter')
}

indexRouter.index=(app)=>{
    app.use(Index.usuarioRouter)
}

module.exports=indexRouter