import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

interface FeatureCardProps {
  title:string
}

export function FeatureCard({title}: FeatureCardProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Header title = "Kinsou MMA"/>
      <FeatureCard title="Manage Students" />
      <FeatureCard title="Calendar" />
      <FeatureCard title="Equipment Drop" />
      <FeatureCard title="Tournaments" />
      <FeatureCard title="Drills Library" />
      <FeatureCard title="Sparring Partners" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
