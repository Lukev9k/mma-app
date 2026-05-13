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

export default function App() {
  return (
    <View style={styles.container}>
      <Header title = "Kinsou MMA"/>
      <Text>Open up App.tsx to start working on your app!</Text>
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
