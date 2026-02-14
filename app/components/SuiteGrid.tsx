
import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

// --- Global Keyframes & Variables ---

const suiteItemsAnimation = keyframes`
  from { transform: translateY(0%); }
  to   { transform: translateY(-50%); } 
`;
// Note: Changed to -50% because we will duplicate the items for seamless loop

// --- Styled Components ---

const Section = styled.section`
  padding: 4rem 1.5rem;
  background-color: #f9f9fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  plusBg: string; // Background for the Plus icon
  plusIcon: string; // Color of the Plus icon
  tongueBg: string; // Background of the "Take a tour" tab
  tongueTxt: string; // Text color of the tab
  tongueShadow: string; // Shadow color
  txtItem: string; // List item text color
  txtPara: string; // Paragraph text color
  cardBg: string; // Card background color
}

// Define Themes
const themes: Record<string, SuiteTheme> = {
  app: {
    plusBg: '#e063c7', // pink-400
    plusIcon: '#fde5ff', // pink-100
    tongueBg: '#fab8ff', // pink-200
    tongueTxt: '#b8337a', // pink-800
    tongueShadow: '#e063c7', // pink-400
    txtItem: '#b8337a', // pink-800
    txtPara: '#d64da9', // pink-600
    cardBg: '#ffffff',
  },
  web: {
    plusBg: '#7070ff', // purple-400
    plusIcon: '#e1e1fa', // purple-100
    tongueBg: '#b8b8ff', // purple-200
    tongueTxt: '#4533b8', // purple-800
    tongueShadow: '#7070ff', // purple-400
    txtItem: '#4533b8', // purple-800
    txtPara: '#624ee5', // purple-600
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

  /* Focus & Hover states affecting children */
  &:hover, &:focus {
    .suite-card {
      box-shadow: 0px 0.4rem 0.8rem 0rem color-mix(in srgb, ${p => p.themeColors.tongueShadow}, transparent 52%);
    }
    
    .suite-card-icon {
      /* Rotate plus to X or similar effect if desired, but Lattice design rotates to 0? 
         Let's stick to the icon morph/swap logic mostly */
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
  padding-bottom: 4rem; /* Space for the tongue */
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
  color: ${p => p.themeColors.plusIcon}; /* Icon fill color */
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
  height: 200px; /* Visible height */
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
  
  /* Mask to fade out top and bottom */
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
`;

const AnimatedList = styled.div`
  animation: ${suiteItemsAnimation} 20s linear infinite;
  
  /* Pause on hover if desired */
  /* .suite-card:hover & {
    animation-play-state: paused; 
  } */
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
  height: 3.5rem; /* Visible height */
  background-color: ${p => p.themeColors.tongueBg};
  color: ${p => p.themeColors.tongueTxt};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  font-weight: 500;
  z-index: 1; /* Behind card content mostly, but here it acts as a footer */
  transform: translateY(-100%); /* Hidden by default (behind card?) - Wait, Lattice design has it slide DOWN or UP? */
  /* Actually Lattice design: 
     .suite-card-tongue { transform: translateY(0%); } // visible state?
     Wait, the CSS said: 
     .suite-card-wrapper:hover .suite-card-tongue { transform: translateY(0%); }
     So default must be hidden. Let's adjust logic.
  */
  transform: translateY(-80%); /* Partially hidden behind card body? No, it's typically "tucked" behind. 
  Let's actually move it *outside* the card flow visually or make the card content sit on top. */
  
  /* Correction: In the provided HTML, .suite-card-tongue is a sibling of .suite-card wrapper? No, it's inside wrapper, sibling of .suite-card. */
  /* Let's follow that structure. */
  
  margin-top: -1.5rem; /* Pull up */
  padding-top: 1.5rem; /* Push text down */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Arrow after text */
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


// --- Components ---

const SuiteCard = ({ 
  title, 
  description, 
  items, 
  themeKey, 
  href 
}: { 
  title: string, 
  description: string, 
  items: string[], 
  themeKey: 'app' | 'web',
  href: string 
}) => {
  const theme = themes[themeKey];
  
  // Duplicating items for seamless loop
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
          <AnimatedList className="suite-list">
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
        Take a tour
      </Tongue>
    </CardWrapper>
  );
};

export default function SuiteGrid() {
  return (
    <Section>
      <Container>
        <TitleWrapper>
          <h2>Crafting digital experiences.</h2>
          <p>
            From native mobile applications to responsive web platforms,
            I build solutions that solve real problems and delight users.
          </p>
        </TitleWrapper>
        
        <Grid>
          <SuiteCard 
            title="APP" 
            themeKey="app"
            href="/apps"
            description="Cross-platform mobile applications built with Flutter, delivering native performance on both iOS and Android."
            items={[
              "Flutter", "Dart", "Cross-platform", "iOS & Android", "Material Design", "tomelater"
            ]}
          />
          <SuiteCard 
            title="WEB" 
            themeKey="web"
            href="/web"
            description="Modern web applications leveraging the power of Next.js, React, and interactive 3D elements."
            items={[
              "gym management", "ninedragons", "tomelater", "apple music playlist"
            ]}
          />
        </Grid>
      </Container>
    </Section>
  );
}
