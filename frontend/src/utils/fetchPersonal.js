import axios from '../Helpers/API';

export const getElem = async (user, elem) =>{
    var json = ""
    try{
      var resp = await axios.get('/'+elem+'',{headers: {
        'Authorization': `Token ${user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }})                                                        
            .then(result => {   
                json = result.data      
              }).catch(error => {
                 console.log(error)
      })
      resp = json
      return resp
    }
    catch(err){
      console.error(err)
    }
  }

export const getElemPorId = async (user, id, elem, elemId) =>{
    var json = ""
    try{
      if(id != ""){
        var resp = await axios.get('/'+elem+'/'+id+'/'+elemId+'',{headers: {
          'Authorization': `Token ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }})                                                        
              .then(result => {   
                  json = result.data      
                }).catch(error => {
                  console.log(error)
        })
        resp = json
        return resp
    
      }
    }
    catch(err){
      console.error(err)
    }
  }

export const getSubunitiesByBranchCategoryId = async (user, categoria, rama) =>{
    var json = ""
    try{
      if(categoria != "" && rama != ""){
        var resp = await axios.get('/branches/'+rama+'/categories/'+categoria+'/subcategories',{headers: {
          'Authorization': `Token ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }})                                                        
              .then(result => {   
                  json = result.data      
                }).catch(error => {
                  console.log(error)
        })
        resp = json
        return resp
    
      }
    }
    catch(err){
      console.error(err)
    }
  }