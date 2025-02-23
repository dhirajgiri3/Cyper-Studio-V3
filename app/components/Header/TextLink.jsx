import styled from 'styled-components';
import Link from 'next/link';

const StyledTextLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  button {
    outline: 0;
    border: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 3rem;
    overflow: hidden;
    cursor: pointer;
    background: transparent;
  }

  button div {
    transform: translateY(0px);
    width: 100%;
  }

  button,
  button div {
    transition: 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  button div span {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 3rem;
  }

  button:hover div {
    transform: translateY(-3rem);
  }

  button h2 {
    font-size: var(--nm);
    font-weight: 400;
    color: var(--dark);
    transition: 1s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
  }
  button h3 {
    font-size: var(--nm);
    font-weight: 400;
    color: var(--dark);
    transition: 1s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
  }

  button:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 1000px) {
    button h1 {
      font-size: 2.2rem;
    }
  }
`;

export default function TextLink({ href, icon, title, subtitle }) {
  return (
    <StyledTextLink href={href} className="link text-link">
      <button>
        <div>
          <span>{icon}</span>
        </div>
        <div>
          <span>
            <h3>{title}</h3>
            {subtitle && <h3>{subtitle}</h3>}
          </span>
        </div>
      </button>
    </StyledTextLink>
  );
}