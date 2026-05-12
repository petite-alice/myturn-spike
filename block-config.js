// Lookup Constants
const TOOLBOX_ROBOTS = {
  CLICBOT: 'click-bot', 
  LEGO_SPIKE: 'lego-spike-prime'
}

// Method to dynamically render the toolbox
// Prepends robot specific blocks to the front of BASE_BLOCKLY_TOOLBOX
function toolboxForRobot(robotName) {
  const toolboxMap = {
    [TOOLBOX_ROBOTS.CLICBOT]: CLICBOT_TOOLBOX,
    [TOOLBOX_ROBOTS.LEGO_SPIKE]: LEGO_SPIKE_TOOLBOX,
  }

  if (!robotName || !toolboxMap[robotName]) {
    return BASE_BLOCKLY_TOOLBOX;
  }
    
  const toolbox = {...BASE_BLOCKLY_TOOLBOX};
  toolbox.contents = [...toolboxMap[robotName], ...toolbox.contents];
  return toolbox;
}

// Clicbot specific blocks
const CLICBOT_TOOLBOX = [
  {
    "kind":"category",
    "name":"ClicBot",
    "categorystyle":"math_category",
    "contents":[
      {
        "kind":"block",
        "type":"clicbot_move_wheel"
      },
      {
        "kind":"block",
        "type":"controls_repeat_ext",
        "inputs":{
          "TIMES":{
            "block":{
              "type":"math_number",
              "fields":{
                "NUM":10
              }
            }
          }
        }
      }
    ]
  }
];

// Lego specific blocks
const LEGO_SPIKE_TOOLBOX = [
  {
    "kind":"category",
    "name":"Lego Spike",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      },
      {
        "kind":"block",
        "type":"controls_repeat_ext",
        "inputs":{
          "TIMES":{
            "block":{
              "type":"math_number",
              "fields":{
                "NUM":40
              }
            }
          }
        }
      },
      {
        "kind":"block",
        "type":"spike_run_motor"
      }
    ]
  }
];

