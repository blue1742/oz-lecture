Malrang 펀딩 플랫폼 - React + Firebase
프로젝트 구조
malrang-funding-platform/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── img/                    # 이미지 파일들
│       ├── image03.png
│       ├── Generated_Image_ (4).png
│       ├── Gemini_Generated_Image02.png
│       ├── Gemini_Generated_Image04.png
│       └── Gemini_Generated_Image06.png
├── src/
│   ├── components/
│   │   ├── Navbar.js           # 네비게이션 바
│   │   ├── Hero.js             # 히어로 섹션
│   │   ├── Features.js         # 기능 섹션
│   │   ├── Subscription.js     # 정기후원 섹션
│   │   ├── Footer.js           # 푸터
│   │   ├── CampaignDetail.js   # 캠페인 상세 페이지
│   │   ├── DonationForm.js     # 후원 폼
│   │   └── AdminDashboard.js   # 관리자 대시보드
│   ├── firebase.js             # Firebase 설정
│   ├── App.js                  # 메인 앱 컴포넌트
│   ├── index.js                # React 엔트리 포인트
│   └── index.css               # 글로벌 스타일
├── package.json                # 프로젝트 의존성
├── .gitignore
├── .env                        # 환경 변수 (Firebase 키)
└── README.md
설치 방법
1. 프로젝트 생성 및 의존성 설치
bash# 새 프로젝트 폴더 생성
mkdir malrang-funding-platform
cd malrang-funding-platform

# package.json 파일 생성 (위에서 제공한 내용 복사)
# 또는 create-react-app 사용
npx create-react-app malrang-funding-platform
cd malrang-funding-platform

# 추가 의존성 설치
npm install firebase styled-components react-router-dom
2. Firebase 프로젝트 설정

Firebase Console에 접속
새 프로젝트 생성
다음 서비스 활성화:

Authentication (Google 로그인 활성화)
Firestore Database
Storage
Hosting (선택사항)


프로젝트 설정에서 웹 앱 추가
Firebase 설정 값 복사

3. 환경 변수 설정
.env 파일을 프로젝트 루트에 생성:
envREACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
4. Firebase 설정 파일 수정
src/firebase.js 파일 수정:
javascriptconst firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
실행 방법
개발 서버 실행
bashnpm start
브라우저에서 http://localhost:3000 접속
프로덕션 빌드
bashnpm run build
Firebase 배포 (선택사항)
bash# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 초기화
firebase init

# Hosting 선택, build 폴더 지정
# 배포
npm run build
firebase deploy
Firestore 데이터베이스 구조
Collections
campaigns (캠페인)
javascript{
  title: "캠페인 제목",
  description: "캠페인 설명",
  targetAmount: 1000000,
  currentAmount: 500000,
  imageUrl: "https://...",
  createdAt: Timestamp,
  endDate: Timestamp,
  category: "education"
}
donations (후원)
javascript{
  userId: "user123",
  campaignId: "campaign123",
  amount: 50000,
  type: "regular", // regular, one-time, sponsorship
  timestamp: Timestamp,
  status: "completed",
  userName: "홍길동",
  userEmail: "user@example.com"
}
users (사용자)
javascript{
  uid: "user123",
  displayName: "홍길동",
  email: "user@example.com",
  photoURL: "https://...",
  role: "user", // user, admin
  totalDonations: 500000,
  joinedAt: Timestamp
}
추가 컴포넌트 구현 필요
아래 컴포넌트들을 추가로 구현해야 합니다:

Subscription.js - 정기후원 섹션
Footer.js - 푸터 컴포넌트
CampaignDetail.js - 캠페인 상세 페이지
DonationForm.js - 후원 폼
AdminDashboard.js - 관리자 대시보드

보안 규칙 설정
Firestore 보안 규칙
javascriptrules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 읽기는 모두 허용
    match /campaigns/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // 후원은 로그인한 사용자만
    match /donations/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // 사용자 정보
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.uid == userId;
    }
  }
}
주요 기능

✅ Google 로그인/로그아웃
✅ 캠페인 목록 표시
✅ 반응형 디자인
✅ Firebase Firestore 연동
📝 후원 기능 (구현 필요)
📝 관리자 대시보드 (구현 필요)
📝 실시간 후원 현황 업데이트 (구현 필요)

문제 해결
이미지가 표시되지 않는 경우

public/img/ 폴더에 이미지 파일 배치
경로를 /img/filename.png 형식으로 수정

Firebase 인증 오류

Firebase Console에서 인증 방법 활성화 확인
도메인 허용 목록에 localhost:3000 추가

Firestore 권한 오류

Firestore 보안 규칙 확인
개발 중에는 테스트 모드 사용 가능

라이센스
MIT License