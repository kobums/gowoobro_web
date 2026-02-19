'use client';

import styled from '@emotion/styled';
import { Project } from '../types/models';
import Link from 'next/link';

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: rgba(0,0,0,0.1);
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex: 1;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.2s;
  flex: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const QRCodePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #888;
  border-radius: 8px;
  margin-top: 1rem;
`;

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card id={`${project.id}`}>
      <CardImage>{project.title[0]}</CardImage>
      <CardContent>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>

        {project.type === 'web' && project.url && (
          <Actions>
            <Button href={project.url} target="_blank" rel="noopener noreferrer">
              Visit Website
            </Button>
          </Actions>
        )}

        {project.type === 'app' && (
          <div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
               {/* In a real app, generate QR code here. Using placeholder for now. */}
               <QRCodePlaceholder>Download on App Store</QRCodePlaceholder>
                
               {project.appstoreurl && (
                 <div style={{ display: 'none' }}>App Store Link: {project.appstoreurl}</div>
               )}
            </div>
             <p style={{fontSize: '0.8rem', color: '#999', marginTop: '0.5rem'}}>Scan to download</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
