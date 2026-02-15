import { getDictionary } from "../get-dictionary";
import Header from "../components/Header";
import ChatInterface from "../components/ChatInterface";
import IntegrationsGrid from "../components/IntegrationsGrid";
import SuiteGrid from "../components/SuiteGrid";
import Footer from "../components/Footer";
import { Main, HeroSection } from "../components/PageLayout";
import React from 'react';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  // Await params for Next.js 15+ compatibility or standard usage
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Main>
      <Header dict={dict.header} />
      <HeroSection>
        <ChatInterface dict={dict.hero} />
      </HeroSection>
      <IntegrationsGrid dict={dict.integrations} />
      <SuiteGrid dict={dict.suite} />
      <Footer dict={dict.footer} lang={lang} />
    </Main>
  );
}
