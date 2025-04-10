import { DateSection } from "../../components/DateSection";
import { PageDescription } from "../../components/PageDescription";
import { CenteredContainer } from "./styles";

export const Home = () => {
  return (
    <CenteredContainer $gap="2rem">
      <PageDescription
        title={"Seja bem vindo ao portal de Gerenciamento de Visitas"}
        subtitle={
          "Gerencie suas visitas de forma prática e eficiente: cadastre, edite e reagende compromissos com controle de tempo, agrupamento por data e integração com a API ViaCEP."
        }
      />

      <DateSection />
    </CenteredContainer>
  );
};
