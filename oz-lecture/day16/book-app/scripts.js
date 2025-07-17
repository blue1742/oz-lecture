// 📚 BookVault - 도서 관리 app
// 글로벌 변수
let books = [];
let bookIdCounter = 0;

// 🎯 성공 메시지 표시 함수
function showSuccessMessage(message = '✅ 도서가 성공적으로 추가되었습니다!') {
  const successMessage = document.getElementById('successMessage');
  successMessage.textContent = message;
  successMessage.classList.add('show');
  
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 3000);
}

// 🎨 통계 카드 애니메이션
function animateStatCard(cardId) {
  const card = document.getElementById(cardId);
  if (card) {
    card.style.transform = 'scale(1.1)';
    card.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 300);
  }
}

// 📖 도서 추가 함수 (메인 기능)
function addBook() {
  const titleInput = document.getElementById('bookTitle');
  const priceInput = document.getElementById('bookPrice');
  
  const title = titleInput.value.trim();
  const price = parseInt(priceInput.value) || 0;
  
  // 🔍 입력 검증
  if (title === '') {
    showInputError(titleInput, '도서 제목을 입력해주세요! 📝');
    return;
  }
  
  if (price <= 0) {
    showInputError(priceInput, '올바른 가격을 입력해주세요! 💰');
    return;
  }
  
  // 📚 중복 도서 검사
  const existingBook = books.find(book => 
    book.title.toLowerCase() === title.toLowerCase()
  );
  
  if (existingBook) {
    if (confirm(`"${title}" 도서가 이미 존재합니다.\n가격을 업데이트하시겠습니까?`)) {
      existingBook.price = price;
      showSuccessMessage('📝 도서 정보가 업데이트되었습니다!');
    } else {
      return;
    }
  } else {
    // 🆕 새 도서 추가
    const book = {
      id: ++bookIdCounter,
      title: title,
      price: price,
      addedAt: new Date().toISOString()
    };
    
    books.push(book);
    showSuccessMessage();
  }
  
  // 🧹 입력 필드 초기화
  titleInput.value = '';
  priceInput.value = '';
  titleInput.focus();
  
  // 🔄 UI 업데이트
  updateBookList();
  updateStats();
  
  // 🎊 추가된 아이템 하이라이트
  setTimeout(() => {
    const bookItems = document.querySelectorAll('.book-item');
    const lastItem = bookItems[bookItems.length - 1];
    if (lastItem) {
      highlightNewItem(lastItem);
    }
  }, 100);
}

// ⚠️ 입력 오류 표시
function showInputError(inputElement, message) {
  // 기존 오류 메시지 제거
  const existingError = inputElement.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // 새 오류 메시지 생성
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ff6b6b;
    font-size: 14px;
    margin-top: 5px;
    animation: shake 0.5s ease-in-out;
  `;
  
  inputElement.parentNode.appendChild(errorDiv);
  inputElement.style.borderColor = '#ff6b6b';
  inputElement.focus();
  
  // 3초 후 오류 메시지 제거
  setTimeout(() => {
    errorDiv.remove();
    inputElement.style.borderColor = '';
  }, 3000);
}

// ✨ 새 아이템 하이라이트
function highlightNewItem(item) {
  item.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
  item.style.color = 'white';
  item.style.transform = 'scale(1.02)';
  
  setTimeout(() => {
    item.style.background = '';
    item.style.color = '';
    item.style.transform = '';
  }, 1000);
}

// 🗑️ 도서 삭제 함수
function deleteBook(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;
  
  // 🎨 커스텀 확인 다이얼로그
  if (confirm(`📚 "${book.title}" 도서를 정말로 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
    // 삭제 애니메이션
    const bookItem = document.querySelector(`[data-book-id="${id}"]`);
    if (bookItem) {
      bookItem.style.transform = 'translateX(-100%)';
      bookItem.style.opacity = '0';
      
      setTimeout(() => {
        books = books.filter(book => book.id !== id);
        updateBookList();
        updateStats();
        showSuccessMessage('🗑️ 도서가 성공적으로 삭제되었습니다!');
      }, 300);
    }
  }
}

