import CircleAsset from "./assets/Circle";

import styled from "@emotion/styled";

const NavigationStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  & .navigator-arrow {
    position: relative;
    width: 116px;
    height: 116px;
    & button {
      background-color: var(--color-bg-2);
      color: var(--color-bg-3-1);
      position: absolute;
      font-size: 0.85rem;
      padding: 0;
      &:hover,
      &:focus {
        &:not(:disabled) {
          color: var(--color-bg-3);
        }
      }
    }
    & .left {
      left: 0;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      box-shadow: inset 2px 2px var(--color-bg-3-1), 0 2px #000000;
    }
    & .right {
      right: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      box-shadow: inset 0px 2px var(--color-bg-3-1), 2px 2px #000000;
    }
    & .left,
    & .right {
      width: 37px;
      height: 37px;
      top: 50%;
      transform: translateY(-50%);
    }
    & .top {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      box-shadow: inset 2px 2px var(--color-bg-3-1), 2px 0 #000000;
    }
    & .bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      box-shadow: inset 2px 0px var(--color-bg-3-1), 2px 2px #000000;
    }
    & .top,
    & .bottom {
      width: 43px;
      height: 43px;
    }
    & .neutral {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 43px;
      height: 43px;
    }
  }
  & .navigator-circle {
    position: relative;
    width: 110px;
    height: 110px;
    & button {
      background-color: var(--color-bg-2);
      color: var(--color-bg-3-1);
      position: absolute;
      font-size: 1.25rem;
      border-radius: 50%;
      padding: 0;
      width: 43px;
      height: 43px;
      box-shadow: inset 2px 0px var(--color-bg-3-1), 2px 2px #000000;
      & svg {
        width: 40%;
        fill: var(--color-bg-3-1);
      }
      &:hover,
      &:focus {
        color: var(--color-bg-3);
        & svg {
          fill: var(--color-bg-3);
        }
      }
    }
    & .back {
      left: 0;
      bottom: 17%;
      transform: translateY(17%);
    }
    & .select {
      right: 0;
      top: 17%;
      transform: translateY(-17%);
    }
  }
`;

function Navigation({
  handleClickNavigation,
  handleBackButton,
  handleSelectButton,
}) {
  return (
    <NavigationStyle>
      <section className="navigator-arrow">
        <button
          className="left"
          onClick={(e) => handleClickNavigation(e, "left")}
          title="Button left"
        >
          ◀
        </button>
        <button
          className="right"
          onClick={(e) => handleClickNavigation(e, "right")}
          title="Button right"
        >
          ▶
        </button>
        <button className="neutral" disabled={true}>
          ●
        </button>
        <button
          className="top"
          onClick={(e) => handleClickNavigation(e, "top")}
          title="Button top"
        >
          ▲
        </button>
        <button
          className="bottom"
          onClick={(e) => handleClickNavigation(e, "bottom")}
          title="Button bottom"
        >
          ▼
        </button>
      </section>
      <section className="navigator-circle">
        <button
          className="back"
          onClick={handleBackButton}
          title="Button back"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircleAsset />
        </button>
        <button
          className="select"
          onClick={handleSelectButton}
          title="Button select"
        >
          ✕
        </button>
      </section>
    </NavigationStyle>
  );
}

export default Navigation;
