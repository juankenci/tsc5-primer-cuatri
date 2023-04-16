import axios from '../Helpers/API';

export const getPaises = async (user) =>{
  var json = ""
  try{
    var resp = await axios.get('/countries',{headers: {
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

export const getElemById = async (user, id, elem, elemId) =>{
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

export const getLatitudLongitud = async (street, streetNumber, state, country, city) =>{
  var json = ""
  
  try{
    var resp = await axios.get('https://nominatim.openstreetmap.org/?addressdetails=1&street=' + streetNumber + '%20' + street + '&state=' + state + '&country=' + country + '&city=' + city + '&format=json&limit=1')                                                        
      .then(result => {   
          json = result.data;      
        }
      )
      .catch(error => {
        console.log(error);
      }
    );

    resp = json;
    return resp;
  }
  catch(err){
    console.error(err);
  }
}

export const getLatitudLongitudForCity = async (state, country, city) =>{
  var json = ""
  
  try{
    var resp = await axios.get('https://nominatim.openstreetmap.org/?addressdetails=1&state=' + state + '&country=' + country + '&city=' + city + '&format=json&limit=1')                                                        
      .then(result => {   
          json = result.data;      
        }
      )
      .catch(error => {
        console.log(error);
      }
    );

    resp = json;
    return resp;
  }
  catch(err){
    console.error(err);
  }
}