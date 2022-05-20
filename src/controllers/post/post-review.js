const { ERROR_MESSAGES, STATUS_MESSAGES } = require('../../config/message');
const {moview} = require('../../config/database');

const postReview = (req, res) => {
    const newMoview = new moview({
        title: req.body.title,
        content: req.body.content,
    });

    newMoview.save((e) => {
        if (e) {
            return res.status(404).send({
                staus: STATUS_MESSAGES.FAIL,
                data: {
                    errorMessage: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                },
            });
        } else {
            res.status(200).send({
                staus: STATUS_MESSAGES.SUCCESS,
                data: {
                    newMoview,
                },
            });
        }
    });
};
module.exports = postReview;
