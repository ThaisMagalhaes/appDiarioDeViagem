import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';
import { DatabaseConnection } from '../../database/database-connection';
import DatePickerComponent from '../../components/DatePickerApp';
import { DatePicker } from '../../components/DatePicker';

const db = DatabaseConnection.getConnection();

export function Form() {
  const [local, setLocal] = useState('');
  const [finalizado, setFinalizado] = useState('0');
  const [dateValue, setDateValue] = useState<Date>(null);

  const handleDateChange = (date: Date) => {
    setDateValue(date);
  };

  const handleRegisterViagem = () => {
    try {
      if (!local) {
        Alert.alert('Por favor, preencha o campo Local!');
        return;
      }

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_viagem (local, data, finalizado) VALUES (?,?,?)',
          [local, dateValue.toLocaleString(), finalizado],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Toast.show({
                type: 'success',
                text1: 'Cadastrado com sucesso!',
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Não foi possível cadastrar.',
              });
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Não foi possível cadastrar.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <HeaderForm title="Cadastrar Viagem" />
      <ScrollView className="w-full p-6">
        <Input
          label="Local"
          placeholder="Informe o local da viagem"
          onChangeText={setLocal}
          value={local}
        />

        <DatePicker onChange={handleDateChange} />

        <Button
          className="mt-12"
          title="Salvar"
          onPress={handleRegisterViagem}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
