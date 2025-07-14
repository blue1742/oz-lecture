// DOM 요소들을 선택하여 변수에 저장
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

// 할 일을 추가하는 함수
function addTask() {
    // 입력값 가져오기 (앞뒤 공백 제거)
    const taskText = taskInput.value.trim();
    
    // 입력값이 비어있는지 검증
    if (taskText === '') {
        alert('할 일을 입력해주세요!');
        return; // 함수 종료
    }
    
    // 새로운 li 요소 생성
    const listItem = document.createElement('li');
    
    // 할 일 텍스트를 담을 span 요소 생성
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    
    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.className = 'delete-button'; // CSS 클래스 적용
    
    // span 클릭 시 완료 상태 토글 이벤트 리스너
    taskSpan.addEventListener('click', function() {
        // completed 클래스가 있으면 제거, 없으면 추가
        if (taskSpan.classList.contains('completed')) {
            taskSpan.classList.remove('completed');
        } else {
            taskSpan.classList.add('completed');
        }
    });
    
    // 삭제 버튼 클릭 시 항목 제거 이벤트 리스너
    deleteBtn.addEventListener('click', function() {
        // 부모 요소(ul)에서 현재 li 요소 제거
        taskList.removeChild(listItem);
    });
    
    // li 요소에 span과 삭제 버튼 추가
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    
    // ul 요소에 li 요소 추가
    taskList.appendChild(listItem);
    
    // 입력창 초기화
    taskInput.value = '';
}

// 전체 할 일을 삭제하는 함수
function clearAllTasks() {
    // taskList의 모든 자식 요소 제거
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

// 이벤트 리스너 등록
// "추가" 버튼 클릭 시 할 일 추가
addButton.addEventListener('click', addTask);

// 입력창에서 Enter 키 입력 시 할 일 추가
taskInput.addEventListener('keypress', function(event) {
    // Enter 키의 keyCode는 13
    if (event.key === 'Enter') {
        addTask();
    }
});

// "전체 삭제" 버튼 클릭 시 모든 할 일 제거
clearButton.addEventListener('click', clearAllTasks);