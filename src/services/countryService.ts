import { Prisma } from '@prisma/client';
import prisma from '../client';
import { NewCountryEntry, CountryEntry } from '../types';
import toNewCountryEntry from '../utils/toNewCountryEntry';

const getCountries = async (): Promise<CountryEntry[]> => {
  const result = await prisma.country.findMany();

  console.log('result', result);

  // assert data
  const countries: CountryEntry[] = result.map((obj) => {
    const object = toNewCountryEntry(obj) as CountryEntry;
    console.log('object', object);

    object.id = obj.id;
    return object;
  });

  return countries;
};

const findById = async (id: string): Promise<CountryEntry> => {
  const result = await prisma.country.findUniqueOrThrow({
    where: { id: id },
  });

  // assert result
  const countryEntry: CountryEntry = toNewCountryEntry(result) as CountryEntry;
  return countryEntry;
};

const addCountry = async (entry: NewCountryEntry): Promise<CountryEntry> => {
  const newCountryEntry = toNewCountryEntry(entry);

  const result = await prisma.country.create({
    data: newCountryEntry,
  });

  // assert result
  const countryEntry: CountryEntry = toNewCountryEntry(result) as CountryEntry;

  return countryEntry;
};

type BulkCountry = {
  total: Prisma.BatchPayload;
  countryEntries: CountryEntry[];
};

const addBulkCountry = async (
  entries: NewCountryEntry[]
): Promise<BulkCountry> => {
  // assert data
  const countryEntries: CountryEntry[] = entries.map((obj) => {
    const object = toNewCountryEntry(obj) as CountryEntry;
    object.id = obj.id;
    return object;
  });

  const total = await prisma.country.createMany({
    data: countryEntries,
    skipDuplicates: true,
  });

  const bulkCountry: BulkCountry = {
    total,
    countryEntries,
  };

  return bulkCountry;
};

const countryService = {
  getCountries,
  findById,
  addCountry,
  addBulkCountry,
};

export default countryService;
