import styled from 'styled-components';
import SocialMediaLinks from './SocialMediaLinks';
import MenuLinks from './MenuLinks';

const SidebarTopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 7rem;

  @media screen and (max-width : 768px) {
    flex-direction: column-reverse;
    gap: 1rem;
  }

  .title {
    h2 {
      color: var(--para);
      font-size: var(--sm);
      font-weight: 300;
    }
  }

  .left, .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    @media screen and (max-width : 768px) {
      gap: 1.5rem;
    }

    .links {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export default function SidebarTop() {
  return (
    <SidebarTopContainer>
      <div className="left">
        <div className="title">
          <h2>Social Media</h2>
        </div>
        <SocialMediaLinks />
      </div>
      <div className="right">
        <div className="title">
          <h2>Menu</h2>
        </div>
        <MenuLinks />
      </div>
    </SidebarTopContainer>
  );
}