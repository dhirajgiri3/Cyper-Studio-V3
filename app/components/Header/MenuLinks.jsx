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
            <TextLink href="/" icon="Home" subtitle="Our Story" />
          </li>
          <li>
            <TextLink href="/products" icon="Products" subtitle="Explore Our Offerings" />
          </li>
          <li>
            <TextLink href="/services" icon="Services" subtitle="What We Offer" />
          </li>
          <li>
            <TextLink href="/our-work" icon="Our Work" subtitle="See What We’ve Done" />
          </li>
          <li>
            <TextLink href="/whats-new" icon="What's New" subtitle="Latest Updates" />
          </li>
          <li>
            <TextLink href="/offers" icon="Offers" subtitle="Special Deals" />
          </li>
          <li>
            <TextLink href="/blogs" icon="Blogs" subtitle="Read Our Insights" />
          </li>
          <li>
            <TextLink href="/about-us" icon="About Us" subtitle="Who We Are" />
          </li>
          <li>
            <TextLink href="/careers" icon="Careers" subtitle="Join Our Team" />
          </li>
          <li>
            <TextLink href="/contact-us" icon="Contact Us" subtitle="Get In Touch" />
          </li>
        </ul>
      </div>
    </MenuLinksContainer>
  );
}