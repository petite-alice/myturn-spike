# MyTurn

## Adding custom code blocks
There is an online tool that lets you build up a new block using Blockly itself:
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html

Once you have defined your block, there are two steps within `block-config.js` to integrate it into the app.
1. Add the definition object to the `CUSTOM_BLOCK_DEFINITIONS` array. Copy the entire hash from the `Block Definition` section of the Block Factory app.
1. Add the block to the appropriate section of the "toolbox". Currently the toolbox is comprised of `BASE_BLOCKLY_TOOLBOX` and robot specific arrays (`CLICBOT_TOOLBOX`,`LEGO_SPIKE_TOOLBOX`, ...)<br/><br/>The new block can be referenced by the type field in the definition. The minimal reference looks like:<br/>
   ```
   {
      "kind":"block",
      "type":"my_custom_block_type"
   }
   ```
 
 
## Experiments
TODO: describe experiment and progression system

## Robots
TODO: describe robot configurations

## Data Model
TODO: describe all the models and key methods