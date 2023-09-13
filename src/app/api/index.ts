export const getAll = {
  method: "GET",
  url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
  params: {
    locationId: "294229",
    page: "1",
  },
  headers: {
    "X-RapidAPI-Key": "dd81375256msh8a1f926a13c6693p19e734jsneb6c8cc8b7af",
    "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
  },
};

export const getDetail = (restaurantId: string) => {
  return {
    method: "GET",
    url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/getRestaurantDetails",
    params: {
      restaurantsId: restaurantId,
    },
    headers: {
      "X-RapidAPI-Key": "dd81375256msh8a1f926a13c6693p19e734jsneb6c8cc8b7af",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };
};
