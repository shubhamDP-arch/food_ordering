import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../../../constants/Colors';
import Button from '../../../../components/button';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProductListByID, useUpdateProduct } from '../../api/products';

const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const {id:idString} = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string'? idString: idString[0])
  const {data: updatingProduct} = useProductListByID(id);
  const router = useRouter();
  const {mutate: insertProduct} = useInsertProduct();
  const {mutate: updatedProduct} = useUpdateProduct();
  const {mutate: deleteProduct} = useDeleteProduct();
  const isUpdating = !!id
  useEffect(()=>{
    if(updatingProduct){
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  },[updatingProduct])
  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price should be a number');
      return false;
    }
    return true;
  };
  const onSubmit = () =>
{
  if(isUpdating){
    onUpdateCreate();
  }
  else{
    onCreate()
  }
}
  function resetProuduct(){
    setName('');
    setPrice('');
    setImage('');
    router.back();
  }
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log('creating product')
    insertProduct({name, price:parseFloat(price), image}, {onSuccess:()=>{
      resetProuduct()
      router.back();
    }})


  };
  const onUpdateCreate = () =>{
    if(!validateInput()){

    }

    updatedProduct(
      {id,name, price:parseFloat(price), image}
    )
    resetProuduct()
  }
  const onDelete = ()=>{
    deleteProduct(id, {onSuccess:()=>{
      resetProuduct();
      router.replace('/(admin)')

    }})
    
  }
  const confirmDelete = () =>{
    Alert.alert("Confirm", "Are you sure you want to delete this product",[
      {
        text:'Cancel',
      },
      {
        text:'Delete',
        style:'destructive',
        onPress: onDelete
      }

    ])
  }

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView>
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating?'Update Product': 'Create Product'}}/>
      <Image
        source={{ uri: image || defaultPizzaImage}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update': 'Create'} />
      {isUpdating && <Text onPress={confirmDelete}></Text>}
    </View>
    </ScrollView>
  );

};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CreateScreen;