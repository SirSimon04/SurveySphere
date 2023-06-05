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
      req.userId = "646f3ab231c189c4a0134615"; //userID of Mimming
      next();
    }
  }
};

export default auth;
