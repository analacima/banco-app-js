import { faker } from '@faker-js/faker';
// Data

export class Movimiento {
  constructor(importe, fecha) {
      this.importe = importe;
      this.fecha = fecha;
  }
}

const generateRandomUserData = () => {
  const owner = faker.person.fullName();                                    // Generar un nombre aleatorio
  const pin = faker.number.int({min: 1000, max: 9999});                     // Generar un PIN aleatorio de 4 dígitos

  // Generar movimientos aleatorios
  const movements = [];
  for (let i = 0; i < 8; i++) {
    const importe = faker.number.int({min: -200, max: 1000, multipleOf: 10}); // Generar un importe aleatorio
    const fecha = faker.date.past();                                          // Generar una fecha aleatoria en el pasado
    movements.push(new Movimiento(importe, fecha));                           // Crear un nuevo objeto Movimiento
  }

  // Devolver un objeto con los datos generados
  return {
    owner,
    movements,
    interestRate: faker.number.float({ min: 0.5, max: 5.0, fractionDigits: 2 }), // Generar una tasa de interés aleatoria
    pin,
  };
};

const accounts = Array.from({ length: 4 }, () => generateRandomUserData());

export default accounts;
