const SPIKE = {
    device: null,
    server: null,
    writeChar: null,
  
    async connect() {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "LEGO" }],
        optionalServices: ["00001623-1212-efde-1623-785feabcd123"]
      });
  
      this.server = await this.device.gatt.connect();
  
      const service = await this.server.getPrimaryService(
        "00001623-1212-efde-1623-785feabcd123"
      );
  
      this.writeChar = await service.getCharacteristic(
        "00001624-1212-efde-1623-785feabcd123"
      );
  
      console.log("SPIKE connected");
    },
  
    async send(obj) {
      if (!this.writeChar) {
        console.error("SPIKE not connected");
        return;
      }
  
      const data = new TextEncoder().encode(JSON.stringify(obj));
      await this.writeChar.writeValue(data);
    }
  };