import { Input as ShadcnInput } from "~/components/ui/input";
import {
  type FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";

type Props = {} & FieldValues;

const Input = ({ name }: Props) => {
  const { control } = useFormContext();
  const { field, formState } = useController({
    name,
    control,
    rules: { required: true },
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
