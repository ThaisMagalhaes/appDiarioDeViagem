import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../Button';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Mode = 'date' | 'time';

type DatePickerProps = {
  onChange?: (date: Date) => void;
};

export function DatePicker({ onChange }: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<Mode>('date');
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChange && onChange(currentDate);
  };

  const showMode = (currentMode: Mode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text className="mb-2 text-base text-zinc-500">Data</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={showDatepicker}
            className="h-14 w-full justify-center rounded border border-zinc-200 bg-white px-4 py-2 text-lg focus:border-2 focus:border-violet-600"
          >
            <Text className="text-base">
              {date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          className="bg-zinc-50"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={handleChange}
        />
      )}
    </SafeAreaView>
  );
}
