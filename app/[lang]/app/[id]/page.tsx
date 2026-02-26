import React from 'react';
import { getProject } from '../../../api/projects';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Main } from '../../../components/PageLayout';
import { getDictionary } from '../../../get-dictionary';
import { getProjects } from '../../../api/projects';
import {
  Section,
  HeaderWrap,
  AppIconWrapper,
  Title,
  Subtitle,
  DownloadGrid,
  DownloadCard,
  QRCodeWrapper,
  DownloadButton
} from '../../../components/AppDetailsStyles';

export default async function AppDetailsPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  
  // Fetch specific project details
  const projectResponse = await getProject(parseInt(id, 10));
  const project = projectResponse.item;

  // Fetch all projects for the Header
  const { items: allProjects } = await getProjects();
  const dict = await getDictionary(lang);

  return (
    <Main>
      <Header dict={dict.header} projects={allProjects} />    
      
      <Section>
        <HeaderWrap>
          <AppIconWrapper>
            {project.iconurl ? (<img src={process.env.NEXT_PUBLIC_IMAGE_URL + project.iconurl} alt={`${project.title} icon`} loading="lazy" width={96} height={96} style={{ objectFit: 'cover', borderRadius: '8px' }}  />
            ) : (
              project.title[0]
            )}
          </AppIconWrapper>
          <Title>{project.title}</Title>
          <Subtitle>{project.description}</Subtitle>
        </HeaderWrap>

        <DownloadGrid>
          {/* iOS Card */}
          {project.appstoreurl && (
            <DownloadCard>
              <QRCodeWrapper>
                <QRCodeSVG value={project.appstoreurl} size={150} level="M" />
              </QRCodeWrapper>
              <DownloadButton href={project.appstoreurl} target="_blank" rel="noopener noreferrer">
                {/* Apple Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.6695 7.96512C16.0975 8.31533 15.6237 8.80495 15.2925 9.38816C14.9611 9.97136 14.7833 10.6291 14.7754 11.2998C14.7776 12.0546 15.0013 12.7922 15.4186 13.4212C15.836 14.0502 16.4286 14.5429 17.1232 14.8384C16.8494 15.722 16.444 16.5593 15.9209 17.3223C15.1724 18.3998 14.3897 19.4772 13.1989 19.4772C12.008 19.4772 11.7017 18.7854 10.3293 18.7854C8.99096 18.7854 8.51455 19.5 7.4257 19.5C6.33685 19.5 5.57701 18.5018 4.70363 17.2769C3.54996 15.561 2.91591 13.5486 2.87756 11.4812C2.87756 8.07856 5.08931 6.27523 7.2669 6.27523C8.4238 6.27523 9.38796 7.03507 10.1138 7.03507C10.8057 7.03507 11.8832 6.22977 13.1989 6.22977C13.8753 6.21232 14.5456 6.36146 15.1509 6.66407C15.7561 6.96669 16.2776 7.41349 16.6695 7.96512ZM12.575 4.78938C13.155 4.10715 13.4833 3.24657 13.5051 2.35142C13.5061 2.23341 13.4947 2.11562 13.4711 2C12.4749 2.09731 11.5536 2.57213 10.8964 3.32704C10.3109 3.98209 9.97021 4.81968 9.9323 5.69748C9.93271 5.80423 9.94413 5.91065 9.96638 6.01507C10.0449 6.02992 10.1246 6.03752 10.2045 6.0378C10.6636 6.00127 11.1105 5.87176 11.518 5.65715C11.9256 5.44253 12.2852 5.1473 12.575 4.78938Z" />
                </svg>
                Download iOS app
              </DownloadButton>
            </DownloadCard>
          )}

          {/* Android Card */}
          {project.playstoreurl && (
            <DownloadCard>
              <QRCodeWrapper>
                <QRCodeSVG value={project.playstoreurl} size={150} level="M" />
              </QRCodeWrapper>
              <DownloadButton href={project.playstoreurl} target="_blank" rel="noopener noreferrer">
                {/* Android / Play Store placeholder icon */}
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" fill="currentColor" >
                    <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
                  </svg>
                Download Android app
              </DownloadButton>
            </DownloadCard>
          )}

          {/* Fallback View Website Card if not an App but Web */}
          {project.type === 'web' && project.url && (
            <DownloadCard>
              <QRCodeWrapper>
                <QRCodeSVG value={project.url} size={150} level="M" />
              </QRCodeWrapper>
              <DownloadButton href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Website
              </DownloadButton>
            </DownloadCard>
          )}
        </DownloadGrid>
      </Section>

      <Footer dict={dict.footer} lang={lang} projects={allProjects} />
    </Main>
  );
}