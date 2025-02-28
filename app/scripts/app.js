
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

// 'onCallCreate' 이벤트를 처리하는 함수 정의
function onCallCreateHandler(event) {
  console.log('전화 생성 이벤트 수신됨');
  
  try {
    // Freshworks에서 event.helper.getData()가 적절하다고 확인되었으므로 유지
    const callDetails = event.helper.getData();
    console.log('전화 상세정보:', callDetails);
    
    // 모달 표시
    client.interface.trigger('showModal', { 
      title: "통화 상세정보", 
      template: "index.html"
    }).then(function() {
      console.log('모달이 성공적으로 표시되었습니다');
      
      // 모달이 열린 후에 DOM 요소 업데이트 시도
      setTimeout(() => {
        const notificationCard = document.querySelector('.notification_card p');
        if (notificationCard) {
          notificationCard.textContent = `발신자: ${callDetails.call.phone_number}`;
        } else {
          console.error('notification_card 요소를 찾을 수 없습니다');
        }
      }, 1000); // 모달이 완전히 로드될 시간을 더 여유 있게 설정
      
    }).catch(function(error) {
      console.error('모달 표시 중 오류 발생:', error);
    });
  } catch (error) {
    console.error('이벤트 처리 중 오류 발생:', error);
  }
}
