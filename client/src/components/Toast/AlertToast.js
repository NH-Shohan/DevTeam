import { toast, ToastContainer } from 'react-toastify';
export const AlertToast = (event) => {
  //   console.log(event);
  if (event === 'success') {
    toast.success('Successfully Created!!', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'foo-bar',
    });
  } else if (event.response.statusText === 'Internal Server Error') {
    toast.error('Duplicate Email Detected!', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'foo-bar',
    });
  } else {
    toast.error('There was an error!', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'foo-bar',
    });
  }
};
