# Mapeo de la Economía Popular – 3ra etapa 
## Integracion Geonode

## Integrantes del grupo

- Martin Ferreira
- Cristian Pastrana
- Nahuel Pastrana

## Tecnologías usadas 

- NodeJS
- Axios
- Geoserver


## Minuta


Utilizando la libreria Axios de NodeJS pudimos realizar consultas a los endpoints de la API de Geoserver.

### Creacion de Workspace

```python
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs')

app.post("/api/geoserver/workspaces", (req, res) => {
  axios({
    method: 'post',
    url: "http://" + process.env.GEOSERVER_HOST + ":" + process.env.GEOSERVER_PORT + "/geoserver/rest/workspaces",
    headers: { 
      'Content-type': 'text/xml', 
    },
    auth: {
      username: process.env.GEOSERVER_USER,
      password: process.env.GEOSERVER_PASSWORD
    },
    data : '<workspace><name>myworkspace</name></workspace>'
  })
  .then(response => {
    res.json(response.data);
  })
  .catch((err) => {
    res.json({ message: err });
  });
})
```
### Obtener informacion del Workspace creado

```python
app.get("/api/geoserver/workspaces", (req, res) => {
  axios.get("http://" + process.env.GEOSERVER_HOST + ":" + process.env.GEOSERVER_PORT + "/geoserver/rest/workspaces/myworkspace.json",{
    auth: {
      username: process.env.GEOSERVER_USER,
      password: process.env.GEOSERVER_PASSWORD
    }
  })
  .then(response => {
    res.json(response.data);
  })
  .catch((err) => {
    res.json({ message: err });
  });
})

```




## Links de interes 
[Geoserver API - Using REST module](https://doc-geonode.readthedocs.io/en/latest/005_dev_workshop/006_geonode_apis/geoserver_rest/using_rest.html)
