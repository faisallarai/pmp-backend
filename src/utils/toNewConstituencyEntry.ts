import { NewConstituencyEntry } from '../types';
import { isBoolean, isString } from './helper';

type ConstituencyFields = {
  id: unknown;
  title: unknown;
  active: unknown;
  battleGround: unknown;
  districtId: unknown;
};

const toNewConstituencyEntry = ({
  id,
  title,
  active,
  battleGround,
  districtId,
}: ConstituencyFields): NewConstituencyEntry => {
  const newConstituency: NewConstituencyEntry = {
    id: parseId(id),
    title: parseTitle(title),
    active: parseActive(active),
    battleGround: parseBattleGround(battleGround),
    districtId: parseDistrictId(districtId),
  };

  return newConstituency;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing constituency id: ' + id);
  }

  return id;
};

const parseDistrictId = (districtId: unknown): string => {
  if (!districtId || !isString(districtId)) {
    throw new Error('Incorrect or missing district id: ' + districtId);
  }

  return districtId;
};

const parseTitle = (title: unknown): string => {
  if (!title || !isString(title)) {
    throw new Error('Incorrect or missing title: ' + title);
  }

  return title;
};

const parseActive = (active: unknown): boolean => {
  if (!isBoolean(active)) {
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

export default toNewConstituencyEntry;
