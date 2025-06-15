import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function NameScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Iniciar Jogo" color="#1976D2" onPress={() => navigation.navigate('Game', { name })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#E3F2FD' },
  title: { fontSize:24, color:'#0D47A1', marginBottom:10 },
  input: { backgroundColor:'#fff', borderRadius:5, padding:10, width:250, marginBottom:20 }
});
