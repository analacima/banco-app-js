import "./style.css"; 
import accounts, { Movimiento } from "./accounts.js"; // cambio al usar datos de Faker
import moment from "moment";
import "moment/locale/es";

moment.locale("es", {
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años",
  },
});


document.querySelector("#app").innerHTML = `
    <nav>
      <p class="welcome">Log in to get started</p>
      <img src="logo.png" alt="Logo" class="logo" />
      <form class="login">
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
        />
        <!-- In practice, use type="password" -->
        <input
          type="password"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>

    <main class="app">
      <!-- BALANCE -->
      <div class="balance">
        <div>
          <p class="balance__label">Current balance</p>
          <p class="balance__date">
            As of <span class="date">05/03/2037</span>
          </p>
        </div>
        <p class="balance__value">0000€</p>
      </div>

      <!-- MOVEMENTS -->
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000€</div>
        </div>
        <div class="movements__row">
          <div class="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">-378€</div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="summary">
        <p class="summary__label">In</p>
        <p class="summary__value summary__value--in">0000€</p>
        <p class="summary__label">Out</p>
        <p class="summary__value summary__value--out">0000€</p>
        <p class="summary__label">Interest</p>
        <p class="summary__value summary__value--interest">0000€</p>
        <button class="btn--sort">&downarrow; SORT</button>
      </div>

      <!-- OPERATION: TRANSFERS -->
      <div class="operation operation--transfer">
        <h2>Transfer money</h2>
        <form class="form form--transfer">
          <input type="text" class="form__input form__input--to" />
          <input type="number" class="form__input form__input--amount" />
          <button class="form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div>

      <!-- OPERATION: LOAN -->
      <div class="operation operation--loan">
        <h2>Request loan</h2>
        <form class="form form--loan">
          <input type="number" class="form__input form__input--loan-amount" />
          <button class="form__btn form__btn--loan">&rarr;</button>
          <label class="form__label form__label--loan">Amount</label>
        </form>
      </div>

      <!-- OPERATION: CLOSE -->
      <div class="operation operation--close">
        <h2>Close account</h2>
        <form class="form form--close">
          <input type="text" class="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
          />
          <button class="form__btn form__btn--close">&rarr;</button>
          <label class="form__label">Confirm user</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div>

      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
    </main>
`;

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");




// hacer una función que modifique los arrays para añadir un campo con las iniciales de los clientes


const createUserName = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase() // convierte a minúsculas
      .split(" ") // convierte en un array
      .map((name) => name[0]) // extrae las iniciales
      .join(""); // une las iniciales
  });
};


createUserName(accounts);
console.log(accounts);

let account; // variable para almacenar la cuenta del usuario que ha iniciado sesión

