import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

   res.cookie("token" ,token ,{
    maxAge : 7*24*60*60*1000,
    httpOnly : true,
    secure : process.env.NODE_ENV === "development" ? false : true ,
    sameSite : "strict"
   })

    return token;
};

export default generateToken;