// Import the necessary services

class UtilService {
  toLocalString(numberValue: number, locale: string, currency: string) {
    return numberValue.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
  }

  // Function to format the input value as USD currency
  formatMoneyNoSymbol(value: string, locale = "en-US"): string {
    // Convert the string value to a number and then to a locale string in USD format
    const numberValue = Number(value) / 100; // Divide by 100 to account for cents
    return numberValue?.toLocaleString(locale, { minimumFractionDigits: 2 });
  }

  // Function to format the input value as USD currency
  formatMoney(value: string, locale = "en-NG", currency = "NGN"): string {
    // Convert the string value to a number and then to a locale string in USD format
    const numberValue = Number(value); // Divide by 100 to account for cents
    return this.toLocalString(numberValue, locale, currency);
  }
}

export default UtilService;
