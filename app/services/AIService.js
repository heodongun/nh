const axios = require('axios');

/**
 * ChatGPT API를 사용하여 이미지 분석
 * @param {string} base64Image Base64로 인코딩된 이미지 데이터
 * @returns {Promise<Object>} 차량 감지 결과 및 차량 번호
 */
const analyzeImageWithChatGPT = async (base64Image) => {
    try {
        const headers = {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        };

        const prompt = "차가 있는지와 번호판 번호를 알려주세요. 결과는 JSON 형식으로 반환해주세요. 아무말도 말고 아래에있는 예시 처럼만 보내주세요 ```이건 처음이랑 끝에 붙이지마 예: {\"carDetected\": true, \"carNumber\": \"68오 8269\"}";



        const payload = {
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt,
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        };

        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        const content = response.data.choices[0].message.content;
        console.log(content)
        let carInfo = null;
        try {
            carInfo = JSON.parse(content);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            throw new Error('Invalid JSON response from ChatGPT.');
        }
        return carInfo;
    } catch (error) {
        console.error('Error during image analysis:', error.message);
        throw new Error('Error processing image analysis.');
    }
};

module.exports = {
    analyzeImageWithChatGPT,
};
