export const formatMoney = (amount: number) => {
  // format number to vnđ currency
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
