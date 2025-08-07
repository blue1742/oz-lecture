// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-10px, -10px) rotate(1deg); }
  50% { transform: translate(10px, -20px) rotate(-1deg); }
  75% { transform: translate(-5px, 10px) rotate(0.5deg); }
`;

const gentlePulse = keyframes`
  0%, 100% {
    opacity: 0.8;
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }
  50% {
    opacity: 1;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.9)),
              url('/img/image03.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  padding-top: 80px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/img/Gemini_Generated_Image06.png');
    animation: ${float} 20s ease-in-out infinite;
    opacity: 0.1;
  }
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  width: 100%;
  padding: 0 2rem;
  gap: 4rem;
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  z-index: 2;
  position: relative;
  max-width: 600px;
  padding: 2rem;
  text-align: left;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const SpiralContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 50%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    width: 450px;
    height: 450px;
  }
`;

const CenterLogo = styled(Link)`
  position: absolute;
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  z-index: 10;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 16px;
  }
`;

const MenuItem = styled(Link)`
  position: absolute;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  text-align: center;
  line-height: 1.2;
  left: 50%;
  top: 50%;
  margin-left: -40px;
  margin-top: -40px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(238, 90, 36, 0.8));
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
    z-index: 20;
  }

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
    font-size: 9px;
    margin-left: -32.5px;
    margin-top: -32.5px;
  }
`;

const menuItems = [
  { text: '캠페인', link: '#features', position: { x: 220, y: -110 }, delay: 0 },
  { text: '나눔가게', link: '#features', position: { x: 156, y: 156 }, delay: 0.4 },
  { text: '안전한\n결제', link: '#features', position: { x: -110, y: 220 }, delay: 0.8 },
  { text: '커뮤니티\n지원', link: '#features', position: { x: -220, y: 110 }, delay: 1.2 },
  { text: '실버방패\n클럽', link: '#features', position: { x: -220, y: -110 }, delay: 1.6 },
  { text: '골드방패\n클럽', link: '#features', position: { x: -156, y: -156 }, delay: 2.0 },
  { text: '정기\n후원', link: '#subscription', position: { x: 110, y: -220 }, delay: 2.4 },
  { text: '일시\n후원', link: '#subscription', position: { x: 220, y: 110 }, delay: 2.8 },
];

function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeroSection id="hero">
      <HeroContainer>
        <HeroContent>
          <HeroTitle>꿈을 현실로 만드는<br/>새싹펀딩 플랫폼</HeroTitle>
          <HeroSubtitle>
            혁신적인 아이디어와 열정적인 서포터들을 연결하는 Malrang에서<br/>
            당신의 프로젝트를 세상에 펼쳐주세요
          </HeroSubtitle>
        </HeroContent>

        <SpiralContainer>
          <CenterLogo to="/">Malrang</CenterLogo>
          {mounted && menuItems.map((item, index) => (
            <MenuItem
              key={index}
              to={item.link}
              style={{
                transform: `translateX(${item.position.x}px) translateY(${item.position.y}px)`,
                animation: `${gentlePulse} 3s ease-in-out infinite`,
                animationDelay: `${item.delay}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 
                  `translateX(${item.position.x}px) translateY(${item.position.y}px) scale(1.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 
                  `translateX(${item.position.x}px) translateY(${item.position.y}px)`;
              }}
            >
              {item.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < item.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </MenuItem>
          ))}
        </SpiralContainer>
      </HeroContainer>
    </HeroSection>
  );
}

export default Hero;