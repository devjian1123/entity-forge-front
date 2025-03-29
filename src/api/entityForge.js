import { removeBackticks } from '@/utils/removeBackticks'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const convertDDLToEntity = async (ddl) => {
  try {
    const ddlRemovedBackticks = removeBackticks(ddl)
    const response = await axios.post(`${API_BASE_URL}/convert-ddl`, { ddl: ddlRemovedBackticks })
    console.log('res of convert DDL: ', response)
    return response.data.entityCode
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response
      if (errorResponse) {
        return errorResponse.data.error + ': ' + errorResponse.data.message
      }
    }
  }
}
