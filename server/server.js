// server.js
exports = {
    // 'onCallCreate' 제품 이벤트를 위한 핸들러
    onCallCreateHandler: function(payload) {
        // 전화 세부 정보 로깅
        console.log(`새 전화가 생성되었습니다. 세부 정보: ${JSON.stringify(payload)}`);

        // 클라이언트 측으로 데이터를 보내려면 'renderData' 사용
        renderData(null, { 
            success: true, 
            message: '전화가 성공적으로 처리되었습니다',
            data: payload
        });
    }
};