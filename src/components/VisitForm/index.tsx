import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Visit, VisitFormData } from "../../types/visit";
import { TextField } from "../fields/TextField";
import { NumberField } from "../fields/NumberField";
import { MaskedField } from "../fields/MaskedField";
import { DateField } from "../fields/DateField";
import { ButtonDiv, FormContainer, FormRow } from "./styles";
import { Button } from "../Button";

interface VisitFormProps {
  defaultValues?: VisitFormData;
  onSubmit: (visit: Visit) => void;
  onCancel: () => void;
}

export function VisitForm({ defaultValues, onSubmit, onCancel }: VisitFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<VisitFormData>({
    defaultValues,
    mode: "onChange",
  });

  const [addressLoading, setAddressLoading] = useState(false);
  const [manualNeighborhood, setManualNeighborhood] = useState(false);
  const [manualStreet, setManualStreet] = useState(false);

  const cep = watch("cep");

  // Update Address info when CEP is inserted
  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCEP = cep?.replace(/\D/g, "");

      if (cleanCEP?.length !== 8) {
        setValue("city", "");
        setValue("uf", "");
        setValue("neighborhood", "");
        setValue("street", "");
        setManualNeighborhood(false);
        setManualStreet(false);
        return;
      }

      setAddressLoading(true);
      setManualNeighborhood(false);
      setManualStreet(false);

      try {
        const res = await axios.get(
          `https://viacep.com.br/ws/${cleanCEP}/json/`
        );
        const { bairro, localidade, uf, logradouro } = res.data;

        setValue("city", localidade || "");
        setValue("uf", uf || "");
        setValue("neighborhood", bairro || "");
        setValue("street", logradouro || "");

        if (!bairro) setManualNeighborhood(true);
        if (!logradouro) setManualStreet(true);
      } catch (err) {
        setManualNeighborhood(true);
        setManualStreet(true);
        setValue("city", "");
        setValue("uf", "");
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
  }, [cep, setValue]);

  const onFormSubmit = (data: VisitFormData) => {
    const { id, forms, products, date, status, ...address } = data;
    const visit: Visit = {
      address,
      forms,
      products,
      date,
      id: id ?? String(Date.now()),
      status: status ?? "pending",
    };

    onSubmit(visit);
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onFormSubmit)}>
      <FormRow>
        <DateField
          label="Data da visita"
          register={register("date", { required: "Data obrigatória" })}
          error={errors.date?.message}
        />

        <NumberField
          label="Formulários"
          register={register("forms", {
            required: "Campo obrigatório",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "O valor deve ser 0 ou maior",
            },
            validate: (value) =>
              Number.isInteger(value) ||
              "Apenas números inteiros são permitidos",
          })}
          error={errors.forms?.message}
        />
      </FormRow>

      <FormRow>
        <NumberField
          label="Produtos"
          register={register("products", {
            required: "Campo obrigatório",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "O valor deve ser 0 ou maior",
            },
            validate: (value) =>
              Number.isInteger(value) ||
              "Apenas números inteiros são permitidos",
          })}
          error={errors.products?.message}
        />

        <MaskedField
          label="CEP"
          mask="XXXXX-XXX"
          register={register("cep", {
            required: "Obrigatório",
            pattern: {
              value: /^\d{5}-\d{3}$/,
              message: "Formato inválido",
            },
          })}
          error={errors.cep?.message}
        />
      </FormRow>

      <FormRow>
        <TextField
          readOnly
          label="UF"
          register={register("uf", { required: "Obrigatório" })}
          disabled
        />
        <TextField
          readOnly
          label="Cidade"
          register={register("city", { required: "Obrigatório" })}
          disabled
        />
      </FormRow>

      <TextField
        label="Bairro"
        register={register("neighborhood", { required: "Obrigatório" })}
        error={errors.neighborhood?.message}
        disabled={addressLoading || !manualNeighborhood}
      />

      <TextField
        label="Logradouro"
        register={register("street", { required: "Obrigatório" })}
        error={errors.street?.message}
        disabled={addressLoading || !manualStreet}
      />

      <NumberField
        label="Número"
        register={register("number", { required: "Obrigatório", min: 1 })}
        error={errors.number?.message}
        disabled={addressLoading}
      />

      <ButtonDiv>
        <Button type="button" onClick={onCancel} $variant={"danger"}>
          Fechar
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          $variant={"success"}
        >
          Salvar
        </Button>
      </ButtonDiv>
    </FormContainer>
  );
}
