import { Prisma } from '@prisma/client';
import prisma from '../client';
import { NewPollingStationEntry, PollingStationEntry } from '../types';
import toNewPollingStationEntry from '../utils/toNewPollingStationEntry';

const getPollingStations = async (): Promise<PollingStationEntry[]> => {
  const result = await prisma.pollingStation.findMany();

  console.log('result', result);

  // assert data
  const pollingStations: PollingStationEntry[] = result.map((obj) => {
    const object = toNewPollingStationEntry(obj) as PollingStationEntry;
    console.log('object', object);

    object.id = obj.id;
    return object;
  });

  return pollingStations;
};

const findById = async (id: string): Promise<PollingStationEntry> => {
  const result = await prisma.pollingStation.findUniqueOrThrow({
    where: { id: id },
  });

  // assert result
  const pollingStationEntry: PollingStationEntry = toNewPollingStationEntry(
    result
  ) as PollingStationEntry;
  return pollingStationEntry;
};

const addPollingStation = async (
  entry: NewPollingStationEntry
): Promise<PollingStationEntry> => {
  const newPollingStationEntry = toNewPollingStationEntry(entry);

  const result = await prisma.pollingStation.create({
    data: newPollingStationEntry,
  });

  // assert result
  const pollingStationEntry: PollingStationEntry = toNewPollingStationEntry(
    result
  ) as PollingStationEntry;

  return pollingStationEntry;
};

type BulkPollingStation = {
  total: Prisma.BatchPayload;
  pollingStationEntries: PollingStationEntry[];
};

const addBulkPollingStation = async (
  entries: NewPollingStationEntry[]
): Promise<BulkPollingStation> => {
  // assert data
  const pollingStationEntries: PollingStationEntry[] = entries.map((obj) => {
    const object = toNewPollingStationEntry(obj) as PollingStationEntry;
    object.id = obj.id;
    return object;
  });

  const total = await prisma.pollingStation.createMany({
    data: pollingStationEntries,
    skipDuplicates: true,
  });

  const bulkPollingStation: BulkPollingStation = {
    total,
    pollingStationEntries,
  };

  return bulkPollingStation;
};

const pollingStationService = {
  getPollingStations,
  findById,
  addPollingStation,
  addBulkPollingStation,
};

export default pollingStationService;
