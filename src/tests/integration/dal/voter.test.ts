import prisma from '../../../client';
import { Sex } from '../../../types';
import { addVoter, addVoters } from '../../../utils/helper';

beforeAll(async () => {
  // create countries
  await prisma.country.createMany({
    data: [
      {
        id: 'GH',
        title: 'GHANA',
        active: true,
      },
      {
        id: 'NG',
        title: 'NIGERIA',
        active: true,
      },
    ],
  });

  console.log('✨ 2 countries successfully created!');

  // create regions
  await prisma.region.createMany({
    data: [
      {
        id: 'F',
        title: 'ASHANTI',
        active: true,
        battleGround: false,
        countryId: 'GH',
      },
      {
        id: 'A',
        title: 'GREATER ACCRA',
        active: true,
        battleGround: true,
        countryId: 'GH',
      },
    ],
  });

  console.log('✨ 2 regions successfully created!');

  // create constituencies
  await prisma.constituency.createMany({
    data: [
      {
        id: '26',
        title: 'ASAWASE',
        active: true,
        battleGround: true,
        districtId: 'ASOKORE MAMPONG',
      },
    ],
  });

  console.log('✨ 1 constituencies successfully created!');

  // create polling stations
  await prisma.pollingStation.createMany({
    data: [
      {
        id: 'F2601SPS',
        title: 'PARKOSO POLICE STATION',
        active: true,
        battleGround: false,
        constituencyId: '26',
        period: 'DECEMBER 2020',
      },
      {
        id: 'F261406A',
        title: 'HIGH TENSION PARKOSO',
        active: true,
        battleGround: false,
        constituencyId: '26',
        period: 'DECEMBER 2020',
      },
      {
        id: 'F261406B',
        title: 'HIGH TENSION PARKOSO',
        active: true,
        battleGround: false,
        constituencyId: '26',
        period: 'DECEMBER 2020',
      },
    ],
  });

  console.log('✨ 3 polling stations successfully created!');
});

describe('create voter', () => {
  it('should create 1 new voter', async () => {
    // The new voter details
    const newVoter = {
      id: '1395002064',
      countryId: 'GH',
      regionId: 'F',
      districtId: 'ASOKORE MAMPONG',
      constituencyId: '26',
      pollingStationId: 'F2601SPS',
      electoralAreaId: '01',
      firstName: 'WUTISMAN',
      lastName: 'ACHAMAA JOSEPH',
      sex: Sex.Male,
      age: 33,
      photo: 'F2601SPS_11_9.png',
      period: 'DECEMBER 2020',
    };

    // Create the voter
    await addVoter(newVoter);

    // Check if the new voter was created by filtering on unique id field
    const voterEntry = await prisma.voter.findUnique({
      where: {
        id: newVoter.id,
      },
      select: {
        id: true,
        countryId: true,
        regionId: true,
        districtId: true,
        constituencyId: true,
        pollingStationId: true,
        electoralAreaId: true,
        firstName: true,
        lastName: true,
        sex: true,
        age: true,
        photo: true,
        period: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    console.log(newVoter);
    console.log(voterEntry);

    // Expect the new voter to have been created and match the input
    expect(newVoter).toEqual(voterEntry);
    // Expect the new voter to have been created and contain age
    expect(voterEntry).toHaveProperty('age', 33);
  });

  it('should create 6 new voters', async () => {
    // The new voter details
    const newVoters = [
      {
        id: '1395002065',
        countryId: 'NG',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'WUTISMAN',
        lastName: 'ACHAMAA JOSEPH',
        sex: Sex.Male,
        age: 33,
        photo: 'F2601SPS_11_9.png',
        period: 'DECEMBER 2020',
      },
      {
        id: '1395021072',
        countryId: 'NG',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'YAHAYA',
        lastName: 'MARTIN',
        sex: Sex.Male,
        age: 39,
        photo: 'F2601SPS_11_10.png',
        period: 'DECEMBER 2020',
      },
      {
        id: '1399015481',
        countryId: 'NG',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'YAHAYA',
        lastName: 'TAHIRU',
        sex: Sex.Male,
        age: 36,
        photo: 'F2601SPS_11_11.png',
        period: 'DECEMBER 2020',
      },
      {
        id: '1396003161',
        countryId: 'NG',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'YAKUB',
        lastName: 'FAUZIA',
        sex: Sex.Female,
        age: 30,
        photo: 'F2601SPS_11_12.png',
        period: 'DECEMBER 2020',
      },
      {
        id: '1390029899',
        countryId: 'NG',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'YANKYERA',
        lastName: 'DICKSON',
        sex: Sex.Male,
        age: 34,
        photo: 'F2601SPS_11_13.png',
        period: 'DECEMBER 2020',
      },
      {
        id: '1395026509',
        countryId: 'NG',
        regionId: 'F',
        districtId: 'ASOKORE MAMPONG',
        constituencyId: '26',
        pollingStationId: 'F2601SPS',
        electoralAreaId: '01',
        firstName: 'YANKYERAH',
        lastName: 'BERNARD',
        sex: Sex.Male,
        age: 29,
        photo: 'F2601SPS_12_2.png',
        period: 'DECEMBER 2020',
      },
    ];

    // Create the voter
    const total = await addVoters(newVoters);

    // Check if the new voter was created by filtering on unique id field
    const voterEntries = await prisma.voter.findMany({
      where: {
        countryId: 'NG',
      },
      select: {
        id: true,
        countryId: true,
        regionId: true,
        districtId: true,
        constituencyId: true,
        pollingStationId: true,
        electoralAreaId: true,
        firstName: true,
        lastName: true,
        sex: true,
        age: true,
        photo: true,
        period: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    console.log(total);

    // Expect the new voter to have been created and match the input
    expect(newVoters).toEqual(voterEntries);
    // Expect the new voter to have been created and contain age
    expect(voterEntries.length).toEqual(6);
  });
});

afterAll(async () => {
  const deleteCountry = prisma.country.deleteMany();
  const deleteRegion = prisma.region.deleteMany();
  const deleteConstituency = prisma.constituency.deleteMany();
  const deletePollingStation = prisma.pollingStation.deleteMany();
  const deleteVoter = prisma.voter.deleteMany();

  await prisma.$transaction([
    deleteVoter,
    deletePollingStation,
    deleteConstituency,
    deleteRegion,
    deleteCountry,
  ]);

  await prisma.$disconnect();
});
