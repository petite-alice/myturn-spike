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
    "name":"Does Spike do something multiple times?",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      },
    ]
  },
  {
    "kind":"category",
    "name":"Does Spike wait to do something?",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      }
    ]
  },
  {
    "kind":"category",
    "name":"Does Spike make sound",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      },
    ]
  },
  {
    "kind":"category",
    "name":"Does Spike display a drawing or light up?",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      },
    ]
  },
  {
    "kind": "category",
    "name": "Does Spike rotate or move?",
    "categorystyle": "math_category",
    "contents": [
      {
        "kind": "block",
        "type": "movement_move_for"
      },
      {
        "kind": "block",
        "type": "movement_start_moving"
      },
      {
        "kind": "block",
        "type": "movement_move_steering_for"
      },
      {
        "kind": "block",
        "type": "movement_start_moving_steering"
      },
      {
        "kind": "block",
        "type": "movement_stop_moving"
      },
      {
        "kind": "block",
        "type": "movement_set_speed"
      },
      {
        "kind": "block",
        "type": "movement_set_motors"
      },
      {
        "kind": "block",
        "type": "movement_set_motor_rotation"
      }
    ]
  },
  {
    "kind":"category",
    "name":"Does Spike use one of its sensors?",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      },
    ]
  },
  {
    "kind":"category",
    "name":"Operators",
    "categorystyle":"math_category",
    "contents":[
      { 
        "kind":"block",
        "type":"controls_if"
      },
    ]
  }
];

// Main Contents of the Blockly toolbox
const BASE_BLOCKLY_TOOLBOX = {
  "kind":"categoryToolbox",
  "contents":[
    {
      "kind":"category",
      "name":"Delete Later - If/Else",
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
      "name":"Delete Later - Logic",
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
      "name":"Delete Later - Loops",
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
      "name":"Delete Later - Math",
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
      "name":"Delete Later - Lists",
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
      "name":"Delete Later - Variables",
      "categorystyle":"variable_category",
      "custom":"VARIABLE"
    },
    {
      "kind":"category",
      "name":"Delete Later - Functions",
      "categorystyle":"procedure_category",
      "custom":"PROCEDURE"
    },
    {
      "kind":"category",
      "name":"Delete Later - Library",
      "expanded":"true",
      "contents":[
        {
          "kind":"category",
          "name":"Delete Later - Randomize",
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
          "name":"Delete Later - Jabberwocky",
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
  },
    // Does Spike rotate or move?
    {
      "type": "movement_move_for",
      "message0": "%1 move %2 for %3 %4",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "move"
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            ["forward", "FORWARD"],
            ["backward", "BACKWARD"]
          ]
        },
        {
          "type": "field_number",
          "name": "AMOUNT",
          "value": 10,
          "min": 0
        },
        {
          "type": "field_dropdown",
          "name": "UNIT",
          "options": [
            ["rotations", "ROTATIONS"],
            ["degrees", "DEGREES"],
            ["seconds", "SECONDS"],
            ["cm", "CM"],
            ["inches", "INCHES"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Move Spike forward or backward for a set amount.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_start_moving",
      "message0": "%1 start moving %2",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "start moving"
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            ["forward", "FORWARD"],
            ["backward", "BACKWARD"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Start moving Spike forward or backward.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_move_steering_for",
      "message0": "%1 move steering %2 for %3 %4",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "move steering"
        },
        {
          "type": "field_number",
          "name": "STEERING",
          "value": 30,
          "min": -100,
          "max": 100
        },
        {
          "type": "field_number",
          "name": "AMOUNT",
          "value": 10,
          "min": 0
        },
        {
          "type": "field_dropdown",
          "name": "UNIT",
          "options": [
            ["rotations", "ROTATIONS"],
            ["degrees", "DEGREES"],
            ["seconds", "SECONDS"],
            ["cm", "CM"],
            ["inches", "INCHES"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Move Spike with steering for a set amount.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_start_moving_steering",
      "message0": "%1 start moving steering %2",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "start moving steering"
        },
        {
          "type": "field_number",
          "name": "STEERING",
          "value": 30,
          "min": -100,
          "max": 100
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Start moving Spike with steering.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_stop_moving",
      "message0": "%1 stop moving",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "stop moving"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Stop Spike movement.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_set_speed",
      "message0": "%1 set movement speed to %2 %",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "movement speed"
        },
        {
          "type": "field_number",
          "name": "SPEED",
          "value": 50,
          "min": 0,
          "max": 100
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Set Spike movement speed.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_set_motors",
      "message0": "%1 set movement motors to %2",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "movement motors"
        },
        {
          "type": "field_dropdown",
          "name": "MOTORS",
          "options": [
            ["A+B", "A_B"],
            ["A+C", "A_C"],
            ["A+D", "A_D"],
            ["A+E", "A_E"],
            ["A+F", "A_F"],
        
            ["B+C", "B_C"],
            ["B+D", "B_D"],
            ["B+E", "B_E"],
            ["B+F", "B_F"],
        
            ["C+D", "C_D"],
            ["C+E", "C_E"],
            ["C+F", "C_F"],
        
            ["D+E", "D_E"],
            ["D+F", "D_F"],
        
            ["E+F", "E_F"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Choose which motors control Spike movement.",
      "helpUrl": ""
    },
  
    {
      "type": "movement_set_motor_rotation",
      "message0": "%1 set 1 motor rotation to %2 %3",
      "args0": [
        {
          "type": "field_image",
          "src": "assets/blocks/movement-wheel-icon.png",
          "width": 24,
          "height": 24,
          "alt": "motor rotation"
        },
        {
          "type": "field_number",
          "name": "DISTANCE",
          "value": 17.5,
          "min": 0
        },
        {
          "type": "field_dropdown",
          "name": "UNIT",
          "options": [
            ["cm", "CM"],
            ["inches", "INCHES"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 330,
      "tooltip": "Set how far Spike moves for one motor rotation.",
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