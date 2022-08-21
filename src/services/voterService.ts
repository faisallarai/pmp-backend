import { Prisma, PrismaClient } from '@prisma/client';
import { NewVoterEntry, VoterEntry } from '../types';
import toNewVoterEntry from '../utils/toNewVoterEntry';

const prisma = new PrismaClient();

const getVoters = async (): Promise<VoterEntry[]> => {
  const result = await prisma.voter.findMany();

  // assert data
  const voters: VoterEntry[] = result.map((obj) => {
    const object = toNewVoterEntry(obj) as VoterEntry;

    object.id = obj.id;
    return object;
  });

  return voters;
};

const findById = async (id: string): Promise<VoterEntry> => {
  const result = await prisma.voter.findUniqueOrThrow({
    where: { id: id },
  });

  // assert result
  const voterEntry: VoterEntry = toNewVoterEntry(result) as VoterEntry;
  return voterEntry;
};

const addVoter = async (entry: NewVoterEntry): Promise<VoterEntry> => {
  const newVoterEntry = toNewVoterEntry(entry);

  const result = await prisma.voter.create({
    data: newVoterEntry,
  });

  // assert result
  const voterEntry: VoterEntry = toNewVoterEntry(result) as VoterEntry;

  return voterEntry;
};

type BulkVoter = {
  total: Prisma.BatchPayload;
  voterEntries: VoterEntry[];
};

const addBulkVoter = async (entries: NewVoterEntry[]): Promise<BulkVoter> => {
  // assert data
  const voterEntries: VoterEntry[] = entries.map((obj) => {
    const object = toNewVoterEntry(obj) as VoterEntry;
    object.id = obj.id;
    return object;
  });

  const total = await prisma.voter.createMany({
    data: voterEntries,
    skipDuplicates: true,
  });

  const bulkVoter: BulkVoter = {
    total,
    voterEntries,
  };

  return bulkVoter;
};

const voterService = {
  getVoters,
  findById,
  addVoter,
  addBulkVoter,
};

export default voterService;
