import { TextInput, Button, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.log(error.message)
  }

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) console.log(error.message)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a2e', padding: 20, marginTop: 40 }}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={{ backgroundColor: '#ffffff', padding: 10, marginBottom: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        style={{ backgroundColor: '#ffffff', padding: 10, marginBottom: 10, borderRadius: 8 }}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
      />
    </SafeAreaView>
  )
}

export default LoginScreen;