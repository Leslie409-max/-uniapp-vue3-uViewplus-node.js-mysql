import request from '../utils/request'

export const getExpertAPI = () => {
	return request.get('/expert/getExpert')
}

export const getExpertDetailAPI = (id) => {
	return request.get(`/expert/getExpertDetail/${id}`)
}

export const getTechniquesAPI = () => {
	return request.get('/banner/getTechniques')
}