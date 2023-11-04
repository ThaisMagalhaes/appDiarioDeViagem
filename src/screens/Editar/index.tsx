import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';
import { DatabaseConnection } from '../../database/database-connection';
import DatePickerComponent from '../../components/DatePickerApp';
import { CheckBox } from 'react-native-elements';

const db = DatabaseConnection.getConnection();

export function Editar() {
  const [local, setLocal] = useState("");
  const [finalizado, setFinalizado] = useState("0");
  const [dateValue, setDateValue] = useState('');
  const [checked, setChecked] = useState(false);

  const toggleCheckBox = () => {
    setChecked(!checked);
  };

  const handleDateChange = (date) => {
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
          [local, dateValue, finalizado],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Toast.show({
                type: "success",
                text1: "Alterado com sucesso!"
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Não foi possível alterar."
              });
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Não foi possível alterar."
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
          <HeaderForm />
          <View style={styles.form}>
            <Input
              label="Local"
              onChangeText={setLocal}
              value={local}
            />
            <DatePickerComponent valor={handleDateChange} />

            <View>
              <CheckBox
                title="Finalizado"
                checked={checked}
                onPress={toggleCheckBox}
              />
            </View>
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