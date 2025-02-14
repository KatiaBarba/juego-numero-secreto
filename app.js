// puente entre js y html con 'document object model' (DOM)

let numeroMaximo = 10;
let listaNumerosSorteados = [];
let numeroSecreto = 0;
let intentos = 0;
//console.log(numeroSecreto); // Para verificar que la funcion trabaje correctamente

condicionesIniciales();

//-----------FUNCIONES-----------------------------------------------

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); //h1 es el titulo 
    elementoHTML.innerHTML = texto;
    return;
} 

function verificarIntento() 
{
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto)
        // El usuario acierta
    {   
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else // El usuario no acierta
    { 
        if (numeroDeUsuario > numeroSecreto)
        {
            asignarTextoElemento('p', 'El numero es menor');
        } 
        else 
        {
        asignarTextoElemento('p', 'El numero es mayor');
        }
    }
    intentos++;
    limpiarCaja();
}

function generarNumeroSecreto() 
{
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; //floor para retornar solo numeros enteros;
    // si ya sorteamos todos los numeros posibles
    if(listaNumerosSorteados.length == numeroMaximo)
    {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    }
    else
    {
        // si el numero generado esta en la lista:
        if(listaNumerosSorteados.includes(numeroGenerado) )
            {
                return generarNumeroSecreto(); // Recursividad, la funcion se llama a si misma
            }
            else // Si el numero generado, no esta en la lista:
            {   
                listaNumerosSorteados.push(numeroGenerado);
                console.log(numeroGenerado);
                console.log(listaNumerosSorteados);
                return numeroGenerado;
            }
    }
} 

// Funcion para eliminar el numero despues de cada intento
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function condicionesIniciales(){
    asignarTextoElemento("h1", "Juego del numero secreto!");
    asignarTextoElemento("p", `Adivina el numero entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    // limpiar la caja
    limpiarCaja();
    // Indicar mensaje de intervalo de numeros
    // Generar el numero aleatorio
    // Inicializar el numero de intentos 
    condicionesIniciales();
    // Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true'); //setAttribute espera dos parametros
    
}