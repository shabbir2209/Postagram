import jwt from 'jsonwebtoken';

// the auth middleware
// This middleware is passed onto the server and frontend to check whether the user is logged in and which user for the user permissions
const auth = async (req,res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id
        }else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch(err){
        console.log(err)
    }
}

export default auth;