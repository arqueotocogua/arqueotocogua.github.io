/*---------------------------------------------------------------------*/
//crear variable
var map = L.map('map', {
    minZoom: 6,
    maxZoom: 18
}).setView([5.821, -73.012], 16);
map.zoomControl.setPosition('topright');

// Crear un icono personalizado
var customIcon = L.icon({
    iconUrl: '/img/iconos/pin_1.png', // Coloca la URL del icono que deseas usar
    iconSize: [41, 41],             // Ajusta el tamaño
    iconAnchor: [19, 40],           // Punto de anclaje del icono
    popupAnchor: [1, -34],          // Punto de anclaje del popup
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

// Crear icono personalizado
var customIcon_2 = L.icon({
    iconUrl: '/img/iconos/pin_2.png', // Coloca la URL del icono que deseas usar
    iconSize: [41, 41],             // Ajusta el tamaño
    iconAnchor: [19, 40],           // Punto de anclaje del icono
    popupAnchor: [1, -34],          // Punto de anclaje del popup
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

// Crear icono personalizado
var customIcon_3 = L.icon({
    iconUrl: '/img/iconos/pin_3.png', // Coloca la URL del icono que deseas usar
    iconSize: [41, 41],             // Ajusta el tamaño
    iconAnchor: [19, 40],           // Punto de anclaje del icono
    popupAnchor: [1, -34],          // Punto de anclaje del popup
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

// Crear icono personalizado
var customIcon_4 = L.icon({
    iconUrl: '/img/iconos/pin_4.png', // Coloca la URL del icono que deseas usar
    iconSize: [41, 41],             // Ajusta el tamaño
    iconAnchor: [19, 40],           // Punto de anclaje del icono
    popupAnchor: [1, -34],          // Punto de anclaje del popup
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});


//agregar basemap

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

/*------------------------------------------------*/

// Obtener los elementos del modal y los botones para interactuar con él
const modal = document.getElementById("context-modal");
const closeBtn = document.getElementsByClassName("close")[0];
const title = document.getElementById("map-title"); 

// Mostrar el modal automáticamente al cargar la página
window.onload = function () {
    modal.style.display = "block";
};

// Cerrar el modal al hacer clic en la "X"
closeBtn.onclick = function () {
    modal.style.display = "none";
};

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Mostrar el modal al hacer clic en el título
title.onclick = function () {
    modal.style.display = "block";
};






// Ubicar todos los popups en la parte inferior de la pantalla
map.on('popupopen', function (e) {
    var px = map.project(e.target._popup._latlng); // Obtener las coordenadas del popup en píxeles
    var popupHeight = e.target._popup._container.clientHeight; // Altura del popup
    var mapHeight = map.getSize().y; // Altura del mapa visible

    // Ajustar el popup para que quede en la parte inferior de la pantalla
    px.y += (popupHeight / 2) - (mapHeight / 1.7); // Mover hacia abajo desde el centro

    // Centrar el mapa basado en los ajustes
    map.panTo(map.unproject(px), { animate: true });
});






//agregar control de escala
L.control.scale({ position: 'bottomright' }).addTo(map);

//mostrar coordenadas
map.on('mousemove', function (e) {
    $('.coordinate').html(`Latitud: ${e.latlng.lat.toFixed(3)} Longitud: ${e.latlng.lng.toFixed(3)}`)
})



//Medir en leaflet
L.control.measure(
    { primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares' }
).addTo(map);

//Agregar búsqueda
L.Control.geocoder().addTo(map);


    //botón de pantalla completa
    var mapId = document.getElementById('map');
    function fullScreenview(){
        if(document.fullscreenElement){
            document.exitFullscreen()
        }else{
        }

        mapId.requestFullscreen();
    }

//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ CARGUE CAPAS ----------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

//Fuente para las imágenes
let fuente = 'Fuente: Humanistas del Tundama'

//------------------------------------------------------------------------------------------------------------------------------------------------ :: patri_arqueológico

// Cargar la capa de puntos culturales con el icono personalizado y carrusel de imágenes
var marker_patri_arqueo = L.markerClusterGroup({});
var patri_arqueo = L.geoJSON(patri_arqueologico, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: customIcon });
    },
    onEachFeature: function (feature, layer) {
        let images = '';
        if (Array.isArray(feature.properties.fotografia)) {
            feature.properties.fotografia.forEach(function (imgUrl, index) {
                let activeClass = index === 0 ? ' active' : '';
                images += `<div class="carousel-item${activeClass}"><img class="imgpopup" src="${imgUrl}" alt="Imagen del sitio"></div>`;
            });
        } else {
            images = `<div class="carousel-item active"><img class="imgpopup" src="${feature.properties.fotografia}" alt="Imagen del sitio"></div>`;
        }

        let popupContent = `
            <style>
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    background-color: rgba(0, 0, 0, 0.5);
                    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.1));
                }
            </style>
            <p><b><center>${feature.properties.nombre}</center></b></p>
            <p>${feature.properties.descripcio}</p>
            <center><br/>
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${images}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
            <p><center>Fuente: Humanistas del Tundama</center></p>
            <div id="cultu3d"><p><b><a href="#">¡Click aquí para ver el Modelo 3D de este sitio!</a></b></p></div>
        `;

        layer.bindPopup(popupContent, {
            maxWidth: window.innerWidth < 768 ? 300 : 700,  // Ancho ajustado para móviles y portátiles
            minWidth: window.innerWidth < 768 ? 250 : 400,
            closeOnClick: true,
            closeButton: true
        }).on('popupopen', function (e) {
            // Asegura que el popup se despliegue desde el inicio
            const popupContainer = e.popup._container.querySelector('.leaflet-popup-content');
            if (popupContainer) {
                popupContainer.scrollTop = 0;
            }
        });
    }
});

patri_arqueo.addTo(marker_patri_arqueo);
marker_patri_arqueo.addTo(map);

// Agregar la capa de puntos y el control de capas
patri_arqueo.addTo(marker_patri_arqueo);
marker_patri_arqueo.addTo(map);

////modal fuente--> https://jsfiddle.net/slead/kq8xzxqb/

patri_arqueo.on("click", function (patri_arqueologico) {
    var content = patri_arqueologico.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo = document.getElementById('cultu3d');
    modelo.onclick = function () {
        var win = L.control.window(map, { title: patri_arqueologico.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})

//------------------------------------------------------------------------------------------------------------------------------------------------ :: patri_paleontologico

// Cargar la capa de puntos culturales con el icono personalizado y carrusel de imágenes
var marker_patri_paleo = L.markerClusterGroup({});
var patri_paleo = L.geoJSON(patri_paleontologico, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: customIcon_2 });
    },
    onEachFeature: function (feature, layer) {
        let images = '';
        if (Array.isArray(feature.properties.fotografia)) {
            feature.properties.fotografia.forEach(function (imgUrl, index) {
                let activeClass = index === 0 ? ' active' : '';
                images += `<div class="carousel-item${activeClass}"><img class="imgpopup" src="${imgUrl}" alt="Imagen del sitio"></div>`;
            });
        } else {
            images = `<div class="carousel-item active"><img class="imgpopup" src="${feature.properties.fotografia}" alt="Imagen del sitio"></div>`;
        }

        let popupContent = `
            <style>
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    background-color: rgba(0, 0, 0, 0.5);
                    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.1));
                }
            </style>
            <p><b><center>${feature.properties.nombre}</center></b></p>
            <p>${feature.properties.descripcio}</p>
            <center><br/>
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${images}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
            <p><center>Fuente: Humanistas del Tundama</center></p>
            <div id="cultu3d"><p><b><a href="#">¡Click aquí para ver el Modelo 3D de este sitio!</a></b></p></div>
        `;

        layer.bindPopup(popupContent, {
            maxWidth: window.innerWidth < 768 ? 300 : 700,  // Ancho ajustado para móviles y portátiles
            minWidth: window.innerWidth < 768 ? 250 : 400,
            closeOnClick: true,
            closeButton: true
        }).on('popupopen', function (e) {
            // Asegura que el popup se despliegue desde el inicio
            const popupContainer = e.popup._container.querySelector('.leaflet-popup-content');
            if (popupContainer) {
                popupContainer.scrollTop = 0;
            }
        });
    }
});

patri_paleo.addTo(marker_patri_paleo);
marker_patri_paleo.addTo(map);

// Agregar la capa de puntos y el control de capas
patri_paleo.addTo(marker_patri_paleo);
marker_patri_paleo.addTo(map);

////modal fuente--> https://jsfiddle.net/slead/kq8xzxqb/

patri_paleo.on("click", function (patri_paleontologico) {
    var content = patri_paleontologico.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo = document.getElementById('cultu3d');
    modelo.onclick = function () {
        var win = L.control.window(map, { title: patri_paleontologico.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})


//------------------------------------------------------------------------------------------------------------------------------------------------ :: patri_natural

// Cargar la capa de puntos culturales con el icono personalizado y carrusel de imágenes
var marker_patri_natural = L.markerClusterGroup({});
var patri_natu = L.geoJSON(patri_natural, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: customIcon_3 });
    },
    onEachFeature: function (feature, layer) {
        let images = '';
        if (Array.isArray(feature.properties.fotografia)) {
            feature.properties.fotografia.forEach(function (imgUrl, index) {
                let activeClass = index === 0 ? ' active' : '';
                images += `<div class="carousel-item${activeClass}"><img class="imgpopup" src="${imgUrl}" alt="Imagen del sitio"></div>`;
            });
        } else {
            images = `<div class="carousel-item active"><img class="imgpopup" src="${feature.properties.fotografia}" alt="Imagen del sitio"></div>`;
        }

        let popupContent = `
            <style>
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    background-color: rgba(0, 0, 0, 0.5);
                    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.1));
                }
            </style>
            <p><b><center>${feature.properties.nombre}</center></b></p>
            <p>${feature.properties.descripc}</p>
            <center><br/>
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${images}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
            <p><center>Fuente: Humanistas del Tundama</center></p>
            <div id="cultu3d"><p><b><a href="#">¡Click aquí para ver el Modelo 3D de este sitio!</a></b></p></div>
        `;

        layer.bindPopup(popupContent, {
            maxWidth: window.innerWidth < 768 ? 300 : 700,  // Ancho ajustado para móviles y portátiles
            minWidth: window.innerWidth < 768 ? 250 : 400,
            closeOnClick: true,
            closeButton: true
        }).on('popupopen', function (e) {
            // Asegura que el popup se despliegue desde el inicio
            const popupContainer = e.popup._container.querySelector('.leaflet-popup-content');
            if (popupContainer) {
                popupContainer.scrollTop = 0;
            }
        });
    }
});

patri_natu.addTo(marker_patri_natural);
marker_patri_natural.addTo(map);

// Agregar la capa de puntos y el control de capas
patri_natu.addTo(marker_patri_natural);
marker_patri_natural.addTo(map);

////modal fuente--> https://jsfiddle.net/slead/kq8xzxqb/

patri_natu.on("click", function (patri_natural) {
    var content = patri_natural.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo = document.getElementById('cultu3d');
    modelo.onclick = function () {
        var win = L.control.window(map, { title: patri_natural.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})


//------------------------------------------------------------------------------------------------------------------------------------------------ :: patri_sociocultural

// Cargar la capa de puntos culturales con el icono personalizado y carrusel de imágenes
var marker_patri_sociocultural = L.markerClusterGroup({});
var patri_sociocultu = L.geoJSON(patri_sociocultural, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: customIcon_4 });
    },
    onEachFeature: function (feature, layer) {
        let images = '';
        if (Array.isArray(feature.properties.fotografia)) {
            feature.properties.fotografia.forEach(function (imgUrl, index) {
                let activeClass = index === 0 ? ' active' : '';
                images += `<div class="carousel-item${activeClass}"><img class="imgpopup" src="${imgUrl}" alt="Imagen del sitio"></div>`;
            });
        } else {
            images = `<div class="carousel-item active"><img class="imgpopup" src="${feature.properties.fotografia}" alt="Imagen del sitio"></div>`;
        }

        let popupContent = `
            <style>
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    background-color: rgba(0, 0, 0, 0.5);
                    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.1));
                }
            </style>
            <p><b><center>${feature.properties.nombre}</center></b></p>
            <p>${feature.properties.descrip}</p>
            <center><br/>
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${images}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
            <p><center>Fuente: Humanistas del Tundama</center></p>
            <div id="cultu3d"><p><b><a href="#">¡Click aquí para ver el Modelo 3D de este sitio!</a></b></p></div>
        `;

        layer.bindPopup(popupContent, {
            maxWidth: window.innerWidth < 768 ? 300 : 700,  // Ancho ajustado para móviles y portátiles
            minWidth: window.innerWidth < 768 ? 250 : 400,
            closeOnClick: true,
            closeButton: true
        }).on('popupopen', function (e) {
            // Asegura que el popup se despliegue desde el inicio
            const popupContainer = e.popup._container.querySelector('.leaflet-popup-content');
            if (popupContainer) {
                popupContainer.scrollTop = 0;
            }
        });
    }
});

