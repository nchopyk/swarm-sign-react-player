export interface MasterRatingData {
  connectedDevices: {
    count: number;
    normalized: number;
  };
  wifiSignal: {
    dbm: number;
    normalized: number;
  };
  processorLoad: {
    percent: number;
    normalized: number;
  };
  freeRam: {
    mb: number;
    normalized: number;
  };
  totalRam: {
    mb: number;
    normalized: number;
  };
  uptime: {
    seconds: number;
    normalized: number;
  };
  internetConnection: {
    type: 'wired' | 'wireless';
    normalized: number;
  };
  rating: number;
}
