import styled from 'styled-components';
import TextLink from './TextLink';

const MenuLinksContainer = styled.div`
  width: 100%;
  
  .links {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @media screen and (max-width: 767px) {
        gap: 0.25rem;
      }
    }
  }
`;

export default function MenuLinks() {
  return (
    <MenuLinksContainer>
      <div className="links">
        <ul>
          <li>
            <TextLink href="/" icon="Home" subtitle="Home" />
          </li>
          <li>
            <TextLink href="/#approach" icon="Our Approach" subtitle="Learn About Our Approach" />
          </li>
          <li>
            <TextLink href="/#our-work" icon="Our Work" subtitle="See What We’ve Done" />
          </li>
          <li>
            <TextLink href="/#contact" icon="Contact Us" subtitle="Get In Touch" />
          </li>
        </ul>
      </div>
    </MenuLinksContainer>
  );
}