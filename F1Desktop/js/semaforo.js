class Semaforo {

    levels = [0.2, 0.5, 0.8]; // Dificultades del juego (tiempos de secuencia)
    lights = 4; // Número de luces del semáforo
    unload_moment = null; // Momento en el que inicia la secuencia de apagado
    clic_moment = null; // Momento en que el usuario hace clic para medir su tiempo de reacción

    constructor() {
        this.difficulty = this.levels[Math.floor(Math.random() * 3)];

        this.createStructure(); // Crear la estructura del juego
    }

    // Método que crea la estructura del juego dentro de la etiqueta <main>
    createStructure() {
        const mainElement = document.querySelector('main'); // Obtener el elemento <main>

        // Crear el encabezado h1 para el título
        const header = document.createElement('h3');
        header.textContent = 'Juego de Semáforo';
        mainElement.appendChild(header); 

        // Crear los divs para las luces del semáforo
        for (let i = 0; i < this.lights; i++) {
            const lightDiv = document.createElement('div');
            mainElement.appendChild(lightDiv); // Añadir la luz al <main>
        }

        // Crear el botón para arrancar el semáforo
        const startButton = document.createElement('button');
        startButton.textContent = 'Arranque';
        startButton.onclick = () => this.initSequence();  // Asignar el eventListener 
        mainElement.appendChild(startButton); // Añadir el botón al <main>

        // Crear el botón para obtener el tiempo de reacción
        const reactionButton = document.createElement('button');
        reactionButton.textContent = 'Reacción';
        reactionButton.disabled = true; // Deshabilitar el botón de reacción
        mainElement.appendChild(reactionButton); // Añadir el botón al <main>

        const parrafo = document.createElement('p');
        mainElement.appendChild(parrafo);
    }

    initSequence() {
        const button = document.querySelectorAll('button')[0];
        button.disabled = true; // Deshabilitar el botón de arranque
        
        const mainElement = document.querySelector('main');
        mainElement.classList.add('load');

        const totalTime = 2000 + this.difficulty * 100; // Tiempo total de la secuencia

        // Configurar el temporizador de 2 segundos
        setTimeout(() => {
            // Realizar acciones después del timeout
            this.unload_moment = new Date(); // Obtener fecha y hora actual
            // Llamar al método endSequence (asumiendo que existe en la clase)
            this.endSequence();

        }, totalTime ); 
        
    }

    // encargado de habilitar el boton de reaccion
    endSequence() {
        const reactionButton = document.querySelectorAll('button')[1];
        reactionButton.disabled = false; // Habilitar el botón de reacción

        const mainElement = document.querySelector('main');
        mainElement.classList.remove('load');
        mainElement.classList.add('unload');

        reactionButton.onclick = () => this.stopReaction();        
    }


    stopReaction() {
        this.clic_moment = new Date(); // Guardar fecha y hora del clic
        const reactionTime = (this.clic_moment.getTime() - this.unload_moment.getTime()) / 1000; // Calcular tiempo de reacción
        const mainElement = document.querySelector('main');
        
        const parrafo = document.querySelectorAll('p')[1];
        parrafo.textContent = "¡¡Tu tiempo de respuesta fue de " + reactionTime.toFixed(3) + " segundos!!";
        

        mainElement.classList.remove('load');
        mainElement.classList.remove('unload');

        const startButton = document.querySelectorAll('button')[0];
        const reactionButton = document.querySelectorAll('button')[1];

        startButton.disabled = false; // Habilitar el botón de arranque
        reactionButton.disabled = true; // Deshabilitar el botón de reacción
    }
}
