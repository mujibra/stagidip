/* eslint-disable camelcase */
const testData = [
  {
    no: 1,
    item_desc: 'OS',
    fillcollom1: 'Win10 Enterprise LTSC 64-bit',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 2,
    item_desc: 'PROCESSOR',
    fillcollom1: 'Corel7-9700E CPU @2.60GHz (8 CPUs)',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 3,
    item_desc: 'MAINBOARD_CE',
    fillcollom1: 'H310',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 4,
    item_desc: 'MEMORY',
    fillcollom1: '1 x 32G',
    fillcollom2: 'DDR4',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 5,
    item_desc: 'MONITOR',
    fillcollom1: 15,
    fillcollom2: 'Full Touch Screen',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 6,
    item_desc: 'HDD',
    fillcollom1: '1TB & 2TB',
    fillcollom2: 'Seagate',
    fillcollom3: 'SATA 2.5',
    fillcollom4: 'testhdd4',
    results: 'OK',
  },
  {
    no: 7,
    item_desc: 'MCU',
    fillcollom1: 'Sankyo ICT3Q8-3HT2290-S (PN=5645000062)',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 8,
    item_desc: 'SPR',
    fillcollom1: 'SPR60',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 9,
    item_desc: 'EPP',
    fillcollom1: 'EPP-X1 (PN=7154110101)',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 10,
    item_desc: 'POWER_SUPPLY',
    fillcollom1: 'FSP750-10DGNHB; (PN=5621000058)',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 11,
    item_desc: 'CROPF',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 12,
    item_desc: 'CARDBIN',
    fillcollom1: 'carbihn11',
    fillcollom2: 'carbin2',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 13,
    item_desc: 'CASSETTE',
    fillcollom1: '8 Unit',
    fillcollom2: 'Tanpa logo BCA',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 14,
    item_desc: 'REJECT',
    fillcollom1: '2 Unit',
    fillcollom2: 'Tanpa logo BCA',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 15,
    item_desc: 'KUNCI FASCIA ATAS',
    fillcollom1: '2 pcs',
    fillcollom2: 'posisi kunci di arah depan bagian atas',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 16,
    item_desc: 'KUNCI FASCIABAWAH',
    fillcollom1: '2 pcs',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 17,
    item_desc: 'KUNCI_TOMBAK',
    fillcollom1: '2 pcs',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 18,
    item_desc: 'KUNCI CASSETTE/REJECT',
    fillcollom1: 'universal',
    fillcollom2: null,
    fillcollom3: 'Kode BCA1',
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 19,
    item_desc: 'CENCON',
    fillcollom1: 'Belum terpasang',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 20,
    item_desc: 'AS CENCON',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 21,
    item_desc: 'CAMERA',
    fillcollom1: 'Dilengkapi bracket terbaru',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 22,
    item_desc: 'KUNCI CARDBIN',
    fillcollom1: '2 pcs',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 23,
    item_desc: 'CARDLESS READER',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 24,
    item_desc: 'LAN CARD',
    fillcollom1: null,
    fillcollom2: 'land card',
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 25,
    item_desc: 'THERMAL PAPER',
    fillcollom1: '1 roll',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 26,
    item_desc: 'CABINET SENSOR',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 27,
    item_desc: 'SENSOR GETAR',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 28,
    item_desc: 'KABEL LAN',
    fillcollom1: 'Belden CAT6',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 29,
    item_desc: 'KABEL POWER',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 30,
    item_desc: 'KABEL SERIAL_UPS',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 31,
    item_desc: 'KABEL HDMI TO DVI',
    fillcollom1: 'Ada',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 32,
    item_desc: 'FDI',
    fillcollom1: 'Dengan sensor Askim',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 33,
    item_desc: 'LUBANG 3 WAY LOCK',
    fillcollom1: 'Kedalaman 10mm',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
  {
    no: 34,
    item_desc: 'PIN COVER',
    fillcollom1: 'Terpasang',
    fillcollom2: null,
    fillcollom3: null,
    fillcollom4: null,
    results: 'OK',
  },
];

const dataList = {
  OS: [
    {
      id: 1,
      item: 'OS',
      description: 'Win10 Enterprise LTSC 64-bit',
      created_at: '2023-04-11T23:56:08.000000Z',
      updated_at: '2023-05-08T04:09:50.000000Z',
    },
    {
      id: 41,
      item: 'OS',
      description: 'Win 11 64bit 2023',
      created_at: '2023-05-07T20:03:27.000000Z',
      updated_at: '2023-05-08T10:03:27.000000Z',
    },
  ],
  PROCCESOR: [
    {
      id: 2,
      item: 'PROCESSOR',
      description: 'Corel7-9700E CPU @2.60GHz (8 CPUs)',
      created_at: '2023-04-11T23:58:29.000000Z',
      updated_at: '2023-05-08T04:10:54.000000Z',
    },
  ],
  MAINBOARD_CE: [
    {
      id: 3,
      item: 'MAINBOARD_CE',
      description: 'H310',
      created_at: '2023-04-11T23:58:29.000000Z',
      updated_at: '2023-05-08T04:10:22.000000Z',
    },
  ],
  MEMORY_1: [
    {
      id: 4,
      item: 'MEMORY_1',
      description: '1 x 32G',
      created_at: '2023-04-11T23:58:29.000000Z',
      updated_at: '2023-05-08T04:16:08.000000Z',
    },
  ],
  MEMORY_2: [
    {
      id: 36,
      item: 'MEMORY_2',
      description: 'DDR4',
      created_at: '2023-05-07T14:16:19.000000Z',
      updated_at: '2023-05-08T04:16:19.000000Z',
    },
  ],
  MONITOR_1: [
    {
      id: 5,
      item: 'MONITOR_1',
      description: '15',
      created_at: '2023-04-11T23:59:56.000000Z',
      updated_at: '2023-06-10T05:11:57.000000Z',
    },
  ],
  MONITOR_2: [
    {
      id: 37,
      item: 'MONITOR_2',
      description: 'Full Touch Screen',
      created_at: '2023-05-07T14:18:40.000000Z',
      updated_at: '2023-05-08T04:18:40.000000Z',
    },
  ],
  HDD_1: [
    {
      id: 6,
      item: 'HDD_1',
      description: '1TB & 2TB',
      created_at: '2023-04-12T00:05:46.000000Z',
      updated_at: '2023-05-09T04:18:34.000000Z',
    },
  ],
  HDD_2: [
    {
      id: 38,
      item: 'HDD_2',
      description: 'Seagate',
      created_at: '2023-05-07T14:22:19.000000Z',
      updated_at: '2023-05-09T04:21:02.000000Z',
    },
  ],
  HDD_3: [
    {
      id: 39,
      item: 'HDD_3',
      description: 'SATA 2.5',
      created_at: '2023-05-07T14:23:11.000000Z',
      updated_at: '2023-06-10T05:12:43.000000Z',
    },
  ],
  HDD_4: [
    {
      id: 60,
      item: 'HDD_4',
      description: 'testhdd4',
      created_at: '2023-06-10T05:07:28.000000Z',
      updated_at: '2023-06-10T05:07:28.000000Z',
    },
  ],
  MCU: [
    {
      id: 7,
      item: 'MCU',
      description: 'Sankyo ICT3Q8-3HT2290-S (PN=5645000062)',
      created_at: '2023-04-12T00:05:46.000000Z',
      updated_at: '2023-04-12T14:05:46.000000Z',
    },
  ],
  SPR: [
    {
      id: 8,
      item: 'SPR',
      description: 'SPR60',
      created_at: '2023-04-12T00:05:46.000000Z',
      updated_at: '2023-04-12T14:05:46.000000Z',
    },
  ],
  EPP: [
    {
      id: 9,
      item: 'EPP_1',
      description: 'EPP-X1 (PN=7154110101)',
      created_at: '2023-04-12T00:05:46.000000Z',
      updated_at: '2023-05-09T02:53:10.000000Z',
    },
  ],
  POWER_SUPPLY: [
    {
      id: 10,
      item: 'POWER_SUPPLY',
      description: 'FSP750-10DGNHB; (PN=5621000058)',
      created_at: '2023-04-12T00:05:46.000000Z',
      updated_at: '2023-05-08T04:27:22.000000Z',
    },
  ],
  CROPF: [
    {
      id: 11,
      item: 'CROPF',
      description: 'Ada',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-04-12T14:10:19.000000Z',
    },
  ],
  CARDBIN_1: [
    {
      id: 61,
      item: 'CARDBIN_1',
      description: 'carbihn11',
      created_at: '2023-06-10T05:07:54.000000Z',
      updated_at: '2023-06-10T05:07:54.000000Z',
    },
  ],
  CARDBIN_2: [
    {
      id: 62,
      item: 'CARDBIN_2',
      description: 'carbin2',
      created_at: '2023-06-10T05:08:02.000000Z',
      updated_at: '2023-06-10T05:08:02.000000Z',
    },
  ],
  CASSETTE_1: [
    {
      id: 13,
      item: 'CASSETTE_1',
      description: '8 Unit',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T04:28:26.000000Z',
    },
  ],
  CASSETTE_2: [
    {
      id: 40,
      item: 'CASSETTE_2',
      description: 'Tanpa logo BCA',
      created_at: '2023-05-07T14:28:35.000000Z',
      updated_at: '2023-05-08T04:28:35.000000Z',
    },
  ],
  REJECT_1: [
    {
      id: 14,
      item: 'REJECT_1',
      description: '2 Unit',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-09T02:54:29.000000Z',
    },
  ],
  REJECT_2: [
    {
      id: 46,
      item: 'REJECT_2',
      description: 'Tanpa logo BCA',
      created_at: '2023-05-08T12:54:38.000000Z',
      updated_at: '2023-05-09T02:54:38.000000Z',
    },
  ],
  KUNCI_FASCIA_ATAS_1: [
    {
      id: 15,
      item: 'KUNCI_FASCIA_ATAS_1',
      description: '2 pcs',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-09T02:45:39.000000Z',
    },
  ],
  KUNCI_FASCIA_ATAS_2: [
    {
      id: 42,
      item: 'KUNCI_FASCIA_ATAS_2',
      description: 'posisi kunci di arah depan bagian atas',
      created_at: '2023-05-08T12:45:47.000000Z',
      updated_at: '2023-05-09T02:45:47.000000Z',
    },
  ],
  KUNCI_FASCIABAWAH: [
    {
      id: 16,
      item: 'KUNCI_FASCIA_BAWAH',
      description: '2 pcs',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T04:32:56.000000Z',
    },
  ],
  KUNCI_TOMBAK: [
    {
      id: 17,
      item: 'KUNCI_TOMBAK',
      description: '2 pcs',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T04:35:38.000000Z',
    },
  ],
  KUNCI_CASSETTE_REJECT_1: [
    {
      id: 18,
      item: 'KUNCI_CASSETTE_REJECT_1',
      description: 'universal',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-09T02:53:50.000000Z',
    },
  ],
  KUNCI_CASSETTE_REJECT_2: [
    {
      id: 44,
      item: 'KUNCI_CASSETTE_REJECT_2',
      description: '@2 pcs/cassette',
      created_at: '2023-05-08T12:54:00.000000Z',
      updated_at: '2023-05-09T02:54:00.000000Z',
    },
  ],
  KUNCI_CASSETTE_REJECT_3: [
    {
      id: 45,
      item: 'KUNCI_CASSETTE_REJECT_3',
      description: 'Kode BCA1',
      created_at: '2023-05-08T12:54:07.000000Z',
      updated_at: '2023-05-09T02:54:07.000000Z',
    },
  ],
  CENCON: [
    {
      id: 19,
      item: 'CENCON',
      description: 'Belum terpasang',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T04:37:15.000000Z',
    },
  ],
  AS_CENCON: [
    {
      id: 20,
      item: 'AS_CENCON',
      description: 'Ada',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T04:37:20.000000Z',
    },
  ],
  CAMERA: [
    {
      id: 21,
      item: 'CAMERA',
      description: 'Dilengkapi bracket terbaru',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T04:37:35.000000Z',
    },
  ],
  KUNCI_CARDBIN: [
    {
      id: 22,
      item: 'KUNCI_CARDBIN',
      description: '2 pcs',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T09:24:47.000000Z',
    },
  ],
  CARDLESS_READER: [
    {
      id: 23,
      item: 'CARDLESS_READER',
      description: 'Ada',
      created_at: '2023-04-12T00:10:19.000000Z',
      updated_at: '2023-05-08T09:25:02.000000Z',
    },
  ],
  LAN_CARD_1: [],
  LAN_CARD_2: [
    {
      id: 63,
      item: 'LAN_CARD_2',
      description: 'land card',
      created_at: '2023-06-10T05:08:56.000000Z',
      updated_at: '2023-06-10T05:08:56.000000Z',
    },
  ],
  THERMAL_PAPER: [
    {
      id: 25,
      item: 'THERMAL_PAPER',
      description: '1 roll',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-08T09:25:29.000000Z',
    },
  ],
  CABINET_SENSOR: [
    {
      id: 26,
      item: 'CABINET_SENSOR',
      description: 'Ada',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-09T02:57:17.000000Z',
    },
  ],
  SENSOR_GETAR: [
    {
      id: 27,
      item: 'SENSOR_GETAR',
      description: 'Ada',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-09T02:57:08.000000Z',
    },
  ],
  KABEL_LAN: [
    {
      id: 28,
      item: 'KABEL_LAN',
      description: 'Belden CAT6, +- 10m',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-09T02:58:31.000000Z',
    },
  ],
  KABEL_POWER: [
    {
      id: 29,
      item: 'KABEL_POWER',
      description: 'Ada',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-09T02:57:28.000000Z',
    },
  ],
  KABEL_SERIAL_UPS: [
    {
      id: 30,
      item: 'KABEL_SERIAL_UPS',
      description: 'Ada',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-09T02:57:35.000000Z',
    },
  ],
  KABEL_HDMI_TO_DVI_1: [
    {
      id: 31,
      item: 'KABEL_HDMI_TO_DVI_1',
      description: 'Ada',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-09T03:00:17.000000Z',
    },
  ],
  KABEL_HDMI_TO_DVI_2: [
    {
      id: 47,
      item: 'KABEL_HDMI_TO_DVI_2',
      description: '5 meter',
      created_at: '2023-05-08T13:00:31.000000Z',
      updated_at: '2023-05-09T03:00:31.000000Z',
    },
  ],
  KABEL_HDMI_TO_DVI_3: [
    {
      id: 48,
      item: 'KABEL_HDMI_TO_DVI_3',
      description: 'Belum terpasang',
      created_at: '2023-05-08T13:00:38.000000Z',
      updated_at: '2023-05-09T03:00:38.000000Z',
    },
  ],
  FDI: [
    {
      id: 32,
      item: 'FDI',
      description: 'Dengan sensor Askim',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-04-12T14:15:05.000000Z',
    },
  ],
  LUBANG_3_WAY_LOCK: [
    {
      id: 33,
      item: 'LUBANG_3_WAY_LOCK',
      description: 'Kedalaman 10mm',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-08T09:24:30.000000Z',
    },
  ],
  PIN_COVER: [
    {
      id: 34,
      item: 'PIN_COVER',
      description: 'Terpasang',
      created_at: '2023-04-12T00:15:05.000000Z',
      updated_at: '2023-05-08T09:23:57.000000Z',
    },
  ],
};

const manipulateDataList = (data, [...arg]) => {
  const copyData = { ...data };
  for (let i = 0; i < arg.length; i += 1) {
    copyData[arg[i].new] = data[arg[i].old];
  }
  return copyData;
};

const descToId = ({ data, list, item }) => {
  let id = 0;
  const listRefine = list.replaceAll(' ', '_').replaceAll('/', '_');
  // console.log(listRefine, 'item', item, data[listRefine]);
  const listItems = data[listRefine];
  const indexId = listItems?.findIndex((ele) => ele.description === item);
  if (indexId !== -1) {
    id = data[listRefine][indexId].id;
  }
  return id;
};

const dataExeltoBody = ({ data, id_spek_mesin_hdr, datalist }) => {
  class BodyData {
    constructor(idSpek, desc, fill) {
      this.id_spek = idSpek;
      this.desc = desc;
      this.fill = fill;
      this.result = 'OK';
    }

    getBody() {
      return {
        id_spek_mesin_hdr: this.id_spek,
        item_desc: this.desc,
        fill_description: this.fill,
        result: this.result,
      };
    }

    getDesc() {
      return this.desc;
    }
  }
  const dataArray = [];
  if (typeof data === 'object' && data?.length > 0) {
    for (let i = 0; i < data.length; i += 1) {
      // console.log('list = ', data[i].item_desc);
      let fill = data[i].fillcollom1;
      if (
        data[i].fillcollom2 !== null ||
        data[i].fillcollom3 !== null ||
        data[i].fillcollom4 !== null ||
        data[i].item_desc === 'KABEL HDMI TO DVI' ||
        data[i].item_desc === 'KUNCI CASSETTE/REJECT' ||
        data[i].item_desc === 'HDD'
      ) {
        fill = [null];
        if (
          data[i].item_desc === 'KABEL HDMI TO DVI' ||
          data[i].item_desc === 'KUNCI CASSETTE/REJECT'
        ) {
          fill = Array(3).fill(null);
        }
        if (data[i].item_desc === 'HDD') {
          fill = Array(4).fill(null);
        }
        if (
          data[i].item_desc === 'MEMORY' ||
          data[i].item_desc === 'MONITOR' ||
          data[i].item_desc === 'CARDBIN' ||
          data[i].item_desc === 'CASSETTE' ||
          data[i].item_desc === 'REJECT' ||
          data[i].item_desc === 'KUNCI FASCIA ATAS' ||
          data[i].item_desc === 'LAN CARD'
        ) {
          fill = Array(2).fill(null);
        }
        for (let j = 1; j <= 4; j += 1) {
          if (data[i][`fillcollom${j}`] !== null) {
            fill[j - 1] = data[i][`fillcollom${j}`];
          }
        }
      }
      // console.log(fill, 'check fill');
      if (typeof fill === 'object' && fill?.length > 0) {
        const copyFill = [...fill];
        for (let k = 0; k < fill?.length; k += 1) {
          copyFill[k] = descToId({
            data: manipulateDataList(datalist, [{ old: 'PROCCESOR', new: 'PROCESSOR' }]),
            list: `${data[i].item_desc}_${k + 1}`,
            item: fill[k],
          });
        }
        fill = copyFill;
      } else {
        fill = descToId({
          data: manipulateDataList(datalist, [{ old: 'PROCCESOR', new: 'PROCESSOR' }]),
          list: data[i].item_desc,
          item: fill,
        });
      }
      const body = new BodyData(id_spek_mesin_hdr, data[i].item_desc, fill);

      dataArray[i] = body.getBody();
    }
  }
  return dataArray;
};

// console.log(dataExeltoBody({ data: testData, datalist: dataList, id_spek_mesin_hdr: 3 }));
export default dataExeltoBody;