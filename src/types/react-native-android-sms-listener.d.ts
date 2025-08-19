declare module 'react-native-android-sms-listener' {
  type SMSMessage = {
    originatingAddress: string;
    body: string;
    timestamp: number;
  };

  type SmsListenerSubscription = {
    remove: () => void;
  };

  const SmsListener: {
    addListener: (
      callback: (message: SMSMessage) => void,
    ) => SmsListenerSubscription;
  };

  export default SmsListener;
}
