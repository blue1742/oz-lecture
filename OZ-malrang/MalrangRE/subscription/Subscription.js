// src/components/Subscription.js
import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const gentleFloat = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-20px, -10px) rotate(1deg); }
  50% { transform: translate(10px, -30px) rotate(-0.5deg); }
  75% { transform: translate(-10px, 20px) rotate(0.5deg); }
`;

const SubscriptionSection = styled.section`
  padding: 8rem 2rem;
  background-color: #FFF5E6;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hearts" width="20" height="20" patternUnits="userSpaceOnUse"><text x="10" y="15" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.1)">♥</text></pattern></defs><rect width="100" height="100" fill="url(%23hearts)"/></svg>');
    animation: ${gentleFloat} 25s ease-in-out infinite;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SubscriptionContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const SubscriptionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '30px'});
  transition: all 0.6s ease;
`;

const SubscriptionSubtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--text-light);
  margin-bottom: 4rem;
  line-height: 1.7;
  font-weight: 400;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '30px'});
  transition: all 0.6s ease 0.2s;
`;

const SubscriptionCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SubscriptionCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '30px'});
  transition: all 0.6s ease ${props => props.delay}s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff9a8b, #fecfef, #fecfef);
  }

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: block;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CardPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const CardPeriod = styled.div`
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const SubscriptionButton = styled.button`
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--gradient);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubscriptionBenefits = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 25px;
  margin-top: 4rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '30px'});
  transition: all 0.6s ease 0.4s;
`;

const BenefitsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2rem;
  text-align: center;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const BenefitIcon = styled.div`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-top: 0.2rem;
`;

const BenefitText = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
`;

const BenefitDescription = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const subscriptionPlans = [
  {
    icon: '💝',
    title: '정기후원',
    description: '매월 꾸준한 후원으로 지속가능한 변화를 만들어주세요',
    price: '5,000원',
    period: '매월',
    type: 'regular'
  },
  {
    icon: '💖',
    title: '일시후원',
    description: '필요한 순간에 마음을 전달하는 소중한 후원',
    price: '자유금액',
    period: '1회성',
    type: 'one-time'
  },
  {
    icon: '🤝',
    title: '결연후원',
    description: '특정 대상과의 1:1 결연으로 더 깊은 유대관계를 형성',
    price: '30,000원',
    period: '매월',
    type: 'sponsorship'
  }
];

const benefits = [
  {
    icon: '✉️',
    title: '후원 뉴스레터',
    description: '매월 후원 현황과 성공 사례를 담은 따뜻한 소식을 전해드려요'
  },
  {
    icon: '🎁',
    title: '우선 혜택',
    description: '새로운 프로젝트 얼리버드나 특별 이벤트 우선 참여 기회를 제공해요'
  },
  {
    icon: '📊',
    title: '임팩트 리포트',
    description: '당신의 후원이 만든 구체적인 변화와 성과를 정기적으로 공유해요'
  },
  {
    icon: '🏷️',
    title: '서포터 뱃지',
    description: '특별한 정기후원자 뱃지로 커뮤니티에서 인정받는 지위를 얻어요'
  }
];

function Subscription({ onDonate }) {
  const [visibleItems, setVisibleItems] = useState({});
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const benefitsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleItems(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // 각 요소 관찰
    const elementsToObserve = [
      { ref: sectionRef.current, id: 'subscription-title' },
      ...cardsRef.current.map((card, index) => ({ 
        ref: card, 
        id: `subscription-card-${index}` 
      })),
      { ref: benefitsRef.current, id: 'benefits-section' }
    ];

    elementsToObserve.forEach(element => {
      if (element.ref) {
        element.ref.id = element.id;
        observer.observe(element.ref);
      }
    });

    return () => {
      elementsToObserve.forEach(element => {
        if (element.ref) {
          observer.unobserve(element.ref);
        }
      });
    };
  }, []);

  const handleDonation = async (plan) => {
    if (!auth.currentUser) {
      alert('후원하시려면 먼저 로그인해주세요.');
      return;
    }

    setLoading(true);

    try {
      const donationData = {
        type: plan.type,
        amount: plan.price === '자유금액' ? null : parseInt(plan.price.replace(/[^0-9]/g, '')),
        planTitle: plan.title,
        userName: auth.currentUser.displayName || auth.currentUser.email,
        userEmail: auth.currentUser.email
      };

      if (plan.type === 'one-time' && !donationData.amount) {
        // 일시후원의 경우 금액 입력 페이지로 이동
        navigate('/donate', { state: { plan } });
      } else {
        await onDonate(donationData);
        alert(`${plan.title} 신청이 완료되었습니다!`);
      }
    } catch (error) {
      console.error('후원 처리 실패:', error);
      alert('후원 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriptionSection id="subscription">
      <Container>
        <SubscriptionContent>
          <SubscriptionTitle 
            ref={sectionRef}
            visible={visibleItems['subscription-title']}
          >
            함께 만들어가는 변화
          </SubscriptionTitle>
          <SubscriptionSubtitle visible={visibleItems['subscription-title']}>
            매월 작은 후원으로 더 많은 꿈이 현실이 될 수 있도록 도와주세요.<br/>
            당신의 정기후원이 누군가의 인생을 바꾸는 첫 걸음이 됩니다.
          </SubscriptionSubtitle>
          
          <SubscriptionCards>
            {subscriptionPlans.map((plan, index) => (
              <SubscriptionCard
                key={index}
                ref={el => cardsRef.current[index] = el}
                visible={visibleItems[`subscription-card-${index}`]}
                delay={index * 0.1}
              >
                <CardIcon>{plan.icon}</CardIcon>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <CardPrice>{plan.price}</CardPrice>
                <CardPeriod>{plan.period}</CardPeriod>
                <SubscriptionButton
                  onClick={() => handleDonation(plan)}
                  disabled={loading}
                >
                  {loading ? '처리중...' : '후원하기'}
                </SubscriptionButton>
              </SubscriptionCard>
            ))}
          </SubscriptionCards>

          <SubscriptionBenefits 
            ref={benefitsRef}
            visible={visibleItems['benefits-section']}
          >
            <BenefitsTitle>정기후원자분께 드리는 혜택</BenefitsTitle>
            <BenefitsGrid>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  <BenefitIcon>{benefit.icon}</BenefitIcon>
                  <BenefitText>
                    <BenefitTitle>{benefit.title}</BenefitTitle>
                    <BenefitDescription>{benefit.description}</BenefitDescription>
                  </BenefitText>
                </BenefitItem>
              ))}
            </BenefitsGrid>
          </SubscriptionBenefits>
        </SubscriptionContent>
      </Container>
    </SubscriptionSection>
  );
}

export default Subscription;