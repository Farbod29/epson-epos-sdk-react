'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importStar(require('react'));
const ThermalPrinter = () => {
  const [printerIPAddress, setPrinterIPAddress] = (0, react_1.useState)(
    '192.168.0.121'
  );
  const [printerPort, setPrinterPort] = (0, react_1.useState)('8008');
  const [textToPrint, setTextToPrint] = (0, react_1.useState)('');
  const [connectionStatus, setConnectionStatus] = (0, react_1.useState)('');
  const ePosDevice = (0, react_1.useRef)();
  const printer = (0, react_1.useRef)();
  const STATUS_CONNECTED = 'Connected';
  const connect = () => {
    setConnectionStatus('Connecting ...');
    if (!printerIPAddress) {
      setConnectionStatus('Type the printer IP address');
      return;
    }
    if (!printerPort) {
      setConnectionStatus('Type the printer port');
      return;
    }
    setConnectionStatus('Connecting ...');
    let ePosDev = new window.epson.ePOSDevice();
    ePosDevice.current = ePosDev;
    ePosDev.connect(printerIPAddress, printerPort, (data) => {
      if (data === 'OK') {
        ePosDev.createDevice(
          'local_printer',
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: true, buffer: false },
          (devobj, retcode) => {
            if (retcode === 'OK') {
              printer.current = devobj;
              setConnectionStatus(STATUS_CONNECTED);
            } else {
              throw retcode;
            }
          }
        );
      } else {
        throw data;
      }
    });
  };
  const print = (text) => {
    let prn = printer.current;
    if (!prn) {
      alert('Not connected to printer');
      return;
    }
    prn.addText(text);
    prn.addFeedLine(5);
    prn.addCut(prn.CUT_FEED);
    prn.send();
  };
  return (
    <div id="thermalPrinter">
      <input
        id="printerAddress"
        placeholder="192.168.2.36"
        value={printerIPAddress}
        onChange={(e) => setPrinterIPAddress(e.currentTarget.value)}
      />
      <input
        id="printerPort"
        placeholder="Printer Port"
        value={printerPort}
        onChange={(e) => setPrinterPort(e.currentTarget.value)}
      />
      <button
        disabled={connectionStatus === STATUS_CONNECTED}
        onClick={() => connect()}
      >
        Connect
      </button>
      <span className="status-label">{connectionStatus}</span>
      <hr />
      <textarea
        id="textToPrint"
        rows="3"
        placeholder="Text to print"
        value={textToPrint}
        onChange={(e) => setTextToPrint(e.currentTarget.value)}
      />
      <button
        disabled={connectionStatus !== STATUS_CONNECTED}
        onClick={() => print(textToPrint)}
      >
        Print
      </button>
    </div>
  );
};

export default ThermalPrinter;
//# sourceMappingURL=ThermalPrinter.js.map
