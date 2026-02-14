'use client';

import Header from "./components/Header";
import ChatInterface from "./components/ChatInterface";
import IntegrationsGrid from "./components/IntegrationsGrid";
import styled from "@emotion/styled";
import SuiteGrid from "./components/SuiteGrid";
import Footer from "./components/Footer";

const Main = styled.main`
  min-height: 100vh;
  padding-top: 80px; /* Space for fixed header */
  background-color: #f9f9fb;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function Home() {
  return (
    <Main>
      <Header />
      <HeroSection>
        <ChatInterface />
      </HeroSection>
      <IntegrationsGrid />
      <SuiteGrid />
      <Footer />
    </Main>
  );
}
