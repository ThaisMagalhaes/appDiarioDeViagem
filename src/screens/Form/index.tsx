import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';
import { DatabaseConnection } from '../../database/database-connection';
import { DatePicker } from '../../components/DatePickerApp';

const db = DatabaseConnection.getConnection();

export function Form() {
  const [local, setLocal] = useState("");
  const [finalizado, setFinalizado] = useState("0");
  const [dateValue, setDateValue] = useState<Date>();

  const handleDateChange = (date: Date) => {
    // A função de retorno de chamada para atualizar o valor do campo de data
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
          [local, dateValue.toLocaleDateString(), finalizado],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Toast.show({
                type: "success",
                text1: "Cadastrado com sucesso!"
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Não foi possível cadastrar."
              });
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar."
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>
          <HeaderForm title='Cadastrar Viagem' />
          <View style={styles.form}>
            <Input
              label="Local"
              onChangeText={setLocal}
              value={local}
            />
            <DatePicker onChange={handleDateChange} />

          </View>
          <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={handleRegisterViagem}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
