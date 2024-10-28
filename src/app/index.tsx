import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '@/components/button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from './providers/AuthProvider';
import { supabase } from './lib/supabase';

const index = () => {
  const {session, loading, isAdmin} = useAuth();
  console.log(session)

  if(loading){
    return <ActivityIndicator/>
  }
  if(!session){
    return <Redirect href={'/sign-in'}/>
  }
  console.log(isAdmin)
  if(!isAdmin){
    return <Redirect href={'/(user)'}/>
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={()=> supabase.auth.signOut()} text='Sign out'/>
    </View>
  );
};

export default index;