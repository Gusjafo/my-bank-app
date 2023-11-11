import {
  formatVisualToDateTime,
  formatDataTimeToVisual,
  CustomValidations,
} from './utils';
import { FormControl } from '@angular/forms';

describe('formatVisualToDateTime', () => {
  it('should format visual date to ISO date time', () => {
    const visualDate = '12/03/2023';
    const expectedIsoDateTime = '2023-03-12T00:00:00.000+00:00';

    const result = formatVisualToDateTime(visualDate);

    expect(result).toEqual(expectedIsoDateTime);
  });
});

describe('formatDataTimeToVisual', () => {
  it('should format ISO date time to visual date', () => {
    const isoDateTime = '2023-03-12T00:00:00.000+00:00';
    const expectedVisualDate = '12/03/2023';

    const result = formatDataTimeToVisual(isoDateTime);

    expect(result).toEqual(expectedVisualDate);
  });
});

describe('isDateCorrect', () => {
  it('should return null for a valid date', () => {
    const control = new FormControl('12/03/2023');

    const result = CustomValidations.isDateCorrect(control);

    expect(result).toBeNull();
  });

  it('should return { formatDateInvalid: true } for an invalid date', () => {
    const control = new FormControl('invalid-date');

    const result = CustomValidations.isDateCorrect(control);

    expect(result).toEqual({ formatDateInvalid: true });
  });

  it('should return null for an empty control value', () => {
    const control = new FormControl('');

    const result = CustomValidations.isDateCorrect(control);

    expect(result).toBeNull();
  });
});