patri_sociocultu.addTo(marker_patri_sociocultural);
marker_patri_sociocultural.addTo(map);


// Agregar la capa de puntos y el control de capas
patri_sociocultu.addTo(marker_patri_sociocultural);
marker_patri_sociocultural.addTo(map);

////modal fuente--> https://jsfiddle.net/slead/kq8xzxqb/

patri_sociocultu.on("click", function (patri_sociocultural) {
    var content = patri_sociocultural.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo = document.getElementById('cultu3d');
    modelo.onclick = function () {
        var win = L.control.window(map, { title: patri_sociocultural.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Función para configurar los popups de la capa Áreas Arqueológicas
function popup_aap(feature, layer) {
    if (feature.properties) {
        let popupContent = `
            <b>Nombre:</b> ${feature.properties.Name || "Sin nombre"}<br>
            <b>Descripción:</b> ${feature.properties.description || "Sin descripción disponible"}
        `;
        layer.bindPopup(popupContent, { closeOnClick: true, closeButton: true });

        // Centrar el mapa al hacer clic en un polígono
        layer.on('click', function (e) {
            map.panTo(e.latlng, { animate: true });
        });
    }
}

// Cargar la capa de áreas arqueológicas
var areasarqueologicas = L.geoJSON(areas_arqueo, {
    onEachFeature: popup_aap,
    style: {
        color: "#520000",
        weight: 4,
        opacity: 0.5,
        fillColor: '#520000',
        fillOpacity: 0.1
    }
});

// Agregar la capa al mapa
// areasarqueologicas.addTo(map);

/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-------------------- CARGUE RUTAS   -----------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/



// Función para configurar el tooltip de la capa de rutas
function popup_reco_ambiental (feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            `<b>${feature.properties.NOMBRE}</b>`,
            { permanent: false, interactive: true, sticky: true, direction: 'left' }
        );
    }
}

// Cargar el GeoJSON de la capa de ruta con propiedades de estilo específicas
var rutaLayer_reco_ambiental = L.geoJSON(ruta_reco_ambiental, {
    style: {
        color: "#ffb600",   // Color de la línea
        weight: 4,          // Grosor de la línea
        opacity: 0.6,       // Opacidad de la línea
        dashArray: "5, 5"   // Línea discontinua
    },
    onEachFeature: popup_reco_ambiental
});

// Agregar la capa de ruta al mapa
// rutaLayer_reco_ambiental.addTo(map);


/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/


// Función para configurar el tooltip de la capa de rutas
function popup_ruta_pintu_ruprestre (feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            `<b>${feature.properties.NOMBRE}</b>`,
            { permanent: false, interactive: true, sticky: true, direction: 'left' }
        );
    }
}

// Cargar el GeoJSON de la capa de ruta con propiedades de estilo específicas
var rutaLayer_pintu_ruprestre = L.geoJSON(ruta_pintu_ruprestre, {
    style: {
        color: "#adff45",   // Color de la línea
        weight: 4,          // Grosor de la línea
        opacity: 0.6,       // Opacidad de la línea
        dashArray: "5, 5"   // Línea discontinua
    },
    onEachFeature: popup_ruta_pintu_ruprestre
});

// Agregar la capa de ruta al mapa
// rutaLayer_pintu_ruprestre.addTo(map);


/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/


// Función para configurar el tooltip de la capa de rutas
function popup_ruta_pintu_ruprestre_2 (feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            `<b>${feature.properties.NOMBRE}</b>`,
            { permanent: false, interactive: true, sticky: true, direction: 'left' }
        );
    }
}

