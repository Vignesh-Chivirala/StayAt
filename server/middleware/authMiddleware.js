import User from "../models/User.js";


export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  console.log(userId);
  
  if (!userId) {
    res.json({ success: false, message: "not authenticated" });
  } else {
    const user = await User.findOne({ _id: userId });
    req.user = user;
    next();
  }
};