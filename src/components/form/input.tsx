import { Input as ShadcnInput } from "~/components/ui/input";
import {
  type FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";

type Props = {
  required?: boolean;
} & FieldValues;

const Input = ({ name, required }: Props) => {
  const { control } = useFormContext();
  const { field, formState } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <>
      <ShadcnInput {...field} />
      {formState.errors[name] && (
        <span className="text-red-500">
          {formState.errors[name].message as string}
        </span>
      )}
    </>
  );
};

export default Input;
