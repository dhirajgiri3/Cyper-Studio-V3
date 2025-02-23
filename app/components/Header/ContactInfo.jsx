import styled from 'styled-components';

const ContactInfoContainer = styled.div`
  .email, .phone {
    li {
      list-style: none;
    }

    .link {
      text-decoration: none;
      color: var(--dark);
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .link__graphic {
        display: none;
      }
    }
  }
`;

export default function ContactInfo() {
  return (
    <ContactInfoContainer>
      <div className="email">
        <li className="content__item">
          <a href="mailto:info@cyper.studio" className="link link--iocaste">
            <span>Info@cyper.studio</span>
            <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
              <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
            </svg>
          </a>
        </li>
      </div>
      <div className="phone">
        <li className="content__item">
          <a href="tel:+91 9904392992" className="link link--iocaste">
            <span>+91 9904392992</span>
            <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
              <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
            </svg>
          </a>
        </li>
      </div>
    </ContactInfoContainer>
  );
}