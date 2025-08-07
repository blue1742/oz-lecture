// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: var(--text-dark);
  color: white;
  padding: 4rem 2rem 2rem;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FooterDescription = styled.p`
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  display: inline-block;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition: var(--transition);

  &:hover {
    background: var(--primary-color);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  opacity: 0.6;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
`;

function Footer() {
  return (
    <FooterSection id="contact">
      <Container>
        <FooterTitle>Malrang</FooterTitle>
        <FooterDescription>
          당신의 꿈을 현실로 만들어가는 친구<br/>
          혁신적인 새싹펀딩 플랫폼
        </FooterDescription>
        <SocialLinks>
          <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
          <SocialLink href="#" aria-label="Instagram">📸</SocialLink>
          <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">💼</SocialLink>
        </SocialLinks>
        <Copyright>
          <p>&copy; 2025 Malrang. All rights reserved.</p>
        </Copyright>
      </Container>
    </FooterSection>
  );
}

export default Footer;