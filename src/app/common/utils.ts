import { AbstractControl, FormControl } from '@angular/forms';

/**
 *
 * @param date 12/03/2023
 * @returns string 2023-03-12T00:00:00.000+00:00
 */
export function formatVisualToDateTime(date: string): string {
  let response = '';

  let dateParts = date.split('/');
  let day = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]) - 1;
  let year = parseInt(dateParts[2]);

  let dataTime = new Date(year, month, day);
  response = dataTime.toISOString().split('T')[0] + 'T00:00:00.000+00:00';
  return response;
}

/**
 *
 * @param date 2023-03-12T00:00:00.000+00:00
 * @returns string 12/03/2023
 */
export function formatDataTimeToVisual(date: string): string {
  let response = '';

  let data = new Date(date);

  let diferenciaZonaHoraria = data.getTimezoneOffset();

  let localData = new Date(data.getTime() + diferenciaZonaHoraria * 60000);

  let day = localData.getDate().toString().padStart(2, '0');
  let month = (localData.getMonth() + 1).toString().padStart(2, '0'); // Nota: ¡los meses comienzan desde 0!
  let year = localData.getFullYear();

  response = day + '/' + month + '/' + year;

  return response;
}

export class CustomValidations {
  static isDateCorrect(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (control.value && !dateRegex.test(control.value)) {
      return { formatDateInvalid: true };
    }
    return null;
  }

  static isDateBeforeToday(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const dateLikeDate = new Date(control.value);
    const dateToday = new Date();

    dateLikeDate.setHours(0, 0, 0, 0);
    dateToday.setHours(0, 0, 0, 0);

    if (dateLikeDate < dateToday) {
      return { datePreviousToday: true };
    }

    return null;
  }
}
