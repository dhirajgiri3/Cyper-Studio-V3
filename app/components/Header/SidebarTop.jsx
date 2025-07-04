import styled from 'styled-components';
import SocialMediaLinks from './SocialMediaLinks';
import MenuLinks from './MenuLinks';

const SidebarTopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
  width: 100%;

  @media screen and (max-width: 1024px) {
    gap: 3rem;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }

  .title {
    h2 {
      color: var(--para);
      font-size: var(--sm);
      font-weight: 500;
      margin-bottom: 1rem;

      @media screen and (max-width: 767px) {
        margin-bottom: 0.5rem;
      }
    }
  }

  .left, .right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    @media screen and (max-width: 767px) {
      width: 100%;
      gap: 1rem;
    }
  }
`;

export default function SidebarTop() {
  return (
    <SidebarTopContainer>
      {/* <div className="left">
        <div className="title">
          <h2>Social Media</h2>
        </div>
        <SocialMediaLinks />
      </div> */}
      <div className="right">
        <div className="title">
          <h2>Menu</h2>
        </div>
        <MenuLinks />
      </div>
    </SidebarTopContainer>
  );
}