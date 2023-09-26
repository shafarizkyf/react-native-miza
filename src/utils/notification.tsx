import notifee, {AndroidImportance} from '@notifee/react-native';

const show = async (
  title: string,
  body: string,
  data?: {
    [key: string]: string | number | object;
  },
) => {
  try {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_notification',
        largeIcon: require('images/logo_square.png'),
      },
      data,
    });
  } catch (error) {
    console.log('error display notification: ', error);
  }
};

export default {
  show,
};
