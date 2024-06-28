
const convertImage = (imageUrl: string | null): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!imageUrl) {
        reject(new Error("No image URL provided"));
        return;
      }
  
      // Create a new FileReader
      const reader = new FileReader();
  
      // Define onload event handler
      reader.onload = function (event) {
        const base64Image = event.target?.result as string | null;
        if (base64Image) {
          resolve(base64Image);
        } else {
          reject(new Error("Error converting image to Base64"));
        }
      };
  
      // Define onerror event handler
      reader.onerror = function (error) {
        reject(new Error("Error occurred while reading the image: " + error));
      };
  
      // Fetch the image and read it as a Data URL
      fetch(imageUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          reject(new Error("Error fetching the image: " + error.message));
        });
    });
  };
  
  export default convertImage;
  
  
  
  
  