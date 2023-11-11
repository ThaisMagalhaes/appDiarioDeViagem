import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  label: string;
}

export function Input({ label, ...rest }: Props) {
  return (
    <View className='w-full mb-4'>
      <Text className='text-base mb-2 text-slate-200'>
        {label}
      </Text>
      <TextInput className='h-14 w-full border-slate-300 border pl-6 rounded bg-slate-100' {...rest} />
    </View>
  );
}
