import { Prisma } from '@prisma/client';
import prisma from '../client';
import { NewRegionEntry, RegionEntry } from '../types';
import toNewRegionEntry from '../utils/toNewRegionEntry';

const getRegions = async (): Promise<RegionEntry[]> => {
  const result = await prisma.region.findMany();

  console.log('result', result);

  // assert data
  const regions: RegionEntry[] = result.map((obj) => {
    const object = toNewRegionEntry(obj) as RegionEntry;
    console.log('object', object);

    object.id = obj.id;
    return object;
  });

  return regions;
};

const findById = async (id: string): Promise<RegionEntry> => {
  const result = await prisma.region.findUniqueOrThrow({
    where: { id: id },
  });

  // assert result
  const regionEntry: RegionEntry = toNewRegionEntry(result) as RegionEntry;
  return regionEntry;
};

const addRegion = async (entry: NewRegionEntry): Promise<RegionEntry> => {
  const newRegionEntry = toNewRegionEntry(entry);

  const result = await prisma.region.create({
    data: newRegionEntry,
  });

  // assert result
  const regionEntry: RegionEntry = toNewRegionEntry(result) as RegionEntry;

  return regionEntry;
};

type BulkRegion = {
  total: Prisma.BatchPayload;
  regionEntries: RegionEntry[];
};

const addBulkRegion = async (
  entries: NewRegionEntry[]
): Promise<BulkRegion> => {
  // assert data
  const regionEntries: RegionEntry[] = entries.map((obj) => {
    const object = toNewRegionEntry(obj) as RegionEntry;
    object.id = obj.id;
    return object;
  });

  const total = await prisma.region.createMany({
    data: regionEntries,
    skipDuplicates: true,
  });

  const bulkRegion: BulkRegion = {
    total,
    regionEntries,
  };

  return bulkRegion;
};

const regionService = {
  getRegions,
  findById,
  addRegion,
  addBulkRegion,
};

export default regionService;
