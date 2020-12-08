import styled from "@emotion/styled";

const ScreenStyle = styled.div`
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
  & .layer {
    background-color: var(--color-bg-3);
    width: 100%;
    height: 100%;
    border-radius: 3px;
    box-shadow: inset 2px 2px var(--color-bg-3-1);
    overflow: auto;
    padding: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: 40% 60%;
    justify-content: center;
    align-items: center;
    filter: grayscale(1);
    & img {
      width: 100%;
    }
    & ul {
      & li {
        border-radius: 3px;
        & div {
          pointer-events: none;
        }
        & .list-name {
          font-size: 0.85rem;
          font-weight: bold;
        }
        & .list-details {
          font-size: 0.75rem;
        }
        &:not(:last-of-type) {
          margin-bottom: 0.35rem;
        }
        &:last-of-type {
          margin-bottom: 1rem;
        }
        &:hover,
        &.active {
          background-color: var(--color-bg-3-1);
          color: var(--color-bg-3);
        }
      }
    }
  }
`;

function Screen({ children, ...rest }) {
  return <ScreenStyle {...rest}>{children}</ScreenStyle>;
}

export default Screen;
