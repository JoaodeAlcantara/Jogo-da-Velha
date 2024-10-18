const velha = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]
const circle = '<div class="circle"></div>';
const x = '<div class="x"></div>';

const modal = document.querySelector('#mod');
const fundo = document.querySelector('.modal');

let jogador = 0;
const btns = document.querySelectorAll('.item')
btns.forEach((btn,i) => {
    btn.addEventListener('click', (e) => {
        if (velha[i] !== 0) {
            return;
        }

        if (jogador === 0) {
            jogador = 1;
            btn.innerHTML = x
        } else {
            jogador = 0
            btn.innerHTML = circle
        }
        
        if (btn.querySelector('.x')) {
            velha[i] = 'x'

        } else if (btn.querySelector('.circle')) {
            velha[i] = 'o'
        }
        setTimeout(() => {
            if (checkWin()) {
                fundo.classList.remove('hyde');
                document.querySelector('#check').innerHTML = 'Ganhou';
                document.querySelector('.win').innerHTML = jogador === 1 ? x : circle;
            } else if (velha.every(i => i !== 0)) {
                fundo.classList.remove('hyde');
                document.querySelector('#check').innerHTML = 'Empate';
                document.querySelector('.win').innerHTML = '<img src="velha.png" alt="velha" width="150px">'
            }
        }, 200)
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
    velha.fill(0);

    jogador = 0;

    btns.forEach(btn => btn.innerHTML = '')

    setTimeout(() => {
        reset.classList.remove('animed-reset')
    }, 500)
}
document.querySelector('#reset').addEventListener('click',() => {reset()})

fundo.addEventListener('click', () =>{
    fundo.classList.add('hyde')
})

document.querySelector('#jogarNov').addEventListener('click', () =>{
    reset()
})