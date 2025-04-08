import { DateSection } from "../../components/DateSection";
import { PageDescription } from "../../components/PageDescription";
import { CenteredContainer } from "./styles";

export const Home = () => {
  return (
    <CenteredContainer $gap="2rem">
      <PageDescription
        title={"Seja bem vindo ao portal de Gerenciamento de Visitas"}
        subtitle={
          "Aqui você pode gerenciar visitas definindo endereços e datas específicas"
        }
      />

      <DateSection />
    </CenteredContainer>
  );
};
