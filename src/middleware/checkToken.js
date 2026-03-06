const VALID_TOKEN = 'HIZe4D32twWOUP9h0I1IVTlr';

function checkToken(req, res, next) {
  if (req.method === 'GET') {
    return next();
  }

  const token = req.headers['token'];

  if (!token || token !== VALID_TOKEN) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Header "token" inválido o faltante.',
    });
  }

  next();
}

module.exports = checkToken;