const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {

    let status = err.status || 500;

    if(err instanceof mongoose.Error.ValidationError ||
        err instanceof mongoose.Error.CastError) {
        status = 400;
    }
  
    res.status(status);

    res.send({
        status,
        message: err.message
    });
};
