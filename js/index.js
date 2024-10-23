const velha = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]
const circle = '<div class="circle"></div>';
const x = '<div class="x"></div>';
const prox = document.querySelector('.proxJogada');
const xGame = prox.querySelector('.x');
const circleGame = prox.querySelector('.circle');
const winner = document.querySelector('.win');
const checkWinner = document.querySelector('#check');
const circlePoint = document.querySelector('.circlePoint')
const xPoint = document.querySelector('.xPoint')

const modal = document.querySelector('#mod');
const fundo = document.querySelector('.modal');

let jogador = 0;
const btns = document.querySelectorAll('.item');
btns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        if (velha[i] !== 0) {
            return;
        }

        if (jogador === 0) {
            jogador = 1;
            btn.innerHTML = x;
            circleGame.classList.remove('previous')
            xGame.classList.add('previous')
        } else {
            jogador = 0
            btn.innerHTML = circle
            xGame.classList.remove('previous')
            circleGame.classList.add('previous')
        }

        if (btn.querySelector('.x')) {
            velha[i] = 'x'

        } else if (btn.querySelector('.circle')) {
            velha[i] = 'o'
        }
        setTimeout(() => {
            if (checkWin()) {
                fundo.classList.remove('hyde');
                checkWinner.innerHTML = 'Ganhou';
                if(jogador===1){
                    winner.innerHTML = x
                    setTimeout(()=>{
                        placar()
                    }, 200)
                } else{
                    winner.innerHTML = circle
                    setTimeout(()=>{
                        placar()
                    }, 200)
                }
            } else if (velha.every(i => i !== 0)) {
                fundo.classList.remove('hyde');
                checkWinner.innerHTML = 'Empate';
                winner.innerHTML = '<img src="velha.png" alt="velha" width="150px">'
            }
        }, 100)
    })
})

function checkWin() {
    if (velha[0] && velha[0] === velha[1] && velha[0] === velha[2] ||
        velha[3] && velha[3] === velha[4] && velha[3] === velha[5] ||
        velha[6] && velha[6] === velha[7] && velha[6] === velha[8] ||
        velha[0] && velha[0] === velha[3] && velha[0] === velha[6] ||
        velha[1] && velha[1] === velha[4] && velha[1] === velha[7] ||
        velha[2] && velha[2] === velha[5] && velha[2] === velha[8] ||
        velha[0] && velha[0] === velha[4] && velha[0] === velha[8] ||
        velha[2] && velha[2] === velha[4] && velha[2] === velha[6]
    ) {
        return true;
    }

    return false;
}

function reset() {
    let reset = document.querySelector('#reset');
    reset.classList.add('animed-reset');
    circleGame.classList.add('previous');
    xGame.classList.remove('previous');
    velha.fill(0);
    jogador = 0;

    btns.forEach(btn => btn.innerHTML = '')

    setTimeout(() => {
        reset.classList.remove('animed-reset')
    }, 500)
}
document.querySelector('#reset').addEventListener('click', () => { reset() })

document.querySelector('#jogarNov').addEventListener('click', () => {
    fundo.classList.add('hyde');
    reset()
})

function placar(){
    if(jogador===1){
        xPoint.innerHTML++;
    } else{
        circlePoint.innerHTML++;
    }
}

document.querySelector('#resetPlacar').addEventListener('click', ()=>{
    xPoint.innerHTML=0;
    circlePoint.innerHTML=0;
})