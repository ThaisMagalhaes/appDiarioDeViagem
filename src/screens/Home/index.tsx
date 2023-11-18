import React, { useEffect, useState } from 'react';
import { FlatList, View, Button } from 'react-native';
import { HeaderHome, Card } from '@components';
import { styles } from './styles';
import { makeViagemService } from 'core';

const viagemService = makeViagemService();

export function Home() {
  // const navigation = useNavigation();
  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    async function consultarViagens() {
      const viagens = await viagemService.obterTodas();

      setFlatListItems(viagens);
    }

    void consultarViagens();
  }, []);

  async function adicionarRegistro() {
    const viagem = await viagemService.criar({
      local: 'Pitangueiras',
      data: new Date(),
      finalizado: false,
      entradas: null,
    });

    // Falta ordenar
    setFlatListItems((state) => [viagem, ...state]);
  }

  const handleUpdate = (obj) => {
    // if (obj.finalizado === 0) {
    //   navigation.navigate('Editar', { dados: obj });
    // }
  };

  const renderListItem = ({ item }) => (
    <View style={styles.container}>
      <Card
        viagem={item}
        onPressDelete={() => {
          console.log(item.id);
        }}
        onPressUpdate={() => {
          handleUpdate(item);
        }}
      />
    </View>
  );

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
