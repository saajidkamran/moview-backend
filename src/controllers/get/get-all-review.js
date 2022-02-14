const mongoose = require('mongoose');
const { ERROR_MESSAGES, STATUS_MESSAGES } = require('../../config/message');

const moviewSchema = {
    title: String,
    content: String,
};

const moview = mongoose.model('moview', moviewSchema);

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
