import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {

    if(!req.headers.authorization){
        res.status(403).json({ message: "no Authorization" })
    }

    const token = req.headers.authorization.split(" ")[1]; //Format is "Bearer token"

    const decodedData = jwt.verify(token, "Test");

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default auth;
