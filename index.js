class Tarjeta{
  constructor(nombre, costo){
    this.nombre = nombre;
    this.costo = costo;
  }
}

class Unidad extends Tarjeta{
  constructor({nombre,costo,poder,resiliencia}){
    super(nombre,costo);
    this.poder=poder;
    this.resiliencia=resiliencia;
  }

  atacar(objetivo){
    objetivo.resiliencia = objetivo.resiliencia - this.poder;
    if (objetivo.resiliencia <= 0) {
      console.log("TU OBJETIVO HA SIDO DESTRUIDO")
    }
  }

  usarEfecto(efecto, objetivo){
    efecto.aplicarEfecto(objetivo);
  }
}

class Efecto extends Tarjeta{
  constructor({nombre,costo,texto,stat,magnitud}){
    super(nombre,costo);
    this.texto=texto;
    this.stat=stat;
    this.magnitud=magnitud;
  }

  aplicarEfecto(sujeto){
    let sujetoAtributo;
    const stat = this.stat;
    switch (stat) {
      case 'poder':
        sujetoAtributo = sujeto.poder
        break;
      case 'resiliencia':
        sujetoAtributo = sujeto.resiliencia
        break;
    }
    sujetoAtributo= sujetoAtributo + this.magnitud;
    
    switch (stat) {
      case 'poder':
        sujeto.poder = sujetoAtributo
        break;
      case 'resiliencia':
        sujeto.resiliencia = sujetoAtributo;
        break;
    }
  }
}

const ninjaCinturonRojo = new Unidad({ 
  nombre:"Ninja Cinturon Rojo",
  costo:3,
  poder:4,
  resiliencia:4
});

const ninjaCinturonNegro = new Unidad({ 
  nombre:"Ninja Cinturon Negro",
  costo:4,
  poder:5,
  resiliencia:4
});

const algoritmoDificil = new Efecto({
  nombre:"Algoritmo Dificil",
  costo:2,
  texto:"Aumentar la resistencia del objetivo en 3",
  stat:"resiliencia",
  magnitud:+3,
})

const rechazoDePromesaNoManejado = new Efecto({
  nombre:"Rechazo de promesa no manejado",
  costo:1,
  texto:"Reducir la resistencia del objetivo en 2",
  stat:"resiliencia",
  magnitud:-2,
})

const programacionEnPareja = new Efecto({
  nombre:"Programación en pareja",
  costo:3,
  texto:"Aumentar el poder del objetivo en 2",
  stat:"poder",
  magnitud:+2,
})

// INICIO DEL JUEGO

// Turno 1
console.log(ninjaCinturonRojo);
ninjaCinturonRojo.usarEfecto(algoritmoDificil, ninjaCinturonRojo);
console.log(ninjaCinturonRojo);

// Turno 2

console.log(ninjaCinturonNegro);
ninjaCinturonNegro.usarEfecto(rechazoDePromesaNoManejado, ninjaCinturonRojo)
console.log(ninjaCinturonRojo);

// Turno 3

console.log(ninjaCinturonRojo);
ninjaCinturonRojo.usarEfecto(programacionEnPareja, ninjaCinturonRojo)
console.log(ninjaCinturonRojo);

ninjaCinturonRojo.atacar(ninjaCinturonNegro);
// NINJA CINTURON NEGRO HA SIDO DESTRUIDO