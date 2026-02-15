'use client';

import { Fragment } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// --- Styled Components ---

const Section = styled.section`
  padding: 4rem 1.5rem;
  background-color: #f9f9fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #001f1f; 
    line-height: 1.1;
    letter-spacing: -0.02em;

    @media (min-width: 768px) {
      font-size: 3.2rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.4;
    color: #001f1f;
    opacity: 0.8;
    
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

// Theme Props Interface
interface SuiteTheme {
  plusBg: string; 
  plusIcon: string; 
  tongueBg: string; 
  tongueTxt: string; 
  tongueShadow: string; 
  txtItem: string; 
  txtPara: string; 
  cardBg: string; 
}

// Define Themes
const themes: Record<string, SuiteTheme> = {
  app: {
    plusBg: '#e063c7', 
    plusIcon: '#fde5ff', 
    tongueBg: '#fab8ff', 
    tongueTxt: '#b8337a', 
    tongueShadow: '#e063c7', 
    txtItem: '#b8337a', 
    txtPara: '#d64da9', 
    cardBg: '#ffffff',
  },
  web: {
    plusBg: '#7070ff', 
    plusIcon: '#e1e1fa', 
    tongueBg: '#b8b8ff', 
    tongueTxt: '#4533b8', 
    tongueShadow: '#7070ff', 
    txtItem: '#4533b8', 
    txtPara: '#624ee5', 
    cardBg: '#ffffff',
  }
};

const CardWrapper = styled.a<{ themeColors: SuiteTheme }>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 1.5rem;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover, &:focus {
    .suite-card {
      box-shadow: 0px 0.4rem 0.8rem 0rem color-mix(in srgb, ${p => p.themeColors.tongueShadow}, transparent 52%);
    }
    
    .suite-card-icon {
      transform: rotate(90deg); 
    }

    .suite-card-tongue {
      transform: translateY(0%);
      
      &::after {
        transform: translateX(0.3em);
        opacity: 0.5;
      }
    }
  }
`;

const Card = styled.div<{ themeColors: SuiteTheme }>`
  background-color: ${p => p.themeColors.cardBg};
  border-radius: 1.5rem;
  padding: 2rem;
  padding-bottom: 4rem; 
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    padding-bottom: 3.5rem;
  }

  @media (max-width: 390px) {
    padding: 1rem;
    padding-bottom: 3rem;
  }
  overflow: hidden;
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
  box-shadow: 0px 0rem 0rem 0rem color-mix(in srgb, ${p => p.themeColors.tongueShadow}, transparent 100%);
  border: 1px solid rgba(0,0,0,0.05);

  h3 {
    font-size: 2rem;
    margin: 0 0 1rem 0;
    color: #001f1f;
    font-weight: 500;
    
    @media (max-width: 390px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin-top: auto;
    color: ${p => p.themeColors.txtPara};
    font-size: 1.1rem;
    opacity: 0.8;
    line-height: 1.4;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const IconWrapper = styled.div<{ themeColors: SuiteTheme }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${p => p.themeColors.plusBg};
  color: ${p => p.themeColors.plusIcon}; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2.5;
  }
`;

const AnimatedListWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
  /* Mask to fade out top and bottom */
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
`;

const AnimatedList = styled(motion.div)`
  /* Using framer-motion for animation */
`;

const ListItem = styled.div<{ themeColors: SuiteTheme }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: ${p => p.themeColors.txtItem};
  font-size: 1.1rem;
  font-weight: 500;
`;

const Dot = styled.div<{ themeColors: SuiteTheme }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, currentColor, transparent 64%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  /* Checkmark style */
  background-color: ${p => p.themeColors.plusIcon};
  color: ${p => p.themeColors.plusBg};
  border-color: transparent;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Tongue = styled.div<{ themeColors: SuiteTheme }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.5rem; 
  background-color: ${p => p.themeColors.tongueBg};
  color: ${p => p.themeColors.tongueTxt};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  font-weight: 500;
  z-index: 1; 
  transform: translateY(-80%); 
  
  margin-top: -1.5rem; 
  padding-top: 1.5rem; 
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &::after {
    content: "→";
    display: inline-block;
    margin-left: 0.5rem;
    opacity: 0;
    transform: translateX(-0.5em);
    transition: all 0.3s ease;
  }
`;

// Simple Check Icon
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 9L11.145 14.303a1 1 0 0 1-1.407 0L7.5 12.082" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Plus Icon that rotates
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);


const SuiteCard = ({ 
  title, 
  description, 
  items, 
  themeKey, 
  href,
  takeTourText 
}: { 
  title: string, 
  description: string, 
  items: string[], 
  themeKey: 'app' | 'web',
  href: string,
  takeTourText: string
}) => {
  const theme = themes[themeKey];
  
  const loopItems = [...items, ...items];

  return (
    <CardWrapper href={href} themeColors={theme}>
      <Card themeColors={theme} className="suite-card">
        <CardHeader>
          <h3>{title}</h3>
          <IconWrapper themeColors={theme} className="suite-card-icon">
            <PlusIcon />
          </IconWrapper>
        </CardHeader>
        
        <AnimatedListWrapper>
          <AnimatedList 
            className="suite-list"
            animate={{ y: "-50%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
          >
            {loopItems.map((item, i) => (
              <ListItem key={i} themeColors={theme}>
                <Dot themeColors={theme}><CheckIcon /></Dot>
                {item}
              </ListItem>
            ))}
          </AnimatedList>
        </AnimatedListWrapper>

        <p>{description}</p>
      </Card>
      
      <Tongue themeColors={theme} className="suite-card-tongue">
        {takeTourText}
      </Tongue>
    </CardWrapper>
  );
};

export default function SuiteGrid({ dict }: { dict?: any }) {
  const t = dict || {
    title: "Crafting digital experiences.",
    description: "From native mobile applications to responsive web platforms,\\nI build solutions that solve real problems and delight users.",
    app_card: {
      title: "APP",
      description: "Cross-platform mobile applications built with Flutter, delivering native performance on both iOS and Android.",
      items: ["Flutter", "Dart", "Cross-platform", "iOS & Android", "Material Design"]
    },
    web_card: {
      title: "WEB",
      description: "Modern web applications leveraging the power of Next.js, React, and interactive 3D elements.",
      items: ["gym management", "ninedragons", "tomelater", "apple music playlist"]
    },
    take_tour: "Take a tour"
  };

  const renderText = (text: string) => {
    return text.split('\\n').map((line, i) => (
      <Fragment key={i}>
        {line}
        {i < text.split('\\n').length - 1 && <br />}
      </Fragment>
    ));
  };


  return (
    <Section>
      <Container>
        <TitleWrapper>
          <h2>{t.title}</h2>
          <p>
            {renderText(t.description)}
          </p>
        </TitleWrapper>
        
        <Grid>
          <SuiteCard 
            title={t.app_card.title}
            themeKey="app"
            href="/apps"
            description={t.app_card.description}
            items={t.app_card.items}
            takeTourText={t.take_tour}
          />
          <SuiteCard 
            title={t.web_card.title} 
            themeKey="web"
            href="/web"
            description={t.web_card.description}
            items={t.web_card.items}
            takeTourText={t.take_tour}
          />
        </Grid>
      </Container>
    </Section>
  );
}
