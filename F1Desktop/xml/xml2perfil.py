import xml.etree.ElementTree as ET

def parse_xml(file_path):
    """
    Extrae del archivo XML la altimetria del circuito y devuelve una lista con la distancia acumulada y la altitud.
    """
    tree = ET.parse(file_path)
    root = tree.getroot()

    sectores = []
    distancia_acumulada = 0
    for sector in root.findall('.//uniovi:sector', namespaces={'uniovi': 'http://www.uniovi.es'}):
        distancia = float(sector.find('uniovi:distanciaTramo', {'uniovi': 'http://www.uniovi.es'}).text)
        altitud = float(sector.find('./uniovi:coordenadas/uniovi:altitud', {'uniovi': 'http://www.uniovi.es'}).text)
        distancia_acumulada += distancia
        sectores.append((distancia_acumulada, altitud))
    return sectores

def generar_svg(data, output_file):
    """
    Genera un archivo SVG con una polilínea cerrada que representa el perfil de altimetría.
    """
    # Configuración del lienzo SVG
    ancho = 800
    alto = 400
    margen = 50

    # Escalas
    total_distancia = max(p[0] for p in data)
    max_altitud = max(p[1] for p in data)
    min_altitud = min(p[1] for p in data)

    escala_x = (ancho - 2 * margen) / total_distancia
    escala_y = (alto - 2 * margen) / (max_altitud - min_altitud)

    # Generar puntos SVG
    puntos_svg = []
    for distancia, altitud in data:
        x = margen + distancia * escala_x
        y = alto - margen - (altitud - min_altitud) * escala_y
        puntos_svg.append(f"{x},{y}")

    # Cerrar la polilínea para el efecto suelo
    puntos_svg.append(f"{margen + total_distancia * escala_x},{alto - margen}")  # Línea hasta el eje X
    puntos_svg.append(f"{margen},{alto - margen}")  # Línea hasta el inicio
    puntos_svg.append(puntos_svg[0])  # Cerrar al primer punto

    # Crear contenido SVG
    svg_contenido = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{ancho}" height="{alto}">
        <rect width="100%" height="100%" fill="white" />
        <polyline points="{' '.join(puntos_svg)}" fill="lightblue" stroke="blue" stroke-width="2" />
    </svg>"""

    # Guardar en archivo
    with open(output_file, "w") as f:
        f.write(svg_contenido)

def main():
    # Rutas de archivo definidas directamente en el código
    input_file = "circuitoEsquema.xml"  # Nombre del archivo XML de entrada
    output_file = "perfil.svg"      # Nombre del archivo SVG de salida

    # Parsear XML y generar SVG
    try:
        data = parse_xml(input_file)
        generar_svg(data, output_file)
        print(f"Archivo SVG generado: {output_file}")
    except Exception as e:
        print(f"Error al procesar el archivo: {e}")

if __name__ == "__main__":
    main()