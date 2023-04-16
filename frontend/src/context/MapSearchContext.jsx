import { createContext, useState } from "react";

export const MapSearchContext = createContext();

const MapSearchContextProvider = ({ children }) => {
    
    const [filterMap, setFilterMap] = useState({
        rama: undefined,
        rubro: undefined,
        pais: undefined,
        provincia: undefined,
        localidad: undefined,
        nombre: undefined,
    });


    const resetContext = () => {
        setFilterMap({
            rama: undefined,
            rubro: undefined,
            pais: undefined,
            provincia: undefined,
            localidad: undefined,
            nombre: undefined,
        });
    }

    const addRama= (rama) => filterMap.rama = rama
    const addRubro= (rubro) => filterMap.rubro = rubro
    const addPais= (pais) => filterMap.pais = pais
    const addProvincia= (provincia) => filterMap.provincia = provincia
    const addLocalidad= (localidad) => filterMap.localidad = localidad
    const addNombre= (nombre) => filterMap.nombre = nombre
    const getAllFilter = () =>filterMap

    
    return (
        <MapSearchContext.Provider value={{resetContext,addRama,addRubro,addPais,addProvincia,addLocalidad,addNombre,getAllFilter}}>
            { children }
        </MapSearchContext.Provider>
    );
}

export default MapSearchContextProvider;