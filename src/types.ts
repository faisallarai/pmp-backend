export enum VotersPermission {
  CreateVoters = 'create:voters',
  UpdateVoters = 'update:voters',
  DeleteVoters = 'delete:voters',
  ReadVoters = 'read:voters',
}

export enum MembersPermission {
  CreateMembers = 'create:members',
  UpdateMembers = 'update:members',
  DeleteMembers = 'delete:members',
  ReadMembers = 'read:members',
}

export enum CountriesPermission {
  CreateCountries = 'create:countries',
  UpdateCountries = 'update:countries',
  DeleteCountries = 'delete:countries',
  ReadCountries = 'read:countries',
}

export enum RegionsPermission {
  CreateRegions = 'create:regions',
  UpdateRegions = 'update:regions',
  DeleteRegions = 'delete:regions',
  ReadRegions = 'read:regions',
}

export enum ConstituenciesPermission {
  CreateConstituencies = 'create:constituencies',
  UpdateConstituencies = 'update:constituencies',
  DeleteConstituencies = 'delete:constituencies',
  ReadConstituencies = 'read:constituencies',
}

export enum PollingStationsPermission {
  CreatePollingStations = 'create:pollingStations',
  UpdatePollingStations = 'update:pollingStations',
  DeletePollingStations = 'delete:pollingStations',
  ReadPollingStations = 'read:pollingStations',
}

export interface PartyEntry {
  id: string;
  title: string;
  code: string;
  active: boolean;
  members: MemberEntry[];
}

export type NewPartyEntry = Omit<PartyEntry, 'members'>;

export interface PositionEntry {
  id: string;
  title: string;
  active: boolean;
  members: MemberEntry[];
}

export type NewPositionEntry = Omit<PositionEntry, 'members'>;

export interface ReligionEntry {
  id: string;
  title: string;
  active: boolean;
  members: MemberEntry[];
}

export type NewReligionEntry = Omit<ReligionEntry, 'members'>;

export interface EducationEntry {
  id: string;
  title: string;
  active: boolean;
  members: MemberEntry[];
}

export type NewEducationEntry = Omit<EducationEntry, 'members'>;

export interface CountryEntry {
  id: string;
  title: string;
  active: boolean;
  regions: RegionEntry[];
  voters: VoterEntry[];
}

export type NewCountryEntry = Omit<CountryEntry, 'voters' | 'regions'>;

export interface RegionEntry {
  id: string;
  title: string;
  active: boolean;
  battleGround: boolean;
  countryId: string;
  country: CountryEntry;
  voters: VoterEntry[];
}

export type NewRegionEntry = Omit<RegionEntry, 'voters' | 'country'>;

export interface DistrictEntry {
  id: string;
  title: string;
  active: boolean;
  battleGround: boolean;
  regionId: string;
  region: RegionEntry;
  constituencies: ConstituencyEntry[];
  voters: VoterEntry[];
}

export type NewDistrictEntry = Omit<
  DistrictEntry,
  'voters' | 'constituencies' | 'region'
>;

export interface ConstituencyEntry {
  id: string;
  title: string;
  active: boolean;
  battleGround: boolean;
  districtId: string;
  district: DistrictEntry;
  pollingStations: PollingStationEntry[];
  voters: VoterEntry[];
}

export type NewConstituencyEntry = Omit<
  ConstituencyEntry,
  'voters' | 'pollingStations' | 'district'
>;

export interface PollingStationEntry {
  id: string;
  title: string;
  active: boolean;
  battleGround: boolean;
  constituencyId: string;
  period: string;
  constituency: ConstituencyEntry;
  voters: VoterEntry[];
}

export type NewPollingStationEntry = Omit<
  PollingStationEntry,
  'voters' | 'constituency'
>;

export enum Sex {
  Male = 'Male',
  Female = 'Female',
}

export interface VoterEntry {
  id: string;
  countryId: string;
  regionId: string;
  districtId: string;
  constituencyId: string;
  electoralAreaId: string;
  pollingStationId: string;
  firstName: string;
  lastName: string;
  photo: string;
  sex: Sex;
  age: number;
  period: string;
  member?: MemberEntry;
  country: CountryEntry;
  region: RegionEntry;
  district: DistrictEntry;
  constituency: ConstituencyEntry;
  pollingStation: PollingStationEntry;
  createdAt: Date;
  updatedAt: Date;
}

export type NonSensitiveVoterEntry = Omit<VoterEntry, 'age'>;

export type NewVoterEntry = Omit<
  VoterEntry,
  | 'createdAt'
  | 'updatedAt'
  | 'member'
  | 'region'
  | 'district'
  | 'constituency'
  | 'pollingStation'
  | 'country'
>;

export interface MemberEntry {
  id: string;
  partyId: string;
  voterId: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  dateOfBirth: string;
  positionId: number;
  religionId: number;
  educationId: number;
  status: string;
  remarks: string;
  createdAt: Date;
}

export type NonSensitiveMemberEntry = Omit<MemberEntry, 'dob'>;

export type NewMemberEntry = Omit<MemberEntry, 'id'>;
