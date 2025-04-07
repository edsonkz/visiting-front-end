import { DateSection } from "../../components/DateSection";
import { PageDescription } from "../../components/PageDescription";
import { CenteredContainer } from "./styles";

export const Home = () => {
  const workdays = ["28/03/2025", "29/03/2025", "30/03/2025"];

  return (
    <CenteredContainer $gap="2rem">
      <PageDescription
        title={"Seja bem vindo ao portal de Gerenciamento de Visitas"}
        subtitle={
          "Aqui você pode gerenciar visitas definindo endereços e datas específicas"
        }
      />

      {workdays.map((workday) => (
        <DateSection key={workday} workday={workday} />
      ))}
    </CenteredContainer>
  );
};
