import {View, Text, Platform, FlatList} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from './providers/CartProvider'
import CartListItem from '@/components/CartListItem';
import Button from '@/components/button';

const CartScreen = () =>{
  const {items} = useCart(); 
  const {total} = useCart();
  console.log(items)
 
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item})=> <CartListItem cartItem={item}/>}
        contentContainerStyle={{padding:10, gap:10}}
      />
      <Text style={{marginTop:20, fontSize:20, fontWeight:'500'}}>
        Total: ${total}
      </Text>

      <Button text='Checkout'/>

      
    </View>
  )
}

export default CartScreen