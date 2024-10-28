import { useQuery, useMutation, useQueryClient, Query } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useProductListByID = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<Product, 'id'>) {
      const { error,data:newProduct } = await supabase.from('products').insert({
        name: data.name,
        price: data.price,
        Image: data.image,
      }).single()

      if (error) {
        throw error;
      }
      return newProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey:['products']});
    }
  });
};

export const useUpdateProduct = ()=>{
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error,data:updatedProduct } = await supabase.from('products').insert({
        name: data.name,
        price: data.price,
        Image: data.image,
      }).eq('id',data.id).select().single()

      if (error) {
        throw error;
      }
      return updatedProduct;
    },
    async onSuccess(_, {data}){
      await queryClient.invalidateQueries({queryKey:['products']})
      await queryClient.invalidateQueries({queryKey:['prducts', data.id]})
    }

    
  });
}

export const useDeleteProduct = ()=>{
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id:number){
      const {error} = await supabase.from('products').delete().eq('id',id)
      if(error){
        throw new Error(error.message)
      }
    },
    async onSuccess(){
        await queryClient.invalidateQueries({queryKey:['products']})
    }
  })
}