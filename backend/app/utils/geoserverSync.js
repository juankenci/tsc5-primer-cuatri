const shapefile = require("./createShapefile/create")
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs')

const send = (entities) => {
    const features = entities.map(i => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [parseFloat(i.longitude), parseFloat(i.latitude)]
        },

        //TODO: falta agregar en las propiedades las linesOfBussiness y sublinesOfBussiness (rubros y subrubros)
        properties: {
            name: i.name,
            oldName: i.oldName,
            recoveryDate: i.recoveryDate,
            goodsAndServices: i.goodsAndServices,
            //startDate: i.startDate, //no publicable
            street: i.street,
            number: i.streetNumber,
            betweenStreet1: i.betweenStreet1,
            betweenStreet2: i.betweenStreet2,
            neighborhood: i.neighborhood,
            branch: i.branch.name,
            category: i.category.name,
            subCategory: i.subcategory.name,
            //legalForm: i.name,  //no publicable
            country: i.country.name,
            province: i.province.name,
            district: i.district.name,
            locality: i.locality.name,
        }
    }))
    const json = {
        type: 'FeatureCollection',
        features: features
    }

    //se define el nombre que tendran los archivos del shapefile.
    const options = {
        types: {
            point: 'mypoints'
        }
    };

    shapefile(json, options)
        .on('finish', function() {
            console.log("points.zip written.");
            const dataPoints = new FormData();
            dataPoints.append('', fs.createReadStream('/restify-pg/points.zip'));
            axios({
                    method: 'put',
                    url: "http://" + process.env.GEOSERVER_HOST + ":" + process.env.GEOSERVER_PORT +
                        "/geoserver/rest/workspaces/" + process.env.GEOSERVER_WORKSPACE +
                        "/datastores/" + process.env.GEOSERVER_DATASTORE + "/file.shp",
                    headers: {
                        'Content-type': 'application/zip',
                    },
                    auth: {
                        username: process.env.GEOSERVER_USER,
                        password: process.env.GEOSERVER_PASSWORD
                    },
                    data: dataPoints
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log({ message: err });
                });
        });
}

exports.send = send;