import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

const convertToDate = (strDate: string) => {
  const newDate = new Date(Date.parse(strDate.replaceAll('/', '-')));
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);

  return newDate;
};

export default function App({ valor }) {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    getFormatedDate(new Date(), 'DD/MM/yyyy')
  );

  function handleChangeStartDate(date: string) {
    const newDate = convertToDate(date);

    setSelectedStartDate(date);
    setOpenStartDatePicker(false);
    valor(newDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <View>
            <View>
              <Text className="mb-2 text-base text-zinc-500">Data</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleOnPressStartDate}
                className="h-14 w-full justify-center rounded border border-zinc-200 bg-white px-4 py-2 text-lg focus:border-2 focus:border-violet-600"
              >
                <Text className="text-base">
                  {convertToDate(selectedStartDate).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
            onRequestClose={() => setOpenStartDatePicker(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={() => setOpenStartDatePicker(false)}
              className="flex-1 items-center justify-center"
            >
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  selected={selectedStartDate}
                  onDateChange={handleChangeStartDate}
                  locale="pt-BR"
                  options={{
                    backgroundColor: '#080516',
                    textHeaderColor: '#469ab6',
                    textDefaultColor: '#FFFFFF',
                    selectedTextColor: '#FFF',
                    mainColor: '#469ab6',
                    textSecondaryColor: '#FFFFFF',
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: '#080516',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
