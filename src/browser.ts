import { parse } from "svg-parser";
import QRCode from "qrcode-svg";
import IBAN from "iban";
import blobStream from "blob-stream";
import * as SwissQRBill_ from "./swissqrbill";


module SwissQRBill {

  export import data = SwissQRBill_.data;
  export import debtor = SwissQRBill_.debtor;
  export import creditor = SwissQRBill_.creditor;
  export import options = SwissQRBill_.options;
  export import PDFTable = SwissQRBill_.PDFTable;
  export import PDFRow = SwissQRBill_.PDFRow;
  export import PDFColumn = SwissQRBill_.PDFColumn;
  export import currency = SwissQRBill_.currency;
  export import size = SwissQRBill_.size;
  export import languages = SwissQRBill_.languages;

  export class PDF extends SwissQRBill_.PDF {

    constructor(data: data, outputPath: string, options?: options)
    constructor(data: data, outputPath: string, options?: options, callback?: Function)
    constructor(data: data, outputPath: string, callback?: Function)
    constructor(data: data, outputPath: string, optionsOrCallback?: options | Function, callbackOrUndefined?: Function | undefined){

      let callback: Function | undefined = undefined;
      let options: options | undefined = undefined;

      if(typeof optionsOrCallback === "object"){

        options = optionsOrCallback;

        if(typeof callbackOrUndefined === "function"){
          callback = callbackOrUndefined;
        }

      } else if(typeof optionsOrCallback === "function"){
        callback = optionsOrCallback;
      }

      super(data, options);

      const stream = super.pipe(blobStream());

      stream.on("finish", ev => {

        const blob = stream.toBlob("application/pdf");

        // or get a blob URL for display in the browser
        const url = stream.toBlobURL("application/pdf");

        console.log("url:" , url);

        if(typeof callback === "function"){
          callback(this);
        }

        this.emit("finish", ev);

      });

    }

  }
}

export = SwissQRBill;