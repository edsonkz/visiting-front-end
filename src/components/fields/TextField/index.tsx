import { UseFormRegisterReturn } from "react-hook-form";
import { Input, FieldContainer, Error } from "../styles";

interface TextFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
}

export const TextField = ({
  label,
  register,
  disabled,
  readOnly,
  error,
}: TextFieldProps) => (
  <FieldContainer>
    <label>{label}</label>
    <Input type="text" {...register} disabled={disabled} readOnly={readOnly} />
    {error && <Error>{error}</Error>}
  </FieldContainer>
);
