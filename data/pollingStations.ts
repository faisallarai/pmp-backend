import { PollingStationEntry } from '../src/types';
import toNewPollingStationEntry from '../src/utils/toNewPollingStationEntry';

const data = [
  {
    id: 'F2601SPS',
    title: 'PARKOSO POLICE STATION',
    active: true,
    battleGround: false,
    constituencyId: '26',
    period: 'DECEMBER 2020',
    voters: [],
  },
  {
    id: 'F261406A',
    title: 'HIGH TENSION PARKOSO',
    active: true,
    battleGround: false,
    constituencyId: '26',
    period: 'DECEMBER 2020',
    voters: [],
  },
  {
    id: 'F261406B',
    title: 'HIGH TENSION PARKOSO',
    active: true,
    battleGround: false,
    constituencyId: '26',
    period: 'DECEMBER 2020',
    voters: [],
  },
];

const pollingStationEntries: PollingStationEntry[] = data.map((obj) => {
  const object = toNewPollingStationEntry(obj) as PollingStationEntry;
  object.id = obj.id;
  return object;
});

export default pollingStationEntries;
