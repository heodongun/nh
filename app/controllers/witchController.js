const { fetchParkingWitch } = require('../services/witchService');

/**
 * 차량 번호로 주차 위치 조회 컨트롤러
 * @param {Request} req Express 요청 객체
 * @param {Response} res Express 응답 객체
 */
const witchController = async (req, res) => {
    const carNumber = req.query.carNumber;
    try {
        if (!carNumber) {
            return res.status(400).json({
                code: 'VF',
                message: 'Validation failed. Car number is required.',
            });
        }
        const parking = await fetchParkingWitch(carNumber);
        if (parking) {
            res.status(200).json({
                code: 'SU',
                message: 'Success.',
                parkingWitch: parking.witch,
            });
        } else {
            res.status(404).json({
                code: 'NF',
                message: 'Car number not found.',
            });
        }
    } catch (error) {
        console.error('Error during witchController:', error.message);
        res.status(500).json({
            code: 'DBE',
            message: 'Database error.',
        });
    }
};

module.exports = {
    witchController,
};
