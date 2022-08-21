import { NewCountryEntry } from '../types';
import { isBoolean, isString } from './helper';

type CountryFields = {
  id: unknown;
  title: unknown;
  active: unknown;
};

const toNewCountryEntry = ({
  id,
  title,
  active,
}: CountryFields): NewCountryEntry => {
  const newCountry: NewCountryEntry = {
    id: parseId(id),
    title: parseTitle(title),
    active: parseActive(active),
  };

  return newCountry;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing country id: ' + id);
  }

  return id;
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

export default toNewCountryEntry;