// Cargar el GeoJSON de la capa de ruta con propiedades de estilo específicas
var rutaLayer_pintu_ruprestre_2 = L.geoJSON(ruta_pintu_ruprestre_2, {
    style: {
        color: "#7400ff",   // Color de la línea
        weight: 4,          // Grosor de la línea
        opacity: 0.6,       // Opacidad de la línea
        dashArray: "5, 5"   // Línea discontinua
    },
    onEachFeature: popup_ruta_pintu_ruprestre_2
});

// Agregar la capa de ruta al mapa
rutaLayer_pintu_ruprestre_2.addTo(map);


/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/


// Función para configurar el tooltip de la capa de rutas
function popup_ruta_camin_doña_rosita (feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            `<b>${feature.properties.NOMBRE}</b>`,
            { permanent: false, interactive: true, sticky: true, direction: 'left' }
        );
    }
}

// Cargar el GeoJSON de la capa de ruta con propiedades de estilo específicas
var rutaLayer_camin_doña_rosita = L.geoJSON(ruta_camin_doña_rosita, {
    style: {
        color: "#009bff",   // Color de la línea
        weight: 4,          // Grosor de la línea
        opacity: 0.6,       // Opacidad de la línea
        dashArray: "5, 5"   // Línea discontinua
    },
    onEachFeature: popup_ruta_camin_doña_rosita
});

