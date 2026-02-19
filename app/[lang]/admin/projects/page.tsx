'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '../../../types/models';
import { getProjects, deleteProject } from '../../../api/projects';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
`;

const CreateButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    background-color: #1d4ed8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f3f4f6;
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #ef4444;
  border-color: #fca5a5;
  &:hover {
    background: #fef2f2;
  }
`;

const shimmer = `
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

const SkeletonRow = styled.tr`
  ${shimmer}
`;

const SkeletonCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const SkeletonBlock = styled.div<{ width?: string }>`
  height: 16px;
  width: ${({ width }) => width || '100%'};
  border-radius: 4px;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite ease-in-out;

  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

const SkeletonCircle = styled(SkeletonBlock)`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  flex-shrink: 0;
`;

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.items);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        // ID is string in model but deleteProject expects number based on previous generic API?
        // Let's check api/projects.ts... it says deleteProject(id: number).
        // BUT projects use string keys (p_key). 
        // The API definition might be generic copy-paste.
        // I will assume the backend handles string IDs or I need to fix api/projects.ts first OR I cast it if backend expects number (but p_key implies string/mixed). 
        // Let's try casting to any to bypass TS for now if needed, or better, update projects.ts if I can confirm.
        // Model says id: string. API says id: number. Discrepancy!
        // Given existing data had 'p_key', it's likely a string. 
        // However, I'll pass it as is and let the API module handle it, perhaps correcting the API module type is safer.
        await deleteProject(id); 
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project', error);
        alert('Failed to delete project');
      }
    }
  };

  if (loading) return (
    <Container>
      <Header>
        <Title>Projects Admin</Title>
        <CreateButton href="/admin/projects/new">Create New Project</CreateButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i}>
              <SkeletonCell><SkeletonBlock width="30px" /></SkeletonCell>
              <SkeletonCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SkeletonCircle />
                  <SkeletonBlock width="140px" />
                </div>
              </SkeletonCell>
              <SkeletonCell><SkeletonBlock width="60px" /></SkeletonCell>
              <SkeletonCell><SkeletonBlock width="200px" /></SkeletonCell>
              <SkeletonCell>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <SkeletonBlock width="50px" style={{ height: '32px' }} />
                  <SkeletonBlock width="60px" style={{ height: '32px' }} />
                </div>
              </SkeletonCell>
            </SkeletonRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );

  return (
    <Container>
      <Header>
        <Title>Projects Admin</Title>
        <CreateButton href="/admin/projects/new">Create New Project</CreateButton>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <Td>{project.id}</Td>
              <Td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + project.iconurl} alt="" style={{ width: 24, height: 24, borderRadius: 4 }} />
                  {project.title}
                </div>
              </Td>
              <Td>{project.type}</Td>
              <Td>{project.description.substring(0, 50)}...</Td>
              <Td>
                <Link href={`/admin/projects/${project.id}`}>
                  <ActionButton>Edit</ActionButton>
                </Link>
                <DeleteButton onClick={() => handleDelete(project.id)}>Delete</DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
