import HeaderComponent from "./Header";

import styled from "@emotion/styled";

const ScreenStyle = styled.div`
  background-color: var(--color-bg-3);
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: inset 2px 2px var(--color-bg-3-1);
  padding: 0.5rem 1rem;
  filter: grayscale(1);
  position: relative;
  & .full-screen {
    width: 100%;
    height: calc(100% - 2rem);
    margin-top: 0.5rem;
    overflow: auto;
    &.center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .content-container {
      width: 100%;
      height: 100%;
    }
  }
  & .normal-screen {
    display: flex;
    margin-top: 0.5rem;
    width: 100%;
    height: calc(100% - 2rem);
    overflow: auto;
    & .content-container {
      width: 60%;
      padding-left: 0.5rem;
    }
  }
  & .image-container {
    padding-right: 0.5rem;
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    & img {
      width: 100%;
      object-fit: cover;
      animation: bounce 2s ease infinite;
    }
    & .button-catch {
      width: 100%;
      border-radius: 3px;
      &:hover,
      &.active {
        background-color: var(--color-bg-2);
        color: var(--color-bg-3);
      }
    }
  }
  & .content-container {
    display: block;
    overflow: auto;
    & .sectioned-blocks {
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      & .sectioned-blocks__title {
        font-size: 0.75rem;
        font-weight: bold;
      }
      & .sectioned-blocks__content {
        font-size: 0.85rem;
        font-weight: normal;
        text-transform: capitalize;
      }
    }
  }
`;

function Screen({ childClasses, children, ...rest }) {
  return (
    <ScreenStyle {...rest}>
      <HeaderComponent id="Header" />
      <div className={childClasses}>{children}</div>
    </ScreenStyle>
  );
}

export default Screen;
