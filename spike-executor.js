function executeSpikeBlock(block) {
    if (!block) return;
  
    switch (block.type) {
  
      case "spike_run_motor":
        SPIKE.send({
          type: "motor",
          motor: block.fields.MOTOR,
          direction: block.fields.DIRECTION,
          amount: block.fields.AMOUNT,
          unit: block.fields.UNIT
        });
        break;
    }
  
    if (block.next) {
      executeSpikeBlock(block.next);
    }
  }