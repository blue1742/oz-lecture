#!/bin/bash

# Malrang 펀딩 플랫폼 설정 스크립트

echo "🚀 Malrang 펀딩 플랫폼 설정을 시작합니다..."

# 1. React 앱 생성
echo "📦 React 앱을 생성합니다..."
npx create-react-app malrang-funding-platform
cd malrang-funding-platform

# 2. 추가 패키지 설치
echo "📦 필요한 패키지를 설치합니다..."
npm install firebase styled-components react-router-dom

# 3. 디렉토리 구조 생성
echo "📁 디렉토리 구조를 생성합니다..."
mkdir -p src/components
mkdir -p public/img

# 4. 컴포넌트 스텁 파일 생성
echo "📝 컴포넌트 스텁 파일을 생성합니다..."

# CampaignDetail.js
cat > src/components/CampaignDetail.js << 'EOF'
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

function CampaignDetail({ campaigns, onDonate }) {
  const { id } = useParams();
  const campaign = campaigns.find(c => c.id === id);

  if (!campaign) {
    return <Container>캠페인을 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <button onClick={() => onDonate({ campaignId: id, amount: 10000 })}>
        후원하기
      </button>
    </Container>
  );
}

export default CampaignDetail;
EOF

# DonationForm.js
cat > src/components/DonationForm.js << 'EOF'
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 100px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

function DonationForm({ onSubmit, user }) {
  const [amount, setAmount] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      alert('금액을 입력해주세요.');
      return;
    }
    
    try {
      await onSubmit({
        amount: parseInt(amount),
        type: plan?.type || 'one-time',
        planTitle: plan?.title || '일시후원'
      });
      alert('후원이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      alert('후원 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <h2>{plan?.title || '후원하기'}</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="후원 금액 (원)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Button type="submit">후원 완료</Button>
      </Form>
    </Container>
  );
}

export default DonationForm;
EOF

# AdminDashboard.js
cat > src/components/AdminDashboard.js << 'EOF'
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

function AdminDashboard({ user, campaigns, donations }) {
  if (!user || user.email !== 'admin@malrang.com') {
    return <Container>관리자 권한이 필요합니다.</Container>;
  }

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalCampaigns = campaigns.length;
  const totalDonors = new Set(donations.map(d => d.userId)).size;

  return (
    <Container>
      <h1>관리자 대시보드</h1>
      <StatsGrid>
        <StatCard>
          <h3>총 후원금</h3>
          <p>{totalDonations.toLocaleString()}원</p>
        </StatCard>
        <StatCard>
          <h3>캠페인 수</h3>
          <p>{totalCampaigns}개</p>
        </StatCard>
        <StatCard>
          <h3>후원자 수</h3>
          <p>{totalDonors}명</p>
        </StatCard>
      </StatsGrid>
    </Container>
  );
}

export default AdminDashboard;
EOF

# 5. index.css 생성
cat > src/index.css << 'EOF'
body {
  margin: 0;
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}
EOF

# 6. reportWebVitals.js 생성
cat > src/reportWebVitals.js << 'EOF'
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
EOF

# 7. .env.example 생성
cat > .env.example << 'EOF'
# Firebase 설정
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
EOF

# 8. .gitignore 업데이트
cat >> .gitignore << 'EOF'

# Firebase
.firebase
.firebaserc
firebase-debug.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
EOF

echo "✅ 설정이 완료되었습니다!"
echo ""
echo "다음 단계:"
echo "1. Firebase Console에서 프로젝트를 생성하세요"
echo "2. .env.example을 .env로 복사하고 Firebase 설정값을 입력하세요"
echo "3. public/img 폴더에 필요한 이미지를 추가하세요"
echo "4. npm start로 개발 서버를 실행하세요"
echo ""
echo "🎉 Happy coding!"