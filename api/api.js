import request from '../../Blueberry/utils/request'

export const  getExpertAPI = ()=>{
	return request.get('/expert/getExpert')
}

export const getExpertDetailAPI = (id) => {
	return request.get(`/expert/getExpertDetail/${id}`)
}