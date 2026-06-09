import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { createProfile } from '../lib/supabase/profiles';
import { supabase } from '../lib/supabase/client';

interface CompleteProfileScreenProps {
    onProfileCreated: () => void
}

export default function CompleteProfileScreen({ onProfileCreated }: CompleteProfileScreenProps) {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [weightClass, setWeightClass] = useState('')
    const [experience, setExperience] = useState('')

    async function handleSubmit() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            await supabase.auth.signOut()
            return
        }
        await createProfile(user.id, name, age, gender, weightClass, experience)
        onProfileCreated()
    }
    
    return (
        <View>
            <ScrollView>
            <Text> Complete Your Profile </Text>
                <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                />
                <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                />
                <TextInput
                value={gender}
                onChangeText={setGender}
                placeholder="Gender"
                />
                <TextInput
                value={weightClass}
                onChangeText={setWeightClass}
                placeholder="Weight"
                />
                <TextInput
                value={experience}
                onChangeText={setExperience}
                placeholder="Experience"
                />               
                <TouchableOpacity onPress={handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}