// 📊 도서 목록 업데이트
function updateBookList() {
  const bookList = document.getElementById('bookList');
  
  if (books.length === 0) {
    bookList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📚</div>
        <div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 10px;">
          아직 등록된 도서가 없습니다
        </div>
        <div style="font-size: 1rem; opacity: 0.8;">
          위에서 첫 번째 도서를 추가해보세요! ✨
        </div>
      </div>
    `;
    return;
  }
  
  // 📅 최신 순으로 정렬
  const sortedBooks = [...books].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  
  bookList.innerHTML = sortedBooks.map((book, index) => `
    <li class="book-item" data-book-id="${book.id}" style="animation-delay: ${index * 0.1}s">
      <div class="book-info">
        <div class="book-title">${escapeHtml(book.title)}</div>
        <div class="book-price">${book.price.toLocaleString()}원</div>
      </div>
      <button class="delete-button" onclick="deleteBook(${book.id})" title="도서 삭제">
        🗑️ 삭제
      </button>
    </li>
  `).join('');
}

// 📈 통계 업데이트
function updateStats() {
  const totalBooks = books.length;
  const totalValue = books.reduce((sum, book) => sum + book.price, 0);
  const avgPrice = totalBooks > 0 ? Math.round(totalValue / totalBooks) : 0;
  
  // 🎯 애니메이션과 함께 업데이트
  animateStatUpdate('totalBooks', totalBooks);
  animateStatUpdate('totalValue', totalValue.toLocaleString() + '원');
  animateStatUpdate('avgPrice', avgPrice.toLocaleString() + '원');
}

// 🎨 통계 애니메이션 업데이트
function animateStatUpdate(elementId, newValue) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.style.transform = 'scale(1.1)';
  element.style.transition = 'transform 0.3s ease';
  
  setTimeout(() => {
    element.textContent = newValue;
    element.style.transform = 'scale(1)';
  }, 150);
}

// 🔒 HTML 이스케이프 함수
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 🔍 도서 검색 기능
function searchBooks(query) {
  const searchTerm = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm)
  );
}

// 📱 키보드 이벤트 처리
document.addEventListener('keydown', function(e) {
  // Enter 키로 도서 추가
  if (e.key === 'Enter') {
    addBook();
  }
  
  // Escape 키로 입력 필드 초기화
  if (e.key === 'Escape') {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookPrice').value = '';
    document.getElementById('bookTitle').focus();
  }
});

// 🎯 통계 카드 클릭 이벤트
document.addEventListener('click', function(e) {
  if (e.target.closest('.stat-card')) {
    const card = e.target.closest('.stat-card');
    const label = card.querySelector('.stat-label').textContent;
    
    let message = '';
    if (label.includes('총 도서')) {
      message = `📚 현재 ${books.length}권의 도서를 관리하고 있습니다!`;
    } else if (label.includes('총 가치')) {
      const totalValue = books.reduce((sum, book) => sum + book.price, 0);
      message = `💎 컬렉션의 총 가치는 ${totalValue.toLocaleString()}원입니다!`;
    } else if (label.includes('평균 가격')) {
      const avgPrice = books.length > 0 ? Math.round(books.reduce((sum, book) => sum + book.price, 0) / books.length) : 0;
      message = `📊 평균 도서 가격은 ${avgPrice.toLocaleString()}원입니다!`;
    }
    
    if (message) {
      showSuccessMessage(message);
    }
  }
});

// 📱 반응형 처리
window.addEventListener('resize', function() {
  // 모바일에서의 추가 최적화
  if (window.innerWidth < 768) {
    document.querySelectorAll('.book-item').forEach(item => {
      item.style.transform = 'none';
    });
  }
});

// 🚀 초기화 함수
function initializeApp() {
  console.log('📚 BookVault 시스템이 초기화되었습니다!');
  updateBookList();
  updateStats();
  
  // 첫 번째 입력 필드에 포커스
  document.getElementById('bookTitle').focus();}