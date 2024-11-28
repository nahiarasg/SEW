class Memoria {

    constructor() {
        this.hasFlippedCard = false; // Indica si hay una carta dada la vuelta
        this.lockBoard = false; // Indica si el tablero está bloqueado
        this.firstCard = null; // La primera carta volteada
        this.secondCard = null; // La segunda carta volteada

        this.elements = [
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "Aston Martin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Aston Martin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
        ];

        this.shuffledElements = this.shuffleElements(); // Barajar las cartas
        this.createElements(); // Llamar al método para crear las cartas
        this.addEventListeners(); // Llamar al método para agregar los event listeners
    }

    

    // Baraja las cartas.
    shuffleElements() {
        const array = [...this.elements]; // Copia del arreglo original
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
            [array[i], array[j]] = [array[j], array[i]]; // Intercambiamos los elementos
        }
        return array;
    }

    // Bloquea el tablero y le da la vuelta a las cartas levantadas. Luego resetea el tablero.
    unflipCards() {
        this.lockBoard = true; // Bloquea el tablero para evitar más clics
        setTimeout(() => {
            // Le da la vuelta a las cartas que no coinciden
            this.firstCard.setAttribute('data-state', 'unflip');
            this.secondCard.setAttribute('data-state', 'unflip');
            this.resetBoard(); // Resetea las cartas
        }, 1500); // Espera 1.5 segundos para dar la vuelta a las cartas
    }

    // Pone a null el valor de las cartas levantadas y pone a false las variables lockBoard y hasFlippedCard.
    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false; // Desbloquea el tablero
        this.hasFlippedCard = false; // Resetea la variable que indica si se ha levantado una carta
    }

    // Comprueba si las cartas volteadas son iguales:
    // - Si lo son, llama al método disableCards
    // - Si no lo son, llama al método unflipCards
    checkForMatch() {
        if (this.firstCard.dataset.element === this.secondCard.dataset.element) {
            this.disableCards(); // Si las cartas coinciden, las deshabilita
        } else {
            this.unflipCards(); // Si no coinciden, las voltea nuevamente
        }
    }

    // Deshabilita las interacciones sobre las tarjetas de memoria que ya han sido emparejadas.
    disableCards() {
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');

        this.firstCard.onclick = null;
        this.secondCard.onclick = null;
        this.resetBoard(); // Resetea las cartas y desbloquea el tablero
    }

    // Método que gestiona el giro de las cartas
    flipCard(game, card) {
        if (game.lockBoard) return; // Si el tablero está bloqueado, no hace nada
        if (card.getAttribute('data-state') === 'revealed') return; // No permite hacer clic en una carta ya volteada
        if (card === this.firstCard) return; // No permite hacer clic en la misma carta dos veces

        card.setAttribute('data-state', 'flip'); // Cambiar el estado de la carta a 'flip'

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true; // Indicamos que la primera carta ha sido levantada
            this.firstCard = card; // Asignamos la primera carta
            return;
        }

        this.secondCard = card; // Asignamos la segunda carta levantada
        this.checkForMatch(); // Comprobamos si las dos cartas son iguales
    }

    // Método que crea los elementos (cartas)
    createElements() {
        var gameBoard = document.querySelectorAll('section')[1]; // Seleccionamos el contenedor de las cartas

        this.shuffledElements.forEach((el) => {
            const article = document.createElement('article');
            
            article.setAttribute('data-element', el.element);

            const h3 = document.createElement('h3');
            h3.textContent = 'Tarjeta de memoria';
            article.appendChild(h3);

            const img = document.createElement('img');
            img.setAttribute('src', el.source);
            img.setAttribute('alt', el.element);
            article.appendChild(img);


            gameBoard.append(article); // Añadimos la carta al tablero
        });
    }

    // Método que agrega los event listeners a las cartas
    addEventListeners() {
        // Obtener todas las tarjetas (suponiendo que las tarjetas son <article>)
        const cards = document.querySelectorAll('article');

        // Recorrer todas las cartas y agregar el evento
        cards.forEach(card => {
            card.onclick = () => this.flipCard(this, card);  // Asignar flipCard con el contexto adecuado
        });
  }
}
