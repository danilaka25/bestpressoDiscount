const Images = [
    { image: require("../assets/banners/food-banner1.jpg") },
    { image: require("../assets/banners/food-banner2.jpg") },
    { image: require("../assets/banners/food-banner3.jpg") },
    { image: require("../assets/banners/food-banner4.jpg") },
];

export const markers = [
    {
      coordinate: {
        latitude: 50.41429494075907, 
        longitude: 30.520019533835047, 
      },
      title: "Pelican Rouge Cafe",
      description: "ст.м. Лыбидская",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 50.38231766288612, 
        longitude: 30.457328444387453, 
      },
      title: "Pelican Rouge Cafe",
      description: "Конева 10/1",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: 50.45851795222858, 
        longitude: 30.517697582953854,
      },
      title: "Pelican Rouge Cafe",
      description: "Андреевский спуск",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    
];



  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];