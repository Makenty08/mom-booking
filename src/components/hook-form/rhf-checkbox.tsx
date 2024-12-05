import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Checkbox } from '~/components/ui/checkbox';

interface RHFCheckboxProps {
  name: string;
  label?: string;
  description?: { icon: JSX.Element; text: string };
}

export function RHFCheckbox({ name, label, description }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FormControl>
          <div className="flex gap-4 items-center">
            {label && <FormLabel className="text-lg">{label}</FormLabel>}
            {description?.icon}
          </div>
        </FormItem>
      )}
    />
  );
}
