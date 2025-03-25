import LOCALSERVERURL from "./localServerInfo";

const getWeather = async () => {
  try {
    const request = await fetch(`${LOCALSERVERURL}weather`);
    const weatherData = await request.json();
    console.log(weatherData);
  } catch (error) {
    console.error("Could not get weather from local server", error);
  }
};

export default getWeather;
