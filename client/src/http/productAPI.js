import { $authHost, $host } from ".";

// export const createType = async (type) => {
//     const {data} = await $authHost.post('api/type', type)
//     return data
// }
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    console.log('📦 Ответ сервера:', data)
    console.log('🔍 Тип:', typeof data)
    console.log('📋 Ключи:', Object.keys(data))
    return data.types || data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data.types || data
}

export const updateType = async (id, name) => {
    const {data} = await $authHost.put(`/api/type/${id}`, {name})
    return data
}

export const deleteType = async (id) => {
    const {data} = await $authHost.delete('/api/type', { data: { id } })
    return data
}


export const createProduct = async (formData) => {
    try {
        const {data} = await $authHost.post('api/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data
    } catch (error){
        console.error('API Error:', error.response?.data);
        throw error;
    }
}

// export const fetchProducts = async (typeId, page, limit = 6) => {
//     const {data} = await $host.get('api/product', {params:{
//         typeId, page, limit
//     }})
//     return data
// }
export const fetchProducts = async (typeId, page, limit = 8, search = '') => {
    const { data } = await $host.get('api/product', {
        params: { typeId, page, limit, search }
    });
    return data;
};

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete(`/api/product/${id}`)
    return data
}

export const updateProduct = async (id, formData) => {
    const {data} = await $authHost.put(`/api/product/${id}`, formData)
    return data
}