import { Link } from "react-router-dom";

import HomeAsset from "./assets/Home";
import PokeBallAsset from "./assets/PokeBall";

import styled from "@emotion/styled";

const HeaderStyle = styled.header`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 0 1rem;
  & nav {
    & ul {
      display: flex;
      align-items: center;
      & li {
        &:not(:last-child) {
          margin-right: 0.75rem;
        }
        & a {
          padding: 0.25rem;
          border-radius: 3px;
          display: flex;
          align-items: center;
          & svg {
            width: 17px;
            fill: var(--color-bg-2);
          }
          &:hover {
            background-color: var(--color-bg-2);
            & svg {
              fill: var(--color-bg-3);
            }
          }
        }
      }
    }
  }
`;

function Header() {
  return (
    <HeaderStyle>
      <div>&nbsp;</div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <HomeAsset title="Go to home" desc="Button to go to Home Page" />
            </Link>
          </li>
          <li>
            <Link to="/my_pokemon">
              <PokeBallAsset
                title="Go to my pokemon"
                desc="Button to go to My Pokemon Page"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
}

export default Header;