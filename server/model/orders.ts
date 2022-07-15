import { IOrder, OrderSchema } from "./order";

//{  "_id": {    "$oid": "62cd90247c57d2de51d1b8b0"  },  "name": {    "default": "WPF",    "values": [      [        "ru",        "Цех№1"      ]    ]  },  "fullname": {    "default": "Wheelpair fatory",    "values": [      [        "ru",        "Фабрика колесных пар"      ]    ]  },  "created": {    "$date": {      "$numberLong": "1657638948073"    }  },  "modified": {    "$date": {      "$numberLong": "1657638948073"    }  },  "workcenters": [    {      "id": {        "$oid": "62cd90247c57d2de51d1b8a6"      },      "name": "WheelSupply",      "fullanme": "",      "bounds": {        "polygon": [          {            "lat": 10,            "lng": 35          }        ]      },      "operations": [        {          "ref": {            "$oid": "62cd90247c57d2de51d1b8ab"          },          "cost": 2300,          "duration": 15        }      ]    },    {      "id": {        "$oid": "62cd90247c57d2de51d1b8a7"      },      "name": "BlankSupply",      "bounds": {        "polygon": [          {            "lat": 10,            "lng": 45          }        ]      },      "operations": [        {          "ref": {            "$oid": "62cd90247c57d2de51d1b8ac"          },          "cost": 2300,          "duration": 15        }      ]    },    {      "id": {        "$oid": "62cd90247c57d2de51d1b8a8"      },      "name": "MetallProcessing",      "bounds": {        "polygon": [          {            "lat": 30,            "lng": 35          }        ]      },      "operations": [        {          "ref": {            "$oid": "62cd90247c57d2de51d1b8ad"          },          "cost": 2300,          "duration": 15        }      ]    },    {      "id": {        "$oid": "62cd90247c57d2de51d1b8a9"      },      "name": "Assembly",      "bounds": {        "polygon": [          {            "lat": 30,            "lng": 45          }        ]      },      "operations": [        {          "ref": {            "$oid": "62cd90247c57d2de51d1b8ae"          },          "cost": 2300,          "duration": 15        }      ]    },    {      "id": {        "$oid": "62cd90247c57d2de51d1b8aa"      },      "name": "QualityCheck",      "bounds": {        "polygon": [          {            "lat": 50,            "lng": 35          }        ]      },      "operations": [        {          "ref": {            "$oid": "62cd90247c57d2de51d1b8af"          },          "cost": 2300,          "duration": 15        }      ]    }  ],  "logistics": [    {      "name": "Workshop crane",      "from": [        {          "$oid": "62cd90247c57d2de51d1b8a6"        },        {          "$oid": "62cd90247c57d2de51d1b8a7"        },        {          "$oid": "62cd90247c57d2de51d1b8a8"        },        {          "$oid": "62cd90247c57d2de51d1b8a9"        },        {          "$oid": "62cd90247c57d2de51d1b8aa"        }      ],      "to": [        {          "$oid": "62cd90247c57d2de51d1b8a6"        },        {          "$oid": "62cd90247c57d2de51d1b8a7"        },        {          "$oid": "62cd90247c57d2de51d1b8a8"        },        {          "$oid": "62cd90247c57d2de51d1b8a9"        },        {          "$oid": "62cd90247c57d2de51d1b8aa"        }      ],      "bidirect": true,      "volume": 1,      "weight": 1000,      "cost": 20,      "duration": 15    }  ]}
//{  "_id": {    "$oid": "62cd90247c57d2de51d1b8b3"  },  "factoryid": {    "$oid": "62cd90247c57d2de51d1b8b0"  },  "number": "R0180000395.1.22",  "priority": {    "customer": "A",    "manufacture": "2"  },  "contractDate": {    "estimated": {      "datepoint": {        "$date": {          "$numberLong": "1657515600000"        }      },      "tolerance": {        "left": 10,        "right": 0      }    },    "baseline": {      "0": {        "datepoint": {          "$date": {            "$numberLong": "1657515600000"          }        },        "tolerance": {          "left": 1,          "right": 5        }      },      "YTDQ3": {        "datepoint": {          "$date": {            "$numberLong": "1657515600000"          }        },        "tolerance": {          "left": 0,          "right": 0        }      }    }  },  "promiseDate": {    "estimated": {      "datepoint": {        "$date": {          "$numberLong": "1657515600000"        }      },      "tolerance": {        "up": 10,        "down": 0      }    },    "baseline": {      "0": {        "datepoint": {          "$date": {            "$numberLong": "1657515600000"          }        },        "tolerance": {          "up": 10,          "down": 0        }      }    }  },  "customer": {    "ref": "c2"  },  "calendar": "russia-std",  "products": [    {      "count": 100,      "measurement": "pcs",      "product": {        "id": {          "$oid": "62d00d5d504752b9f66dd800"        },        "mdmCode": "0500000324",        "name": "Wheelpair 800x60x10 DIN1489.98",        "fullname": "WP800x60x10DIN1489.98"      },      "contractDate": {        "estimated": {          "datepoint": {            "$date": {              "$numberLong": "1657515600000"            }          },          "tolerance": {            "left": 10,            "right": 0          }        },        "baseline": {          "0": {            "datepoint": {              "$date": {                "$numberLong": "1657515600000"              }            },            "tolerance": {              "left": 1,              "right": 5            }          },          "YTDQ3": {            "datepoint": {              "$date": {                "$numberLong": "1657515600000"              }            },            "tolerance": {              "left": 0,              "right": 0            }          }        }      },      "promiseDate": {        "estimated": {          "datepoint": {            "$date": {              "$numberLong": "1657515600000"            }          },          "tolerance": {            "up": 10,            "down": 0          }        },        "baseline": {          "0": {            "datepoint": {              "$date": {                "$numberLong": "1657515600000"              }            },            "tolerance": {              "up": 10,              "down": 0            }          }        }      },      "planning_mode": "manual"    }  ],  "customerPO": "0180000465232022",  "planningMode": "manual"}
