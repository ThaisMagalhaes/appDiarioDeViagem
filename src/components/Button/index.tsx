import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';


type Props = TouchableOpacityProps & {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity className='h-14 w-full items-center justify-center rounded bg-verde'
      {...rest}
    >
      <Text className='font-bold text-zinc-100 text-base'>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
