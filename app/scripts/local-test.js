// local-test.js
// 이 파일을 app/scripts 폴더에 저장하고 index.html에서 로드하세요

// 테스트 버튼을 추가하기 위한 HTML
function addTestButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'test-buttons';
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.border = '1px solid #ccc';
    buttonContainer.style.background = '#f5f5f5';
    
    buttonContainer.innerHTML = `
      <h4>로컬 테스트 도구</h4>
      <fw-button id="testCallCreate" color="primary">전화 생성 이벤트 테스트</fw-button>
      <fw-button id="testModalDirect" color="secondary">모달 직접 테스트</fw-button>
      <fw-button id="testNotification" color="info">알림 테스트</fw-button>
    `;
    
    document.body.appendChild(buttonContainer);
    
    // 이벤트 리스너 등록
    setTimeout(() => {
      document.getElementById('testCallCreate').addEventListener('click', testCallCreateEvent);
      document.getElementById('testModalDirect').addEventListener('click', testModalDirect);
      document.getElementById('testNotification').addEventListener('click', testNotification);
    }, 1000);
  }
  
  // 전화 생성 이벤트 테스트
  async function testCallCreateEvent() {
    console.log('전화 생성 이벤트 테스트 시작');
    
    try {
      const client = await app.initialized();
      console.log('앱 초기화 완료');
      
      // 테스트 데이터 - server/test_data/onCallCreate.json의 형식으로 준비
      const testData = {
        data: {
          call: {
            phone_number: "+821045472367",
            root_call_id: null,
            created_time: new Date().toISOString(),
            direction: "incoming",
            id: Math.floor(Math.random() * 1000),
            assigned_agent_id: 139694,
            call_notes: "테스트 전화 메모입니다."
          },
          associations: {},
          actor: {
            type: "system"
          }
        }
      };
      
      console.log('테스트 데이터 준비 완료:', testData);
      
      // 이벤트 핸들러 직접 실행 방법
      console.log('이벤트 핸들러 직접 호출');
      
      // app.js에 정의된 handleCallCreate 함수가 있다면 직접 호출
      if (typeof handleCallCreate === 'function') {
        handleCallCreate(testData);
      } else {
        // 없는 경우 이벤트 트리거 시도
        console.log('handleCallCreate 함수를 찾을 수 없어 이벤트를 트리거합니다');
        client.events.trigger('onCallCreate', testData)
          .then(() => console.log('이벤트 트리거 성공'))
          .catch(err => console.error('이벤트 트리거 실패:', err));
      }
    } catch (error) {
      console.error('테스트 중 오류 발생:', error);
    }
  }
  
  // 모달 직접 테스트
  async function testModalDirect() {
    console.log('모달 직접 테스트 시작');
    
    try {
      const client = await app.initialized();
      
      const testData = {
        context: {
          callId: Math.floor(Math.random() * 1000),
          phoneNumber: "+821012345678",
          direction: "incoming",
          createdTime: new Date().toLocaleString(),
          notes: "테스트용 메모입니다."
        }
      };
      
      client.interface.trigger('showModal', {
        title: '테스트 통화 알림',
        template: 'index.html',
        data: testData
      })
      .then(() => console.log('모달 표시 성공'))
      .catch(error => console.error('모달 표시 실패:', error));
    } catch (error) {
      console.error('테스트 중 오류 발생:', error);
    }
  }
  
  // 알림 테스트
  async function testNotification() {
    console.log('알림 테스트 시작');
    
    try {
      const client = await app.initialized();
      
      client.interface.trigger('showNotify', {
        type: 'info',
        message: '새 전화: +821012345678'
      })
      .then(() => console.log('알림 표시 성공'))
      .catch(error => console.error('알림 표시 실패:', error));
    } catch (error) {
      console.error('테스트 중 오류 발생:', error);
    }
  }
  
  // 페이지 로드 시 테스트 버튼 추가
  document.addEventListener('DOMContentLoaded', function() {
    console.log('테스트 스크립트 로드됨');
    
    // 로컬 환경에서만 테스트 버튼 추가
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      console.log('로컬 환경 감지됨, 테스트 버튼 추가');
      // 앱이 초기화될 시간을 주기 위해 약간 지연
      setTimeout(addTestButtons, 2000);
    }
  });