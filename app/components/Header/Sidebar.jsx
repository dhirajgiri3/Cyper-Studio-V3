import styled from 'styled-components';
import { useEffect } from 'react';
import gsap from 'gsap';
import SidebarTop from './SidebarTop';
import SidebarBottom from './SidebarBottom';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 35vw;
  height: 100%;
  background: #ffffff;
  color: var(--dark);
  transform: translateX(-100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 5rem;
  padding: 2rem 4rem;
  z-index: 1002;
  border-radius: 70%; 
  transition: all 0.3s ease-in-out;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  @media screen and (max-width: 767px) {
    width: 80vw; 
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    padding: 4rem 2rem;
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
  transition: opacity 0.3s ease-in-out; 
`;

export default function Sidebar({ isOpen, onClose }) {
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 0.3, ease: "power1.inOut" } });

    if (isOpen) {
      timeline
        .to('.overlay', { opacity: 1, pointerEvents: 'auto' })
        .to('.sidebar', { x: 0, borderRadius: '0%' }, 0);
    } else {
      timeline
        .to('.sidebar', { x: '-100%', borderRadius: '70%' })
        .to('.overlay', { opacity: 0, pointerEvents: 'none' }, 0);
    }
  }, [isOpen]);

  return (
    <>
      <BackgroundOverlay className="overlay" onClick={onClose} />
      <SidebarContainer className="sidebar backdrop-blur-xl">
        <SidebarTop />
        <SidebarBottom />
      </SidebarContainer>
    </>
  );
}
