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
  return <CaseStyle {...rest}>{children}</CaseStyle>;
}

export default Case;
