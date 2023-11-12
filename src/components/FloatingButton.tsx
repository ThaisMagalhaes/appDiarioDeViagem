import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styled } from 'nativewind';

function FloatingButtonComponent({ ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full border border-roxoP bg-roxoP shadow"
      {...props}>
      <MaterialIcons name="add" size={24} color="#FFF" />
    </TouchableOpacity>
  );
}

export const FloatingButton = styled(FloatingButtonComponent);
