import { Text, TextInput, type TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View className="mb-4 w-full">
      <Text className="mb-2 text-base text-slate-200">{label}</Text>
      <TextInput className="h-14 w-full rounded border border-slate-300 bg-slate-100 pl-6" {...rest} />
    </View>
  );
}
