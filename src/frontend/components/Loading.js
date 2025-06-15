import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
export default () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#0D47A1" />
  </View>
);
const styles = StyleSheet.create({
  center: { flex:1, justifyContent:'center', alignItems:'center' }
});
