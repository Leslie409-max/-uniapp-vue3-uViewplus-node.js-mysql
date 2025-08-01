import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useknowledgeStore = defineStore('knowledgeStore', () => {
	const editData = ref({})
	
	const setEdit = (newEdit) =>{
		editData.value = newEdit
	}
	const removeEdit = ()=>{
		editData.value = " "
	}
    return {
		editData,
		setEdit,
		removeEdit
    }
}, {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: {
            getItem: (key) => uni.getStorageSync(key),
            setItem: (key, value) => uni.setStorageSync(key, value),
          }
        }
      ]
    }
})