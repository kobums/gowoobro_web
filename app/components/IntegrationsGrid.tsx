'use client';

import styled from '@emotion/styled';
import { Fragment, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Project } from '../types/models';

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

/* 아이콘 개수가 몇 개로 늘어도 줄마다 가운데 정렬되도록 flex wrap 을 쓴다.
   grid 1fr 은 마지막 줄 아이템이 왼쪽에 붙는다. 크기는 clamp 로 화면 폭에
   따라 자연스럽게 줄어든다. */
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  transform-style: preserve-3d;

  @media (max-width: 480px) {
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
  width: clamp(64px, 18vw, 104px);
  aspect-ratio: 1;
  background: transparent;
  border-radius: 22%; /* Changed from 50px to prevent circle look on mobile */
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
`;



export default function IntegrationsGrid({ dict, projects }: { dict?: any, projects: Project[] }) {
  const t = dict || {
    title: "Built with passion,\npowered by modern tech"
  };

  // 등장 애니메이션 트리거는 아이템이 아니라 그리드 기준이다. 아이템마다
  // whileInView 를 쓰면 흩뿌리기 초기 transform 이 overflow hidden 바깥까지
  // 밀려난 아이템은 뷰포트 교차가 영영 감지되지 않아 opacity 0 으로 숨은 채
  // 남는다 (뒤쪽 프로젝트 아이콘이 안 보이던 원인).
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-50px' });
  
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
        
        <Grid ref={gridRef}>
          {/* 웹·앱 구분 없이 모든 프로젝트를 보여준다. 같은 서비스가 web/app 두 줄로
              들어 있으므로 key 기준으로 한 번만, 아이콘이 있는 것만 그린다. */}
          {projects
            .filter(p => p.iconurl)
            .filter((p, i, arr) => arr.findIndex(q => q.key === p.key) === i)
            .map((project, index) => {
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
                animate={gridInView ? {
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  x: 0,
                  y: 0,
                  filter: 'blur(0px)'
                } : undefined}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 50,
                  damping: 15
                }}
                style={{ transformPerspective: 1000 }} 
              >
                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + project.iconurl} alt={`${project.title} icon`} loading="lazy" />
              </ProjectItem>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
