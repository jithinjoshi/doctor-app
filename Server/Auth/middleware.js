import jwt from 'jsonwebtoken';

export const Auth = ((req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(401).json({ err: 'Authentication failed' });
      } else {
        req.user = decoded;
        next();
      }
    });

  } catch (error) {
    res.status(401).json({ err: 'unauthorized user' });
  }
})


export const refreshToken = ((req, res, next) => {
  const cookies = req.headers.cookie
  const prevToken = cookies.split("=")[1];
  console.log(prevToken);
  if (!prevToken) {
    return res.status(400).json({ message: "couldn't find the token" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ msg: "Authentication failed" })
    } 
    res.clearCookie(`${decoded.userId}`);
    req.cookies[`${decoded.userId}`] = "";

    const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
      expiresIn: '30s'
    });

    res.cookie(String(decoded.userId), token, {
      path: "/",
      expiresIn: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax"
    })

    req.id = decoded.userId;
    next();

  });
})

export const checkIsBlocked =  (req,res,next) => {
  console.log(req.user);

}


