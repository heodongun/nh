const { saveParkingStatus } = require('../services/saveService');

/**
 * 주차 상태 저장 컨트롤러(확인용임)
 * @param {Request} req Express 요청 객체
 * @param {Response} res Express 응답 객체
 */
const saveController = async (req, res) => {
    const carWitch = req.query.carWitch;
    const carNumber = req.query.carNumber;
    try {
        const result = await saveParkingStatus(Number(carWitch), carNumber);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error during saveController:', error.message);
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
    saveController,
};
