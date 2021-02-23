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
  returnDate = dayjs().add(numOfDays, 'day');
  if (dayjs(returnDate).day() === 6) {
    returnDate = dayjs(returnDate).add(2, 'day');
  } else if (dayjs(returnDate).day() === 0) {
    returnDate = dayjs(returnDate).add(1, 'day');
  }
  return dayjs(returnDate).format('YYYY-MM-DD');
}

export default stayAtHome;
