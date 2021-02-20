import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    console.log('Token', token);
    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      console.log('decodedData', decodedData);
      req.userId = decodedData && decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      console.log('Google decodedData', decodedData);
      req.userId = decodedData && decodedData.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
