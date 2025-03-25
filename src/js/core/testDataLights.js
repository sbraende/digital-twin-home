const testDataLights = {
  3: {
    state: {
      on: true,
      bri: 125,
      ct: 443,
      alert: "select",
      colormode: "ct",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: {
      state: "noupdates",
      lastinstall: "2024-10-09T12:46:36",
    },
    type: "Color temperature light",
    name: "Seng Sengekant",
    modelid: "LTG002",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue ambiance spot",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 200,
        maxlumen: 350,
        ct: {
          min: 153,
          max: 454,
        },
      },
      streaming: {
        renderer: false,
        proxy: false,
      },
    },
    config: {
      archetype: "spotbulb",
      function: "mixed",
      direction: "downwards",
      startup: {
        mode: "safety",
        configured: true,
      },
    },
    swversion: "1.122.2",
    swconfigid: "2300777B",
    productid: "Philips-LTG002-3-GU10CTv2",
  },
  4: {
    state: {
      on: true,
      bri: 125,
      ct: 443,
      alert: "select",
      colormode: "ct",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: {
      state: "noupdates",
      lastinstall: "2024-10-09T12:46:33",
    },
    type: "Color temperature light",
    name: "Seng hjørnelys",
    modelid: "LTG002",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue ambiance spot",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 200,
        maxlumen: 350,
        ct: {
          min: 153,
          max: 454,
        },
      },
      streaming: {
        renderer: false,
        proxy: false,
      },
    },
    config: {
      archetype: "spotbulb",
      function: "mixed",
      direction: "downwards",
      startup: {
        mode: "safety",
        configured: true,
      },
    },
    swversion: "1.122.2",
    swconfigid: "2300777B",
    productid: "Philips-LTG002-3-GU10CTv2",
  },
  5: {
    state: {
      on: false,
      bri: 1,
      hue: 6291,
      sat: 251,
      effect: "none",
      xy: [0.5612, 0.4042],
      ct: 369,
      alert: "select",
      colormode: "xy",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: {
      state: "noupdates",
      lastinstall: "2024-10-09T12:46:39",
    },
    type: "Extended color light",
    name: "Kjøkken lys",
    modelid: "LCA006",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue color lamp",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 200,
        maxlumen: 1055,
        colorgamuttype: "C",
        colorgamut: [
          [0.6915, 0.3083],
          [0.17, 0.7],
          [0.1532, 0.0475],
        ],
        ct: {
          min: 153,
          max: 500,
        },
      },
      streaming: {
        renderer: true,
        proxy: true,
      },
    },
    config: {
      archetype: "pendantround",
      function: "mixed",
      direction: "omnidirectional",
      startup: {
        mode: "safety",
        configured: true,
      },
    },
    swversion: "1.122.2",
    swconfigid: "ECCBCB84",
    productid: "Philips-LCA006-1-A60HECLv1",
  },
  6: {
    state: {
      on: false,
      bri: 1,
      hue: 6291,
      sat: 251,
      effect: "none",
      xy: [0.5612, 0.4042],
      ct: 369,
      alert: "select",
      colormode: "xy",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: {
      state: "noupdates",
      lastinstall: "2024-10-09T12:46:41",
    },
    type: "Extended color light",
    name: "Skrivebord",
    modelid: "440400982842",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue Play",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 100,
        maxlumen: 560,
        colorgamuttype: "C",
        colorgamut: [
          [0.6915, 0.3083],
          [0.17, 0.7],
          [0.1532, 0.0475],
        ],
        ct: {
          min: 153,
          max: 500,
        },
      },
      streaming: {
        renderer: true,
        proxy: true,
      },
    },
    config: {
      archetype: "wallwasher",
      function: "decorative",
      direction: "upwards",
      startup: {
        mode: "safety",
        configured: true,
      },
    },
    swversion: "1.122.2",
    swconfigid: "DBDD3252",
    productid: "Philips-PCM054-1-HuePlayECLv2",
  },
};

export default testDataLights;
