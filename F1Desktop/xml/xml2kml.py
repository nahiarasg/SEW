import xml.etree.ElementTree as ET

def verXPath(input_file, output_file):
    try:
        # Parsear el archivo XML y manejar los namespaces
        namespaces = {'uniovi': 'http://www.uniovi.es'}

        try:
            tree = ET.parse(input_file)
        except IOError:
            print('No se encuentra el archivo ', input_file)
            exit()
        except ET.ParseError:
            print('Error procesando el archivo ', input_file)
            exit()

        root = tree.getroot()

        # Crear el encabezado del archivo KML con un estilo rojo
        kml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Circuito Spa-Francorchamps</name>
    <description>Planimetría del circuito SPA-FRANCORCHAMPS</description>
    <Style id="lineaRoja">
      <LineStyle>
        <color>ff0000ff</color> <!-- Rojo opaco -->
        <width>3</width>       <!-- Grosor de la línea -->
      </LineStyle>
    </Style>
    <Placemark>
      <name>Ruta del Circuito</name>
      <styleUrl>#lineaRoja</styleUrl>
      <LineString>
        <coordinates>
'''

        # Extraer las coordenadas de los sectores
        trazos = root.find('uniovi:trazosCircuito', namespaces)
        if trazos is not None:
            for sector in trazos.findall('uniovi:sector', namespaces):
                coordenadas = sector.find('uniovi:coordenadas', namespaces)
                if coordenadas is not None:
                    longitud = coordenadas.find('uniovi:longitud', namespaces).text
                    latitud = coordenadas.find('uniovi:latitud', namespaces).text
                    altitud = coordenadas.find('uniovi:altitud', namespaces).text
                    kml_content += f"          {longitud},{latitud},{altitud}\n"

        # Cerrar las etiquetas del KML
        kml_content += '''        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>'''

        # Escribir el contenido en el archivo KML
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(kml_content)

        print(f"Archivo KML generado correctamente: {output_file}")

    except Exception as e:
        print(f"Error al procesar el archivo: {e}")

# Llamada al script
if __name__ == "__main__":
    verXPath("circuitoEsquema.xml", "circuito.kml")
