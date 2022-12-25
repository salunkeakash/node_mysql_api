const {verify, decode} = require('jsonwebtoken');
module.exports =
{
    checktoken:(req,res,next)=>{
        let token = req.get('authorization');
        if(token)
        {
            token = token.slice(7);
            verify(token , 'test123',(err,decoded)=>{
                if(err)
                {
                    res.json({
                        success:0,
                        message:'invalid token'
                    })
                }else
                {
                    next()
                }
            })
        }
        else
        {
            res.json({
                success:0,
                message:"Access Denied unauthorized user"
            });
        }
    }
}