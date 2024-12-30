const { fetchParkingStatus } = require('../services/showService');

/**
 * 주차 상태 조회 컨트롤러
 * @param {Request} req Express 요청 객체
 * @param {Response} res Express 응답 객체
 */
const showController = async (req, res) => {
    try {
        const parkingStatus = await fetchParkingStatus();
        res.status(200).json({
            code: "SU",
            message: "Success.",
            parking: parkingStatus,
        });
    } catch (error) {
        console.error('Error during showController:', error.message);

        if (error.message === "Parking data not found") {
            res.status(400).json({ code: 'VF', message: "Validation failed." });
        } else {
            res.status(500).json({ code: 'DBE', message: "Database error." });
        }
    }
};

module.exports = {
    showController,
};
