import axios from "axios";

export const fetchData = async (keyword) => {
  const options = {
    method: "GET",
    url: "https://amazon-price1.p.rapidapi.com/search",
    params: {
      keywords: keyword,
      marketplace: "US",
    },
    headers: {
      "X-RapidAPI-Key": "d736734deamsh6ad67946bf1a1a0p1321d8jsn4ea883e5bf56",
      "X-RapidAPI-Host": "amazon-price1.p.rapidapi.com",
    },
  };

  try {
    // Make the API request using await
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};
