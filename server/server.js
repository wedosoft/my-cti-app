exports = {
    onCallCreateHandler: function(payload) {
        console.log(`새 전화가 생성되었습니다. 세부 정보: ${JSON.stringify(payload)}`);

        // 프론트엔드 앱으로 이벤트 전송
        $db.set("lastCall", payload);

        renderData(null, { 
            success: true, 
            message: '전화가 성공적으로 처리되었습니다',
            data: payload
        });
    }
};