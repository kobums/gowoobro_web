'use client';

import styled from '@emotion/styled';

export const Section = styled.section`
  padding: 8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  width: 100%;
`;

export const AppIconWrapper = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 20px;
  background-color: #f5f7fa; /* Fallback */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  img {
    object-fit: cover;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: #666;
  margin-top: 0;
  max-width: 600px;
  line-height: 1.5;
`;

export const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  padding: 0 2rem;
`;

export const DownloadCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }
`;

export const QRCodeWrapper = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
`;

export const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: #000;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  font-size: 1rem;
  width: 70%;
  transition: opacity 0.2s ease, transform 0.1s ease;

  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    transform: scale(0.98);
  }

  svg {
    margin-right: 0.5rem;
    width: 20px;
    height: 20px;
  }
`;
