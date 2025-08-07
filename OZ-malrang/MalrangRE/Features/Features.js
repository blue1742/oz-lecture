// src/components/Features.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: var(--light-bg);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 4rem;
  color: var(--text-dark);
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '30px'});
  transition: all 0.6s ease;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: var(--white);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  overflow: hidden;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '30px'});
  transition: all 0.6s ease;
  transition-delay: ${props => props.delay}ms;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  &:first-child::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:first-child:hover::before {
    opacity: 1;
  }

  &:first-child::after {
    content: '📷✨';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 2;
  }

  &:first-child:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 3;
`;

const FeatureImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin: 1rem auto;
  border-radius: 10px;
  position: relative;
  z-index: 3;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-dark);
  position: relative;
  z-index: 3;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
  position: relative;
  z-index: 3;
`;

const featuresData = [
  {
    icon: '📸',
    image: '/img/Generated_Image_ (4).png',
    title: '캠페인',
    description: '사진과 함께 감동적인 스토리를 전달하여 더 많은 공감과 후원을 이끌어내세요.',
    link: '/campaign/1'
  },
  {
    icon: '🛍️',
    image: '/img/Gemini_Generated_Image04.png',
    title: '나눔가게',
    description: '아나바다처럼 자유롭게 거래하고 나누는 커뮤니티 공간에서 새로운 인연을 만들어보세요.',
    link: '/marketplace'
  },
  {
    icon: '🛡️',
    image: '/img/Gemini_Generated_Image02.png',
    title: '안전한 결제',
    description: '은행급 보안 시스템과 다양한 결제 옵션으로 안전하고 편리한 펀딩을 지원합니다.',
    link: null
  },
  {
    icon: '🤝',
    title: '커뮤니티 지원',
    description: '후원자와 후원인들을 위한 커뮤니티와 전문적인 시스템으로 정보 교류를 도와드립니다.',
    link: '/community'
  },
  {
    icon: '🏆',
    title: '실버방패클럽',
    description: '월 50만원 이상 기부하시는 고액기부자분들을 위한 특별한 혜택과 인정을 제공합니다.',
    link: null
  },
  {
    icon: '👑',
    title: '골드방패클럽',
    description: '월 100만원 이상 기부하시는 최고 후원자분들을 위한 VIP 서비스와 명예를 드립니다.',
    link: null
  }
];

function Features({ campaigns }) {
  const [visibleItems, setVisibleItems] = useState({});
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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

    // 섹션 타이틀 관찰
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 각 카드 관찰
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.id = `feature-card-${index}`;
        observer.observe(card);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach(card => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  const handleCardClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <FeaturesSection id="features">
      <Container>
        <SectionTitle 
          ref={sectionRef} 
          id="features-title"
          visible={visibleItems['features-title']}
        >
          왜 Malrang인가요?
        </SectionTitle>
        <FeaturesGrid>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              ref={el => cardsRef.current[index] = el}
              visible={visibleItems[`feature-card-${index}`]}
              delay={index * 100}
              clickable={!!feature.link}
              onClick={() => handleCardClick(feature.link)}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              {feature.image && (
                <FeatureImage src={feature.image} alt={feature.title} />
              )}
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
}

export default Features;