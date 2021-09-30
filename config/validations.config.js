const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const productValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        points: Joi.number().min(0).required(),
        category: Joi.string().required(),
        subcategory: Joi.string().required(),
    });
    return schema.validate(data);
}

const orderValidation = (data) => {
    const schema = Joi.object({
        product: Joi.string().required(),
        deliveryStatus: Joi.string().valid('separacao', 'trajeto', 'entregue').required(),
    });
    return schema.validate(data);
}

const balanceValidation = (data) => {
    const schema = Joi.object({
        points: Joi.number().required()
    });
    return schema.validate(data);
}

const statementValidation = (data) => {
    const schema = Joi.object({
        product: Joi.string().required(),
        pointsUsed: Joi.number().required()
    });
    return schema.validate(data);
}

const addressValidation = (data) => {
    const schema = Joi.object({
        zip: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().valid('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO').required(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
module.exports.orderValidation = orderValidation;
module.exports.balanceValidation = balanceValidation;
module.exports.statementValidation = statementValidation;
module.exports.addressValidation = addressValidation;
