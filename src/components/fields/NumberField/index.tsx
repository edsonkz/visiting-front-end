import { UseFormRegisterReturn } from "react-hook-form";
import { Input, FieldContainer, Error } from "../styles";

interface NumberFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  error?: string;
}

export const NumberField = ({
  label,
  register,
  disabled,
  error,
}: NumberFieldProps) => (
  <FieldContainer>
    <label>{label}</label>
    <Input type="number" {...register} disabled={disabled} />
    {error && <Error>{error}</Error>}
  </FieldContainer>
);
