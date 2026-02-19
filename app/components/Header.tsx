'use client';

import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { Project } from '../types/models';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logoImg from '@/public/app/image-removebg-preview.png';
import mobileLogoImg from '../icon.png';

// Styles adapted from Craft.do
const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 50;
  
  width: calc(100% - 96px);
  max-width: 920px;
  
  /* Glassmorphism & Visuals */
  background: var(--navbar-gradient, linear-gradient(180deg,rgba(255, 255, 255, 0.4) 10%, rgba(255, 255, 255, 0.8)));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 12px 2px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TopBar = styled.div`
  height: 52px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 1rem;
  flex-shrink: 0;
  
  @media (max-width: 640px) {
    padding: 0 0.75rem;
  }

  @media (max-width: 390px) {
    padding: 0 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  justify-self: center;

  @media (max-width: 390px) {
    gap: 0.5rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  
  &:hover {
    color: #000;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
  }
  
  /* Prevent blue highlight on tap on mobile */
  -webkit-tap-highlight-color: transparent;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: #000;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  justify-self: start;

  .desktop-logo {
    display: block;
    height: 32px;
    width: auto;
    @media (max-width: 640px) {
      display: none;
    }
  }

  .mobile-logo {
    display: none;
    height: 32px;
    width: auto;
    @media (max-width: 640px) {
      display: block;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  padding-right: 2.5rem;
  justify-self: end;

  @media (max-width: 390px) {
    gap: 0.5rem;
    padding-right: 1rem;
  }
`;

const CTAButton = styled(Link)`
  background: #000;
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  
  &:hover {
    transform: scale(1.02);
    opacity: 0.9;
  }
`;

// Container for content measurement
const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  color: #000;
  transition: all 0.2s ease-in-out;
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.02);
  }
`;

const IconPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
`;

const CardDesc = styled.div`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.2;
`;

// Custom hook to measure element height
function useElementSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

export default function Header({ dict, projects }: { dict?: any, projects: Project[] }) { // Optional during migration, strictly typed later
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [contentRef, contentSize] = useElementSize();

  const apps = projects.filter(p => p.type === 'app');
  const webs = projects.filter(p => p.type === 'web');

  // Handle hover logic with delay to prevent flickering
  const handleMouseEnter = (tab: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveTab(tab);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveTab(null);
    }, 150); // 150ms delay
    setHoverTimeout(timeout);
  };
  
  // Toggle for touch devices
  const handleTouch = (tab: string) => {
    if (activeTab === tab) {
      // If already active, maybe close it? Or do nothing?
      // Let's close it to allow toggling off
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  // Header height logic: 52px (TopBar) + Measured Content Height
  // If no active tab, content height is effectively 0, but since we unmount children,
  // we rely on the measured size of the wrapper or force animating to 52.
  const targetHeight = activeTab ? 52 + contentSize.height : 52;

  // Fallback for dict if not provided (during transition)
  const t = dict || {
    nav: { app: 'App', web: 'Web' },
    contact: 'Contact'
  };

  return (
    <HeaderContainer
      initial={false}
      animate={{ height: targetHeight }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          setHoverTimeout(null);
        }
      }}
    >
      <TopBar>
        <Logo>
          <Image 
            src={logoImg} 
            alt="Gowoobro Logo" 
            className="desktop-logo"
            priority
          />
          <Image 
            src={mobileLogoImg} 
            alt="Gowoobro Logo Mobile" 
            className="mobile-logo"
            priority
          />
        </Logo>
        
        <Nav>
          <NavItem 
            onMouseEnter={() => handleMouseEnter('app')}
            onClick={() => handleTouch('app')}
          >
            {t.nav.app}
          </NavItem>
          
          <NavItem 
            onMouseEnter={() => handleMouseEnter('web')}
            onClick={() => handleTouch('web')}
          >
            {t.nav.web}
          </NavItem>
        </Nav>


        <RightSection>
          <CTAButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>{t.contact}</CTAButton>
        </RightSection>
      </TopBar>

      {/* Measure content size even if hidden/animating */}
      <div ref={contentRef}>
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ContentWrapper>
                <Grid>
                  {activeTab === 'app' && apps.map(app => (
                    <CardLink key={app.id} href={`#${app.id}`}>
                      <IconPlaceholder>
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + app.iconurl} alt={`${app.title} icon`} loading="lazy" width={40} height={40} style={{ objectFit: 'cover', borderRadius: '8px' }}  />
                      </IconPlaceholder>
                      <TextContent>
                        <CardTitle>{app.title}</CardTitle>
                        <CardDesc>{app.description.slice(0, 40)}...</CardDesc>
                      </TextContent>
                    </CardLink>
                  ))}
                   {activeTab === 'app' && apps.length === 0 && (
                    <div style={{ padding: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
                       No apps found.
                    </div>
                  )}

                  {activeTab === 'web' && webs.map(web => (
                    <CardLink key={web.id} href={`#${web.id}`}>
                      <IconPlaceholder>
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + web.iconurl} alt={`${web.title} icon`} loading="lazy" width={40} height={40} style={{ objectFit: 'cover', borderRadius: '8px' }}  />
                       </IconPlaceholder>
                      <TextContent>
                        <CardTitle>{web.title}</CardTitle>
                        <CardDesc>{web.description.slice(0, 40)}...</CardDesc>
                      </TextContent>
                    </CardLink>
                  ))}
                </Grid>
              </ContentWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HeaderContainer>
  );
}
