class Fondo {
    constructor(pais, capital, circuito) {
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
    }
    
    // text: `${this.circuito}`, `Fórmula 1 circuito`,
    // Método para realizar la consulta AJAX a la API de Flickr
    obtenerImagenDelCircuito(apiKey) {
        const url = "https://www.flickr.com/services/rest/";
        const parametros = {
            method: "flickr.photos.search",
            api_key: apiKey,
            text: `Fórmula1 circuito `,
            format: "json",
            nojsoncallback: 1,
            per_page: 1
        };

        // Llamada AJAX
        $.ajax({
            url: url,
            method: "GET",
            data: parametros,
            success: (respuesta) => {
                if (respuesta.photos && respuesta.photos.photo.length > 0) {
                    const foto = respuesta.photos.photo[0];
                    const urlFoto = `https://live.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_b.jpg`;

                    // Cambiar el fondo del elemento <main>
                    $("main").css("background-image", `url(${urlFoto})`);
                    $("main").css("background-size", "cover");
                    $("main").css("background-position", "center");
                    $("main").css("background-repeat", "no-repeat");
                    console.log(`Fondo del circuito ${this.circuito}: ${urlFoto}`);
                } else {
                    console.log(`No se encontraron imágenes para el circuito: ${this.circuito}`);
                }
            },
            error: (error) => {
                console.error("Error al realizar la consulta a Flickr:", error);
            }
        });
    }
}

