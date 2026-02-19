import { getDictionary } from "../get-dictionary";
import Header from "../components/Header";
import ChatInterface from "../components/ChatInterface";
import IntegrationsGrid from "../components/IntegrationsGrid";
import SuiteGrid from "../components/SuiteGrid";
import Footer from "../components/Footer";
import { Main, HeroSection } from "../components/PageLayout";
import React from 'react';

import { getProjects } from "../api/projects";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  // Await params for Next.js 15+ compatibility or standard usage
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { items: projects } = await getProjects();

  return (
    <Main>
      <Header dict={dict.header} projects={projects} />
      <HeroSection>
        <ChatInterface dict={dict.hero} />
      </HeroSection>
      <IntegrationsGrid dict={dict.integrations} projects={projects} />
      <SuiteGrid dict={dict.suite} />
      <Footer dict={dict.footer} lang={lang} />
    </Main>
  );
}
