import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView, // Para poucos elementos
  FlatList, // Para muitos elementos, inclusive para performance
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      // Pego a data em número e transformo em string
      id: String(new Date().getTime()),
      name: newSkill,
    };

    console.log('New Skill', data);

    setMySkills((oldSkills) => [...oldSkills, data]);
    // Seria o mesmo de fazer
    // return setMySkills([...mySkills, newSkill]);
  }

  function handleRemoveSkiil(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Night');
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Alan</Text>
        <Text style={styles.greetings}>{greeting}</Text>
        <TextInput
          style={styles.input}
          placeholder="New Skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button onPress={handleAddNewSkill} title="Add" />

        <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

        {/* <ScrollView showsVerticalScrollIndicator={false}>
          {mySkills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </ScrollView> */}
        <FlatList
          data={mySkills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SkillCard
              skill={item.name}
              onPress={() => handleRemoveSkiil(item.id)}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tela inteira
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 8,
  },
  greetings: {
    color: '#fff',
  },
});
