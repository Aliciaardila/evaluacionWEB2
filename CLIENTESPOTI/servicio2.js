let uri = "https://accounts.spotify.com/api/token";
let dato1 = "grant_type=client_credentials";
let dato2 = "client_id=9a622427e1db4e8fad252c89ab4c4078";
let dato3 = "client_secret=b0dc1b57ded4446995984f851678e3d3";


let parametrosPeticion = {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded" //cabecera
    },
    body: dato1 + "&" + dato2 + "&" + dato3

}
fetch(uri, parametrosPeticion) /* fetch es el metodo */
    .then(function(respuesta) {
        return (respuesta.json()); /* formato jaison*/
    })
    .then(function(respuesta) {
        console.log(respuesta); //objeto 
        obteneToken(respuesta);

    })
    .catch(function(error) {
        console.log(error);

    })

function obteneToken(datos) {
    let token = datos.token_type + " " + datos.access_token
    console.log(token)
    pedirCanciones(token)

}

function pedirCanciones(token) {
    let uri = "https://api.spotify.com/v1/artists/5HA5aLY3jJV7eimXWkRBBp/top-tracks?market=us";
    let parametrosPeticion = {
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    fetch(uri, parametrosPeticion) /* fetch es el metodo */
        .then(function(respuesta) {
            return (respuesta.json());
        })
        .then(function(respuesta) {
            console.log(respuesta); //objeto 
            pintarDatos(respuesta.tracks); //llevo un arreglo 
        })
        .catch(function(error) {
            console.log(error);

        })

}

function pintarDatos(datos) {

    let fila = document.getElementById("fila")
    datos.forEach(function(cancion) {
        let columna = document.createElement("div");
        columna.classList.add("col");

        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");

        let imagen = document.createElement("img");
        imagen.classList.add("card-img-top");
        imagen.src = cancion.album.images[0].url;

        let titulo = document.createElement("h5");
        titulo.textContent = cancion.name;
        titulo.classList.add("card-title");

        let popularidad = document.createElement("popularidad");
        popularidad.textContent = cancion.popularity;

        //let album = document.createElement("album");
        //album.textContent = cancion.album;


        //creo audio
        let audio = document.createElement('audio');
        audio.classList.add("w-100");
        audio.setAttribute("controls", "controls");
        audio.src = cancion.preview_url;


        // PADRES E HIJOS

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        //tarjeta.appendChild(album);
        tarjeta.appendChild(audio);
        tarjeta.appendChild(popularidad);

        columna.appendChild(tarjeta);
        fila.appendChild(columna);


    })

}