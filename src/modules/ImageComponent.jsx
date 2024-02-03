import React, { useState, useEffect } from "react";

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    const apiUrl =
      "https://i.ytimg.com/an_webp/b_oRXHDTHNo/mqdefault_6s.webp?du=3000&sqp=CJrwjasG&rs=AOn4CLAcQG_ZY6KgDTmdqGUgzXGyx5S4pA";

    fetch(apiUrl, { method: "GET", headers: headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImageUrl(data.imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="Зображення" />}</div>;
};

export default ImageComponent;
