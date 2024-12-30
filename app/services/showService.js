const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

/**
 * 주차 상태 조회 서비스
 * @returns {Object} 주차 상태 데이터
 * @throws {Error} 데이터베이스 오류 또는 데이터 없음
 */
const fetchParkingStatus = async () => {
    const db = getDB();
    const userCollection = db.collection('parking');
    const parking = await userCollection.findOne({ _id: new ObjectId('673af526dbfef450a685aed0') });
    if (!parking) {
        throw new Error("Parking data not found");
    }
    return parking.parkingStatus;
};

module.exports = {
    fetchParkingStatus,
};
