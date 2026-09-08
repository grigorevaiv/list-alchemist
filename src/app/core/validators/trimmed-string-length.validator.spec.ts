import { trimmedStringLengthValidator } from './trimmed-string-length.validator';
import { FormControl } from '@angular/forms';

describe('trimmedStringLengthValidator', () => {
  const validator = trimmedStringLengthValidator(20, 500);

  it('returns a "required" error for an empty string', () => {
    const control = new FormControl('');
    expect(validator(control)).toEqual({ required: true });
  });

  it('returns a "required" error for a whitespace-only string', () => {
    const control = new FormControl('                    ');
    expect(validator(control)).toEqual({ required: true });
  });

  it('returns a "tooShort" error when trimmed length is below the minimum', () => {
    const control = new FormControl('short text');
    expect(validator(control)).toEqual({ tooShort: true });
  });

  it('returns a "tooLong" error when trimmed length exceeds the maximum', () => {
    const control = new FormControl('a'.repeat(501));
    expect(validator(control)).toEqual({ tooLong: true });
  });

  it('returns null for a valid-length description', () => {
    const control = new FormControl('Vintage leather jacket, worn once, size M');
    expect(validator(control)).toBeNull();
  });
});