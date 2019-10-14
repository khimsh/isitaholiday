const holidayStatus = document.getElementById('holidayStatus');

const currentYear = new Date().getFullYear();
const api_key = '95ff1549485f8e4c6ffa1d486d4ab7438dfb3688';
const url = `https://calendarific.com/api/v2/holidays?&api_key=${api_key}&country=ge&year=${currentYear}`;

async function getHolidays(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

getHolidays(url)
  .then(data => {
    // console.log(data);
    return data.response.holidays;
  })
  .then(holidays => {
    let result = holidays.find(holiday => holiday.date.iso === getIsoDate());
    if (result) {
      result.type.includes('National holiday');
      holidayStatus.innerText = 'Yesss';
    } else {
      holidayStatus.innerText = 'No :(';
    }
  })
  .catch(err => {
    console.log(err);
  });

const getIsoDate = () => {
  const date = new Date();
  const date_iso = date.toISOString().slice(0, 10);
  return date_iso;
};
