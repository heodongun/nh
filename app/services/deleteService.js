const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

/**
 * 주차 상태 삭제 및 갱신 서비스
 * @param {number} carWitch 차량 위치
 * @returns {Object} 처리 결과
 */
const deleteParkingStatus = async (carWitch) => {
    const db = getDB();
    const parking = db.collection('parking');
    const status = db.collection('status');
    if (carWitch === undefined || carWitch === null || isNaN(carWitch)) {
        throw new Error("Validation failed");
    }
    const ps = await parking.findOne({ _id: new ObjectId('673af526dbfef450a685aed0') });
    if (!ps) {
        throw new Error("Database error: Parking document not found");
    }
    const pss = ps.parkingStatus;
    if (pss[carWitch] === undefined) {
        throw new Error("Invalid carWitch position");
    }
    pss[carWitch] = false;
    const updateResult = await parking.updateOne(
        { _id: new ObjectId('673af526dbfef450a685aed0') },
        { $set: { parkingStatus: pss } }
    );
    if (updateResult.modifiedCount === 0) {
        throw new Error("Failed to update parking status");
    }
    const deleteResult = await status.deleteMany({ witch: String(carWitch)});
    if (deleteResult.deletedCount === 0) {
        throw new Error("Failed to delete entry from status collection");
    }
    return { code: "SU", message: "Success" };
};

module.exports = {
    deleteParkingStatus,
};
