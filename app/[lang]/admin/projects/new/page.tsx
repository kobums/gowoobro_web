'use client';

import styled from '@emotion/styled';
import ProjectForm from '../../../../components/admin/ProjectForm';
import Link from 'next/link';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    color: #374151;
    text-decoration: underline;
  }
`;

export default function NewProjectPage() {
  return (
    <Container>
      <Header>
        <BackLink href="/admin/projects">← Back to Projects</BackLink>
      </Header>
      <ProjectForm />
    </Container>
  );
}
