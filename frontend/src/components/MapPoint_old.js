import Point from 'ol/geom/Point';
import { useEffect, useContext } from "react"

import OLVectorLayer from "ol/layer/Vector";
import Feature from 'ol/Feature';
import OLVectorSource from "ol/source/Vector";
import {MapContext} from '../components/FormInputLocationMapObjects';

import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';



const organizaciones = [{
    lat: -58.39797811,
    lon: -34.66874186,
    name: "organizacion 1",
    description: "desc1"
}, {
    lat: -58.3959999,
    lon: -34.66874186,
    name: "organizacion 2",
    description: "desc2"
}, {
    lat: -58.39397811,
    lon: -34.66874186,
    name: "organizacion 3",
    description: "desc3"
},]

export const MapPoint = () => {

    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;
        let vectorLayer = new OLVectorLayer({ source: new OLVectorSource() });
        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(0);
        vectorLayer.getSource().clear();;

        organizaciones.map(({ lat, lon, name, descripcion }) => {
            console.log(lat, lon, name, descripcion);
            var feature = new Feature({
                geometry: new Point(
                    [lat, lon]
                ),
                description: description
            }
            );
            var iconStyle = new Style({
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: 'red'
                    })
                }),


                text: new Text({
                    text: name,
                    fill: new Fill({ color: 'red' }),
                    font: '12 px Arial',
                    offsetX: 20,
                    offsetY: -12,
                })
            });
            feature.setStyle(iconStyle);
            vectorLayer.getSource().addFeature(feature);
        })

        map.on('click', function (e) {
            var iconFeatureA = map.getFeaturesAtPixel(e.pixel);
            if (iconFeatureA !== null) {
                var descripcion = iconFeatureA[0].get("descripcion");
                alert(descripcion);
                e.preventDefault(); // avoid bubbling 
            }
        });

        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);
    return null;
}
