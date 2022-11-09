/**
 * a Utils for format currency
 * @param number input value
 * @param prefix $ / € / ¥ / Rp
 * @returns currency
 */
export const formatCurrency = (number: string, prefix: string) => {
  const numberString = number.replace(/[^\d,]/g, "").toString();
  const split = numberString.split(",");
  const balance = split[0].length % 3;
  let rupiah = split[0].slice(0, Math.max(0, balance));
  const thousand = split[0].slice(balance).match(/\d{3}/gi);

  if (thousand) {
    const separator = balance ? "." : "";
    rupiah += separator + thousand.join(".");
  }

  rupiah = split[1] !== undefined ? `${rupiah},${split[1]}` : rupiah;

  if (prefix === undefined) {
    return rupiah;
  }
  if (rupiah) {
    return `Rp. ${rupiah}`;
  }
  return "";
};

/**
 * a Utils for get non format Digit
 * @param text input value
 */
export const formatRemoveNonDigit = (text: string) => {
  if (text === "") return "";
  return text.replace(/\D/g, "");
};
