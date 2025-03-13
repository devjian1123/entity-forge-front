import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const convertDDLToEntity = async (ddl) => {
  const response = await axios.post(`${API_BASE_URL}/convert-ddl`, { ddl })
  console.log('res of convert DDL: ', response)
  return response.data.entityCode
}
