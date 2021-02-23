import dayjs from 'dayjs';

const stayAtHome = (symptoms, dateOfSymptoms) => {
  let numOfDays = 0;
  let returnDate;
  if (symptoms.includes('contact')) {
    numOfDays = 9;
  } else if (symptoms.includes('fever')) {
    numOfDays = 6;
  } else {
    numOfDays = 4;
  }
  returnDate = dayjs(dateOfSymptoms).add(numOfDays, 'day');
  if (dayjs(returnDate).day() === 6 || dayjs(returnDate).day() === 1) {
    returnDate = dayjs(returnDate).day(1);
  }
  return dayjs(returnDate).format('YYYY-MM-DD');
}

export default stayAtHome;
