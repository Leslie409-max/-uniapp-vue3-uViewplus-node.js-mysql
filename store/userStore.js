import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userUserStore = defineStore('userStore', () => {
    const token = ref('')
    const role = ref('')
    const userInfo = ref({})
	const editData = ref({})

    const setUserInfo = (info) => {
        userInfo.value = info
    }
    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ' '
    }
    const setRole = (newRole) => {
        role.value = newRole
    }
	const setEdit = (newEdit) =>{
		editData.value = newEdit
	}
	const removeEdit = ()=>{
		editData.value = " "
	}
    return {
        token,
        role,
        userInfo,
		editData,
        setToken,
        removeToken,
        setRole,
        setUserInfo,
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