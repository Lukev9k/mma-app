import {View, Text, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import {getProfile, getGymStudents} from '../lib/supabase/profiles';
import {supabase} from '../lib/supabase/client';

interface Student {
    id: string
    name: string
    weight_class: string
    subscription_end_date: string
}

interface Profile {
    id: string
    role: string
    gym_id: string
}

export function StudentListScreen() {
    const [students, setStudents] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        async function loadData() {
            const {data: {user}} = await supabase.auth.getUser()
            const profileData = await getProfile(user!.id)
            setProfile(profileData)
            setRole(profileData.role)

            if (profileData.role === 'admin') {
                const studentsData = await getGymStudents(profileData.gym_id)
                setStudents(studentsData ?? [])
            }
            setIsLoading(false)
        }
        loadData()
    }, [])

    if (isLoading) return <Text>Loading...</Text>

    return (
        <View>
            {role === 'admin' ? (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Text>{item.name} | {item.weight_class} | {item.subscription_end_date}</Text>
                    )}
                />
            ) : (
                <Text>Your profile info here</Text>
            )}
        </View>
    )
}