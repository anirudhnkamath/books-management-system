import jwt from "jsonwebtoken"

const verifyUser = async (req, res, next) => {
  const userToken = req.header("Authorization")?.split(' ')[1];
  if(!userToken) return res.status(401).send({message: "User login required."});

  jwt.verify(userToken, process.env.SECRET_TOKEN, (err, decoded) => {
    if(err) return res.status(500).send({message: err.message});
    req.user = decoded;
    next();
  });
}

export default verifyUser;