// Agregar la capa de ruta al mapa
// rutaLayer_camin_doña_rosita.addTo(map);


/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/




// Función para configurar el tooltip de la capa de rutas
function popup_ruta_camin_andres (feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            `<b>${feature.properties.NOMBRE}</b>`,
            { permanent: false, interactive: true, sticky: true, direction: 'left' }
        );
    }
}

// Cargar el GeoJSON de la capa de ruta con propiedades de estilo específicas
var rutaLayer_camin_andres = L.geoJSON(ruta_camin_andres, {
    style: {
        color: "#df0000",   // Color de la línea
        weight: 4,          // Grosor de la línea
        opacity: 0.6,       // Opacidad de la línea
        dashArray: "5, 5"   // Línea discontinua
    },
    onEachFeature: popup_ruta_camin_andres
});

// Agregar la capa de ruta al mapa
// rutaLayer_camin_andres.addTo(map);


/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/


// Función para configurar el tooltip de la capa de rutas
function popup_ruta_abri_rocosos (feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            `<b>${feature.properties.NOMBRE}</b>`,
            { permanent: false, interactive: true, sticky: true, direction: 'left' }
        );
    }
}

// Cargar el GeoJSON de la capa de ruta con propiedades de estilo específicas
var rutaLayer_abri_rocosos = L.geoJSON(ruta_abri_rocosos, {
    style: {
        color: "#9bdf00",   // Color de la línea
        weight: 4,          // Grosor de la línea
        opacity: 0.6,       // Opacidad de la línea
        dashArray: "5, 5"   // Línea discontinua
    },
    onEachFeature: popup_ruta_abri_rocosos
});

