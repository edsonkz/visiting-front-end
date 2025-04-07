import { PageDescriptionContainer } from "./styles";

interface PageDescriptionProps {
  title: string;
  subtitle: string;
}

export const PageDescription = ({ title, subtitle }: PageDescriptionProps) => {
  return (
    <PageDescriptionContainer>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </PageDescriptionContainer>
  );
};
