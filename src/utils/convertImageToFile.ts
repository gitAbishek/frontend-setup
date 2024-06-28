const convertImageToFile = (imageUrl: string | null): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      reject(new Error("No image URL provided"));
      return;
    }

    // Fetch the image
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a File object
        const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        const file = new File([blob], fileName, { type: blob.type });
        resolve(file);
      })
      .catch((error) => {
        reject(
          new Error("Error fetching or converting the image: " + error.message)
        );
      });
  });
};

export default convertImageToFile;
