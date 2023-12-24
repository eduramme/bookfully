import styled from "styled-components";
import { colors } from "./../styles/theme";

export const PageContainer = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  color: ${colors.text};
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.background};
`;
