import "./style.css";
import accounts from "./accounts.js";

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
  
  // antes tenía una variable account, ahora la tengo pública
  // const account = accounts.find(
    
  
  account = accounts.find(
    (cuenta) => cuenta.username === inputUsername && cuenta.pin === inputPin
  );

  // si los datos introducidos son correctos, muestro un mensaje de bienvenida y la aplicación
  if (account) {
  
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome, ${account.owner.split(" ")[0]}.`; //
    
    //limpiar el formulario
    //inputLoginUsername.value=""
    //inputLoginPin.value=""
    inputLoginUsername.value = inputLoginPin.value = "";

    updateUI(account);
  } else alert("Los datos introducidos son incorrectos."); 
  inputLoginUsername.value = inputLoginPin.value = "";


  //  cargo los datos de la cuenta correspondiente
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  // calcular el balance
  const balance = account.movements.reduce(
    (acumulador, movimientos) => acumulador + movimientos,
    0
  );

  // obtener el importe del préstamo
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && amount < (balance*2) ){
    // añadir el importe al array de movimientos
    account.movements.push(amount);
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
  // en lugar de account, desestructuramos el objeto para obtener solo los movimientos
  //const updateUI = function(account){
  // mostrar los movimientos de la cuenta
  displayMovements(movements);
  // mostrar el balance de la cuenta
  DisplayBalance(movements);
  // mostrar el total de los movimientos de la cuenta
  // ingresos y gastos
  DisplaySummary(movements);
};

const DisplayBalance = function (movimientos) {
  const total = movimientos.reduce(
    (acumulador, movimientos) => acumulador + movimientos,
    0
  );
  labelBalance.textContent = `${total.toFixed(2)}€`;
};

const DisplaySummary = function (movimientos) {
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
