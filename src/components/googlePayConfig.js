export const googlePayConfig = (amount) => ({
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'stripe',
          'stripe:version': '2020-08-27',
          'stripe:publishableKey': process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: '01234567890123456789', // Optional for test
    merchantName: 'Your Company Name',
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPrice: amount,
    currencyCode: 'AED', // UAE Dirhams
    countryCode: 'AE',
  },
});
