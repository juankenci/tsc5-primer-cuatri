
import React, { useContext, useEffect } from "react";
import { FullScreen, Zoom } from "ol/control";
import OLTileLayer from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import OLVectorLayer from "ol/layer/Vector";
import OLVectorSource from "ol/source/Vector";
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import marker from "../assets/marker.png";
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';


const Controls  = ({ children }) => {  
    return <div>{children}</div>;
};


const MapContext = new React.createContext();

const TileLayer = ({ zIndex = 0 }) => {  
    const { map } = useContext(MapContext);   
    useEffect(() => {    
        if (!map) return;    
        let source = new OlSourceOSM();
        let tileLayer = new OLTileLayer({
            source
            ,zIndex,});    
        map.addLayer(tileLayer);    
        tileLayer.setZIndex(zIndex);    
        return () => {      
            if (map) {        
                map.removeLayer(tileLayer);      
            }    
        };  
    }, [map, zIndex]);  
    return null;};

    const VectorLayer = (props) => {  
        const { map } = useContext(MapContext);  
        useEffect(() => {    
            if (!map) return;    
        
        
        let vectorLayer = new OLVectorLayer({source: new OLVectorSource()});    
        map.addLayer(vectorLayer);    
        vectorLayer.setZIndex(0); 
            
        function setMarker(lat, lon){
            vectorLayer.getSource().clear();        
            var iconStyle = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.2,
                    src: marker
                }),            
            });
       
            
            var feature = new Feature(
                new Point([lon, lat])            
            );
            feature.setStyle(iconStyle);
            vectorLayer.getSource().addFeature(feature);
        }
    
        //setea la marca por defecto cuando muestra el formulario     
        setMarker(props.lat,props.lon);
    
        map.on('click', function (evt) {
            setMarker(evt.coordinate[1], evt.coordinate[0])
            props.setLat(evt.coordinate[1])
            props.setLon(evt.coordinate[0])
          });
        return () => {      
            if (map) {        
                map.removeLayer(vectorLayer);      
            }    
        };  
        }, [map, props]);  
        return null;
    };

    const Layers = ({ children }) => {  
        return <div>{children}</div>;
    };


    const FullScreenControl = () => {  
        const { map } = useContext(MapContext);  
        useEffect(() => {    
            if (!map) 
              return;
              
            let fullScreenControl = new FullScreen({});   
            map.controls.push(fullScreenControl);   

            return () => map.controls.remove(fullScreenControl);  
            }, [map]);
  
        return null;
    };

    const ZoomControl = () => {  
        const { map } = useContext(MapContext);  
        useEffect(() => {    
            if (!map) 
              return;

            let zoomControl = new Zoom({});   
            map.controls.push(zoomControl);   

            return () => map.controls.remove(zoomControl);  
            }, [map]);
  
        return null;
    };

    const LayerPoint = (props) => {  
        const { map } = useContext(MapContext);  
        useEffect(() => {    
            if (!map) return;    
        
        
        let vectorLayer = new OLVectorLayer({source: new OLVectorSource()});    
        map.addLayer(vectorLayer);    
        vectorLayer.setZIndex(0); 
            
        function setMarker(lat, lon, description){
            vectorLayer.getSource().clear();        
            var iconStyle = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.1,
                    src: marker
                }),  
                text: new Text({
                    text: description,
                    fill: new Fill({ color: '#BB0D0D' }),
                    font: '15px Arial',
                    offsetX: 0,
                    offsetY: 10,  
                    backgroundFill: new Fill({ color: 'whitesmoke', borderRadius:"5px" }),
                })      
            });
       

            var feature = new Feature({
                geometry: new Point(
                    [lon, lat]
                ),
                description: description 
                });

            feature.setStyle(iconStyle);
            vectorLayer.getSource().addFeature(feature);
        }
    
        //setea la marca por defecto cuando muestra el formulario     
        setMarker(props.lat,props.lon, props.name);
    
        map.on('click', function (evt) {
            // show tooltips
          });
        return () => {      
            if (map) {        
                map.removeLayer(vectorLayer);      
            }    
        };  
        }, [map, props]);  
        return null;
    };
    
    const LayerPointEmpy = (props) => {  
        const { map } = useContext(MapContext);  
        useEffect(() => {    
            if (!map) return;    
        
        
        let vectorLayer = new OLVectorLayer({source: new OLVectorSource()});    
        map.addLayer(vectorLayer);    
        vectorLayer.setZIndex(0); 
            
        function setMarker(lat, lon, description){
            vectorLayer.getSource().clear();        
            var iconStyle = new Style({
                
                text: new Text({
                    text: description,
                    fill: new Fill({ color: '#BB0D0D' }),
                    font: '15px Arial',
                    offsetX: 0,
                    offsetY: 10,  
                    backgroundFill: new Fill({ color: 'whitesmoke', borderRadius:"5px" }),
                })      
            });
       

            var feature = new Feature({
                geometry: new Point(
                    [lon, lat]
                ),
                description: description 
                });

            feature.setStyle(iconStyle);
            vectorLayer.getSource().addFeature(feature);
        }
    
        //setea la marca por defecto cuando muestra el formulario     
        setMarker(props.lat,props.lon, props.name);
    
        map.on('click', function (evt) {
            // show tooltips
          });
        return () => {      
            if (map) {        
                map.removeLayer(vectorLayer);      
            }    
        };  
        }, [map, props]);  
        return null;
    };
 
export {Controls, MapContext, LayerPoint,LayerPointEmpy,TileLayer, VectorLayer, Layers, FullScreenControl, ZoomControl};

