// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Subscription from './components/Subscription';
import Footer from './components/Footer';
import CampaignDetail from './components/CampaignDetail';
import DonationForm from './components/DonationForm';
import AdminDashboard from './components/AdminDashboard';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: hsl(29, 99%, 53%);
    --text-dark: #2d3748;
    --text-light: #718096;
    --white: #ffffff;
    --light-bg: #f7fafc;
    --warm-bg: #fef7f0;
    --gradient: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --warm-gradient: linear-gradient(135deg, #ff9a8b, #fecfef, #fecfef);
    --shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body {
    font-family: 'Segoe UI', 'Malgun Gothic', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

function App() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 인증 상태 체크
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // 캠페인 데이터 로드
    loadCampaigns();
    
    // 후원 데이터 로드
    loadDonations();

    return () => unsubscribe();
  }, []);

  const loadCampaigns = async () => {
    try {
      const campaignsCollection = collection(db, 'campaigns');
      const campaignSnapshot = await getDocs(campaignsCollection);
      const campaignList = campaignSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCampaigns(campaignList);
    } catch (error) {
      console.error("캠페인 로드 실패:", error);
    }
  };

  const loadDonations = async () => {
    try {
      const donationsCollection = collection(db, 'donations');
      const donationSnapshot = await getDocs(donationsCollection);
      const donationList = donationSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonations(donationList);
    } catch (error) {
      console.error("후원 데이터 로드 실패:", error);
    }
  };

  const handleDonation = async (donationData) => {
    try {
      const docRef = await addDoc(collection(db, 'donations'), {
        ...donationData,
        userId: user?.uid,
        timestamp: new Date(),
        status: 'pending'
      });
      
      console.log("후원 등록 완료:", docRef.id);
      loadDonations(); // 후원 목록 새로고침
      return docRef.id;
    } catch (error) {
      console.error("후원 등록 실패:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>로딩중...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Navbar user={user} />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features campaigns={campaigns} />
              <Subscription onDonate={handleDonation} />
              <Footer />
            </>
          } />
          
          <Route path="/campaign/:id" element={
            <CampaignDetail 
              campaigns={campaigns} 
              onDonate={handleDonation}
            />
          } />
          
          <Route path="/donate" element={
            <DonationForm 
              onSubmit={handleDonation}
              user={user}
            />
          } />
          
          <Route path="/admin" element={
            <AdminDashboard 
              user={user}
              campaigns={campaigns}
              donations={donations}
            />
          } />
        </Routes>
      </AppContainer>
    </Router>
  );
}

// Loading Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 20px;
  font-size: 18px;
`;

export default App;