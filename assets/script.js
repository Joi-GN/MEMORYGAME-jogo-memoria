// Memory Game
// Dev Joice Gomes | 2022

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let noClick = false;
let matches = [];

(function shuffleCards(){
    cards.forEach((card)=>{
        let randomOrder = Math.floor(Math.random()*12);
        card.style.order = randomOrder;
    })
})();

function flipCards(){

    if(noClick) return;
    if(this === firstCard) return;
    this.classList.add('flipped');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

cards.forEach((card)=>{
    card.addEventListener('click', flipCards)
})

function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    matches.push(firstCard,secondCard);
    checkEndGame();
    reset();
}

function unflipCards(){
    noClick = true;
    setTimeout(()=>{
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        reset();
    },1500);
}

function reset(){
    [hasFlippedCard,noClick,firstCard,secondCard] = [false, false, null, null];
}

function checkEndGame(){
    if(matches.length == 12){
        alert('Parabéns! Você juntou todos os pares');
        if (confirm('Gostaria de jogar novamente?') == true){
            window.location.reload()
        }else{
            alert('Até mais!');
        }
    }
}