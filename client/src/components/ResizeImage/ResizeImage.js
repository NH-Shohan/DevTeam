export const resizeImage = (base64Image, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate the new dimensions while maintaining the aspect ratio
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      // Draw the image onto the canvas with the new dimensions
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Get the base64 representation of the resized image
      const resizedBase64 = canvas.toDataURL('image/jpeg'); // You can change the format if needed

      resolve(resizedBase64);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};
