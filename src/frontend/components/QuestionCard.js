import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const QuestionCard = ({ questionData, onAnswer }) => {
  const options = [...questionData.incorrect_answers, questionData.correct_answer]
    .sort(() => Math.random() - 0.5);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{questionData.question}</Text>
      {options.map(opt => (
        <TouchableOpacity key={opt} style={styles.btn} onPress={() => onAnswer(opt)}>
          <Text style={styles.btnText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#0D47A1', padding: 20, borderRadius: 10, margin: 10 },
  question: { color: '#fff', fontSize: 18, marginBottom:10 },
  btn: { backgroundColor: '#1976D2', padding:10, borderRadius:5, marginVertical:5 },
  btnText: { color: '#fff' }
});
