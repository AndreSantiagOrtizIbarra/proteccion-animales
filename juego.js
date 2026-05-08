const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

let cloudX = 0;
let petX = 140;
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");

const questionText =
    document.getElementById("questionText");

const answersEl =
    document.getElementById("answers");

const feedbackEl =
    document.getElementById("feedback");

const rewardEl =
    document.getElementById("reward");

const timerBar =
    document.getElementById("timerBar");

const progressFill =
    document.getElementById("progressFill");

const restartBtn =
    document.getElementById("restartBtn");

/* PREGUNTAS */

const questions = [

{
    level:1,

    question:"¿Qué necesita siempre una mascota?",

    options:[
        "Agua limpia",
        "Chocolate",
        "Refresco"
    ],

    correct:0
},

{
    level:1,

    question:"¿Qué debe recibir un perro?",

    options:[
        "Maltrato",
        "Cuidado y cariño",
        "Abandono"
    ],

    correct:1
},

{
    level:2,

    question:"¿Qué previenen las vacunas?",

    options:[
        "Enfermedades",
        "Sueño",
        "Juegos"
    ],

    correct:0
},

{
    level:2,

    question:"¿Qué debe hacer un dueño responsable?",

    options:[
        "Ignorar a su mascota",
        "Alimentarla correctamente",
        "Nunca pasearla"
    ],

    correct:1
},

{
    level:3,

    question:"¿Qué alimento es peligroso para perros?",

    options:[
        "Chocolate",
        "Agua",
        "Concentrado"
    ],

    correct:0
}

];

/* VARIABLES */

let current = 0;

let score = 0;

let lives = 3;

let timer = 10;

let interval;

let gameOver = false;

/* =========================
   SONIDOS
========================= */

const correctSound =
    new Audio("sounds/correct.mp3");

const wrongSound =
    new Audio("sounds/wrong.mp3");

const winSound =
    new Audio("sounds/win.mp3");

/* volumen */

correctSound.volume = 0.4;

wrongSound.volume = 0.4;

winSound.volume = 0.5;

/* ACTUALIZAR */

function updateStats(){

    scoreEl.textContent = score;

    livesEl.textContent = lives;

    levelEl.textContent =
        questions[current]?.level || 3;

    progressFill.style.width =
        `${(current/questions.length)*100}%`;
}

/* TIMER */

function startTimer(){

    clearInterval(interval);

    timer = 10;

    timerBar.style.width = "100%";

    interval = setInterval(()=>{

        timer--;

        timerBar.style.width =
            `${timer*10}%`;

        if(timer <= 0){

            clearInterval(interval);

            loseLife();
        }

    },1000);
}

/* PERDER VIDA */

function loseLife(){

    lives--;

    feedbackEl.textContent =
        "Tiempo agotado.";

    if(lives <= 0){

        endGame();

        return;
    }

    current++;

    renderQuestion();
}

/* MOSTRAR PREGUNTA */

function renderQuestion(){

    if(current >= questions.length){

        endGame();

        return;
    }

    updateStats();

    startTimer();

    const q = questions[current];

    questionText.textContent =
        q.question;

    answersEl.innerHTML = "";

    feedbackEl.textContent = "";

    rewardEl.textContent = "";

    q.options.forEach((option,index)=>{

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            option;

        button.onclick =
            ()=>checkAnswer(index);

        answersEl.appendChild(button);
    });
}

/* VERIFICAR */

function checkAnswer(index){

    if(gameOver) return;

    clearInterval(interval);

    const q = questions[current];

    if(index === q.correct){

        correctSound.currentTime = 0;
        correctSound.play();
        score += 10;
        petX += 80;

        feedbackEl.textContent =
            "Respuesta correcta.";

        rewardEl.textContent =
            "⭐ Excelente";

    }else{
        wrongSound.currentTime = 0;
        wrongSound.play();

        lives--;

        feedbackEl.textContent =
            "Respuesta incorrecta.";
    }

    if(lives <= 0){

        endGame();

        return;
    }

    current++;

    setTimeout(()=>{

        renderQuestion();

    },1000);
}

/* FINAL */

function endGame(){

    gameOver = true;

    clearInterval(interval);

    if(score >= 40){

    winSound.play();
    
    }

    questionText.textContent =
        "Juego terminado";

    answersEl.innerHTML = "";

    feedbackEl.textContent =
        `Puntaje final: ${score}`;

    rewardEl.textContent =
        score >= 40 ?

        "🏆 Gran cuidador de mascotas"

        :

        "🐾 Sigue aprendiendo";

    restartBtn.classList.remove(
        "hidden"
    );
}

/* REINICIAR */

restartBtn.onclick = ()=>{

    current = 0;

    score = 0;

    lives = 3;

    gameOver = false;

    restartBtn.classList.add(
        "hidden"
    );

    renderQuestion();
};

/* INICIAR */

renderQuestion();
/* =========================
   NUBES
========================= */

function drawCloud(x,y,size){

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(x,y,size,0,Math.PI*2);

    ctx.arc(
        x+size,
        y,
        size*0.8,
        0,
        Math.PI*2
    );

    ctx.arc(
        x+size*2,
        y,
        size,
        0,
        Math.PI*2
    );

    ctx.fill();
}

/* =========================
   FONDO
========================= */

