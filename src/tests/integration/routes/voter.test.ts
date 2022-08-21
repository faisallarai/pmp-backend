import supertest from 'supertest';
import app from '../../../app';
import prisma from '../../../client';
import { Sex, VoterEntry } from '../../../types';
import { addVoters } from '../../../utils/helper';

const api = supertest(app);

const initialVoters = [
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
    sex: Sex.Male,
    age: 33,
    photo: 'F2601SPS_11_9.png',
    period: 'DECEMBER 2020',
  },
  {
    id: '1395021072',
    countryId: 'GH',
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
    countryId: 'GH',
    regionId: 'F',
    districtId: 'ASOKORE MAMPONG',
    constituencyId: '26',
    pollingStationId: 'F2601SPS',
    electoralAreaId: '01',
    firstName: 'YAHAYA',
    lastName: 'TAHIRU',
    sex: Sex.Female,
    age: 36,
    photo: 'F2601SPS_11_11.png',
    period: 'DECEMBER 2020',
  },
];

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

  // create voters
  await addVoters(initialVoters);

  console.log('✨ 3 voters successfully created!');
});

test('voter id in the request different from body voter id', async () => {
  const newVoter = {
    id: '1396003161',
    countryId: 'GH',
    regionId: 'F',
    districtId: 'ASOKORE MAMPONG',
    constituencyId: '26',
    pollingStationId: 'F2601SPS',
    electoralAreaId: '01',
    firstName: 'YAKUB',
    lastName: 'FAUZIA',
    sex: 'Female',
    age: 30,
    photo: 'F2601SPS_11_12.png',
    period: 'DECEMBER 2020',
  };

  const result = await api
    .post('/api/v1/voters/2395002064')
    .send(newVoter)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.message).toContain(
    `Voter id in the request 2395002064 is different from the body ${newVoter.id}`
  );
  expect(result.body.success).toBeFalsy();

  const response = await api.get('/api/v1/voters');
  expect(response.body.data).toHaveLength(initialVoters.length);
});

test('voter added without region id', async () => {
  const newVoter = {
    id: '1390029899',
    countryId: 'GH',
    regionId: 'F',
    districtId: 'ASOKORE MAMPONG',
    constituencyId: '26',
    pollingStationId: 'F2601SPS',
    electoralAreaId: '01',
    firstName: 'YANKYERA',
    lastName: 'DICKSON',
    sex: 'Male',
    age: 34,
    photo: 'F2601SPS_11_13.png',
    period: 'DECEMBER 2020',
  };

  await api
    .post('/api/v1/voters/2395002064')
    .send(newVoter)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/v1/voters');
  expect(response.body.data).toHaveLength(initialVoters.length);
});

test('request without voter id added to the uri', async () => {
  const newVoter = {
    id: '1395026509',
    countryId: 'GH',
    regionId: 'F',
    districtId: 'ASOKORE MAMPONG',
    constituencyId: '26',
    pollingStationId: 'F2601SPS',
    electoralAreaId: '01',
    firstName: 'YANKYERAH',
    lastName: 'BERNARD',
    sex: 'Male',
    age: 29,
    photo: 'F2601SPS_12_2.png',
    period: 'DECEMBER 2020',
  };

  await api
    .post('/api/v1/voters')
    .send(newVoter)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/v1/voters');

  expect(response.body.data).toHaveLength(initialVoters.length + 1);
});

test('a valid voter can be added', async () => {
  const newVoter = {
    id: '1111111111',
    countryId: 'GH',
    regionId: 'F',
    districtId: 'ASOKORE MAMPONG',
    constituencyId: '26',
    pollingStationId: 'F2601SPS',
    electoralAreaId: '01',
    firstName: 'FAISAL',
    lastName: 'ISSAKA',
    sex: 'Male',
    age: 33,
    photo: 'F2601SPS_11_9.png',
    period: 'DECEMBER 2020',
  };

  await api
    .post('/api/v1/voters/1111111111')
    .send(newVoter)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/v1/voters');
  const data: VoterEntry[] = response.body.data as VoterEntry[];

  const firstName = data.map((r: VoterEntry) => r.firstName);
  const lastName = data.map((r: VoterEntry) => r.lastName);

  expect(response.body.data).toHaveLength(initialVoters.length + 2);
  expect(firstName).toContain('FAISAL');
  expect(lastName).toContain('ISSAKA');
});

test('voters are returned as json', async () => {
  await api
    .get('/api/v1/voters')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
}, 100000);

test('there are 5 voters', async () => {
  const response = await api.get('/api/v1/voters');

  expect(response.body.data).toHaveLength(5);
});

test('the first voter is about HTTP methods', async () => {
  const response = await api.get('/api/v1/voters');

  expect(response.body.data[0].firstName).toBe('WUTISMAN');
});

test('a specific voter can be viewed', async () => {
  const response = await api.get('/api/v1/voters');
  const voterToView: VoterEntry = response.body.data[0] as VoterEntry;

  const resultVoter = await api
    .get(`/api/v1/voters/${voterToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedVoterToView: VoterEntry = JSON.parse(
    JSON.stringify(voterToView)
  ) as VoterEntry;

  expect(resultVoter.body.data).toEqual(processedVoterToView);
});

test('a voter can be deleted', async () => {
  const votersAtBegin = await api.get('/api/v1/voters'); // create a getVoters function in helper
  const dataBegin: VoterEntry[] = votersAtBegin.body.data as VoterEntry[];

  const voterToDelete: VoterEntry = dataBegin[0];

  await api.delete(`/api/v1/voters/${voterToDelete.id}`).expect(204);

  const votersAtEnd = await api.get('/api/v1/voters'); // create a getVoters function in helper
  const data: VoterEntry[] = votersAtEnd.body.data as VoterEntry[];

  const firstName = data.map((r: VoterEntry) => r.firstName);

  expect(votersAtEnd.body.data).toHaveLength(dataBegin.length - 1);
  expect(firstName).not.toContain(voterToDelete.firstName);
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
