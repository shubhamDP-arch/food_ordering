import { StyleSheet,Text, View , Image, FlatList, ActivityIndicator} from 'react-native';
import { useProductList } from '../../api/products';
import ProductListItem from '@/components/ProductList';
export default function MenuScreen() {

  const { data, isLoading, error } = useProductList();

if (isLoading) {
  return <ActivityIndicator />;
}
if (error) {
  return <Text>Failed to fetch products</Text>;
}
  // useEffect(()=>{
  //   const fetchProducts = async()=>{
  //     const {data, error} = await supabase.from('products').select('*')
  //     console.log(data)
  //   }
  //   fetchProducts();
  // }, [])
  
  return(
        <FlatList 
          data={data}
          renderItem={({item})=><ProductListItem product={item}/>}
          numColumns={2}
          contentContainerStyle={{gap:10, padding:10}}
          columnWrapperStyle= {{gap:10}}
        />


  )

}
