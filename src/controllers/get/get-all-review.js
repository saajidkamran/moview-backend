const { ERROR_MESSAGES, STATUS_MESSAGES } = require('../../config/message');
const moview = require('../../config/database');

const allReview = (req, res) => {
    moview.find((e, foundAticles) => {
        console.log(foundAticles);
        if (!e) {
            res.status(200).send({
                staus: STATUS_MESSAGES.SUCCESS,
                data: {
                    foundAticles,
                },
            });
        } else {
            return res.status(404).send({
                staus: STATUS_MESSAGES.FAIL,
                data: {
                    errorMessage: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                },
            });
        }
    });
};
module.exports = allReview;
