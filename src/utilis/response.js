export const response=(res,statusCode,success,message,data)=>{
    return res.status(statusCode).json({
        statusCode:statusCode,
        success:success,
        message:message,
        data:data || []
    })
}