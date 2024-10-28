import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet,Text, View , Image,Pressable, ScrollView} from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/components/ProductList';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Button from '@/components/button';
import { useCart } from '../../providers/CartProvider';
import { PizzaSize } from '../../types';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useProductListByID } from '../../api/products';


const sizes: PizzaSize[]= ['S','M', 'L', 'XL']



export default function MenuScreen() {
  const {id: IdString} = useLocalSearchParams()
  const {addItem} = useCart()
  const router = useRouter()
  const id = parseFloat(typeof IdString === 'string' ? IdString : IdString[0]);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  
  const {
    data: product,
    isLoading,
    error,
  } = useProductListByID(id);
  const addToCart = () =>{
    if(!product){
      return;
    }
    
    addItem(product, selectedSize)
    router.push('/cart')
  }
  if(!product){
    return <Text>Product not Found</Text>
  }
  return(
    <ScrollView>
    <View style={styles.container}>
    <Stack.Screen options={{title:'Menu', headerRight: () =>  (
        <Link href="/(admin)/menu/create/?id=${id}" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}}/>
      
      <Stack.Screen options={{title: product?.name}}/>
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>

      <Text >Select size</Text>
      <View style= {styles.sizes}> 
      {sizes.map(size => <Pressable onPress = {()=>{setSelectedSize(size)}}style= {[styles.size, {backgroundColor: selectedSize === size? 'gainsboro': 'white'}] } key={size}><Text key={size} style={[styles.sizeText, {color  :selectedSize=== size? 'black': 'grey'}]}>{size}</Text></Pressable>)}
      </View>
      
      <Text style={styles.price}>Price:${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart'/>
    </View>
    </ScrollView>

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
    alignSelf: 'center',
    
  },
  price:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:'auto'
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