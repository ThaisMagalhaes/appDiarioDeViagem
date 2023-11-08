import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View className="w-full">
      <Text className="mb-2 text-base text-zinc-500">{label}</Text>

      <TextInput
        className="h-14 w-full rounded border border-zinc-200 bg-white px-4 py-2 text-lg focus:border-2 focus:border-violet-600"
        {...rest}
      />
    </View>
  );
}
