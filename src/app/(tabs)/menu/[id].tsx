import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet,Text, View , Image,Pressable} from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/components/ProductList';
import { useState } from 'react';
import Button from '@/components/button';

const sizes = ['S','M', 'L', 'XL']

const addToCart = () =>{
  console.warn('Add To cart')
}

export default function MenuScreen() {
  const {id} = useLocalSearchParams()
  const product = products.find(p => p.id.toString() === id)
  const [selectSize, setSelectedSize] = useState('M')
  if(!product){
    return <Text>Product not Found</Text>
  }
  return(
    <View>
      <Stack.Screen options={{title: product?.name}}/>
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>

      <Text >Select size</Text>
      <View style= {styles.sizes}> 
      {sizes.map(size => <Pressable onPress = {()=>{setSelectedSize(size)}}style= {[styles.size, {backgroundColor: selectSize === size? 'gainsboro': 'white'}] } key={size}><Text key={size} style={[styles.sizeText, {color  :selectSize=== size? 'black': 'grey'}]}>{size}</Text></Pressable>)}
      </View>
      
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart'/>
    </View>

  )

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    padding:10
  },
  image:{
    width:'100%',
    aspectRatio:1,
    
  },
  price:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:'100%'
  },
  sizes:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  size:{
    backgroundColor:'gainsboro',
    width:50,
    aspectRatio:1,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  sizeText:{
    fontSize:20,
    fontWeight:'500'
  }
})