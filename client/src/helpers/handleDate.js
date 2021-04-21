export function handleDate(date) {


  const newDate = new Date(date);
  let newDay = newDate.getDate();
  let newMonth = newDate.getMonth() + 1;
  if (parseInt(newDay) < 10) newDay = `0${newDay}`;
  if (parseInt(newMonth)+1 < 10) newMonth = `0${newMonth}`;


  const finalDate = `${newDay}.${newMonth}.${newDate.getFullYear()}`
  console.log(finalDate)
  return finalDate;
}