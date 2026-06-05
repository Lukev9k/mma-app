import { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { supabase } from '../lib/supabase/client';
import { View } from 'react-native';
import LoginScreen from './login';

export default function RootLayout() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <View style={{ flex: 1, backgroundColor: '#1a1a2e' }} />
  if (!authenticated) return <LoginScreen />

  return <Slot />
}