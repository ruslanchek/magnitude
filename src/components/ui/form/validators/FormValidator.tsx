export abstract class FormValidator {
  abstract readonly errorText: string;
  public isValid: boolean | undefined = undefined;

  abstract validate(
    value: string | undefined,
  ): { isValid: boolean; errorText: string | null };

  modelGetter(): { [key: string]: string } {
    return {};
  }

  clear() {
    this.isValid = undefined;
  }

  valid() {
    this.isValid = true;
    return { isValid: true, errorText: '' };
  }

  invalid() {
    this.isValid = false;
    return { isValid: false, errorText: this.errorText };
  }
}

export class FormValidatorChecked extends FormValidator {
  constructor(readonly errorText: string) {
    super();
  }

  validate(value: string | undefined) {
    if (value === 'true') {
      return this.valid();
    }

    return this.invalid();
  }
}

export class FormValidatorSelected extends FormValidator {
  constructor(readonly errorText: string) {
    super();
  }

  validate(value: string | undefined) {
    if (value) {
      return this.valid();
    }

    return this.invalid();
  }
}

export class FormValidatorRequired extends FormValidator {
  constructor(readonly errorText: string) {
    super();
  }

  validate(value: string | undefined) {
    if (!value) {
      return this.invalid();
    }

    return this.valid();
  }
}

export class FormValidatorEmail extends FormValidator {
  constructor(readonly errorText: string) {
    super();
  }

  validate(value: string | undefined) {
    let isValid = false;

    if (value) {
      const regExp = /^(([^!<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      value = value.trim();
      isValid = regExp.test(value);
    }

    if (isValid) {
      return this.valid();
    } else {
      return this.invalid();
    }
  }
}

export class FormValidatorMinLength extends FormValidator {
  constructor(readonly errorText: string, readonly min: number) {
    super();
  }

  validate(value: string | undefined) {
    if (!value && this.min <= 0) {
      return this.valid();
    } else if (!value && this.min > 0) {
      return this.invalid();
    } else if (value && value.length >= this.min) {
      return this.valid();
    } else {
      return this.invalid();
    }
  }
}

export class FormValidatorMaxLength extends FormValidator {
  constructor(readonly errorText: string, readonly max: number) {
    super();
  }

  validate(value: string | undefined) {
    if (!value) {
      return this.valid();
    } else if (value && value.length > this.max) {
      return this.invalid();
    } else {
      return this.valid();
    }
  }
}

export class FormValidatorRegExp extends FormValidator {
  constructor(readonly errorText: string, readonly regExp: string) {
    super();
  }

  validate(value: string | undefined) {
    try {
      if (value) {
        const regExp: RegExp = new RegExp(this.regExp, 'ig');

        if (regExp.test(value)) {
          return this.valid();
        } else {
          return this.invalid();
        }
      } else {
        return this.invalid();
      }
    } catch (e) {
      return this.invalid();
    }
  }
}

export class FormValidatorSameAs extends FormValidator {
  constructor(readonly errorText: string, readonly fieldName: string) {
    super();
  }

  validate(value: string | undefined) {
    const model = this.modelGetter();

    if (model && model[this.fieldName] && model[this.fieldName] === value) {
      return this.valid();
    } else {
      return this.invalid();
    }
  }
}

export class FormValidatorNumber extends FormValidator {
  constructor(readonly errorText: string) {
    super();
  }

  validate(value: string | undefined) {
    if (value && /^[0-9]+$/gi.test(value)) {
      return this.valid();
    } else {
      return this.invalid();
    }
  }
}
