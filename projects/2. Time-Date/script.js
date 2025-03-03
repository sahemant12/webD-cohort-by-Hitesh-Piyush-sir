function updateClock(){
    //time
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    const time = new Date;
    const hours = time.getHours() % 12 || 12;
    
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const Ampm = time.getHours() >= 12  ? "PM":"AM"
    
    timeElement.textContent = `${hours}:${minutes}:${seconds} ${Ampm}`;

    // const date = time.toDateString(); //this is local time. we have to write the UTC for universal time zone.
    // console.log(time.toUTCString()); //this is UTC time

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    const date = time.toLocaleDateString(undefined, options); //undefined varies according to local time zone.
    dateElement.textContent = date;
}
updateClock();
setInterval(updateClock, 1000);


//extra: Imp Lec: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// const utcTime = new Date(Date.UTC());
// const options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

// console.log(utcTime.toLocaleDateString("de-DE", options)); //"de-DE" is timeZone
// // Expected output (varies according to local timezone): Donnerstag, 20. Dezember 2012

// console.log(utcTime.toLocaleDateString("ar-EG", options));
// // Expected output (varies according to local timezone): الخميس، ٢٠ ديسمبر، ٢٠١٢

// console.log(utcTime.toLocaleDateString(undefined, options));
// // Expected output (varies according to local timezone and default locale): Thursday, December 20, 2012