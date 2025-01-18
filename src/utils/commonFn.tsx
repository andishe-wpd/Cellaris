import moment from 'moment-jalaali';

export const uniqueID = () => {
  return '_' + Date.now().toString(36) + Math.random().toString(16).slice(2);
};

export const convertPersianDigitInEnglish = str => {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

export const convertDateShamsiToMiladi = date => {
  const m = moment(date, 'jYYYY/jM/jD');
  const str = m.format('YYYY/MM/DD');
  return str;
};

export const dataUtcToShamsiWithTime = data => {
  const date = new Date(data);
  const JalaliDate = date.toLocaleDateString('fa-IR');
  const JalaliTime = date.toLocaleTimeString('fa-IR');
  const dateWithTime = JalaliTime + ' - ' + JalaliDate;
  return dateWithTime;
};

export const convertDateMiladiToShamsi = date => {
  const m = moment(date, 'YYYY/M/D'); // Parse a Jalaali date
  const str = m.format('jYYYY/jM/jD');
  return str;
};

export const convertDateTimeMiladiToShamsi = date => {
  const m = moment(date, 'YYYY/MM/DD - HH:mm'); // Parse a Jalaali date
  const str = m.format('jYYYY/jM/jD - HH:mm');
  return str;
};

export const formatNumber = inputNumber => {
  let formetedNumber = Number(inputNumber)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const splitArray = formetedNumber.split('.');
  if (splitArray.length > 1) {
    formetedNumber = splitArray[0];
  }
  return formetedNumber;
};

export const convertEnglishNumberToPersian = num => {
  let str = num;
  str = str.replaceAll('1', '۱');
  str = str.replaceAll('2', '۲');
  str = str.replaceAll('3', '۳');
  str = str.replaceAll('4', '۴');
  str = str.replaceAll('5', '۵');
  str = str.replaceAll('6', '۶');
  str = str.replaceAll('7', '۷');
  str = str.replaceAll('8', '۸');
  str = str.replaceAll('9', '۹');
  str = str.replaceAll('0', '۰');
  return str;
};

export const parseDate = {
  getDate(date) {
    const currentDate = new Date(date).toLocaleDateString('fa-IR');
    return currentDate;
  },
  getFullTime(date) {
    const currentTime = new Date(date).toLocaleTimeString('fa-IR');
    return currentTime;
  },
  getTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  getFullDate(date) {
    return `${this.getDate(date)} - ${this.getTime(date)}`;
  },
  getTimeLeft(from = new Date(), to = new Date()) {
    return moment(to).diff(from, 'days');
  },
  secondsToHms(d) {
    if (!d) return '';
    return new Date(d * 1000).toISOString().slice(11, 19);
  },
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatPriceInput = value => {
  const input = value.replace(/[^0-9]/g, '');
  const num = parseInt(input, 10);
  return value ? num.toLocaleString() : '';
};
export const removeNumberSeperator = value => {
  return value.replaceAll(',', '');
};

export const getSigmaServiceId = typeApi => {
  // we should get data from the SigmaService from types
  try {
    if (typeApi === 'shipping-export') {
      return 2;
    } else if (typeApi === 'shipping-import') {
      return 1;
    } else if (typeApi === 'shipping-transit') {
      return 3;
    } else if (typeApi === 'shipping-TempExport') {
      return 12;
    } else if (typeApi === 'travel-comments') {
      return 15;
    }
  } catch (error) {}
};
export const convertToIranTimezone = timeInput => {
  const [hours, minutes] = timeInput.split(':').map(Number);

  // Create a new Date object
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  // Convert to Iran timezone (Asia/Tehran)
  const options = {
    timeZone: 'Asia/Tehran',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  // Format the date
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  // Extract the formatted components
  const year = parts.find(part => part.type === 'year').value;
  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  const hour = parts.find(part => part.type === 'hour').value;
  const minute = parts.find(part => part.type === 'minute').value;
  const second = parts.find(part => part.type === 'second').value;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
};

export const convertToHHMM = (dateTimeString: string): string => {
  if (!dateTimeString) return '---';
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