function drawBackground(){

    /* cielo */

    ctx.fillStyle = "#9ddcff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        260
    );

    /* suelo */

    ctx.fillStyle = "#b7e7a7";

    ctx.fillRect(
        0,
        260,
        canvas.width,
        160
    );

    /* sol */

    ctx.fillStyle = "#FFD54F";

    ctx.beginPath();

    ctx.arc(
        760,
        80,
        45,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* nubes */

    drawCloud(cloudX,90,25);

    drawCloud(
        cloudX+260,
        140,
        30
    );

    drawCloud(
        cloudX+520,
        70,
        22
    );

    cloudX += 0.25;

    if(cloudX > canvas.width){

        cloudX = -600;
    }
    
    /* ======================
   META
====================== */

/* POSTE */

ctx.fillStyle = "#5d4037";

ctx.fillRect(
    canvas.width - 120,
    160,
    10,
    120
);

/* BANDERA */

ctx.fillStyle = "#ff5252";

ctx.beginPath();

ctx.moveTo(
    canvas.width - 110,
    160
);

ctx.lineTo(
    canvas.width - 40,
    190
);

ctx.lineTo(
    canvas.width - 110,
    220
);

ctx.closePath();

ctx.fill();

/* TEXTO */

ctx.fillStyle = "#333";

ctx.font = "bold 20px Arial";

ctx.fillText(
    "META",
    canvas.width - 200,
    145
);
  
}

/* =========================
   MASCOTA
========================= */

function drawPet(){

    const bounce =
        Math.sin(Date.now()/220)*3;

    const x = petX;

    const y = 295 + bounce;

    /* ======================
       SOMBRA
    ====================== */

    ctx.fillStyle =
        "rgba(0,0,0,0.12)";

    ctx.beginPath();

    ctx.ellipse(
        x,
        y + 58,
        78,
        16,
        0,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* ======================
       CUERPO
    ====================== */

    const bodyGradient =
        ctx.createLinearGradient(
            x-80,
            y,
            x+90,
            y
        );

    bodyGradient.addColorStop(
        0,
        "#c98b52"
    );

    bodyGradient.addColorStop(
        1,
        "#e4ad72"
    );

    ctx.fillStyle =
        bodyGradient;

    ctx.beginPath();

    ctx.moveTo(x-65,y);

    ctx.quadraticCurveTo(
        x-60,
        y-55,
        x+25,
        y-42
    );

    ctx.quadraticCurveTo(
        x+95,
        y-28,
        x+88,
        y+12
    );

    ctx.quadraticCurveTo(
        x+70,
        y+52,
        x-20,
        y+42
    );

    ctx.quadraticCurveTo(
        x-75,
        y+32,
        x-65,
        y
    );

    ctx.fill();

    /* ======================
       CABEZA
    ====================== */

    const headGradient =
        ctx.createLinearGradient(
            x+20,
            y-60,
            x+90,
            y+20
        );

    headGradient.addColorStop(
        0,
        "#e8bb84"
    );

    headGradient.addColorStop(
        1,
        "#c98b52"
    );

    ctx.fillStyle =
        headGradient;

    ctx.beginPath();

    ctx.arc(
        x+72,
        y-12,
        42,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* ======================
       OREJAS
    ====================== */

    ctx.fillStyle = "#9b6030";

    ctx.beginPath();

    ctx.moveTo(x+45,y-42);

    ctx.quadraticCurveTo(
        x+35,
        y-92,
        x+65,
        y-58
    );

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(x+95,y-40);

    ctx.quadraticCurveTo(
        x+110,
        y-88,
        x+85,
        y-58
    );

    ctx.fill();

    /* ======================
       PATAS
    ====================== */

    ctx.fillStyle = "#b77943";

    const walk =
        Math.sin(Date.now()/120)*5;

    function leg(px,offset){

        ctx.beginPath();

        ctx.roundRect(
            px,
            y+20 + offset,
            20,
            62,
            10
        );

        ctx.fill();
    }

    leg(x-45,walk);

    leg(x-10,-walk);

    leg(x+28,walk);

    leg(x+58,-walk);

    /* ======================
       COLA
    ====================== */

    ctx.strokeStyle = "#a86d3f";

    ctx.lineWidth = 10;

    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(x-68,y-8);

    ctx.quadraticCurveTo(
        x-120,
        y-55 + walk,
        x-88,
        y+12
    );

    ctx.stroke();

    /* ======================
       OJOS
    ====================== */

    ctx.fillStyle = "#111";

    ctx.beginPath();

    ctx.arc(
        x+60,
        y-18,
        5,
        0,
        Math.PI*2
    );

    ctx.arc(
        x+86,
        y-18,
        5,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* BRILLO OJOS */

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(
        x+62,
        y-20,
        1.8,
        0,
        Math.PI*2
    );

    ctx.arc(
        x+88,
        y-20,
        1.8,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* ======================
       HOCICO
    ====================== */

    ctx.fillStyle = "#fff2e2";

    ctx.beginPath();

    ctx.ellipse(
        x+73,
        y+6,
        18,
        13,
        0,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* NARIZ */

    ctx.fillStyle = "#222";

    ctx.beginPath();

    ctx.arc(
        x+73,
        y,
        4,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* BOCA */

    ctx.strokeStyle = "#5a3420";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        x+73,
        y+8,
        8,
        0,
        Math.PI
    );

    ctx.stroke();

    /* MEJILLAS */

    ctx.fillStyle =
        "rgba(255,180,180,0.45)";

    ctx.beginPath();

    ctx.arc(
        x+52,
        y+2,
        6,
        0,
        Math.PI*2
    );

    ctx.arc(
        x+95,
        y+2,
        6,
        0,
        Math.PI*2
    );

    ctx.fill();
}

/* =========================
   ANIMACIÓN
========================= */

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawBackground();

    drawPet();

    requestAnimationFrame(
        animate
    );
}

animate();