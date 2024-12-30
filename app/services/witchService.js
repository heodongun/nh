const { getDB } = require('../config/db');

/**
 * 특정 차량 번호에 해당하는 위치 조회 서비스
 * @param {string} carNumber 차량 번호
 * @returns {Object|null} 차량의 위치 정보
 * @throws {Error} 데이터베이스 오류
 */
const fetchParkingWitch = async (carNumber) => {
    const db = getDB();
    const userCollection = db.collection('status');
    const parking = await userCollection.findOne({ carNumber });
    return parking;
};

module.exports = {
    fetchParkingWitch,
};
