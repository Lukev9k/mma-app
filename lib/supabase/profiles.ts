import { supabase } from './client';

export async function getProfile(userId: string) {
    if (!userId) {
        throw new Error('User not found')
    }
    const { data, error } = await supabase.from('profiles').select('id').eq('id', userId).single()
    if (error) {
        throw new Error(error.message)
    }
    return data
}

export async function createProfile(userId: string, name: string, age: string, gender: string, weightClass: string, experience: string) {
    const { data, error } = await supabase.from('profiles').insert({ id: userId, gym_id: '3e3be8fe-6baf-4958-a0c9-ad0aaaf04856', name, age, gender, weight_class: weightClass, experience })
    if (error) {
        throw new Error(error.message)
    }
    return data
}