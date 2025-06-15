import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Trivia Game</Text>
      <Button title="Começar" onPress={() => navigation.navigate('Name')} color="#1976D2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#E3F2FD' },
  title: { fontSize:32, fontWeight:'bold', marginBottom:20, color:'#0D47A1' }
});
