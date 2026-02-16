'use client';

import styled from '@emotion/styled';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '../data';

// --- Styled Components ---

// --- Styled Components ---

const Section = styled.section`
  padding: 6rem 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  background: #f9f9fb;
  overflow: hidden; /* Prevent horizontal scroll from scattered items */

  @media (max-width: 1200px) {
    width: 90%;
  }
  
  @media (max-width: 640px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 390px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #111827;
  letter-spacing: -0.02em;
  z-index: 10;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  transform-style: preserve-3d;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr); 
    gap: 1rem;
  }

  @media (max-width: 390px) {
    gap: 0.5rem;
  }
`;

const ProjectItem = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  background: transparent;
  border-radius: 50px; /* Changed from 50px to prevent circle look on mobile */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: none;
  padding: 0;
  will-change: transform, opacity, filter;
  cursor: default;
  transition: box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 768px) {
    border-radius: 24px;
  }
`;



export default function IntegrationsGrid({ dict }: { dict?: any }) {
  const t = dict || {
    title: "Built with passion,\npowered by modern tech"
  };
  
  // Helper to render newlines
  const renderTitle = (text: string) => {
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
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {renderTitle(t.title)}
        </Title>
        
        <Grid>
          {projects.filter(p => p.type === 'web').map((project, index) => {
            // Determine start positions based on index to create "scattered" 3D look
            const zStart = 200 + (index * 50) % 500;
            const xStart = (index % 2 === 0 ? -1 : 1) * ((index * 20) % 300);
            const yStart = (index % 3 === 0 ? -1 : 1) * ((index * 30) % 300);

            return (
              <ProjectItem
                key={project.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  z: zStart,
                  x: xStart,
                  y: yStart,
                  filter: 'blur(10px)'
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  z: 0, 
                  x: 0, 
                  y: 0,
                  filter: 'blur(0px)'
                }}
                viewport={{ margin: "-10%" }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 50,
                  damping: 15
                }}
                style={{ transformPerspective: 1000 }} 
              >
                {/* <img src={project.icon} alt={`${project.name} icon`} loading="lazy" /> */}
                <Image src={project.icon} alt={`${project.title} icon`} loading="lazy" />
              </ProjectItem>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
