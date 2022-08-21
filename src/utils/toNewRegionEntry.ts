import { NewRegionEntry } from '../types';
import { isBoolean, isString } from './helper';

type RegionFields = {
  id: unknown;
  title: unknown;
  active: unknown;
  battleGround: unknown;
  countryId: unknown;
};

const toNewRegionEntry = ({
  id,
  title,
  active,
  battleGround,
  countryId,
}: RegionFields): NewRegionEntry => {
  const newRegion: NewRegionEntry = {
    id: parseId(id),
    title: parseTitle(title),
    active: parseActive(active),
    battleGround: parseBattleGround(battleGround),
    countryId: parseCountryId(countryId),
  };

  return newRegion;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing region id: ' + id);
  }

  return id;
};

const parseCountryId = (countryId: unknown): string => {
  if (!countryId || !isString(countryId)) {
    throw new Error('Incorrect or missing countryId id: ' + countryId);
  }

  return countryId;
};

const parseTitle = (title: unknown): string => {
  if (!title || !isString(title)) {
    throw new Error('Incorrect or missing title: ' + title);
  }

  return title;
};

const parseActive = (active: unknown): boolean => {
  if (isBoolean(active) === false) {
    throw new Error('Incorrect or missing active: ' + active);
  }

  return Boolean(active);
};

const parseBattleGround = (battleGround: unknown): boolean => {
  if (!isBoolean(battleGround)) {
    throw new Error('Incorrect or missing battleGround: ' + battleGround);
  }

  return Boolean(battleGround);
};

export default toNewRegionEntry;
