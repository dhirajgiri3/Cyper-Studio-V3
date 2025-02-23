import styled from 'styled-components';
import ContactInfo from './ContactInfo';

const SidebarBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;

  .top {
    p {
      font-size: var(--sm);
      color: var(--para);
    }
  }

  .bottom {
    display: flex;
    gap: 5rem;

    @media screen and (max-width : 768px) {
      gap: 1rem;
      flex-direction: column;
    }
  }
`;

export default function SidebarBottom() {
  return (
    <SidebarBottomContainer>
      <div className="top">
        <p>Get In Touch</p>
      </div>
      <ContactInfo />
    </SidebarBottomContainer>
  );
}