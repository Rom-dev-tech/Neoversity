// const isFixedTimerOn = window.fixedTimer === true; // ("true" or "false" boolean value)
// const fixedTimerTypeHour = window.fixedTimerType === "hour"; // ("hour" or "minute" string value)
// const fixedTimerValue = window.fixedTimerValue; // ("7" number value)
// let timeInterval = null;

// const refs = {
//   daysVal: document.querySelectorAll("[data-day]"),
//   hoursVal: document.querySelectorAll("[data-hour]"),
//   minutesVal: document.querySelectorAll("[data-min]"),
//   secondsVal: document.querySelectorAll("[data-sec]"),
//   msVal: document.querySelectorAll("[data-ms]"),
//   timerVal: document.querySelector("[data-timer]").dataset.timer,
//   timerItems: document.querySelectorAll("[data-timer]"),
// };

// const removeTimerNodes = function (nodeOne, nodeTwo) {
//   refs.timerItems.forEach((item) => {
//     const timerItem = item.querySelectorAll("li");
//     timerItem[nodeOne].remove();
//     timerItem[nodeTwo].remove();
//   });
// };

// const setNumberValue = function (items, value, endDate) {
//   items.forEach(function (item) {
//     if (endDate <= 0) {
//       if (isFixedTimerOn) {
//         localStorage.setItem("localStorageTimerValue", 0);
//       }
//       timeInterval && clearInterval(timeInterval);
//       return (item.textContent = "00");
//     } else if (value <= 9) {
//       return (item.textContent = "0" + value);
//     } else {
//       return (item.textContent = value);
//     }
//   });
// };

// // TIMER LOGIC
// if (isFixedTimerOn) {
//   setlocalStorageLifeTime();
//   fixedTimerHandler();

//   function fixedTimerHandler() {
//     localStorage.setItem(
//       "localStorageFixedTimerValue",
//       JSON.stringify(fixedTimerValue),
//     );

//     if (fixedTimerTypeHour) {
//       removeTimerNodes(8, 7);
//     } else {
//       removeTimerNodes(0, 1);
//     }

//     const localStorageTimerValue = localStorage.getItem(
//       "localStorageTimerValue",
//     );
//     const timerValue = fixedTimerTypeHour
//       ? fixedTimerValue * 60 * 60 * 1000
//       : fixedTimerValue * 60 * 1000;
//     const timer = localStorageTimerValue
//       ? JSON.parse(localStorageTimerValue)
//       : timerValue;
//     const endTime = new Date(Date.parse(new Date()) + timer);

//     const timeCount = () => {
//       let nowDate = new Date();
//       let endDate = endTime - nowDate;

//       window.onbeforeunload = () =>
//         localStorage.setItem("localStorageTimerValue", JSON.stringify(endDate));

//       let days = Math.floor(endDate / 1000 / 60 / 60 / 24);
//       let hours = Math.floor(endDate / 1000 / 60 / 60) % 24;
//       let minutes = Math.floor(endDate / 1000 / 60) % 60;
//       let seconds = Math.floor(endDate / 1000) % 60;
//       let milliseconds = Math.floor(endDate / 10) % 100;

//       fixedTimerTypeHour && setNumberValue(refs.daysVal, days, endDate);
//       setNumberValue(refs.hoursVal, hours, endDate);
//       setNumberValue(refs.minutesVal, minutes, endDate);
//       setNumberValue(refs.secondsVal, seconds, endDate);
//       !fixedTimerTypeHour && setNumberValue(refs.msVal, milliseconds, endDate);
//     };

//     timeInterval = setInterval(timeCount, 10);
//     timeCount();
//   }

//   function setlocalStorageLifeTime() {
//     const localStorageFixedTimerValue = localStorage.getItem(
//       "localStorageFixedTimerValue",
//     );
//     const localStorageNowDate = localStorage.getItem("localStorageNowDate");
//     const localStorageLifeTime = fixedTimerTypeHour
//       ? 3 * 24 * 3600 * 1000
//       : 1 * 24 * 3600 * 1000;

//     if (+localStorageFixedTimerValue !== +fixedTimerValue) {
//       localStorage.removeItem("localStorageNowDate");
//       localStorage.removeItem("localStorageTimerValue");
//     }

//     if (!localStorageNowDate) {
//       localStorage.setItem("localStorageNowDate", +new Date());
//     }

//     if (+new Date() - localStorageNowDate > localStorageLifeTime) {
//       localStorage.removeItem("localStorageTimerValue");
//       localStorage.setItem("localStorageNowDate", +new Date());
//     }
//   }
// } else {
//   dateTimerHandler();

//   function dateTimerHandler() {
//     removeTimerNodes(8, 7);

//     const timeCount = () => {
//       const startDate = Date.parse(String(refs.timerVal));
//       let nowDate = new Date();
//       let endDate = startDate - nowDate;

//       let days = Math.floor(endDate / 1000 / 60 / 60 / 24);
//       let hours = Math.floor(endDate / 1000 / 60 / 60) % 24;
//       let minutes = Math.floor(endDate / 1000 / 60) % 60;
//       let seconds = Math.floor(endDate / 1000) % 60;

//       setNumberValue(refs.daysVal, days, endDate);
//       setNumberValue(refs.hoursVal, hours, endDate);
//       setNumberValue(refs.minutesVal, minutes, endDate);
//       setNumberValue(refs.secondsVal, seconds, endDate);
//     };

//     timeInterval = setInterval(timeCount, 10);
//     timeCount();
//   }
// }
