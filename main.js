"use strict";

const account1 = {
  owner: "Sabreen Ahmed",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDate: [ 
    '2019-06-29T21:31:17.178Z',
    '2020-12-01T21:11:17.178Z',
    '2021-10-02T21:06:19.178Z',
    '2021-05-30T21:09:14.178Z',
    '2022-11-08T21:30:15.178Z',
    '2023-07-30T21:28:11.178Z',
    '2018-11-08T21:30:15.178Z',
    '2020-09-18T21:28:11.178Z',
  ],
  currency :'USD',
  local: 'en-US' 
};
const account2 = {
  owner: "sarah Emad",
  movements: [5000, 3400, -150, -790, -3120, -1000, 8500, 30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [ 
    '2019-06-29T21:31:17.178Z',
    '2020-12-01T21:11:17.178Z',
    '2021-10-02T21:06:19.178Z',
    '2021-05-30T21:09:14.178Z',
    '2022-11-08T21:30:15.178Z',
    '2023-07-28T21:28:11.178Z',
    '2018-11-08T21:30:15.178Z',
    '2020-09-18T21:28:11.178Z',
  ],
  currency : 'JPY',
  local:  'ja-JP'
};
const account3 = {
  owner: "salmaa Mostafa",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [ 
    '2019-06-29T21:31:17.178Z',
    '2020-12-01T21:11:17.178Z',
    '2021-10-02T21:06:19.178Z',
    '2021-05-30T21:09:14.178Z',
    '2022-11-08T21:30:15.178Z',
    '2023-07-28T21:28:11.178Z',
    '2018-11-08T21:30:15.178Z',
    '2020-09-18T21:28:11.178Z',
  ],
  currency :'USD',
  local: 'en-US' 
};
const account4 = {
  owner: "Rana Sami",
  movements: [430, 1000, 700, -300, -50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate: [ 
    '2019-06-29T21:31:17.178Z',
    '2020-12-01T21:11:17.178Z',
    '2021-10-02T21:06:19.178Z',
    '2023-07-28T21:09:14.178Z',
    '2023-05-29T21:30:15.178Z',
    '2022-07-30T21:28:11.178Z',
  ],
  currency :'EUR',
  local: 'de-DE'
};
const accounts = [account1, account2, account3, account4];


const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumin = document.querySelector(".summary__value--in");
const labelSumout = document.querySelector(".summary__value--out");
const labelSuminterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const formBtntransfer = document.querySelector(".form__btn--transfer");
const formBtnloan = document.querySelector(".form__btn--loan");
const formBtnclose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginuser = document.querySelector(".input-user");
const inputLoginpin = document.querySelector(".input-pin");
const inputTransferto = document.querySelector(".form__input--to");
const inputTransferamount = document.querySelector(".form__input--amount");
const inputLoenamount = document.querySelector(".form__input--loan-amount");
const inputCloseuser = document.querySelector(".form__input--user");
const inputClosepin = document.querySelector(".form__input--pin");

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsername(accounts);

const update = function (ac) {
  displayMovements(ac);
  calcDisplaybalance(ac);
  calcDisplaysummary(ac);
}

const displayMovementsDate = function(date, local){
    const calcDays = (date1, date2) => Math.round((Math.abs(date1 - date2)) / (1000 * 60 * 60 * 24)) ;
    const daysPassed = calcDays(new Date(), date);
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} Days Ago`; 
    else {
      // const day = `${date.getDate()}`.padStart(2, 0);
      // const month = `${date.getMonth() + 1}`.padStart(2, 0);
      // const year = date.getFullYear();
      // return `${day}/${month}/${year}`;
      return new Intl.DateTimeFormat(local).format(date);
    }
};

const formatNumber = function (v, local, currency) {
  return new Intl.NumberFormat(local, {style:'currency', currency:currency,}).format(v);
}

const displayMovements = function (ac, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? ac.movements.sort((a, b) => a - b) : ac.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(ac.movementsDate[i]);
    const displayDate = displayMovementsDate(date, ac.local);
    const formatNum = formatNumber(mov, ac.local, ac.currency);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatNum}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplaybalance = function (pa) {
  pa.balance = pa.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent =  formatNumber(pa.balance, pa.local, pa.currency);
};

const calcDisplaysummary = function (p) {
  const income = p.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumin.textContent = formatNumber(income, p.local, p.currency);
  const outcome = p.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumout.textContent = formatNumber(outcome, p.local, p.currency); //`${Math.abs(outcome).toFixed(2)}€`;
  const interest = p.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * p.interestRate) / 100)
    .filter((mov) => {
      return mov > 1;
    })
    .reduce((acc, int) => acc + int);
  labelSuminterest.textContent = formatNumber(interest, p.local, p.currency);//`${interest.toFixed(2)}€`;
};

const startLogoutTimer = function(){
  const tick = function(){
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if(time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started ';
      containerApp.style.opacity = 0;
    };
    time--;
  };
  let time = 420;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};


let currentAccount, timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginuser.value
  );
  if (currentAccount?.pin === Number(inputLoginpin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
  }
  containerApp.style.opacity = 100;
  // const now = new Date();
  // const day = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = `${now.getHours()}`.padStart(2, 0);
  // const min = `${now.getMinutes()}`.padStart(2, 0);
  // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
  const now = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.local , option).format(now);
  inputLoginuser.value = inputLoginpin.value = '';
  if(timer) clearInterval(timer);
  timer = startLogoutTimer();
  update(currentAccount);
});

formBtntransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferamount.value);
  const transferTo = accounts.find(
    (acc) => acc.username === inputTransferto.value
  );
  inputTransferamount.value = inputTransferto.value = '';
  if (amount > 0 && amount <= currentAccount.balance && transferTo?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);
    currentAccount.movementsDate.push(new Date().toISOString());
    transferTo.movementsDate.push(new Date().toISOString());
    update(currentAccount);
  }
});

formBtnclose.addEventListener('click', function (e){
  e.preventDefault();
  if (inputCloseuser.value === currentAccount.username && Number(inputClosepin.value) === currentAccount.pin) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    )
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  };
  inputCloseuser.value = inputClosepin.value = "";
});

formBtnloan.addEventListener('click', function(e){
  e.preventDefault();
  const amountLoan = Math.floor(inputLoenamount.value);
  if (amountLoan > 0 && currentAccount.movements.some(() => amountLoan * 0.1)){
    currentAccount.movements.push(amountLoan);
    currentAccount.movementsDate.push(new Date().toISOString());
    update(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
