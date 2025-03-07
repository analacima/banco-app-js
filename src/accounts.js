// Data
export class Movimiento {
  constructor(importe, fecha) {
      this.importe = importe;
      this.fecha = fecha;
  }
}

const account1 = {
  owner: "Juan Sánchez",
  movements: [
      new Movimiento(200, new Date('2025-03-01')),
      new Movimiento(450, new Date('2025-03-02')),
      new Movimiento(-400, new Date('2025-03-03')),
      new Movimiento(3000, new Date('2025-03-04')),
      new Movimiento(-650, new Date('2025-03-05')),
      new Movimiento(-130, new Date('2025-03-06')),
      new Movimiento(70, new Date('2025-03-07')),
      new Movimiento(1300, new Date('2025-03-08'))
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "María Portazgo",
  movements: [
      new Movimiento(5000, new Date('2025-03-01')),
      new Movimiento(3400, new Date('2025-03-02')),
      new Movimiento(-150, new Date('2025-03-03')),
      new Movimiento(-790, new Date('2025-03-04')),
      new Movimiento(-3210, new Date('2025-03-05')),
      new Movimiento(-1000, new Date('2025-03-06')),
      new Movimiento(8500, new Date('2025-03-07')),
      new Movimiento(-30, new Date('2025-03-08'))
  ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Estefanía Pueyo",
  movements: [
      new Movimiento(200, new Date('2025-03-01')),
      new Movimiento(-200, new Date('2025-03-02')),
      new Movimiento(340, new Date('2025-03-03')),
      new Movimiento(-300, new Date('2025-03-04')),
      new Movimiento(-20, new Date('2025-03-05')),
      new Movimiento(50, new Date('2025-03-06')),
      new Movimiento(400, new Date('2025-03-07')),
      new Movimiento(-460, new Date('2025-03-08'))
  ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Javier Rodríguez",
  movements: [
      new Movimiento(430, new Date('2025-03-01')),
      new Movimiento(1000, new Date('2025-03-02')),
      new Movimiento(700, new Date('2025-03-03')),
      new Movimiento(50, new Date('2025-03-04')),
      new Movimiento(90, new Date('2025-03-05'))
  ],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

export default accounts;
