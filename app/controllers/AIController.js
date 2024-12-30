const fs = require('fs');
const path = require('path');
const { saveParkingStatus } = require('../services/saveService');
const { analyzeImageWithChatGPT } = require('../services/AIService.js');  // 별도의 파일로 함수 분리

/**
 * AI Controller: 이미지 처리 및 주차 상태 저장
 * @param {Request} req Express 요청 객체
 * @param {Response} res Express 응답 객체
 */
const AIController = async (req, res) => {
    const { file } = req;

    // 파일이 업로드되지 않았을 경우
    if (!file) {
        return res.status(400).json({ code: "ERR", message: "No file uploaded." });
    }

    try {
        // 이미지 파일 저장 경로 설정
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const filePath = path.join(uploadDir, file.originalname);

        // 파일 저장
        fs.writeFileSync(filePath, file.buffer);
        console.log(`Image saved at: ${filePath}`);

        // 이미지 데이터를 Base64로 인코딩
        const base64Image = file.buffer.toString('base64');

        // ChatGPT API 호출
        const carInfo = await analyzeImageWithChatGPT(base64Image);
        console.log(carInfo)
        // 결과에서 차량 정보 확인
        const { carDetected, carNumber } = carInfo;

        if (!carDetected) {
            return res.status(404).json({ code: "ND", message: "No car detected in the image." });
        }

        // 주차 상태 저장
        const carWitch = req.body.carWitch || 1;  // 기본 위치를 1로 설정
        const saveResult = await saveParkingStatus(carWitch, carNumber || 'Unknown');

        if (saveResult.code !== "SU") {
            console.error('Failed to save parking status:', saveResult.message);
            return res.status(500).json({ code: "ERR", message: "Failed to save parking status." });
        }

        // 성공 응답 반환
        res.status(200).json({
            code: "SU",
            message: "Car detected and parking status saved.",
            carNumber,
        });
    } catch (error) {
        console.error('Error during AIController:', error.message);
        res.status(500).json({ code: "ERR", message: "Error processing the image." });
    }
};

module.exports = {
    AIController,
};
