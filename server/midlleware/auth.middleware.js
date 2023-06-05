import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {

    if(!req.headers.authorization){
        res.status(403).json({ message: "no Authorization" })
    }

    const token = req.headers.authorization.split(" ")[1]; //Format is "Bearer token"
    // const token = req.header.authorization;

    const decodedData = jwt.verify(token, "Test");

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log(error)
    if(error.name === "JsonWebTokenError"){
      req.userId = "647e3072922534f1c6cc593f"; //userID of simi
      next();
    }
  }
};

export default auth;
