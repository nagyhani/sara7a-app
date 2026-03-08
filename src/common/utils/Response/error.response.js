

export  class badRequest extends Error{

   
    constructor(message){
       super(message,{cause:400})
    }
}

export  class conflict extends Error{

   
    constructor(message){
       super(message,{cause:409})
    }
}


export  class notFound extends Error{

   
    constructor(message){
       super(message,{cause:404})
    }
}

export  class unauthorized extends Error{

   
    constructor(message){
       super(message,{cause:401})
    }
}




export const errorGlobalHandler = (error, req, res, next)=>{
    const status = error.cause || 500
    return res.status(status).json({
        error : error,
        message : error.message,
        stack : error.stack
    })
}