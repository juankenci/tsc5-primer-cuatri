import axios from '../Helpers/API';



export const getOrganizations = async (user,countryId,provinceId,districtId,branchId,categoryId ) =>{
    const options = {
        headers: {
            'Authorization': `Token ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let reponse = axios.get('/entities/search?branchId='+branchId+'&provinceId='+provinceId+'&districtId='+districtId+'&countryId='+countryId+'&categoryId='+categoryId, options)
    
    return reponse
  }
  





