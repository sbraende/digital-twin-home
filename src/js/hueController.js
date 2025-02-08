const getLight = async () => {
  const LIGHTS = {
    bedShelfs: 3,
    bedCorner: 4,
    kitchen: 5,
    desk: 6,
  };

  try {
    const response = await fetch("http://localhost:3000/light");
    const data = await response.json();

    console.log(data[5].state.on);
    if (data[5].state.on) {
      console.log("light is on");
    } else {
      console.log("light is off");
    }
  } catch (error) {
    console.error(`Could not fetch data: ${error}`);
  }
};

export { getLight };
