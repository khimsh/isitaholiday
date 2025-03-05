// Required DOM Elements
const holidayStatus = document.getElementById('holidayStatus');
const selectCountry = document.getElementById('selectCountry');
const selectedCountry = document.getElementById('selectedCountry');

// Program variables
const currentYear = new Date().getFullYear();
const api_key = '95ff1549485f8e4c6ffa1d486d4ab7438dfb3688';
let url = `https://calendarific.com/api/v2/holidays?&api_key=${api_key}&country=ge&year=${currentYear}`;

async function getHolidays(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const getIsoDate = () => {
  return new Date().toISOString().slice(0, 10);
};

// Make the call to display initial results for Georgia
getHolidays(url)
  .then(data => {
    return data.response.holidays;
  })
  .then(holidays => {
    let result = holidays.find(holiday => holiday.date.iso === getIsoDate());

    if (result && result.type.includes('National holiday')) {
      holidayStatus.innerText = 'Yes, it is!';
    } else {
      holidayStatus.innerText = 'Sadly, no.';
    }
  })
  .catch(err => {
    console.log(err);
  });

// Array of objects for supported countries
const supportedCountries = [
  {
    isoCode: 'ge',
    country: 'Georgia'
  },
  {
    isoCode: 'ie',
    country: 'Ireland'
  },
  {
    isoCode: 'pt',
    country: 'Portugal'
  },
  {
    isoCode: 'at',
    country: 'Austria'
  },
  {
    isoCode: 'be',
    country: 'Belgium'
  },
  {
    isoCode: 'de',
    country: 'Germany'
  },
  {
    isoCode: 'gb',
    country: 'United Kingdom'
  },
  {
    isoCode: 'nl',
    country: 'Netherlands'
  },
  {
    isoCode: 'se',
    country: 'Sweden'
  }
];

// Append supported countries to select tag in the DOM
supportedCountries.map(({ isoCode, country }) => {
  let option = document.createElement('option');
  option.value = isoCode;
  option.text = country;
  selectCountry.add(option);
});

// Make call to the api when user switches the country
selectCountry.addEventListener('change', e => {
  let url = `https://calendarific.com/api/v2/holidays?&api_key=${api_key}&country=${e.target.value}&year=${currentYear}`;

  holidayStatus.innerHTML = loader;

  getHolidays(url)
    .then(data => {
      return data.response.holidays;
    })
    .then(holidays => {
      let result = holidays.find(holiday => holiday.date.iso === getIsoDate());

      if (holidayStatus.classList.contains('small-font')) {
        holidayStatus.classList.remove('small-font');
      }

      if (result && result.type.includes('National holiday')) {
        holidayStatus.innerText = 'Yes, it is!';
      } else if (result && result.type.includes('Common local holiday')) {
        let states = result.states.map(state => state.name);
        states = states.join(', ');
        holidayStatus.innerHTML = `Yes, it is in following states: <span class="returned-states">${states}</span>`;
        holidayStatus.classList.add('small-font');
      } else {
        holidayStatus.innerText = 'Sadly, no.';
      }
    })
    .catch(err => {
      console.log(err);
    });

  // Update header to display selected country
  selectedCountry.innerText = e.target.selectedOptions[0].text;
});

const loader = `
<div class="lds-default">
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
</div>
`;
