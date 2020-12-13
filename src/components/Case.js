import LogoAsset from "../assets/Logo.png";

import styled from "@emotion/styled";

const CaseStyle = styled.div`
  width: 100%;
  height: 50%;
  background-color: var(--color-bg-2);
  padding: 3rem;
  border-radius: 10px;
  border: 5px solid #000;
  position: relative;
  box-shadow: inset 2px 2px var(--color-bg-3-1);
  & .logo {
    position: absolute;
    width: 25%;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    & img {
      width: 100%;
      object-fit: cover;
    }
  }
  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -3px;
    width: 100%;
    height: 8px;
    background-color: var(--color-bg-2);
    border-bottom-left-radius: 50% 100%;
    border-bottom-right-radius: 50% 100%;
  }
`;

function Case({ children, ...rest }) {
  return (
    <CaseStyle {...rest}>
      {children}
      <a
        className="logo"
        href="https://website-reza.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={LogoAsset} alt="Logo" title="Logo of this page" />
      </a>
    </CaseStyle>
  );
}

export default Case;
