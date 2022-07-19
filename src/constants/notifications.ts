import {iNotification} from 'react-notifications-component';

const successNotification: iNotification = {
  type: 'success',
  insert: 'top',
  container: 'top-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
};

export {successNotification};