btnLogin.addEventListener("click", function (e) {
  // ?? evitar que el formulario se envíe
  e.preventDefault(); // evita que se ejecute el comportamiento por defecto del evento (que sería enviar el formulario)
  // autenticar: recojo username y pin, los comparo con los datos de las cuentas (arrays accounts)
  const inputUsername = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);

  // comprobamos que coincidan usuario y pin con los datos de alguna de las cuentas
  account = accounts.find(
    (cuenta) => cuenta.username === inputUsername && cuenta.pin === inputPin
  );

  // si los datos introducidos son correctos, muestro un mensaje de bienvenida y la aplicación
  if (account) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome, ${account.owner.split(" ")[0]}.`; //
    // limpiar el formulario
    inputLoginUsername.value = inputLoginPin.value = "";
    // muestro los datos de la cuenta
    updateUI(account);
  } else 
    alert("Los datos introducidos son incorrectos."); 
  inputLoginUsername.value = inputLoginPin.value = "";

});
/* sin objetos
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  // comprobar los datos introducidos
  // buscamos la cuenta de destino
  const recipientAccount = accounts.find(
    (cuenta) => cuenta.username === inputTransferTo.value
  );
  console.log(recipientAccount);
  // por un lado, que la cuenta exista // plus-> y que no sea la misma que la del usuario
  if (recipientAccount){
    if (recipientAccount.username !== account.username){
      // por otro, que la cantidad sea positiva y dentro del saldo
      const amount = Number(inputTransferAmount.value);
      if (amount > 0 && amount <= calcBalance(account.movements)){
        // confirmar que se quiere realizar la transferencia antes de hacerla 
        const confirmTransfer = confirm("¿Estas seguro de realizar la transferencia?");
        if (confirmTransfer){
        // añadir el movimiento al array de movimientos del cliente destino 
        // incluir uno en negativo en el array de movimientos del cliente origen       
        // y mostrar mensaje de confirmación   
          recipientAccount.movements.push(amount);
          account.movements.push(-amount);
          alert("Se ha realizado la transferencia correctamente de " + amount + "€ a la cuenta de " + recipientAccount.owner);
          updateUI(account);
        }
      } else {
        alert("La cantidad debe ser positiva y no puede ser superior al saldo");
      }
    }
    else {
      alert("No puedes transferir dinero a tu propia cuenta");
    }
  } else {
    alert("La cuenta de destino no existe");
  }
  // limpiar los campos de transferencia
  inputTransferTo.value = inputTransferAmount.value = "";
});
*/

// con objetos
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  // comprobar los datos introducidos
  // buscamos la cuenta de destino
  const recipientAccount = accounts.find(
    (cuenta) => cuenta.username === inputTransferTo.value
  );

  // por un lado, que la cuenta exista y que no sea la misma que la del usuario
  if (recipientAccount) {
    if (recipientAccount.username !== account.username) {
      // por otro, que la cantidad sea positiva y dentro del saldo
      const amount = Number(inputTransferAmount.value);
      if (amount > 0 && amount <= calcBalance(account.movements)) {
        // confirmar que se quiere realizar la transferencia antes de hacerla 
        const confirmTransfer = confirm("¿Estás seguro de realizar la transferencia?");
        if (confirmTransfer) {
          // añadir el movimiento al array de movimientos del cliente destino 
          const fecha = new Date(); // Obtener la fecha actual
          recipientAccount.movements.push(new Movimiento(amount, fecha)); // Agregar objeto Movimiento
          account.movements.push(new Movimiento(-amount, fecha)); // Agregar objeto Movimiento negativo
          
          alert("Se ha realizado la transferencia correctamente de " + amount + "€ a la cuenta de " + recipientAccount.owner);
          updateUI(account);
        }
      } else {
        alert("La cantidad debe ser positiva y no puede ser superior al saldo");
      }
    } else {
      alert("No puedes transferir dinero a tu propia cuenta");
    }
  } else {
    alert("La cuenta de destino no existe");
  }
  // limpiar los campos de transferencia
  inputTransferTo.value = inputTransferAmount.value = "";
});

/* sin objetos 
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // obtener el importe del préstamo
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && amount < (calcBalance(account.movements)*2) ){
    // añadir el importe al array de movimientos
    account.movements.push(amount);
    // mensaje de confirmación
    alert("Se ha realizado el préstamo correctamente");
    // actualizar la interfaz
    updateUI(account);
  } else {
      alert("El importe del préstamo debe ser superior a 0 y no puede ser superior al doble del balance");
  }
  inputLoanAmount.value = "";
});
*/

// con objetos
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // obtener el importe del préstamo
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && amount < (calcBalance(account.movements) * 2)) {
    // Aquí es donde debes crear un objeto Movimiento
    const fecha = new Date(); // Puedes usar la fecha actual
    account.movements.push(new Movimiento(amount, fecha)); // Cambia esto
    // mensaje de confirmación
    alert("Se ha realizado el préstamo correctamente");
    // actualizar la interfaz
    updateUI(account);
  } else {
    alert("El importe del préstamo debe ser superior a 0 y no puede ser superior al doble del balance");
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

    // comprobar que el usuario y el pin son correctos
  if (inputCloseUsername.value===account.username && Number(inputClosePin.value)===account.pin){
    // Añadir confirmación antes de eliminar la cuenta
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    
    if (confirmDelete) {
      // eliminar la cuenta
      const index = accounts.findIndex(cuenta => cuenta.username === inputCloseUsername.value);
      accounts.splice(index, 1);
      // ocultar la app
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
  } else {
    alert("El usuario o el pin son incorrectos");
  }
  inputCloseUsername.value = inputClosePin.value = "";
});


const updateUI = function ({ movements }) {
  displayMovements(movements);
  displayBalance(movements);
  displaySummary(movements);
};

const displayBalance = function (movimientos) {
  // sumamos todos los movimientos y mostramos el total
  /*
  const total = movimientos.reduce(
    (acumulador, movimientos) => acumulador + movimientos,
    0
  );
  */
  const total = calcBalance(movimientos);
  labelBalance.textContent = `${total.toFixed(2)}€`;
};

/* sin objeto
const calcBalance = function (movimientos) {
  const balance = movimientos.reduce(
    (acumulador, movimientos) => acumulador + movimientos,
    0
  );
  return balance;
};
*/

// con objeto
function calcBalance(movimientos) {
  return movimientos.reduce((total, movimiento) => total + movimiento.importe, 0);
}

/* sin objetos
const displaySummary = function (movimientos) {
  // sumar ingresos y mostarlos
  const sumIn = movimientos
    .filter((mov) => mov > 0)
    .reduce((acumulador, mov) => acumulador + mov, 0);
  labelSumIn.textContent = `${sumIn.toFixed(2)}€`;

  // sumar gastos y mostrarlos
  const sumOut = movimientos
    .filter((mov) => mov < 0)
    .reduce((acumulador, mov) => acumulador + mov, 0);
  labelSumOut.textContent = `${sumOut.toFixed(2)}€`;
};
*/

// con objetos
const displaySummary = function (movimientos) {
  // Sumar ingresos y mostrarlos
  const sumIn = movimientos
    .filter((mov) => mov.importe > 0) // Cambiar a mov.importe
    .reduce((acumulador, mov) => acumulador + mov.importe, 0); // Cambiar a mov.importe
  labelSumIn.textContent = `${sumIn.toFixed(2)}€`;

  // Sumar gastos y mostrarlos
  const sumOut = movimientos
    .filter((mov) => mov.importe < 0) // Cambiar a mov.importe
    .reduce((acumulador, mov) => acumulador + mov.importe, 0); // Cambiar a mov.importe
  labelSumOut.textContent = `${Math.abs(sumOut).toFixed(2)}€`; // Mostrar como positivo
};


/*
const displayMovements = function (movements) {
  containerMovements.innerHTML = ""; //limpiamos el contenedor de movimientos, que estaban en el html inicial
// recorremos el array de movimientos y por cada uno de ellos, creamos un html que insertamos en el contenedor de movimientos
  movements.forEach(function (mov, index) {
    //  a la función le pasamos cada vez el movimiento y la posición en el array
    //movements.forEach( (mov, index)=> { - sería lo mismo, quitando la palabra function
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <!-- cada movimiento va en un div con la clase "movements__row" -->
    <div class="movements__row">
      <!-- según el tipo de movimiento, se le asigna una clase y le indicamos el número de movimiento comenzando por 1 -->
      <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `;
    // insertamos el html en el contenedor de movimientos
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
*/
/* sin fecha
// con objetos
const displayMovements = function (movements) {
  containerMovements.innerHTML = ""; // Limpiamos el contenedor de movimientos
  movements.forEach(function (mov, index) {
    if (mov && typeof mov.importe !== 'undefined') { // Verificar que mov y mov.importe están definidos
      const type = mov.importe > 0 ? "deposit" : "withdrawal";
      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov.importe.toFixed(2)}€</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML("afterbegin", html);
    } else {
      console.error("Movimiento no válido:", mov); // Log para depuración
    }
  });
};
*/
const displayMovements = function (movements) {
  containerMovements.innerHTML = ""; // Limpiamos el contenedor de movimientos
  movements.forEach(function (mov, index) {
    if (mov && typeof mov.importe !== 'undefined') { // Verificar que mov y mov.importe están definidos
      const type = mov.importe > 0 ? "deposit" : "withdrawal";
      const fechaRelativa = moment(mov.fecha).fromNow(); // Calcular la fecha relativa
      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">${fechaRelativa}</div>
        <div class="movements__value">${mov.importe.toFixed(2)}€</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML("afterbegin", html);
    } else {
      console.error("Movimiento no válido:", mov); // Log para depuración
    }
  });
};