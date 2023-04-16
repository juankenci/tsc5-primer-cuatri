import React from 'react';
  
// Creating the context object and passing the default values.
const authContext = React.createContext({status:null,login:()=>{}, token:null});
  
export default authContext;