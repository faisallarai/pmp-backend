import prisma from '../client';
import { Context } from '../context';
import { NewVoterEntry } from '../types';
import toNewVoterEntry from './toNewVoterEntry';

export const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

export const isBoolean = (param: unknown): param is boolean => {
  return typeof param === 'boolean' || param instanceof Boolean;
};

// export const isBoolean = (param: unknown): boolean => {
//   return Boolean(String(param) == 'true');
// };

export const isInteger = (param: unknown): param is number => {
  return typeof param === 'number' && param % 1 === 0;
};

export const isInt = (param: unknown): param is number => {
  return typeof param === 'number' && Number.isInteger(param);
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export async function createVoter(voter: NewVoterEntry, ctx: Context) {
  const voterEntry: NewVoterEntry = toNewVoterEntry(voter);

  return await ctx.prisma.voter.create({
    data: voterEntry,
  });
}

export async function addVoter(voter: NewVoterEntry) {
  const voterEntry: NewVoterEntry = toNewVoterEntry(voter);

  return await prisma.voter.create({
    data: voterEntry,
  });
}

export async function createVoters(voters: NewVoterEntry[], ctx: Context) {
  const voterEntries: NewVoterEntry[] = voters.map((obj) => {
    const object = toNewVoterEntry(obj);
    object.id = obj.id;
    return object;
  });

  return await ctx.prisma.voter.createMany({
    data: voterEntries,
  });
}

export async function addVoters(voters: NewVoterEntry[]) {
  const voterEntries: NewVoterEntry[] = voters.map((obj) => {
    const object = toNewVoterEntry(obj);
    object.id = obj.id;
    return object;
  });

  return await prisma.voter.createMany({
    data: voterEntries,
  });
}

export async function updateVoter(voter: NewVoterEntry, ctx: Context) {
  return await ctx.prisma.voter.update({
    where: { id: voter.id },
    data: voter,
  });
}
