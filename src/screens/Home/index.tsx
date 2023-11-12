import React, { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { Card } from "../../components/Card";
import { HeaderHome } from "../../components/HeaderHome";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { makeViagemService } from "@core/factories";
import { ViagemModel } from "core/database/models";

const viagemService = makeViagemService();

export function Home() {
  const navigation = useNavigation();
  const [flatListItems, setFlatListItems] = useState<ViagemModel[]>([]);

  // const loadDataFromDatabase = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql("SELECT * FROM table_viagem ORDER BY id DESC", [], (tx, results) => {
  //       const temp = [];
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         temp.push(results.rows.item(i));
  //       }
  //       setFlatListItems(temp);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     // Tabela de viagens
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS table_viagem (id INTEGER PRIMARY KEY AUTOINCREMENT, local TEXT, data TEXT);'
  //     );

  //     // Tabela de entradas da viagem
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS table_viagem_entrada (id INTEGER PRIMARY KEY AUTOINCREMENT, table_viagem_id INTEGER, observacao TEXT, data TEXT, finalizado bit);'
  //     );

  //     // Tabela de imagens da entrada
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS tabela_entrada_images (id INTEGER PRIMARY KEY AUTOINCREMENT, table_viagem_entrada_id INTEGER, nomeImagem TEXT);'
  //     );
  //   });
  //   loadDataFromDatabase();
  // }, [loadDataFromDatabase]);

  const handleRemove = (id) => {
    // db.transaction((tx) => {
    //   tx.executeSql("DELETE FROM table_viagem WHERE id=?", [id], (tx, results) => {
    //     console.log("Delete Result:", results.rowsAffected);
    //     if (results.rowsAffected > 0) {
    //       Alert.alert(
    //         "Sucesso",
    //         "Viagem excluída com sucesso!",
    //         [
    //           {
    //             text: "Ok",
    //           },
    //         ],
    //         { cancelable: false }
    //       );
    //       loadDataFromDatabase(); // Reload data after deletion
    //     } else {
    //       Alert.alert("Erro", "Por favor, entre com um código de viagem válido!");
    //     }
    //   });
    // });
  };

  const handleUpdate = (obj) => {
    if (obj.finalizado === 0) {
      navigation.navigate("Editar", { dados: obj });
    }
  };

  const renderListItem = ({ item }) => (
    <View style={styles.container}>
      <Card viagem={item} onPressDelete={() => handleRemove(item.id)} onPressUpdate={() => handleUpdate(item)} />
    </View>
  );

  async function adicionarRegistro() {
    const viagem = await viagemService.criarViagem({
      local: "Pitangueiras",
      data: new Date(),
    });

    // Falta ordenar
    setFlatListItems((state) => [viagem, ...state]);
  }

  useEffect(() => {
    async function consultarViagens() {
      const viagens = await viagemService.obterTodasViagens();

      setFlatListItems(viagens);
    }

    consultarViagens();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome />
      <Button title="Clique aqui" onPress={adicionarRegistro} />
      <FlatList
        style={{ marginTop: 30 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={flatListItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderListItem}
      />
    </View>
  );
}
