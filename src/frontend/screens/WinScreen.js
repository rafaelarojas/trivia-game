import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WinScreen({ route, navigation }) {
  const { name, score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Parabéns, {name}!</Text>
      <Text style={styles.score}>Você ganhou com {score} pontos!</Text>
      <Button title="Jogar Novamente" onPress={() => navigation.navigate('Home')} color="#1976D2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#E3F2FD' },
  title: { fontSize:24, color:'#0D47A1', marginBottom:10 },
  score: { fontSize:18, marginBottom:20 }
});
