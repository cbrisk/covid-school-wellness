import dayjs from 'dayjs';

const stayAtHome = (symptoms, dateOfSymptoms) => {
  let numOfDays = 0;
  let returnDate;
  if (symptoms.includes('contact')) {
    numOfDays = 10;
  } else if (symptoms.includes('fever')) {
    numOfDays = 7;
  } else {
    numOfDays = 5;
  }
  returnDate = dayjs(dateOfSymptoms).add(numOfDays, 'day');
  if (dayjs(returnDate).day() === 6 || dayjs(returnDate).day() === 1) {
    returnDate = dayjs(returnDate).day(1);
  }
  return dayjs(returnDate).format('YYYY-MM-DD');
}

export default stayAtHome;
