'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectType } from '../../types/models';
import { createProject, updateProject } from '../../api/projects';
import { uploadFile } from '../../api/upload';
import styled from '@emotion/styled';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px solid #2563eb;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;

interface ProjectFormProps {
  initialData?: Project;
  isEditMode?: boolean;
}

export default function ProjectForm({ initialData, isEditMode = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Project>({
    id: 0,
    key: '',
    type: 'web',
    title: '',
    description: '',
    iconurl: '',
    url: '',
    playstoreurl: '',
    appstoreurl: '',
    qrcodeurl: '',
    // date: new Date().toISOString(),
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalData = { ...formData }; // Create a copy to modify

      if (selectedFile) {
        try {
          const data = await uploadFile(selectedFile);
          console.log('Upload success', data);
          finalData.iconurl = data.filename;
        } catch (uploadErr) {
          console.error('Upload failed', uploadErr);
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          return; // Stop submission if upload fails
        }
      }

      if (isEditMode) {
        await updateProject(finalData);
      } else {
        await createProject(finalData);
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Label htmlFor="key">key (Unique Key)</Label>
        <Input
          type="text"
          id="key"
          name="key"
          value={formData.key}
          onChange={handleChange}
          required
          disabled={isEditMode} // ID usually shouldn't change in edit mode
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="web">Web</option>
          <option value="app">App</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="iconurl">Icon URL</Label>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Label 
            htmlFor="icon-upload" 
            style={{ 
              cursor: 'pointer', 
              padding: '0.75rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px', 
              backgroundColor: '#f3f4f6',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {selectedFile ? 'File Selected' : 'Upload'}
          </Label>
          <input
            type="file"
            id="icon-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                // Optional: Preview locally
                const objectUrl = URL.createObjectURL(file);
                setFormData(prev => ({ ...prev, iconurl: objectUrl }));
              }
            }}
          />
        </div>
        {formData.iconurl && (
            <div style={{ marginTop: '0.5rem' }}>
              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + formData.iconurl} alt="Icon preview" style={{ width: 50, height: 50, objectFit: 'contain', border: '1px solid #eee', borderRadius: 4 }} />
            </div>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="url">Project URL</Label>
        <Input
          type="text"
          id="url"
          name="url"
          value={formData.url || ''}
          onChange={handleChange}
        />
      </FormGroup>

      {formData.type === 'app' && (
        <>
          <FormGroup>
            <Label htmlFor="playstoreurl">Play Store URL</Label>
            <Input
              type="text"
              id="playstoreurl"
              name="playstoreurl"
              value={formData.playstoreurl || ''}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="appstoreurl">App Store URL</Label>
            <Input
              type="text"
              id="appstoreurl"
              name="appstoreurl"
              value={formData.appstoreurl || ''}
              onChange={handleChange}
            />
          </FormGroup>
        </>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
      </Button>
    </FormContainer>
  );
}
