const VALID_AUTH = 'fha5HpDXSXSjKU0QCbdXiz1a';

function checkAuth(req , res , next){
  const auth = req.headers['auth'];

  if(!auth || auth !== VALID_AUTH){
     return res.status(401).json({
      success: false,
      message: 'Unauthorized: Authorization header inválido o faltante.',
    });
  }
  next();
}
module.exports = checkAuth;