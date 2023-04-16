const write = require('./write'),
    gjp = require('./geojson'),
    prj = require('./prj'),
    JSZip = require('jszip');
    fs = require("fs");

module.exports = function(gj, options) {

    const zip = new JSZip();
        geojsonPoints = gjp.point(gj);

    //se crean los archivos .shp, .shx, .dbf y .prj que definen la estructura del shapefile.
    if (geojsonPoints.geometries.length && geojsonPoints.geometries[0].length) {
        write(
            // field definitions
            geojsonPoints.properties,
            // geometry type
            geojsonPoints.type,
            // geometries
            geojsonPoints.geometries,
            function(err, files) {
                const fileName = options && options.types[geojsonPoints.type.toLowerCase()] ? options.types[geojsonPoints.type.toLowerCase()] : geojsonPoints.type;
                zip.file(fileName + '.shp', files.shp.buffer, { binary: true });
                zip.file(fileName + '.shx', files.shx.buffer, { binary: true });
                zip.file(fileName + '.dbf', files.dbf.buffer, { binary: true });
                zip.file(fileName + '.prj', prj);
        });
    }   
    //se crea el archivo shapefile en formato zip, con nombre "points".
    return zip
    .generateNodeStream({type:'nodebuffer',streamFiles:true})
    .pipe(fs.createWriteStream('points.zip'));
}