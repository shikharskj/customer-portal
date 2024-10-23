import React, { useState, useEffect } from "react";

const ACCESS_KEY = "eCIEQx6qYmy_ARzrlPkiRYIrvSC5QV9pD4KxddssrDU"; // Replace with your Unsplash API key

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  // Function to fetch 9 random photos from Unsplash
  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=9&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      const photoUrls = data.map((item: any) => item.urls.regular); // Access the photo URLs
      setPhotos(photoUrls);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  // Fetch photos on component mount and set interval for every 10 seconds
  useEffect(() => {
    fetchPhotos(); // Initial fetch

    const interval = setInterval(() => {
      fetchPhotos(); // Fetch new photos every 10 seconds
    }, 10000); // 10,000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="photo-grid">
      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Random ${index}`}
            className="photo"
          />
        ))
      ) : (
        <p>Loading photos...</p>
      )}
    </div>
  );
};

export default PhotoGrid;
