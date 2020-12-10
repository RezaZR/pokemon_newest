import styled from "@emotion/styled";

const ScreenStyle = styled.div`
  background-color: var(--color-bg-3);
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: inset 2px 2px var(--color-bg-3-1);
  overflow: auto;
  padding: 1rem;
  filter: grayscale(1);
  position: relative;
  &.entire-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &.normal-screen {
    display: flex;
    & .image-container {
      padding-right: 0.5rem;
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      & img {
        width: 100%;
        object-fit: cover;
      }
      & .button-catch {
        opacity: 0;
        visibility: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        & svg {
          width: 35%;
        }
      }
      &:hover {
        & .button-catch {
          opacity: 1;
          visibility: visible;
          background-color: var(--color-bg-2-035);
        }
      }
    }
    & .content-container {
      width: 60%;
      padding-left: 0.5rem;
      display: block;
      overflow: auto;
      & .pokemon-list {
        border-radius: 3px;
        & div {
          pointer-events: none;
        }
        & .pokemon-list__name {
          font-size: 0.85rem;
          font-weight: bold;
          text-transform: capitalize;
        }
        & .pokemon-list__details {
          font-size: 0.75rem;
        }
        &:not(:last-of-type) {
          margin-bottom: 0.35rem;
        }
        &:hover,
        &.active {
          background-color: var(--color-bg-3-1);
          color: var(--color-bg-3);
        }
      }
      & .sectioned-blocks {
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
        & .sectioned-blocks__title {
          font-size: 0.75rem;
          font-weight: bold;
        }
        & .sectioned-blocks__content {
          font-size: 1rem;
          font-weight: normal;
          text-transform: capitalize;
        }
      }
    }
  }
`;

function Screen({ children, ...rest }) {
  return <ScreenStyle {...rest}>{children}</ScreenStyle>;
}

export default Screen;