// Agregar la capa de ruta al mapa
// rutaLayer_abri_rocosos.addTo(map);


/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/


/*-----------------------------------------------------------------*/
// Definir la capa de imagen raster georreferenciada
var imagenAerea = L.imageOverlay("/img/aerea/imagen_1962.png", 
    [[5.8446, -73.057267], [5.8046, -72.981958]],  // Coordenadas de las esquinas
    { opacity: 0.99 }  // Ajusta la opacidad según prefieras
)/*.addTo(map)*/;


/*-----------------------------------------------------------------*/
//Leaflet.Locate
var lc = L.control
    .locate({
        position: "topright",
        strings: {
            title: "Muéstrame dónde estoy"
        }
    })
    .addTo(map);

//Zoom a la capa
$('.zoom-to-layer').click(function () {
    map.setView([5.822, -73.010], 16)
})

/*--------------------------------------------------------------------*/
//Leaflet control basemaps
var baseMap = {
    'Imagen Satelital (ESRI)': Esri_WorldImagery,
    'OpenStreetMap': CyclOSM
}

var overlayMaps = {
    
    '​🟧​ Patrimonio Arqueológico': marker_patri_arqueo,
    '​​🟨​ Patrimonio Paleontológico': marker_patri_paleo,
    '🟦 Patrimonio Sociocultural': marker_patri_sociocultural,
    '🟩​ Patrimonio Natural': marker_patri_natural,
    '​🟤​​ Áreas Arqueológicas': areasarqueologicas,
    '​​➡️​ ​Ruta Recorrido Ambiental' : rutaLayer_reco_ambiental,
    '​​➡️​ Ruta Pinturas Rupestres' :  rutaLayer_pintu_ruprestre,
    '​​➡️​ Ruta Pinturas Rupestres 2' :  rutaLayer_pintu_ruprestre_2,
    '​​➡️​ Ruta Caminata con doña Rosita' : rutaLayer_camin_doña_rosita,
    '​​➡️​ Ruta Caminata con Andres' :    rutaLayer_camin_andres,
    '​​➡️​ Ruta Abrigos Rocosos' : rutaLayer_abri_rocosos,
    '​🗺️​ Imagen aérea 1962' : imagenAerea
}

//Control capas - basemaps y sitios
var controlCapas = L.control.layers(baseMap, overlayMaps, { collapsed: true, position: 'topleft' }).addTo(map);
/*
// Agregar la capa al control de capas
controlCapas.addOverlay(rutaLayer, "Ruta del Proyecto");
controlCapas.addOverlay(markerc, "Paradas patrimonio vivo");
controlCapas.addOverlay(serranialindosa, "🟫 Serranía Lindosa");
*/


