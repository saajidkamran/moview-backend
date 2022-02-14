const joi = require("joi");
const moviewValidate = function moviewValidate(req, res, next) {
    const schema = joi.object({
        title: joi.string().min(3).required(),
        
    });
    var { error } = schema.validate(req.body);
    if (!error) {
        return next();
    } else {
        return res.status(400).send(error.details[0].message);
    }
}
module.exports = moviewValidate;