'use client';

import styled from '@emotion/styled';

export const Main = styled.main`
  min-height: 100vh;
  padding-top: 80px; /* Space for fixed header */
  background-color: #f9f9fb;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
`;

export const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow: hidden; /* Ensure 3D elements don't overflow */
`;
