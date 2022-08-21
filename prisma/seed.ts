import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const countryData: Prisma.CountryCreateManyInput[] = [
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
];

const regionData: Prisma.RegionCreateManyInput[] = [
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
];

const constituencyData: Prisma.ConstituencyCreateManyInput[] = [
  {
    id: '26',
    title: 'ASAWASE',
    active: true,
    battleGround: true,
    districtId: 'ASOKORE MAMPONG',
  },
];

const pollingStationData: Prisma.PollingStationCreateManyInput[] = [
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
];

const voterData: Prisma.VoterCreateManyInput[] = [
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
    id: '1395021072',
    countryId: 'GH',
    regionId: 'F',
    districtId: 'ASOKORE MAMPONG',
    constituencyId: '26',
    pollingStationId: 'F2601SPS',
    electoralAreaId: '01',
    firstName: 'YAHAYA',
    lastName: 'MARTIN',
    sex: 'Male',
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
    sex: 'Male',
    age: 36,
    photo: 'F2601SPS_11_11.png',
    period: 'DECEMBER 2020',
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const country = await prisma.country.createMany({
    data: countryData,
    skipDuplicates: true,
  });
  console.log(`Created countries with count: ${country}`);

  const region = await prisma.region.createMany({
    data: regionData,
    skipDuplicates: true,
  });
  console.log(`Created countries with count: ${region}`);

  const constituency = await prisma.constituency.createMany({
    data: constituencyData,
    skipDuplicates: true,
  });
  console.log(`Created countries with count: ${constituency}`);

  const pollingStation = await prisma.pollingStation.createMany({
    data: pollingStationData,
    skipDuplicates: true,
  });
  console.log(`Created countries with count: ${pollingStation}`);

  const voter = await prisma.voter.createMany({
    data: voterData,
    skipDuplicates: true,
  });

  console.log(`Created countries with count: ${voter}`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
