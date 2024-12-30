const { deleteParkingStatus } = require('../services/deleteService');

/**
 * 주차 상태 삭제 컨트롤러
 * @param {Request} req Express 요청 객체
 * @param {Response} res Express 응답 객체
 */
const deleteController = async (req, res) => {
    const carWitch = req.query.carWitch;
    try {
        const result = await deleteParkingStatus(Number(carWitch));
        res.status(200).json(result);
    } catch (error) {
        console.error('Error during deleteController:', error.message);
        if (error.message === "Validation failed") {
            res.status(400).json({ code: "VF", message: "Validation failed." });
        } else if (error.message.includes("Invalid carWitch position")) {
            res.status(400).json({ code: "VF", message: "Invalid carWitch position." });
        } else {
            res.status(500).json({ code: "DBE", message: "Database error." });
        }
    }
};

module.exports = {
    deleteController,
};
