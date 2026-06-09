import { Text , ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase/client';

interface Tournament {
    name: string
    position: string
  }

interface ProfileData {
    name: string
    age: number
    gender : string
    weightClass: string
    experienceLevel : string
    height : number
    weight : number
    subscriptionEndDate : string
    tournaments: Tournament[] 
  }

const profile: ProfileData = { 
    name: 'Lukev', 
    age: 25, 
    gender: 'male', 
    weightClass: 'Middleweight', 
    experienceLevel: '1yr', 
    height: 183, 
    weight: 80, 
    subscriptionEndDate: '17th Jun',
    tournaments: []
}

export function ProfileScreen() {
    return (
        <ScrollView>
            <Text>{profile.name}</Text>
            <Text>{profile.age} </Text>
            <Text>{profile.gender} </Text>
            <Text>{profile.weightClass} </Text>
            <Text>{profile.experienceLevel} </Text>
            <Text>{profile.height} </Text>
            <Text>{profile.weight} </Text>
            <Text>{profile.subscriptionEndDate} </Text>
            <Text>{profile.tournaments.length === 0 ? 'No tournaments yet' : ''}</Text>
            <TouchableOpacity onPress={() => supabase.auth.signOut()}>
            <Text>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
    )

}