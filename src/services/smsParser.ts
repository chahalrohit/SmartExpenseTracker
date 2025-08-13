// const amountRegex = /(?:Rs\.?|INR|₹)\s?([\d,]+(?:\.\d{1,2})?)/;
// const debitKeywords = /debited|withdrawn|purchased/i;
// const creditKeywords = /credited|received|deposited/i;

export function parseBankSms(text: string) {
  // Amount (INR 1,234.50 / Rs. 1234)
  const amount = text.match(/(?:INR|Rs\.?)\s?([\d,]+(?:\.\d{1,2})?)/i)?.[1];

  // Credit/debit
  const type = /debited|spent|purchase/i.test(text)
    ? 'debit'
    : /credited|received/i.test(text)
    ? 'credit'
    : 'unknown';

  // Merchant/account tail
  const merchant = text.match(/(?:at|to)\s+([A-Za-z0-9&\- .'"]{2,50})/i)?.[1];
  const account = text.match(
    /(?:A\/c|Account|AC)\s*(?:xx|XX|X{2,})?(\d{2,4})/i,
  )?.[1];

  return { amount, type, merchant, account };
}
