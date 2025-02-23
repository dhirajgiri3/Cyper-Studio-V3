import styled from 'styled-components';
import TextLink from './TextLink';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const SocialMediaLinksContainer = styled.div`
  .links {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function SocialMediaLinks() {
  return (
    <SocialMediaLinksContainer>
      <div className="links">
        <ul>
          <li>
            <TextLink href="/" icon={<FaLinkedin />} title="Linkedin" />
          </li>
          <li>
            <TextLink href="/products" icon={<FaInstagram />} title="Instagram" />
          </li>
          <li>
            <TextLink href="/services" icon={<FaFacebook />} title="Facebook" />
          </li>
          <li>
            <TextLink href="/our-work" icon={<FaTwitter />} title="X (Twitter)" />
          </li>
        </ul>
      </div>
    </SocialMediaLinksContainer>
  );
}