import { UseFormRegisterReturn } from "react-hook-form";
import { FieldContainer, StyledMask, Error } from "../styles";

interface MaskedFieldProps {
  label: string;
  mask: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  error?: string;
}

export const MaskedField = ({
  label,
  mask,
  register,
  disabled,
  error,
}: MaskedFieldProps) => {
  return (
    <FieldContainer>
      <label>{label}</label>
      <StyledMask
        {...register}
        mask={mask}
        replacement={{ X: /\d/ }}
        disabled={disabled}
      />
      {error && <Error>{error}</Error>}
    </FieldContainer>
  );
};
