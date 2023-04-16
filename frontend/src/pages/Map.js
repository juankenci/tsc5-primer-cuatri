
import React, {useContext,useState } from "react"
import "../styles/Map.css";
import Button from 'react-bootstrap/Button';
import  MapSearch from "../components/MapSearch";
import { MapPoint } from "../components/MapPoint";
import { MapSearchContext } from '../context/MapSearchContext';
import {organizacionesInit} from '../data/Organizaciones'
import {getOrganizations} from '../utils/fetchOrganizations'
import useAuth from "../hooks/useAuth";





function Map () {
  const {auth} = useAuth();
  const MapFilters = useContext(MapSearchContext);
  const [organizaciones, setOrganizaciones] = useState([]);

  const handleSearch = () => {
      const data = MapFilters.getAllFilter()
      console.log(data)
      getOrganizations(auth, data.pais ,data.provincia, data.localidad, data.rama, data.rubro)
            .then(r => setOrganizaciones(r.data.map(o => ({lon:o.longitude, lat:o.latitude, name:o.name,description: o.name}))))
            .catch(e => console.log(e))
      console.log(organizaciones)
  }

  const handleClean = () => {
    setOrganizaciones([])
    //MapFilters.resetContext()
   
  }

  return (


      <>
      <div className="row">
        <div className="col-md-2">
          <MapSearch />
          <Button className="buttonMap" variant='success' onClick={handleSearch}>Buscar</Button>
          <Button className="buttonMap" variant='warning' onClick={handleClean}>Limpiar</Button>
        </div>

        <div className="col-md-10">
            {organizaciones.length > 0 ? 
            <MapPoint 
                  center={[organizaciones[0].lon, organizaciones[0].lat]}
                  organizaciones = {organizaciones}
                  />
              : 
              <MapPoint 
              center={[organizacionesInit[0].lon, organizacionesInit[0].lat]}
              organizaciones = {organizacionesInit}
              />
                }
          </div>
      </div>

      </>
      )
}


export default Map
