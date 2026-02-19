'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProjectForm from '../../../../components/admin/ProjectForm';
import Link from 'next/link';
import { getProject } from '../../../../api/projects';
import { Project } from '../../../../types/models';
import { use } from 'react';

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

export default function EditProjectPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(id);
        setProject(data.item);
      } catch (error) {
        console.error('Failed to fetch project', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <Container>
      <Header>
        <BackLink href="/admin/projects">← Back to Projects</BackLink>
      </Header>
      <ProjectForm initialData={project} isEditMode={true} />
    </Container>
  );
}
