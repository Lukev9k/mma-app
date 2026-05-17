import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StudentListScreen } from './screens/StudentListScreen';
import { ProfileScreen } from './screens/ProfileScreen';

interface HeaderProps {
  title: string
  subtitle: string
}

export function Header({ title , subtitle }: HeaderProps) {
  return (
    <View style={{ marginBottom: 30, marginTop: 40 }}>
      
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: '#888888' }}>
          {subtitle}
        </Text>
      
    </View> 
  )
}

interface FeatureCardProps {
  title:string
}

export function FeatureCard({title}: FeatureCardProps) {
  return (
    <View style={styles.card}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ffffff' }}>
        {title}
      </Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Header title = "Kinsou MMA" subtitle = "Welcome back, Coach"/>
      <StudentListScreen />
      <ProfileScreen /> 
      <View style={styles.row}>
        <FeatureCard title="Manage Students" />
        <FeatureCard title="Calendar" />
      </View>
      <View style={styles.row}>
        <FeatureCard title="Equipment Drop" />
        <FeatureCard title="Tournaments" />
      </View>
      <View style={styles.row}>
        <FeatureCard title="Drills Library" />
        <FeatureCard title="Sparring Partners" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    width: '47%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  }
});
