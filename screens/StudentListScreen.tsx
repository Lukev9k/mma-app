import {View , Text , FlatList , TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';

interface Student {
    id: string
    name: string
    age: number
    weightClass: string
    paid: boolean
  }


export function StudentListScreen() {
    const [students, setStudents] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showWarning, setShowWarning] = useState(false)
    useEffect(() => {
        const loadStudents: Student[] = [
          { id: '1', name: 'Lukev', age: 25, weightClass: 'Middleweight', paid: true },
          { id: '2', name: 'Krishna', age: 20, weightClass: 'Lightweight', paid: false },
          { id: '3', name: 'Arjun', age: 22, weightClass: 'Welterweight', paid: true },
          { id: '4', name: 'Meera', age: 24, weightClass: 'Strawweight', paid: true },
        ]
        setStudents(loadStudents)
        setIsLoading(false)
      }, [])
      if (isLoading) {
        return <Text>Loading...</Text>
      }
    return (
        <View>
        <TouchableOpacity onPress={() => setShowWarning(!showWarning)}>
        <Text>Show Expiring Subscriptions</Text>
        </TouchableOpacity>
        {showWarning && <Text>⚠️ Krishna's subscription ends this week</Text>}
        <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <Text>{`${item.name} | ${item.age} | ${item.paid ? 'Paid' : 'Unpaid'}`}</Text>
        )}
        />
        </View>
    )
}