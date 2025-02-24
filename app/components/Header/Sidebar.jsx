import styled from 'styled-components';
import { useEffect, useCallback } from 'react';
import gsap from 'gsap';
import SidebarTop from './SidebarTop';
import SidebarBottom from './SidebarBottom';
import Link from 'next/link';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 35vw;
  height: 100vh;
  background: #ffffff;
  color: var(--dark);
  transform: translateX(-100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 4rem;
  z-index: 1002;
  border-radius: 70%; 
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media screen and (max-width: 1024px) {
    width: 60vw;
    padding: 2rem 3rem;
  }

  @media screen and (max-width: 767px) {
    width: 85vw;
    padding: 2rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  opacity: 0;
  z-index: 1001;
  pointer-events: none; 
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

export default function Sidebar({ isOpen, onClose }) {
  // Memoize the escape handler
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const timeline = gsap.timeline({ 
      defaults: { duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" } 
    });
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      timeline
        .to('.overlay', { 
          opacity: 1, 
          pointerEvents: 'auto' 
        })
        .to('.sidebar', { 
          x: 0, 
          borderRadius: '0%',
        }, 0);

      // Add escape key listener
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
      timeline
        .to('.sidebar', { 
          x: '-100%',
          borderRadius: '70%',
        })
        .to('.overlay', { 
          opacity: 0, 
          pointerEvents: 'none' 
        }, 0);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]); // Only depend on isOpen and memoized handler

  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevent clicks inside sidebar from closing it
  };

  return (
    <>
      <BackgroundOverlay className="overlay" onClick={onClose} />
      <SidebarContainer className="sidebar" onClick={handleContentClick}>
        <SidebarTop />
        <SidebarBottom />
        <div className="md:hidden w-full mt-4">
          <Link href="/Contact" onClick={onClose}>
            <PrimaryButton
              withParticles={true}
              withRipple={true}
              className="w-full hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </PrimaryButton>
          </Link>
        </div>
      </SidebarContainer>
    </>
  );
}
