'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState, useEffect, Fragment } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { createQuestion } from '../api/questions';
import { createIpblock } from '../api/ipblock';

// --- Animations ---
const glowAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

// --- Styled Components ---

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  width: 100%;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1200px) {
    width: 90%;
  }
  
  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 390px) {
    padding: 1rem 0.5rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: #f3f0ff; /* Light purple tint */
  color: #7c3aed; /* Purple */
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const Title = styled.h2`
  font-size: 2.5rem; /* Equivalent to h1 in design */
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.03em;
  
  @media (max-width: 640px) {
    font-size: 1.8rem;
    text-align: center;
  }

  @media (max-width: 390px) {
    font-size: 1.5rem;
  }
`;

// ... (BoxWrapper, GlowBackground, InputSection, rotate animations, AgentIcon omitted as they don't need changes yet) ...

const TextArea = styled.textarea`
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.4;
  font-weight: 500;
  color: #1f2937;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  min-height: 60px;
  height: auto;
  font-family: inherit;
  padding: 0.5rem 0;

  @media (max-width: 640px) {
    font-size: 1rem;
    min-height: 48px;
    padding: 0.25rem 0;
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 840px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 1200px) {
    width: 90%;
    box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 640px) {
    padding: 1rem;
    border-radius: 20px;
  }
`;

const GlowBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 32%;
  width: 100%;
  opacity: 0.15;
  filter: blur(40px);
  z-index: 0;
  background-image: linear-gradient(to right, 
    #a78bfa, 
    #ddd6fe, 
    #fbcfe8,
    #e9d5ff,
    #a78bfa
  );
  background-size: 200% 200%;
  animation: ${glowAnimation} 3s infinite linear;
  pointer-events: none;
`;

const InputSection = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const rotate1 = keyframes`
  0% { transform: rotate3d(1, 1, 1, 0deg); }
  100% { transform: rotate3d(1, 1, 1, 360deg); }
`;

const rotate2 = keyframes`
  0% { transform: rotate3d(1, -1, 0, 0deg); }
  100% { transform: rotate3d(1, -1, 0, 360deg); }
`;

const rotate3 = keyframes`
  0% { transform: rotate3d(0, 1, -1, 0deg); }
  100% { transform: rotate3d(0, 1, -1, 360deg); }
`;

const AgentIcon = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px; /* Enable 3D space */

  svg {
    width: 100%;
    height: 100%;
    color: #a78bfa;
    overflow: visible;
  }

  /* Target ellipses directly */
  ellipse {
    transform-origin: center;
    transform-box: fill-box;
    vector-effect: non-scaling-stroke;
  }

  ellipse:nth-of-type(1) {
    animation: ${rotate1} 4s linear infinite;
    color: #a78bfa;
  }

  ellipse:nth-of-type(2) {
    animation: ${rotate2} 8s linear infinite reverse;
    color: #c084fc;
  }

  ellipse:nth-of-type(3) {
    animation: ${rotate3} 6s linear infinite;
    color: #e879f9;
  }
`;



const SubmitButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: ${props => props.disabled ? '#f3f4f6' : '#7c3aed'};
  color: ${props => props.disabled ? '#d1d5db' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  &:hover:not(:disabled) {
    background-color: #6d28d9;
    transform: translateY(-1px);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.5;
  }
`;

const SuggestionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;

  @media (max-width: 640px) {
    margin-top: 1rem;
    gap: 0.5rem;
    justify-content: center; /* Center chips on small screens */
  }
`;

const SuggestionChip = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);

  &:hover {
    border-color: #ddd6fe;
    background-color: #f5f3ff;
    color: #6d28d9;
  }

  @media (max-width: 640px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    gap: 0.35rem;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #9ca3af;
  }
  
  &:hover svg {
    color: #7c3aed;
  }
`;



// --- Component ---

// --- New Status Components ---

const StatusMessage = styled(motion.div)<{ type: 'success' | 'error' }>`
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  font-size: 1rem;
  width: 90%;
  
  ${props => props.type === 'success' ? `
    background-color: #f0fdf4;
    color: #15803d;
    border: 1px solid #bbf7d0;
  ` : `
    background-color: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  `}

  @media (max-width: 640px) {
    width: 80%;
  }
`;

const MobileBr = styled.br`
  display: none;
  @media (max-width: 640px) {
    display: block;
    content: ""; /* helper for some browsers */
    margin: 0;
  }
`;

// --- Component ---

export default function ChatInterface({ dict }: { dict?: any }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ip, setIp] = useState<string>('');

  // Fallback dict
  const t = dict || {
    tag: 'Answer Anything', 
    title: 'What would you like to know?',
    placeholder: 'How can I help you today?',
    suggestions: {
      policies: 'Leave policies',
      growth: 'Career growth',
      coaching: 'Manager coaching',
      success_message: 'Question registered!\nWe will answer after confirmation.',
      error_message: 'Transmission failed.\nPlease try again.'
    }
  };

  // Safe access to messages
  const successMsg = t.suggestions?.success_message || 'Success';
  const errorMsg = t.suggestions?.error_message || 'Error';

  useEffect(() => {
    const fetchIpAndBlock = async () => {
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const clientIp = ipData.ip;
        setIp(clientIp);

        if (clientIp) {
          await createIpblock({ address: clientIp });
        }
      } catch (error) {
        console.error('Failed to fetch IP or send block request:', error);
      }
    };

    fetchIpAndBlock();
  }, []);

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      return await createQuestion({
        question: text,
        address: ip || 'unknown',
      });
    },
    onSuccess: () => {
      setStatus('success');
      setMessage('');
      // Clear success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    },
    onError: () => {
      setStatus('error');
      // Clear error message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        sendMessageMutation.mutate(message);
      }
    }
  };

  const handleSuggestionClick = (text: string) => {
    setMessage(text);
  };

  const suggestions = [
    { icon: '📝', text: t.suggestions.policies },
    { icon: '🚀', text: t.suggestions.growth },
    { icon: '👥', text: t.suggestions.coaching },
  ];

  return (
    <ChatContainer>
      <HeaderSection>
        <Tag>✨ {t.tag}</Tag>
        <Title>{t.title}</Title>
      </HeaderSection>

      <BoxWrapper>
        {/* <GlowBackground /> */}
        
        <InputSection>
          {/* <AgentIcon>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="currentColor" strokeWidth="2.5">
                <ellipse cx="8" cy="8" rx="7" ry="3" />
                <ellipse cx="8" cy="8" rx="7" ry="3" />
                <ellipse cx="8" cy="8" rx="7" ry="3" />
              </g>
            </svg>
          </AgentIcon> */}
          
          <div style={{ flex: 1 }}>
            <TextArea
              placeholder={t.placeholder}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status !== 'idle') setStatus('idle'); 
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <SubmitButton 
            disabled={!message.trim() || sendMessageMutation.isPending}
            onClick={() => sendMessageMutation.mutate(message)}
          >
            {sendMessageMutation.isPending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                ↻
              </motion.div>
            ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </SubmitButton>
        </InputSection>

        <AnimatePresence>
          {status === 'success' && (
            <StatusMessage
              type="success"
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                {successMsg.split('\n').map((line: string, i: number, arr: string[]) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <MobileBr />}
                  </Fragment>
                ))}
              </div>
            </StatusMessage>
          )}

          {status === 'error' && (
            <StatusMessage
              type="error"
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                {errorMsg.split('\n').map((line: string, i: number, arr: string[]) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <MobileBr />}
                  </Fragment>
                ))}
              </div>
            </StatusMessage>
          )}
        </AnimatePresence>

        {/* <SuggestionRow>
          {suggestions.map((s) => (
            <SuggestionChip 
              key={s.text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSuggestionClick(s.text)}
            >
              <span>{s.icon}</span>
              {s.text}
            </SuggestionChip>
          ))}
        </SuggestionRow> */}

      </BoxWrapper>
      
    </ChatContainer>
  );
}
