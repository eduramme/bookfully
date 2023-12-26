import styled from "styled-components";
import { colors } from "./../styles/theme.ts";
import { PageTitle } from "./PageTitle.tsx";

const Container = styled.header`
  color: ${colors.primary};
  margin-bottom: 20px;
  text-align: left;
`;

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Container>
      <PageTitle>{title}</PageTitle>
    </Container>
  );
};
