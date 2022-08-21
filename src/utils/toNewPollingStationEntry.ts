import { NewPollingStationEntry } from '../types';
import { isBoolean, isString } from './helper';

type PollingStationFields = {
  id: unknown;
  title: unknown;
  constituencyId: unknown;
  active: unknown;
  battleGround: unknown;
  period: unknown;
};

const toNewPollingStationEntry = ({
  id,
  title,
  active,
  constituencyId,
  battleGround,
  period,
}: PollingStationFields): NewPollingStationEntry => {
  const newPollingStation: NewPollingStationEntry = {
    id: parseId(id),
    title: parseTitle(title),
    active: parseActive(active),
    battleGround: parseBattleGround(battleGround),
    constituencyId: parseConstituencyId(constituencyId),
    period: parsePeriod(period),
  };

  return newPollingStation;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing polling station id: ' + id);
  }

  return id;
};

const parsePeriod = (period: unknown): string => {
  if (!period || !isString(period)) {
    throw new Error('Incorrect or missing period: ' + period);
  }

  return period;
};

const parseConstituencyId = (constituencyId: unknown): string => {
  if (!constituencyId || !isString(constituencyId)) {
    throw new Error('Incorrect or missing constituency id: ' + constituencyId);
  }

  return constituencyId;
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

export default toNewPollingStationEntry;
