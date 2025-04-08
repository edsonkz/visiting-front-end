import { UseFormRegisterReturn } from "react-hook-form";
import { Input, FieldContainer, Error } from "../styles";

interface DateFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export const DateField = ({ label, register, error }: DateFieldProps) => (
  <FieldContainer>
    <label>{label}</label>
    <Input type="date" {...register} />
    {error && <Error>{error}</Error>}
  </FieldContainer>
);
