
export type InputMaskType =
  | "alphanumeric"
  | "cep"
  | "cpf"
  | "cnpj"
  | "number"
  | "phone"
  | "hours"
  | "ip"
  | "upperCase";

export type DateFormatType =
  | "date"
  | "dateHour"
  | "dateHourSecond"
  | "month"
  | "year";

const PHONE_LENGTH = 10;
const MASKED_CEP_LENGTH = 10;
const MASKED_CPF_LENGTH = 14;
const MASKED_CNPJ_LENGTH = 18;
const MASKED_CELL_PHONE_LENGTH = 15;

export function cpfFormat(value: string): string {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function cnpjFormat(value: string): string {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function cepFormat(value: string): string {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2");
}

export function phoneFormat(value: string): string {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function cellPhoneFormat(value: string): string {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function cellOrPhoneFormat(value: string): string {
  if (!value) return "";
  return value.replace(/\D/g, "").length <= PHONE_LENGTH
    ? phoneFormat(value)
    : cellPhoneFormat(value);
}

export function alphanumericFormat(value: string): string {
  if (!value) return "";
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

export function numberFormat(value: string): string {
  if (!value) return "";
  return value.replace(/[^0-9]/g, "");
}

export function format(value: string, mask?: InputMaskType) {
  if (!mask) return value;

  switch (mask) {
    case "alphanumeric":
      return alphanumericFormat(value);
    case "cep":
      return cepFormat(value.slice(0, MASKED_CEP_LENGTH));
    case "cpf":
      return cpfFormat(value.slice(0, MASKED_CPF_LENGTH));
    case "cnpj":
      return cnpjFormat(value.slice(0, MASKED_CNPJ_LENGTH));
    case "number":
      return numberFormat(value);
    case "phone":
      return cellOrPhoneFormat(value.slice(0, MASKED_CELL_PHONE_LENGTH));
    case "hours":
      return hoursFormat(value);
    case "ip":
      return ipFormat(value);
    case "upperCase":
      return value.toUpperCase();
    default:
      return value;
  }
}

export function hoursFormat(value: string): string {
  const digits = value.replace(/\D/g, "");

  const limitedDigits = digits.substring(0, 4);

  let hours = limitedDigits.substring(0, 2);
  let minutes = limitedDigits.substring(2, 4);

  if (hours.length === 2) {
    const hoursInt = parseInt(hours, 10);
    if (hoursInt > 23) {
      hours = "23";
    }
  }

  if (minutes.length === 2) {
    const minutesInt = parseInt(minutes, 10);
    if (minutesInt > 59) {
      minutes = "59";
    }
  }

  if (limitedDigits.length >= 3) {
    return `${hours}:${minutes}`;
  } else if (limitedDigits.length >= 1) {
    return hours;
  }

  return "";
}

export function ipFormat(value: string): string {
  if (!value) {
    return "-";
  }
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 12) {
    return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(
      3,
      6
    )}.${digitsOnly.slice(6, 9)}.${digitsOnly.slice(9, 12)}`;
  }
  if (digitsOnly.length === 8) {
    return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(
      3,
      6
    )}.${digitsOnly.slice(6, 7)}.${digitsOnly.slice(7, 8)}`;
  }
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})$/;
  if (ipRegex.test(value)) {
    return value;
  }
  return value;
}
