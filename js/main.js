// Objetos de cada personaje

//Images powered by Gema!!

const arrayPersonajes = [
    {
        nombre: "Anna",
        ruta: "img/Anna.png"
    },

    {
        nombre: "Campanilla",
        ruta: "img/Campanilla.png"
    },

    {
        nombre: "Cenicienta",
        ruta: "img/Cenicienta.png"
    },

    {
        nombre: "Elsa",
        ruta: "img/Elsa.png"
    },

    {
        nombre: "Flynn",
        ruta: "img/Flynn.png"
    },

    {
        nombre: "Genio",
        ruta: "img/Genio.png"
    },

    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina.png"
    },

    {
        nombre: "Mushu",
        ruta: "img/Mushu.png"
    },

    {
        nombre: "Pascal",
        ruta: "img/Pascal.png"
    },

    {
        nombre: "Pepito",
        ruta: "img/Pepito.png"
    },

    {
        nombre: "Primavera",
        ruta: "img/Primavera.png"
    },

    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png"
    }
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");

rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

const song = document.getElementById("song");
const clic = document.getElementById("clic");
const bounce = document.getElementById("bounce");
const win = document.getElementById("win");
const fail = document.getElementById("fail");


var contador = 0; //Cuento los div que seleccionemos.
var primerSel = "";
var segundoSel = "";
var selPrevio = null;
var eliminados = 0; //esta variable incluimos porque el reloj no va


var start = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");

var segundos = 45; //Copiado de la cuenta atras



//Función para barajar los div con cada personje.

function baraja () {
    const personajesDoble = arrayPersonajes.concat(arrayPersonajes)
    .sort(() => 0.5 - Math.random ());


personajesDoble.forEach(personaje => {
    const { nombre, ruta} = personaje;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.dataset.name = nombre;

    const anverso = document.createElement("div");
    anverso.classList.add("anverso");

    const reverso =  document.createElement("div");
    reverso.classList.add("reverso");
    reverso.style.backgroundImage = `url(${ruta})`; //en el reverso estará la imagen el muñeco.

    rejilla.appendChild(tarjeta);
    tarjeta.appendChild(anverso);
    tarjeta.appendChild(reverso);
    });

    gameover.style.opacity = "0"; //    cambiamos gameover.style.display por lo puesto y none por 0
    winner.classList.remove("open");
    rejilla.classList.remove("out"); //Para que baje la rejilla
    rejilla.classList.add("start"); 
    start.style.display = "none";
    reloj.style.display = "initial";
    song.play();
    eliminados = 0; 
    reloj.style.color = "#ffff00";
}
//Función de inicio de juego y reloj cuenta atrás.

function startGame(){
    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2); 
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;


    if (eliminados === 24) {
        return; 
    } 

    if (segundos > 0) {
        var t = setTimeout(function(){
            startGame();
        },1000)
    } else {
        gameOver();
    }
   
    segundos--;

    if (segundos < 10) {
        reloj.style.color = "#ff0000";
    }
}

//Función para ejecutar la lógica de partida perdida.

function gameOver() {
    console.log("ejecuto gameOver");

   segundos = 45;
    song.pause();
    song.currentTime = 0;
    fail.play(); // Música del game-over
    rejilla.classList.add("out");
    gameover.style.opacity = "initial";
    start.style.display = "initial";
    reloj.style.color = "initial";
    reloj.style.display = "none";
    setTimeout(function(){
        while(rejilla.firstChild){
            rejilla.removeChild(rejilla.firstChild); //<rejilla> dentro del cual tiene a los div de Disney co 24 hijos, mientras exista en primer hijo lo borra por ejemplo Aladin, Elsa....hasta que llegue un momento que elimina a todos  
        }
    },1000); //para que los div se vayan hacia arriba una vez perdemos en el juego
}


//Evento clic para seleccionar cada personaje.

//El array esta compuesto por personajes cada uno tendrá un div, clase de tarjeta, nombre y de fondo = la imagen.
//target nos dice el elemento que hemos pulsado

rejilla.addEventListener("click", function(evento){
    clic.currentTime = 0;
    clic.play();


    var seleccionado = evento.target; //Recogemos el valor del elemento del cual hemos realizado el click.
//Solo me coge aquellos que tenga div no fuera.
    if (seleccionado.nodeName === "SECTION" || 
        seleccionado.parentNode === selPrevio ||
        seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    }

    if (contador < 2) {
        contador++;
        if (contador === 1) {
            primerSel = seleccionado.parentNode.dataset.name; //El contador nace 0 pulsando en click entra en contador 2. Selecciono el nombre de ese personaje.
            seleccionado.parentNode.classList.add("seleccionado");
            selPrevio = seleccionado.parentNode;
        } else {
            segundoSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        }
        if (primerSel !="" && segundoSel !== "") {
            if (primerSel === segundoSel) {
                bounce.currentTime = 0;
                bounce.play();
                setTimeout(eliminar, 600);  //Incluimos el resetSet en ambos lados y el else con sus {}, 6 marzo añadimos setTimeout
                setTimeout(resetSel, 600);
                contEliminados();
            } else {
                setTimeout(resetSel, 600);
                selPrevio = null;
            }
        }

        //Función para eliminar los elementos coincidentes.

        // seleccionado.parentNode.classList.contains("eliminado")) lo hemos añadido al if del contador 1 
        //ademas de incluir  selPrevio = null, esto sirve para que el juego sea mas facil a la hora de poder
        //pinchar al 3º.
    }

});

//Una vez seleccionemos los dos elementos iguales desaparecen. 6 amrzo incluimos var eliminar = function
var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.add("eliminado");
    });
}

// Función para resetear los seleccionados después de 2 intentos .

var resetSel = function () {
    contador = 0;
    primerSel = "";
    segundoSel = "";  

    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });
}

//Función para contar los eliminados y cuando lleguen a 24 ejecutar la lógica de partida ganada.

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length + 2;
    // console.log(eliminados); emilinar el var de eliminados, emilinar el 24 y poner un 4
    if (eliminados === 24) {
        console.log("ejecuto Winner");
        winner.classList.add("open");
        win.currentTime = 0;
        win.play();
        segundos = 45;
        song.pause();
        song.currentTime = 0;
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display = "none";
        setTimeout(function(){
            while(rejilla.firstChild){
                rejilla.removeChild(rejilla.firstChild);
            }
        },1000);
    
    }
}

