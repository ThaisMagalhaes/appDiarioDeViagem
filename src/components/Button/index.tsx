import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, className, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={
        className + ' bg-verde h-14 w-full items-center justify-center rounded'
      }
      {...rest}
    >
      <Text className="text-base font-bold text-zinc-100">{title}</Text>
    </TouchableOpacity>
  );
}
