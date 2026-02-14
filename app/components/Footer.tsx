'use client';

import React from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1.5rem;
  background-color: #030302;
  margin: 0.75rem;
  margin-top: 3rem;
  margin-bottom: 0.75rem;
  padding: 3rem 1.5rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    margin: 1rem;
    margin-top: 96px;
    margin-bottom: 1rem;
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 120px 1.5rem;
  }

  @media (min-width: 1536px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

// BackgroundTexture styled component removed

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    gap: 3rem;
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  & > *:nth-of-type(1) {
    grid-row-start: 1;
    grid-row-end: 3;
  }

  & > *:nth-of-type(2) {
    grid-column-start: 2;
    grid-row-start: 1;
  }

  & > *:nth-of-type(3) {
    grid-column-start: 2;
    grid-row-start: 2;
  }

  & > *:nth-of-type(4) {
    grid-column-start: 1;
    grid-row-start: 3;
  }

  & > *:nth-of-type(5) {
    grid-column-start: 2;
    grid-row-start: 3;
  }

  @media (min-width: 768px) {
    & > *:nth-of-type(1) {
      grid-row-start: auto;
      grid-row-end: auto;
    }

    & > *:nth-of-type(2) {
      grid-column-start: auto;
      grid-row-start: auto;
    }

    & > *:nth-of-type(3) {
      grid-column-start: auto;
      grid-row-start: auto;
    }

    & > *:nth-of-type(4) {
      grid-column-start: auto;
      grid-row-start: auto;
    }

    & > *:nth-of-type(5) {
      grid-column-start: auto;
      grid-row-start: auto;
    }
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.25rem 0;
`;

const HiddenColumn = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.25rem 0;
  }
`;

const DownloadColumn = styled(LinkColumn)`
  text-align: left;

  @media (min-width: 768px) {
    text-align: right;
  }
`;

const ColumnTitle = styled.h4`
  color: white;
  font-size: 14px;
  font-weight: 400;
`;

const Divider = styled.div`
  margin: 0.5rem 0;
  height: 0.5px;
  width: 100%;
  background-color: white;
  opacity: 0.2;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  color: white;
  opacity: 0.8;
  font-size: 14px;

  a {
    color: white;
    text-decoration: none;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 0;
      background-color: white;
      opacity: 0.2;
      transition: width 0.3s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const SubList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1rem;
  list-style: none;
  margin: 0;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SocialSection = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 0.75rem;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0;
    order: 2;
    column-gap: 1.5rem;
  }
`;

const LanguageButton = styled.button`
  display: inline-flex;
  border-radius: 9999px;
  white-space: nowrap;
  background-color: transparent;
  font-weight: 400;
  height: 2rem;
  width: fit-content;
  padding: 0.5rem 0.5rem;
  color: white;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
  border: none;
  font-size: 16px;

  &:hover {
    background-color: rgba(249, 250, 251, 0.3);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const SocialLink = styled.a`
  position: relative;
  display: flex;
  border-radius: 0.375rem;
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  padding: 3px;
  transition: transform 0.3s ease-in-out;
  color: white;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: white;
  opacity: 0.8;
  width: 160px;

  @media (min-width: 768px) {
    order: 1;
    margin-top: 0;
    width: 100%;
    font-size: 16px;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <ContentWrapper>
        <LinksGrid>
          <LinkColumn>
            <ColumnTitle>프로젝트</ColumnTitle>
            <Divider />
            <LinkList>
              <LinkItem><div style={{cursor: 'default', opacity: 0.5, marginBottom: '4px'}}>Mobile Apps</div></LinkItem>
              <SubList>
                <LinkItem><a href="/apps">Flutter Apps</a></LinkItem>
                <LinkItem><a href="https://apps.apple.com/us/app/gowoobro-docs/id1487937127">App Store</a></LinkItem>
                <LinkItem><a href="https://apps.apple.com/us/app/gowoobro-docs/id1487937127">Play Store</a></LinkItem>
              </SubList>
              <Divider />
              <LinkItem><div style={{cursor: 'default', opacity: 0.5, marginBottom: '4px'}}>Web Platforms</div></LinkItem>
              <SubList>
                <LinkItem><a href="/web">Next.js Projects</a></LinkItem>
                <LinkItem><a href="/web">React Applications</a></LinkItem>
              </SubList>
            </LinkList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle>프로필</ColumnTitle>
            <Divider />
            <LinkList>
              <LinkItem><a href="/about">소개 (About)</a></LinkItem>
              <LinkItem><a href="/experience">경력 (Experience)</a></LinkItem>
              <LinkItem><a href="/skills">기술 스택 (Skills)</a></LinkItem>
              <LinkItem><a href="https://github.com/kobums" target="_blank" rel="noreferrer">GitHub</a></LinkItem>
              <LinkItem><a href="https://linkedin.com/in/gowoobro" target="_blank" rel="noreferrer">LinkedIn</a></LinkItem>
            </LinkList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle>연락하기</ColumnTitle>
            <Divider />
            <LinkList>
              <LinkItem><a href="mailto:kobums@naver.com">이메일 문의</a></LinkItem>
              <LinkItem><a href="https://open.kakao.com/o/sdtS7Hlh" target="_blank" rel="noreferrer">카카오톡 오픈채팅</a></LinkItem>
            </LinkList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle>주요 작업물</ColumnTitle>
            <Divider />
            <LinkList>
              <LinkItem><a href="/project/tomelater">Tomelater</a></LinkItem>
              <LinkItem><a href="/project/ninedragons">Nine Dragons</a></LinkItem>
              <LinkItem><a href="/project/gym-management">Gym Management</a></LinkItem>
              <LinkItem><a href="/project/apple-music-playlist">Apple Music Playlist</a></LinkItem>
            </LinkList>
          </LinkColumn>

          <HiddenColumn>
            <div style={{height: '1px', width: '100%'}}></div>
          </HiddenColumn>

          <DownloadColumn>
            <ColumnTitle>다운로드</ColumnTitle>
            <Divider />
            <LinkList>
              <LinkItem><a href="/resume.pdf" target="_blank">이력서 (Resume)</a></LinkItem>
              <LinkItem><a href="/portfolio.pdf" target="_blank">포트폴리오 (PDF)</a></LinkItem>
            </LinkList>
          </DownloadColumn>
        </LinksGrid>

        <BottomSection>
          <Divider />
          <BottomContent>
            <SocialSection>
              <LanguageButton type="button">
                <span>한국어</span>
              </LanguageButton>
              <SocialIcons>
                <SocialLink href="https://www.instagram.com/gowoobro" target="_blank" rel="noreferrer">
                  <span className="sr-only">Instagram</span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.0027 3.99902C9.82843 3.99902 9.55556 4.00852 8.70158 4.04736C7.84929 4.08636 7.26752 4.22119 6.75847 4.41903C6.23192 4.62336 5.78525 4.89669 5.34026 5.34152C4.89493 5.7862 4.62139 6.23252 4.41624 6.75852C4.21776 7.26736 4.08265 7.84886 4.0443 8.70019C4.0061 9.55352 3.99609 9.82636 3.99609 11.999C3.99609 14.1717 4.00577 14.4435 4.04446 15.2969C4.08366 16.1485 4.21859 16.7299 4.4164 17.2385C4.62106 17.7647 4.89459 18.211 5.33975 18.6557C5.78459 19.1007 6.23125 19.3747 6.75747 19.579C7.26685 19.7769 7.84879 19.9117 8.70092 19.9507C9.55489 19.9895 9.82759 19.999 12.0017 19.999C14.1762 19.999 14.4482 19.9895 15.3022 19.9507C16.1545 19.9117 16.7369 19.7769 17.2463 19.579C17.7727 19.3747 18.2187 19.1007 18.6635 18.6557C19.1088 18.211 19.3824 17.7647 19.5875 17.2387C19.7843 16.7299 19.9194 16.1484 19.9594 15.297C19.9978 14.4437 20.0078 14.1717 20.0078 11.999C20.0078 9.82635 19.9978 9.55369 19.9594 8.70036C19.9194 7.84869 19.7843 7.26736 19.5875 6.75869C19.3824 6.23252 19.1088 5.78619 18.6635 5.34152C18.2182 4.89652 17.7728 4.62319 17.2458 4.41902C16.7354 4.22119 16.1533 4.08636 15.301 4.04736C14.447 4.00852 14.1751 3.99902 12.0002 3.99902H12.0027ZM11.2845 5.44069C11.4977 5.44036 11.7355 5.44069 12.0027 5.44069C14.1403 5.44069 14.3936 5.44836 15.2378 5.48669C16.0184 5.52236 16.442 5.65269 16.7242 5.76219C17.0978 5.90719 17.3642 6.08052 17.6442 6.36052C17.9244 6.64053 18.0979 6.90719 18.2433 7.28052C18.3529 7.56219 18.4835 7.98552 18.519 8.76553C18.5574 9.60886 18.5657 9.86219 18.5657 11.9972C18.5657 14.1322 18.5574 14.3855 18.519 15.2289C18.4833 16.0089 18.3529 16.4322 18.2433 16.7139C18.0982 17.0872 17.9244 17.353 17.6442 17.6329C17.364 17.9129 17.098 18.0862 16.7242 18.2312C16.4423 18.3412 16.0184 18.4712 15.2378 18.5069C14.3938 18.5452 14.1403 18.5535 12.0027 18.5535C9.86495 18.5535 9.6116 18.5452 8.76763 18.5069C7.98706 18.4709 7.56342 18.3405 7.28103 18.231C6.90742 18.086 6.64055 17.9127 6.36035 17.6327C6.08014 17.3527 5.90668 17.0867 5.76124 16.7132C5.65165 16.4315 5.52106 16.0082 5.48554 15.2282C5.44717 14.3849 5.4395 14.1315 5.4395 11.9952C5.4395 9.85886 5.44717 9.60685 5.48554 8.76353C5.52123 7.98352 5.65165 7.56019 5.76124 7.27819C5.90634 6.90486 6.08014 6.63819 6.36035 6.35819C6.64055 6.07819 6.90742 5.90486 7.28103 5.75953C7.56324 5.64952 7.98706 5.51953 8.76763 5.48369C9.50618 5.45035 9.7924 5.44036 11.2845 5.43868L11.2845 5.44069ZM16.2762 6.76902C15.7458 6.76902 15.3155 7.19853 15.3155 7.72869C15.3155 8.25869 15.7458 8.68869 16.2762 8.68869C16.8066 8.68869 17.2369 8.25869 17.2369 7.72869C17.2369 7.19869 16.8066 6.7687 16.2762 6.7687L16.2762 6.76902ZM12.0027 7.89069C9.73218 7.89069 7.89132 9.73019 7.89132 11.999C7.89132 14.2679 9.73218 16.1065 12.0027 16.1065C14.2732 16.1065 16.1134 14.2679 16.1134 11.999C16.1134 9.73019 14.2731 7.89069 12.0025 7.89069H12.0027ZM12.0027 9.33236C13.4765 9.33236 14.6714 10.5262 14.6714 11.999C14.6714 13.4717 13.4765 14.6657 12.0027 14.6657C10.5288 14.6657 9.33406 13.4717 9.33406 11.999C9.33406 10.5262 10.5288 9.33236 12.0027 9.33236Z"></path>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.threads.net/@gowoobro" target="_blank" rel="noreferrer">
                  <span className="sr-only">Threads</span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 272 272" fill="currentColor">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
                  </svg>
                </SocialLink>
                <SocialLink href="https://x.com/gowoobro" target="_blank" rel="noreferrer">
                  <span className="sr-only">X</span>
                  <svg width="20" height="20" viewBox="-4 -4 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M7.23448 5.07857L11.6034 0H10.5681L6.77457 4.40965L3.74465 0H0.25L4.83183 6.66818L0.25 11.9938H1.28536L5.29148 7.3371L8.49129 11.9938H11.9859L7.23422 5.07857H7.23448ZM5.81641 6.72692L5.35217 6.06292L1.65842 0.779407H3.24868L6.22958 5.04337L6.69381 5.70737L10.5686 11.2499H8.97837L5.81641 6.72718V6.72692Z"></path>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/company/gowoobro" target="_blank" rel="noreferrer">
                  <span className="sr-only">LinkedIn</span>
                  <svg width="12" height="12" viewBox="-3 -3 18 18" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7782 11.7782H9.40391V7.73424C9.40391 6.62549 8.98261 6.00589 8.10503 6.00589C7.15035 6.00589 6.65156 6.65068 6.65156 7.73424V11.7782H4.3634V4.07451H6.65156V5.1122C6.65156 5.1122 7.33955 3.83915 8.97433 3.83915C10.6084 3.83915 11.7782 4.83698 11.7782 6.9007V11.7782ZM1.63362 3.06577C0.854224 3.06577 0.222656 2.42925 0.222656 1.64421C0.222656 0.85918 0.854224 0.222656 1.63362 0.222656C2.41302 0.222656 3.04421 0.85918 3.04421 1.64421C3.04421 2.42925 2.41302 3.06577 1.63362 3.06577ZM0.452112 11.7782H2.83808V4.07451H0.452112V11.7782Z"></path>
                  </svg>
                </SocialLink>
              </SocialIcons>
            </SocialSection>
            <Copyright>© {new Date().getFullYear()} Gowoobro Limited, Inc. All rights reserved.</Copyright>
          </BottomContent>
        </BottomSection>
      </ContentWrapper>
    </FooterWrapper>
  );
}
