import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { fetchQuestions, saveScore } from '../services/api';
import { QuestionCard } from '../components/QuestionCard';
import Loading from '../components/Loading';

export function GameScreen() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [loading, setLoading] = useState(true);

  const startNewGame = () => {
    setLoading(true);
    fetchQuestions().then(qs => {
      setQuestions(qs);
      setIndex(0);
      setScore(0);
      setHearts(3);
      setLoading(false);
    });
  };

  useEffect(startNewGame, []);

  const handleAnswer = (option) => {
    const correct = questions[index].correct_answer;
    if (option === correct) setScore(s => s + 1);
    else setHearts(h => {
      if (h <= 1) return 0;
      Alert.alert('Errou!', 'Você perdeu um coração.');
      return h - 1;
    });
    if (index + 1 < questions.length && hearts > 1) {
      setIndex(i => i + 1);
    } else {
      Alert.alert('Fim de jogo', `Score: ${score + (option === correct ? 1 : 0)}`, [
        { text: 'OK', onPress: () => {
            saveScore('Player1', score + (option===correct?1:0), 3 - hearts);
            startNewGame();
        }}
      ]);
    }
  };

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pergunta {index +1}/10</Text>
      <Text style={styles.hearts}>❤ x {hearts}</Text>
      <QuestionCard questionData={questions[index]} onAnswer={handleAnswer} />
      <Button title="Reiniciar" onPress={startNewGame} color="#BBDEFB" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#E3F2FD', padding:20, justifyContent:'center' },
  header:{ fontSize:24, marginBottom:10, textAlign:'center', color:'#0D47A1' },
  hearts:{ fontSize:18, textAlign:'center', marginBottom:20 }
});
