import { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { supabase } from '../lib/supabase/client';
import { View } from 'react-native';
import LoginScreen from './login';
import { getProfile } from '../lib/supabase/profiles';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';

export default function RootLayout() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          await supabase.auth.signOut()
          setLoading(false)
          return
        }
        setAuthenticated(true)
        try {
          const profile = await getProfile(session.user.id)
          setHasProfile(true)
        } catch (e) {
          setHasProfile(false)
        }
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <View style={{ flex: 1, backgroundColor: '#1a1a2e' }} />
  if (!authenticated) return <LoginScreen />
  if (!hasProfile) return <CompleteProfileScreen onProfileCreated={() => setHasProfile(true)} />
  return <Slot />
}