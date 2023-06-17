import React, { useEffect, useState } from "react";
import GooglePayButton from "@google-pay/button-react";

const GooglePayButtonComponent = ({ cartTotal }) => {
  const [isGooglePayLoaded, setIsGooglePayLoaded] = useState(false);

  useEffect(() => {
    setIsGooglePayLoaded(true);
  }, []);

  const handlePayment = () => {
    const paymentData = {
      totalPrice: cartTotal.toFixed(2),
      currencyCode: "USD",
    };

    setTimeout(() => {
      console.log("Payment completed!", paymentData);
    }, 2000);
  };

  return (
    <>
      {isGooglePayLoaded && (
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: cartTotal.toFixed(2),
              currencyCode: "USD",
              countryCode: "US",
            },
            shippingAddressRequired: true,
            callbackIntents: ["PAYMENT_AUTHORIZATION"],
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
          onPaymentAuthorized={(paymentData) => {
            console.log("payment authorized", paymentData);
            return { transactionState: "SUCCESS" };
          }}
          existingPaymentMethodRequired={false}
          buttonColor="black"
          buttonType="buy"
          buttonSizeMode="static"
          style={{
            height: "64px",
            width: "100%",
          }}
          onClick={handlePayment}
        />
      )}
    </>
  );
};

export default GooglePayButtonComponent;
