import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../styles/theme";

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 2spx 4px ${colors.shadow};
  padding: 0.5rem 1rem;
  max-width: 1200px;
  width: 100%;
  margin: auto;
`;

const LogoText = styled.h1`
  margin: 0 0 0 10px;
  color: ${colors.primary};
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${colors.hover};
    color: white;
  }
`;

const LogoImage = styled.img`
  height: 25px;
  width: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer onClick={() => navigate("/")}>
          <LogoImage src="src/assets/logo.png" alt="Bookfully Logo" />
          <LogoText>Bookfully</LogoText>
        </LogoContainer>

        <Nav>
          <StyledLink to="/">Properties</StyledLink>
          <StyledLink to="/bookings">Bookings</StyledLink>
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
