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
    "categorystyle":"loop_category",
    "contents": [
      {
        "kind": "block",
        "type": "controls_repeat_ext"
      },
      {
        "kind": "block",
        "type": "controls_whileUntil"
      },
      {
        "kind": "block",
        "type": "controls_for",
        "fields": {
          "VAR": "i"
        }
      },
      {
        "kind": "block",
        "type": "controls_forEach"
      },
      {
        "kind": "block",
        "type": "controls_flow_statements"
      }
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
    "name":"Does Spike make sound",
    "categorystyle":"math_category",
    "contents": [
      {"kind":"block","type":"sound_play_until_done"},
      {"kind":"block","type":"sound_start"},
      {"kind":"block","type":"sound_play_beep"},
      {"kind":"block","type":"sound_start_beep"},
      {"kind":"block","type":"sound_stop_all"},
      {"kind":"block","type":"sound_change_effect"},
      {"kind":"block","type":"sound_set_effect"},
      {"kind":"block","type":"sound_clear_effects"},
      {"kind":"block","type":"sound_change_volume"},
      {"kind":"block","type":"sound_set_volume"},
      {"kind":"block","type":"sound_volume"}
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
      {"kind":"block","type":"sensor_is_color"},
      {"kind":"block","type":"sensor_reflection_compare"},
      {"kind":"block","type":"sensor_pressure_state"},
      {"kind":"block","type":"sensor_distance_compare"},
      {"kind":"block","type":"sensor_tilt"},
      {"kind":"block","type":"sensor_side_up"},
      {"kind":"block","type":"sensor_motion"},
      {"kind":"block","type":"sensor_button"},
      {"kind":"block","type":"sensor_color_value"},
      {"kind":"block","type":"sensor_reflection_value"},
      {"kind":"block","type":"sensor_pressure_value"},
      {"kind":"block","type":"sensor_distance_value"},
      {"kind":"block","type":"sensor_angle"},
      {"kind":"block","type":"sensor_timer"},
      {"kind":"block","type":"sensor_set_yaw_zero"},
      {"kind":"block","type":"sensor_reset_timer"}
    ]
  },
  {
    "kind":"category",
    "name":"Does Spike compare or use values?",
    "categorystyle":"variable_category", // Just to change color, they are not all variables
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
        "type":"logic_boolean"
      },
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
        "type":"math_modulo"
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

  // Does Spike make a sound?
  {
    "type": "sound_play_until_done",
    "message0": "play sound %1 until done",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "SOUND",
        "options": [
          ["Cat Meow 1", "CAT_MEOW_1"],
          ["Add sound...", "ADD_SOUND"],
          ["Record...", "RECORD"],
          ["Edit sounds...", "EDIT_SOUNDS"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_start",
    "message0": "start sound %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "SOUND",
        "options": [
          ["Cat Meow 1", "CAT_MEOW_1"],
          ["Add sound...", "ADD_SOUND"],
          ["Record...", "RECORD"],
          ["Edit sounds...", "EDIT_SOUNDS"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_play_beep",
    "message0": "play beep %1 for %2 seconds",
    "args0": [
      {
        "type": "field_number",
        "name": "NOTE",
        "value": 60,
        "min": 48,
        "max": 108
      },
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1,
        "min": 0,
        "max": 999,
        "precision": 0.1
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_start_beep",
    "message0": "start playing beep %1",
    "args0": [
      {
        "type": "field_number",
        "name": "NOTE",
        "value": 60,
        "min": 48,
        "max": 108
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_stop_all",
    "message0": "stop all sounds",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_change_effect",
    "message0": "change %1 effect by %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EFFECT",
        "options": [
          ["pitch", "PITCH"],
          ["pan left/right", "PAN"]
        ]
      },
      {
        "type": "field_number",
        "name": "VALUE",
        "value": 10,
        "min": 0,
        "max": 999
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_set_effect",
    "message0": "set %1 effect to %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EFFECT",
        "options": [
          ["pitch", "PITCH"],
          ["pan left/right", "PAN"]
        ]
      },
      {
        "type": "field_number",
        "name": "VALUE",
        "value": 100,
        "min": 0,
        "max": 999
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_clear_effects",
    "message0": "clear sound effects",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_change_volume",
    "message0": "change volume by %1",
    "args0": [
      {
        "type": "field_number",
        "name": "VOLUME",
        "value": 10,
        "min": -100,
        "max": 100
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_set_volume",
    "message0": "set volume to %1 %",
    "args0": [
      {
        "type": "field_number",
        "name": "VOLUME",
        "value": 100,
        "min": 0,
        "max": 100
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  },

  {
    "type": "sound_volume",
    "message0": "volume",
    "output": "Number",
    "colour": 290
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
  },

  // Does spike use one of it's sensors?

  // Color Sensor
  {
    "type": "sensor_is_color",
    "message0": "Sensor %1 color is %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "COLOR",
        "options": [
          ["red","RED"],["orange","ORANGE"],["yellow","YELLOW"],
          ["green","GREEN"],["blue","BLUE"],["purple","PURPLE"],
          ["black","BLACK"],["white","WHITE"],["pink","PINK"],["brown","BROWN"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 20,
    "tooltip": "Color sensor"
  },

  {
    "type": "sensor_reflection_compare",
    "message0": "Sensor %1 reflection %2 %3 %",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [["<","LT"],["=","EQ"],[">","GT"]]
      },
      {
        "type": "field_number",
        "name": "VALUE",
        "value": 50,
        "min": 0,
        "max": 100
      }
    ],
    "output": "Boolean",
    "colour": 20,
    "tooltip": "Color sensor reflection"
  },

  // Force Sensor
  {
    "type": "sensor_pressure_state",
    "message0": "Sensor %1 is %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "STATE",
        "options": [
          ["pressed","PRESSED"],
          ["hard-pressed","HARD"],
          ["released","RELEASED"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 60,
    "tooltip": "Pressure sensor"
  },

  {
    "type": "sensor_distance_compare",
    "message0": "Sensor %1 distance is %2 %3 %4",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["closer than","LT"],
          ["farther than","GT"],
          ["exactly at","EQ"]
        ]
      },
      {
        "type": "field_number",
        "name": "VALUE",
        "value": 10,
        "min": 0,
        "max": 999
      },
      {
        "type": "field_dropdown",
        "name": "UNIT",
        "options": [
          ["%","PERCENT"],
          ["cm","CM"],
          ["in","IN"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 60,
    "tooltip": "Distance sensor"
  },

  // Motion Sensor
  {
    "type": "sensor_tilt",
    "message0": "is tilted %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["up","UP"],
          ["down","DOWN"],
          ["left","LEFT"],
          ["right","RIGHT"],
          ["any direction","ANY"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 100,
    "tooltip": "Gyro sensor"
  },

  {
    "type": "sensor_side_up",
    "message0": "Sensor %1 side %2 is up",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "SIDE",
        "options": [
          ["front","FRONT"],
          ["back","BACK"],
          ["top","TOP"],
          ["bottom","BOTTOM"],
          ["right","RIGHT"],
          ["left","LEFT"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 100,
    "tooltip": "Orientation sensor"
  },

  {
    "type": "sensor_motion",
    "message0": "is %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MOTION",
        "options": [
          ["shaken","SHAKEN"],
          ["tapped","TAPPED"],
          ["falling","FALLING"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 100,
    "tooltip": "Motion sensor"
  },

  // Button Sensor
  {
    "type": "sensor_button",
    "message0": "Sensor %1 button %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "STATE",
        "options": [
          ["pressed","PRESSED"],
          ["released","RELEASED"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 140,
    "tooltip": "Button sensor"
  },

  // Values

  {
    "type": "sensor_color_value",
    "message0": "Sensor %1 color",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      }
    ],
    "output": "String",
    "colour": 200,
    "tooltip": "Color value"
  },

  {
    "type": "sensor_reflection_value",
    "message0": "Sensor %1 reflected light",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      }
    ],
    "output": "Number",
    "colour": 200,
    "tooltip": "Reflection value"
  },

  {
    "type": "sensor_pressure_value",
    "message0": "Sensor %1 pressure in %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "UNIT",
        "options": [
          ["%","PERCENT"],
          ["newton","NEWTON"]
        ]
      }
    ],
    "output": "Number",
    "colour": 200,
    "tooltip": "Pressure value"
  },

  {
    "type": "sensor_distance_value",
    "message0": "Sensor %1 distance in %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"]]
      },
      {
        "type": "field_dropdown",
        "name": "UNIT",
        "options": [
          ["%","PERCENT"],
          ["cm","CM"],
          ["in","IN"]
        ]
      }
    ],
    "output": "Number",
    "colour": 200,
    "tooltip": "Distance value"
  },

  {
    "type": "sensor_angle",
    "message0": "%1 angle",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "AXIS",
        "options": [
          ["pitch","PITCH"],
          ["roll","ROLL"],
          ["yaw","YAW"]
        ]
      }
    ],
    "output": "Number",
    "colour": 200,
    "tooltip": "Gyro angle"
  },

  {
    "type": "sensor_timer",
    "message0": "timer",
    "output": "Number",
    "colour": 200,
    "tooltip": "Timer value"
  },

  // Action Blocks

  {
    "type": "sensor_set_yaw_zero",
    "message0": "set yaw angle to 0",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Reset yaw"
  },

  {
    "type": "sensor_reset_timer",
    "message0": "reset timer",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Reset timer"
  }
];

// CUSTOM_BLOCK_DEFINITIONS


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