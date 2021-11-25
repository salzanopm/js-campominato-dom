// L'utente indica un livello di difficoltà in base al 
// quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

// Quando l'utente clicca su ogni cella, la cella 
// cliccata si colora di azzurro.


// [x] Quando l'utente clicca play
// [x] l'h2 nel main sparisce e compare la griglia
// [x] Verifico e memorizzo cosa ha scelto l'utente
// [x] Creo x (in base al livello) square: 
//                                     [x] aggiungere la classe 'square', 
//                                     [x] popolare la cella con lo span col numero, 
//                                     [x] settare width e height in base al livello scelto dall'utente

// Al clicco di ogni cella aggiungo ad essa la classe clicked

const playButton = document.getElementById('play-button');
playButton.addEventListener('click', startGame);

// Funzione principale del gioco
function startGame() {
    // game options
    const bombsAmount=16;
    // l'h2 aggiungo hidden e alla griglia levo hidden
    const introText = document.getElementById('intro-text');
    introText.classList.add('hidden');

    const mainGrid = document.getElementById('grid');
    mainGrid.classList.remove('hidden');
    mainGrid.innerHTML = '';

    // Verifico e memorizzo cosa ha scelto l'utente
    const levelSelect = parseInt( document.getElementById('select-level').value );
    let maxGridNumber;
    let gridItemDimension;
    if( levelSelect === 1 ) {
        maxGridNumber = 100;
        gridItemDimension = 10;
    } else if ( levelSelect === 2 ) {
        maxGridNumber = 81;
        gridItemDimension = 9;
    } else if ( levelSelect === 3 ) {
        maxGridNumber = 49;
        gridItemDimension = 7;
    }

    // generare le Bombe (array di 16 numeru non duplicati compresi tra 1 e maxGridNumber)
    const bombsArray= generateBombs(maxGridNumber,bombsAmount);
    console.log(bombsArray);

    // calcolare il numero massimo di tentativi dopo il quale ha vinto
    const maxAttemps = maxGridNumber - bombsArray.length;
    // creare un array vuoto che contiene i numeri non bombe presi dall'utente
    const rightAttempsArray =[];

    // Creo x (in base al livello) square
    for( let i = 1; i <= maxGridNumber; i++ ) {
        // Ogni volta creo la cella
        const newGeneratedCell = generateGridItem(i, gridItemDimension);

        newGeneratedCell.addEventListener('click', handleCellClick);

        mainGrid.appendChild(newGeneratedCell);
    
        }
        
        //  SPECIFIC PROJECT FUNCTIONS
        // -----------
        function handleCellClick() {
            // leggo il numero della cella
            const clickedNumber = parseInt( this.querySelector('span').textContent);
            
        // se il numero incluso nell'array di bombe:
        // il gioco finisce e la cella diventa rossa 
        
        if (bombsArray.includes(clickedNumber)) {
            this.classList.add('bomb');

     
        } else {
            // la cella diventa azzurra e non più cliccabile
            this.classList.add('clicked');
            this.style.pointerEvents = "none";
            // il numero selezionato lo aggiungiao all'array non bombe
            rightAttempsArray.push(clickedNumber);
            console.log(rightAttempsArray)
        }
    }

}


// genera array bombe da 1 a x
// maxRangeNumber --> numero massimo range bombe
// numbersOfBombs --> numero di elementi array

// return: array completo con le bombe
function generateBombs(maxRangeNumber, numberOfBombs) {
    // finchè l'array non ha numbersOfBombs elementi
    // genero un numero random tra 1 e maxRangeNumber
    // se l'elemento non è presente nell'array lo pusho
    const arrayOfBombs = [];
    while(arrayOfBombs.length < numberOfBombs){
       const randomNumber = getRndInteger(1 , maxRangeNumber);

       if (!arrayOfBombs.includes(randomNumber)) {
           arrayOfBombs.push(randomNumber);

       }
    }
    return arrayOfBombs;
}


// Genera un nuovo square per la griglia
// 
// innerNumber -> numero che deve comparire nella cella
// cellDimension -> dimensione della cella
// 
// return: l'elemento pronto per esssere 'appeso' alla griglia
function generateGridItem(innerNumber, cellDimension) {
    // Creare un nuovo div
    const newCell = document.createElement('div');
    // aggiungere la classe 'square'
    newCell.classList.add('square');
    // popolare la cella con lo span col numero, 
    newCell.innerHTML = `<span>${innerNumber}</span>`;
    // settare width e height in base al livello scelto dall'utente
    newCell.style.width = `calc(100% / ${cellDimension})`;
    newCell.style.height = `calc(100% / ${cellDimension})`;

    return newCell;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}