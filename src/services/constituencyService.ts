import { Prisma } from '@prisma/client';
import prisma from '../client';
import { NewConstituencyEntry, ConstituencyEntry } from '../types';
import toNewConstituencyEntry from '../utils/toNewConstituencyEntry';

const getConstituencies = async (): Promise<ConstituencyEntry[]> => {
  const result = await prisma.constituency.findMany();

  console.log('result', result);

  // assert data
  const constituencies: ConstituencyEntry[] = result.map((obj) => {
    const object = toNewConstituencyEntry(obj) as ConstituencyEntry;
    console.log('object', object);

    object.id = obj.id;
    return object;
  });

  return constituencies;
};

const findById = async (id: string): Promise<ConstituencyEntry> => {
  const result = await prisma.constituency.findUniqueOrThrow({
    where: { id: id },
  });

  // assert result
  const constituencyEntry: ConstituencyEntry = toNewConstituencyEntry(
    result
  ) as ConstituencyEntry;
  return constituencyEntry;
};

const addConstituency = async (
  entry: NewConstituencyEntry
): Promise<ConstituencyEntry> => {
  const newConstituencyEntry = toNewConstituencyEntry(entry);

  const result = await prisma.constituency.create({
    data: newConstituencyEntry,
  });

  // assert result
  const constituencyEntry: ConstituencyEntry = toNewConstituencyEntry(
    result
  ) as ConstituencyEntry;

  return constituencyEntry;
};

type BulkConstituency = {
  total: Prisma.BatchPayload;
  constituencyEntries: ConstituencyEntry[];
};

const addBulkConstituency = async (
  entries: NewConstituencyEntry[]
): Promise<BulkConstituency> => {
  // assert data
  const constituencyEntries: ConstituencyEntry[] = entries.map((obj) => {
    const object = toNewConstituencyEntry(obj) as ConstituencyEntry;
    object.id = obj.id;
    return object;
  });

  const total = await prisma.constituency.createMany({
    data: constituencyEntries,
    skipDuplicates: true,
  });

  const bulkConstituency: BulkConstituency = {
    total,
    constituencyEntries,
  };

  return bulkConstituency;
};

const constituencyService = {
  getConstituencies,
  findById,
  addConstituency,
  addBulkConstituency,
};

export default constituencyService;
