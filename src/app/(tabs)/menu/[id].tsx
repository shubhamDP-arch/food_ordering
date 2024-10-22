import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet,Text, View , Image, FlatList} from 'react-native';

export default function MenuScreen() {
  const {id} = useLocalSearchParams()
  return(
    <View>
      <Stack.Screen options={{title: 'Details' + id}}/>
      <Text style={{fontSize:20}}>ProductDetail Screen for id {id}</Text>
    </View>

  )

}