// Main Contents of the Blockly toolbox
const BASE_BLOCKLY_TOOLBOX = {
  "kind":"categoryToolbox",
  "contents":[
    {
      "kind":"category",
      "name":"If/Else",
      "categorystyle":"logic_category",
      "contents":[
        {
          "kind":"block",
          "type":"controls_if"
        },
        {
          "kind":"block",
          "type":"controls_if",
          "extraState":{
            "hasElse":"true"
          }
        },
        {
          "kind":"block",
          "type":"controls_if",
          "extraState":{
            "hasElse":"true",
            "elseIfCount":1
          }
        }
      ]
    },
    {
      "kind":"category",
      "name":"Logic",
      "categorystyle":"logic_category",
      "contents":[
        {
          "kind":"block",
          "type":"logic_compare"
        },
        {
          "kind":"block",
          "type":"logic_operation"
        },
        {
          "kind":"block",
          "type":"logic_negate"
        },
        {
          "kind":"block",
          "type":"logic_boolean"
        },
        {
          "kind":"block",
          "type":"logic_null"
        },
        {
          "kind":"block",
          "type":"logic_ternary"
        }
      ]
    },
    {
      "kind":"category",
      "name":"Loops",
      "categorystyle":"loop_category",
      "contents":[
        {
          "kind":"block",
          "type":"controls_repeat_ext",
          "inputs":{
            "TIMES":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":10
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"controls_whileUntil"
        },
        {
          "kind":"block",
          "type":"controls_for",
          "fields":{
            "VAR":"i"
          },
          "inputs":{
            "FROM":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            },
            "TO":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":10
                }
              }
            },
            "BY":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"controls_forEach"
        },
        {
          "kind":"block",
          "type":"controls_flow_statements"
        }
      ]
    },
    {
      "kind":"category",
      "name":"Math",
      "categorystyle":"math_category",
      "contents":[
        {
          "kind":"block",
          "type":"math_number",
          "fields":{
            "NUM":123
          }
        },
        {
          "kind":"block",
          "type":"math_arithmetic",
          "fields":{
            "OP":"ADD"
          }
        },
        {
          "kind":"block",
          "type":"math_single",
          "fields":{
            "OP":"ROOT"
          }
        },
        {
          "kind":"block",
          "type":"math_trig",
          "fields":{
            "OP":"SIN"
          }
        },
        {
          "kind":"block",
          "type":"math_constant",
          "fields":{
            "CONSTANT":"PI"
          }
        },
        {
          "kind":"block",
          "type":"math_number_property",
          "extraState":"<mutation divisor_input=\"false\"></mutation>",
          "fields":{
            "PROPERTY":"EVEN"
          }
        },
        {
          "kind":"block",
          "type":"math_round",
          "fields":{
            "OP":"ROUND"
          }
        },
        {
          "kind":"block",
          "type":"math_on_list",
          "extraState":"<mutation op=\"SUM\"></mutation>",
          "fields":{
            "OP":"SUM"
          }
        },
        {
          "kind":"block",
          "type":"math_modulo"
        },
        {
          "kind":"block",
          "type":"math_constrain",
          "inputs":{
            "LOW":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            },
            "HIGH":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":100
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"math_random_int",
          "inputs":{
            "FROM":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            },
            "TO":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":100
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"math_random_float"
        },
        {
          "kind":"block",
          "type":"math_atan2"
        }
      ]
    },
    {
      "kind":"category",
      "name":"Lists",
      "categorystyle":"list_category",
      "contents":[
        {
          "kind":"block",
          "type":"lists_create_empty"
        },
        {
          "kind":"block",
          "type":"lists_create_with",
          "extraState":{
            "itemCount":3
          }
        },
        {
          "kind":"block",
          "type":"lists_repeat",
          "inputs":{
            "NUM":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":5
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"lists_length"
        },
        {
          "kind":"block",
          "type":"lists_isEmpty"
        },
        {
          "kind":"block",
          "type":"lists_indexOf",
          "fields":{
            "END":"FIRST"
          }
        },
        {
          "kind":"block",
          "type":"lists_getIndex",
          "fields":{
            "MODE":"GET",
            "WHERE":"FROM_START"
          }
        },
        {
          "kind":"block",
          "type":"lists_setIndex",
          "fields":{
            "MODE":"SET",
            "WHERE":"FROM_START"
          }
        }
      ]
    },
    {
      "kind":"sep"
    },
    {
      "kind":"category",
      "name":"Variables",
      "categorystyle":"variable_category",
      "custom":"VARIABLE"
    },
    {
      "kind":"category",
      "name":"Functions",
      "categorystyle":"procedure_category",
      "custom":"PROCEDURE"
    },
    {
      "kind":"category",
      "name":"Library",
      "expanded":"true",
      "contents":[
        {
          "kind":"category",
          "name":"Randomize",
          "contents":[
            {
              "kind":"block",
              "type":"procedures_defnoreturn",
              "extraState":{
                "params":[
                  {
                    "name":"list"
                  }
                ]
              },
              "icons":{
                "comment":{
                  "text":"Describe this function...",
                  "pinned":false,
                  "height":80,
                  "width":160
                }
              },
              "fields":{
                "NAME":"randomize"
              },
              "inputs":{
                "STACK":{
                  "block":{
                    "type":"controls_for",
                    "fields":{
                      "VAR":{
                        "name":"x"
                      }
                    },
                    "inputs":{
                      "FROM":{
                        "block":{
                          "type":"math_number",
                          "fields":{
                            "NUM":1
                          }
                        }
                      },
                      "TO":{
                        "block":{
                          "type":"lists_length",
                          "inline":false,
                          "inputs":{
                            "VALUE":{
                              "block":{
                                "type":"variables_get",
                                "fields":{
                                  "VAR":{
                                    "name":"list"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "BY":{
                        "block":{
                          "type":"math_number",
                          "fields":{
                            "NUM":1
                          }
                        }
                      },
                      "DO":{
                        "block":{
                          "type":"variables_set",
                          "inline":false,
                          "fields":{
                            "VAR":{
                              "name":"y"
                            }
                          },
                          "inputs":{
                            "VALUE":{
                              "block":{
                                "type":"math_random_int",
                                "inputs":{
                                  "FROM":{
                                    "block":{
                                      "type":"math_number",
                                      "fields":{
                                        "NUM":1
                                      }
                                    }
                                  },
                                  "TO":{
                                    "block":{
                                      "type":"lists_length",
                                      "inline":false,
                                      "inputs":{
                                        "VALUE":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"list"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "next":{
                            "block":{
                              "type":"variables_set",
                              "inline":false,
                              "fields":{
                                "VAR":{
                                  "name":"temp"
                                }
                              },
                              "inputs":{
                                "VALUE":{
                                  "block":{
                                    "type":"lists_getIndex",
                                    "fields":{
                                      "MODE":"GET",
                                      "WHERE":"FROM_START"
                                    },
                                    "inputs":{
                                      "VALUE":{
                                        "block":{
                                          "type":"variables_get",
                                          "fields":{
                                            "VAR":{
                                              "name":"list"
                                            }
                                          }
                                        }
                                      },
                                      "AT":{
                                        "block":{
                                          "type":"variables_get",
                                          "fields":{
                                            "VAR":{
                                              "name":"y"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "next":{
                                "block":{
                                  "type":"lists_setIndex",
                                  "inline":false,
                                  "fields":{
                                    "MODE":"SET",
                                    "WHERE":"FROM_START"
                                  },
                                  "inputs":{
                                    "LIST":{
                                      "block":{
                                        "type":"variables_get",
                                        "fields":{
                                          "VAR":{
                                            "name":"list"
                                          }
                                        }
                                      }
                                    },
                                    "AT":{
                                      "block":{
                                        "type":"variables_get",
                                        "fields":{
                                          "VAR":{
                                            "name":"y"
                                          }
                                        }
                                      }
                                    },
                                    "TO":{
                                      "block":{
                                        "type":"lists_getIndex",
                                        "fields":{
                                          "MODE":"GET",
                                          "WHERE":"FROM_START"
                                        },
                                        "inputs":{
                                          "VALUE":{
                                            "block":{
                                              "type":"variables_get",
                                              "fields":{
                                                "VAR":{
                                                  "name":"list"
                                                }
                                              }
                                            }
                                          },
                                          "AT":{
                                            "block":{
                                              "type":"variables_get",
                                              "fields":{
                                                "VAR":{
                                                  "name":"x"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "next":{
                                    "block":{
                                      "type":"lists_setIndex",
                                      "inline":false,
                                      "fields":{
                                        "MODE":"SET",
                                        "WHERE":"FROM_START"
                                      },
                                      "inputs":{
                                        "LIST":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"list"
                                              }
                                            }
                                          }
                                        },
                                        "AT":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"x"
                                              }
                                            }
                                          }
                                        },
                                        "TO":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"temp"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        },
        {
          "kind":"category",
          "name":"Jabberwocky",
          "contents":[
            {
              "kind":"block",
              "type":"text_print",
              "inputs":{
                "TEXT":{
                  "block":{
                    "type":"text",
                    "fields":{
                      "TEXT":"'Twas brillig, and the slithy toves"
                    }
                  }
                }
              },
              "next":{
                "block":{
                  "type":"text_print",
                  "inputs":{
                    "TEXT":{
                      "block":{
                        "type":"text",
                        "fields":{
                          "TEXT":"  Did gyre and gimble in the wabe:"
                        }
                      }
                    }
                  },
                  "next":{
                    "block":{
                      "type":"text_print",
                      "inputs":{
                        "TEXT":{
                          "block":{
                            "type":"text",
                            "fields":{
                              "TEXT":"All mimsy were the borogroves,"
                            }
                          }
                        }
                      },
                      "next":{
                        "block":{
                          "type":"text_print",
                          "inputs":{
                            "TEXT":{
                              "block":{
                                "type":"text",
                                "fields":{
                                  "TEXT":"  And the mome raths outgrabe."
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              "kind":"block",
              "type":"text_print",
              "inputs":{
                "TEXT":{
                  "block":{
                    "type":"text",
                    "fields":{
                      "TEXT":"\"Beware the Jabberwock, my son!"
                    }
                  }
                }
              },
              "next":{
                "block":{
                  "type":"text_print",
                  "inputs":{
                    "TEXT":{
                      "block":{
                        "type":"text",
                        "fields":{
                          "TEXT":"  The jaws that bite, the claws that catch!"
                        }
                      }
                    }
                  },
                  "next":{
                    "block":{
                      "type":"text_print",
                      "inputs":{
                        "TEXT":{
                          "block":{
                            "type":"text",
                            "fields":{
                              "TEXT":"Beware the Jubjub bird, and shun"
                            }
                          }
                        }
                      },
                      "next":{
                        "block":{
                          "type":"text_print",
                          "inputs":{
                            "TEXT":{
                              "block":{
                                "type":"text",
                                "fields":{
                                  "TEXT":"  The frumious Bandersnatch!\""
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

const CUSTOM_BLOCK_DEFINITIONS = [
  {
    // ClicBot example block
    "type": "clicbot_move_wheel",
    "message0": "Wheel %1 %2 %3 %4 rounds/minute",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_variable",
        "name": "NAME",
        "variable": "item"
      },
      {
        "type": "field_input",
        "name": "Wheel_num",
        "text": "Wheel_number_name"
      },
      {
        "type": "input_value",
        "name": "wheel_name",
        "check": "String"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "",
    "helpUrl": ""
  },

  // Spike example block
  {
    "type": "spike_run_motor",
    "message0": "Motor %1 run %2 for %3 %4",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MOTOR",
        "options": [
          ["A", "A"],
          ["B", "B"],
          ["C", "C"],
          ["D", "D"],
          ["E", "E"],
          ["F", "F"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["clockwise", "CLOCKWISE"],
          ["counter-clockwise", "COUNTERCLOCKWISE"]
        ]
      },
      {
        "type": "field_number",
        "name": "AMOUNT",
        "value": 1,
        "min": 0,
        "max": 999
      },
      {
        "type": "field_dropdown",
        "name": "UNIT",
        "options": [
          ["rotations", "ROTATIONS"],
          ["degrees", "DEGREES"],
          ["seconds", "SECONDS"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "Run a LEGO Spike motor",
    "helpUrl": ""
  }
];

//
// Categories from the original application. 
// Could be used for reference in building out the new toolbox
// There are visual examples of these blocks in assets/blocks/
//
//  ---------------------------------- ClicBot ---------------------------------- 
//
// [{
//     'name': 'Does ClicBot do something multiple times?',
//     'items': ['loop.png', 'loop-until.png', 'while-do.png', 'loop-for-times.png']
//   },
//   {
//     'name': 'Does ClicBot wait to do something??',
//     'items': ['if-do.png', 'delay-for-ms.png', 'delay-until.png']
//   },
//   {
//     'name': 'Does ClicBot make sound?',
//     'items': ['play.png', 'play-end.png', 'start-play.png', 'start-play-end.png']
//   },
//   {
//     'name': 'Does ClicBot display an emotion or a drawing?',
//     'items': ['screen-starts-playing-emotion.png', 'screen-starts-playing-emotion-till-the-end.png', 'screen-displays-drawing.png']
//   },
//   {
//     'name': 'Does ClicBot rotate its screen?',
//     'items': ['rotate.png', 'rotate-end.png']
//   },
//   {
//     'name': 'Does ClicBot rotate or move?',
//     'items': ['joint-rotate.png', 'joint-rotate-end.png', 'joint-rotate-speed.png', 'wheel-rotate.png']
//   },
//   {
//     'name': 'Does ClicBot change colors?',
//     'items': ['skeleton-color.png']
//   },
//   {
//     'name': 'Does ClicBot grasp or release something?',
//     'items': ['grasper.png']
//   },
//   {
//     'name': 'Does ClicBot use one of its sensors?',
//     'items': ['gesture.png', 'gesture-obs.png', 'touch.png', 'touch-brain.png', 'distance.png']
//   },
//   {
//     'name': 'Operators',
//     'items': ['and.png', 'or.png', 'not.png', 'empty.png']
//   }
// ];
//
// ---------------------------------- Spike ---------------------------------- 
//
// [{
//     'name': 'Does Spike do something multiple times?',
//     'items': ['loop.png', 'loop-until.png', 'while-do.png', 'loop-for-times.png']
//   },
//   {
//     'name': 'Does Spike wait to do something??',
//     'items': ['if-do.png', 'delay-for-ms.png', 'delay-until.png']
//   },
//   {
//     'name': 'Does Spike make sound?',
//     'items': ['play.png', 'play-end.png', 'start-play.png', 'start-play-end.png']
//   },
//   {
//     'name': 'Does Spike display drawing or light up?',
//     'items': ['screen-displays-drawing.png']
//     'items': ['screen-change-brightness.png']
//   },
//   {
//     'name': 'Does Spike rotate or move?',
//     'items': ['motor-rotate.png', 'motor-rotate-end.png', 'motor-rotate-speed.png']
//   },
//   {
//     'name': 'Does Spike use one of its sensors?',
//     'items': ['distance.png', 'color.png', 'force.png', 'gyro.png']
//   },
//   {
//     'name': 'Operators',
//     'items': ['and.png', 'or.png', 'not.png', 'empty.png']
//   }
// ];