import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
interface IProps {
  name: string;
  placeholder?: string;
  label?: string;
  defaultValue?: any;
  type?: string;
}

export function RHFTextField({ name, placeholder, label, defaultValue, type }: IProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
