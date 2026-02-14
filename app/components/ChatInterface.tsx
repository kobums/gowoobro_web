'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

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

const ResponseArea = styled(motion.div)`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
`;

// --- Component ---

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      return res.json();
    },
    onSuccess: () => {
      // Mock response for now to demonstrate the UI
      setResponse(`Here's a mock response for: "${message}"`);
      setMessage('');
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
    // Optional: Auto send or just fill? Let's just fill for better ux
  };

  const suggestions = [
    { icon: '📝', text: 'Leave policies' },
    { icon: '🚀', text: 'Career growth' },
    { icon: '👥', text: 'Manager coaching' },
  ];

  return (
    <ChatContainer>
      <HeaderSection>
        <Tag>✨ Ask me anything</Tag>
        <Title>What would you like to know?</Title>
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
              placeholder="How can I help you today?"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                // Reset response when user types new message?
                if (response && e.target.value) setResponse(null); 
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
          {response && (
             <ResponseArea
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
             >
               {response}
             </ResponseArea>
          )}
        </AnimatePresence>

        <SuggestionRow>
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
        </SuggestionRow>

      </BoxWrapper>
      
    </ChatContainer>
  );
}
