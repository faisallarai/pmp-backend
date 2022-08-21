import { NewVoterEntry, Sex } from '../types';
import { isInteger, isString } from './helper';

type VoterFields = {
  id: unknown;
  countryId: unknown;
  regionId: unknown;
  districtId: unknown;
  constituencyId: unknown;
  pollingStationId: unknown;
  electoralAreaId: unknown;
  firstName: unknown;
  lastName: unknown;
  sex: unknown;
  age: unknown;
  photo: unknown;
  period: unknown;
};

const toBulkVoterEntry = ({
  id,
  countryId,
  regionId,
  districtId,
  constituencyId,
  pollingStationId,
  electoralAreaId,
  firstName,
  lastName,
  sex,
  age,
  photo,
  period,
}: VoterFields): NewVoterEntry[] => {
  const bulkVoter: NewVoterEntry[] = [
    {
      id: parseId(id),
      countryId: parseCountryId(countryId),
      regionId: parseRegionId(regionId),
      districtId: parseDistrictId(districtId),
      constituencyId: parseConstituencyId(constituencyId),
      pollingStationId: parsePollingStationId(pollingStationId),
      electoralAreaId: parseElectoralAreaId(electoralAreaId),
      firstName: parseName(firstName),
      lastName: parseName(lastName),
      sex: parseSex(sex),
      age: parseAge(age),
      photo: parsePhoto(photo),
      period: parsePeriod(period),
    },
  ];

  return bulkVoter;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing voter id: ' + id);
  }

  return id;
};

const parseCountryId = (countryId: unknown): string => {
  if (!countryId || !isString(countryId)) {
    throw new Error('Incorrect or missing country id: ' + countryId);
  }

  return countryId;
};

const parseElectoralAreaId = (electoralAreaId: unknown): string => {
  if (!electoralAreaId || !isString(electoralAreaId)) {
    throw new Error(
      'Incorrect or missing electoral area id: ' + electoralAreaId
    );
  }
  return electoralAreaId;
};

const parseDistrictId = (districtId: unknown): string => {
  if (!districtId || !isString(districtId)) {
    throw new Error('Incorrect or missing district: ' + districtId);
  }

  return districtId;
};

const parseConstituencyId = (constituencyId: unknown): string => {
  if (!constituencyId || !isString(constituencyId)) {
    throw new Error('Incorrect or missing constituency id: ' + constituencyId);
  }

  return constituencyId;
};

const parsePollingStationId = (pollingStationId: unknown): string => {
  if (!pollingStationId || !isString(pollingStationId)) {
    throw new Error(
      'Incorrect or missing pollingStation id: ' + pollingStationId
    );
  }

  return pollingStationId;
};

const parseRegionId = (regionId: unknown): string => {
  if (!regionId || !isString(regionId)) {
    throw new Error('Incorrect or missing region id: ' + regionId);
  }

  return regionId;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parsePhoto = (photo: unknown): string => {
  if (!photo || !isString(photo)) {
    throw new Error('Incorrect or missing image: ' + photo);
  }

  return photo;
};

const parsePeriod = (period: unknown): string => {
  if (!period || !isString(period)) {
    throw new Error('Incorrect or missing period: ' + period);
  }

  return period;
};

const parseAge = (age: unknown): number => {
  if (!age || !isInteger(age)) {
    throw new Error('Incorrect or missing age: ' + age);
  }

  return age;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSex = (param: any): param is Sex => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Sex).includes(param);
};

const parseSex = (sex: unknown): Sex => {
  if (!sex || !isSex(sex)) {
    throw new Error('Incorrect or missing sex: ' + sex);
  }
  return sex;
};

export default toBulkVoterEntry;
