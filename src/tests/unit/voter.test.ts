import { Prisma } from '@prisma/client';
import { Context, createMockContext, MockContext } from '../../context';
import { VoterEntry } from '../../types';
import { createVoter, createVoters, updateVoter } from '../../utils/helper';
import toNewVoterEntry from '../../utils/toNewVoterEntry';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('create voter', () => {
  test('should create new voter ', async () => {
    const voter = {
      id: '1395002064',
      countryId: 'GH',
      regionId: 'F',
      districtId: 'ASOKORE MAMPONG',
      constituencyId: '26',
      pollingStationId: 'F2601SPS',
      electoralAreaId: '01',
      firstName: 'WUTISMAN',
      lastName: 'ACHAMAA JOSEPH',
      sex: 'Male',
      age: 33,
      photo: 'F2601SPS_11_9.png',
      period: 'DECEMBER 2020',
    };
    const voterEntry: VoterEntry = toNewVoterEntry(voter) as VoterEntry;
    mockCtx.prisma.voter.create.mockResolvedValue(voterEntry);

    await expect(createVoter(voterEntry, ctx)).resolves.toEqual(voter);
  });

  test('should create bulk user ', async () => {
    const voters = [
      {
        id: '1395002064',
        countryId: 'GH',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'WUTISMAN',
        lastName: 'ACHAMAA JOSEPH',
        sex: 'Male',
        age: 33,
        photo: 'F2601SPS_11_9.png',
        period: 'DECEMBER 2020',
      },
      {
        id: '1395002064',
        countryId: 'GH',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'WUTISMAN',
        lastName: 'ACHAMAA JOSEPH',
        sex: 'Male',
        age: 33,
        photo: 'F2601SPS_11_9.png',
        period: 'DECEMBER 2020',
      },
    ];

    const voterEntries: VoterEntry[] = voters.map((obj) => {
      const object = toNewVoterEntry(obj) as VoterEntry;
      object.id = obj.id;
      return object;
    });

    mockCtx.prisma.voter.createMany.mockResolvedValue({
      count: voterEntries.length,
    } as Prisma.BatchPayload);

    await expect(createVoters(voterEntries, ctx)).resolves.toEqual({
      count: 2,
    });
  });
});

describe('update voter', () => {
  test('should update a voters age ', async () => {
    const voter = {
      id: '1395002064',
      countryId: 'GH',
      regionId: 'F',
      districtId: 'ASOKORE MAMPONG',
      constituencyId: '26',
      pollingStationId: 'F2601SPS',
      electoralAreaId: '01',
      firstName: 'WUTISMAN',
      lastName: 'ACHAMAA JOSEPH',
      sex: 'Male',
      age: 40,
      photo: 'F2601SPS_11_9.png',
      period: 'DECEMBER 2020',
    };
    const voterEntry: VoterEntry = toNewVoterEntry(voter) as VoterEntry;

    mockCtx.prisma.voter.update.mockResolvedValue(voterEntry);

    await expect(updateVoter(voterEntry, ctx)).resolves.toEqual(voterEntry);
  });
});
