module.exports = (req, res, next) => {
    const err = new Error('Ohhhhhh buddy, y\'aint found nothin\'');
    err.status = 404;
    next(err);
};
