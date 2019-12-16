//% weight=0 color=#000000 icon="\uf0ad" block="Aist2010"
namespace aist2010 {

    /**
     * Transport needs to be set prior to using MIDI APIs
     */
    let transport: (data: Buffer) => void;

    /**
     * Sets the transport mechanism to send MIDI commands
     * @param newTransport current transport
     */
    //% advanced=true blockHidden=1
    export function setTransport(newTransport: (data: Buffer) => void) {
        transport = newTransport;
    }

 
    /**
    * 計算長方形面積，不回傳，只顯示在LED
    */
    //% blockId="ledOfRectangle" block="show length of rectangle length %length|width %width"
    //% blockGap=2 weight=1
    export function ledOfRectangle(length: number, width:number): void {
        basic.showNumber((length+width)*2)
    }

    /**
     * Send human readable MIDI messages via serials
     */
    //% blockId=midi_serial_transport block="midi use serial"
    //% weight=1 blockGap=8
    //% group=Transports
    export function useSerial() {
        function send(data: Buffer): void {
            // waiting for beta
            //const buf = pins.createBuffer(data.length);
            //for (let i = 0; i < data.length; ++i)
            //    buf[i] = data[i];
            // serial.writeBuffer(buf);
            serial.writeString("midi:")
            for (let i = 0; i < data.length; ++i) {
                if (i > 0) serial.writeString(",");
                serial.writeNumber(data[i]);
            }
            serial.writeLine("");
        }
        setTransport(send)
    }





    /**
     * Sends a MIDI message
     * @param data 1,2 or 3 numbers
     */
    //% advanced=true blockHidden=1
    export function sendMessage(data: number[]) {
        if (!transport) return;

        const buf = pins.createBuffer(data.length);
        for (let i = 0; i < data.length; ++i)
            buf.setNumber(NumberFormat.UInt8LE, i, data[i])
        control.__midiSend(buf); // simulator support
        transport(buf);
    }




}
