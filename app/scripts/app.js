
// app.js
let client;

init();

async function init() {
  try {
    client = await app.initialized();
    console.log('앱이 성공적으로 초기화되었습니다');
    
    // app.activated 이벤트 바인딩
    client.events.on('app.activated', setupApp);
    
    // 제품 이벤트 바인딩 방식 수정
    // Freshcaller의 경우 정확한 이벤트 이름 형식 사용
    client.events.on('onCallCreate', onCallCreateHandler);
  } catch (error) {
    console.error('앱 초기화 중 오류 발생:', error);
  }
}

function setupApp() {
  console.log('앱이 활성화되었습니다');
  
  // '닫기' 버튼의 'click' 이벤트를 팝업을 닫는 함수에 바인딩합니다
  const closeButton = document.getElementById('closeButton');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      // 팝업을 닫기 위해 'hide' 메서드로 'client.interface.trigger' 사용
      client.interface.trigger('hide', { id: 'closeButton' });
    });
  } else {
    console.error('closeButton 요소를 찾을 수 없습니다');
  }
}

async function onCallCreateHandler() {
  try {
    let lastCall = await client.db.get("lastCall");
    
    if (lastCall) {
      console.log('전화 수신 감지:', lastCall);
      showModal(lastCall);
    }
  } catch (error) {
    console.error('전화 정보 가져오기 오류:', error);
  }
}

// 전화 수신 시 모달 표시
function showModal(callData) {
  client.interface.trigger("showModal", {
    title: "전화 수신",
    template: "index.html",
    data: callData
  });
}