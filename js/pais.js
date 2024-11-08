"use strict";

class Pais {
    constructor(nombrePais, nombreCapital, cantidadPoblacion) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.cantidadPoblacion = cantidadPoblacion;
    }

    setAtributos(nombreCircuito, tipoGobierno, coordLineaMeta, religion) {
        this.nombreCircuito = nombreCircuito;
        this.tipoGobierno = tipoGobierno;
        this.coordLineaMeta = coordLineaMeta;
        this.religion = religion;
    }

    getPais() {
        return "<p>El país donde se encuentra este cirucito es: " + this.nombrePais +", " + this.nombreCapital + " </p>";
    }

    getDatosPais() {
        return "<p><ul> <li>Nombre del circuito: " + this.nombreCircuito + "</li> <li>Cantidad de población: " + this.cantidadPoblacion + 
            "</li> <li>Religión: " + this.religion + "</li> </ul> </p>";
    }

    getCoordenadasMeta() {
        document.write("<p>La línea de meta se encuentra en las coordenadas: " + this.coordLineaMeta + " </p>");
    }

    
}

var pais = new Pais("Bélgica", "Bruselas", "11.832.049");

pais.setAtributos("Circuito de Spa-Francorchamps", "Monarquía federal parlamentaria",
            "5.9649926 (longitud); 50.4442428 (latitud)");