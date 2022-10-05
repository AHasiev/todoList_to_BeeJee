const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    
    const { authorization } = req.headers;
    // req.headers.token
    if(!authorization) {
        return res.status(402).json({error: "Нет доступа (no authorization header)"})
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json({error: "неверный тип токен"});
    }

    try {
        req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
        
        next();

    //   console.log(payload.id);
    //   const todo = await Todo.create({
    //     user: payload.id,
    //     text: text,
    //   });
    //   return res.json(todo);

    } catch (e) {
      return res.status(401).json({error: "Ошибка авторизации:" + e.toString()});
    }
}