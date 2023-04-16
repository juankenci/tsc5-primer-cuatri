import React, { useRef, useState, useEffect } from "react"
import "../styles/FormInputLocationMap.css";
import {MapContext, TileLayer, VectorLayer, Layers, Controls, ZoomControl} from '../utils/MapObjects';
import {DragPan, MouseWheelZoom, defaults} from 'ol/interaction';
import {platformModifierKeyOnly} from 'ol/events/condition';
import * as ol from "ol";

const FormInputLocationMap = (props) => { 
  const mapRef = useRef();  
  const [map, setMap] = useState(null);
  let center = props.center;
  const [zoom] = useState(16); 
   
   // on component mount  
  useEffect(() => {    
      let options = {     
        view: new ol.View({zoom: zoom, center: center, projection: 'EPSG:4326' }),      
        layers: [],      
        controls: [],      
        overlays: [],
        interactions: defaults({dragPan: true, mouseWheelZoom: false}).extend([
          new DragPan({
            condition: function (event) {
              return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
            },
          }),
          new MouseWheelZoom({
            condition: platformModifierKeyOnly,
          }),
        ]),
      };  

      let mapObject = new ol.Map(options);
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);
        
      return () => mapObject.setTarget(undefined);
    }, [zoom]
  );

  //zoom change handler  
  useEffect(() => {    
      if (!map) return;   
      map.getView().setZoom(zoom);
    }, [zoom, map]
  );  

  // center change handler  
  useEffect(() => {    
      if (!map) return;

      const timeOutId = setTimeout(() => {
        map.getView().setCenter(center);
      }, 500);

      return () => clearTimeout(timeOutId);
    }, [center, map]
  );

  return (    
    <MapContext.Provider value={{map}}>      
      <div ref={mapRef} className="ol-map" id="map" >        
        <Layers>
          <TileLayer/>
          <VectorLayer lat={props.lat} lon={props.lon} setLat={props.setLat} setLon={props.setLon} />                          
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>        
      </div>    
    </MapContext.Provider>
  );

}

export default FormInputLocationMap;