/**
 * Central registry of Unsplash photo IDs used across the site, plus a helper
 * that builds optimised CDN URLs. Keeping IDs in one place makes swapping
 * imagery trivial and guarantees every URL passes through the same params.
 */
export const img = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const PHOTOS = {
  // Hero / resorts / exteriors
  heroResort: "1571896349842-33c89424de2d",
  resortAerial: "1582719478250-c89cae4dc85b",
  cityHotel: "1566073771259-6a8506099945",
  beachResort: "1520250497591-112f2f40a3f4",
  mountainLodge: "1601918774946-25832a4be0d6",
  desertVilla: "1512453979798-5ea266f8880c",
  overwater: "1540541338287-41700207dee6",
  grandLobby: "1445019980597-93fa8acb246c",
  facade: "1517840901100-8179e982acb7",
  poolside: "1540555700478-4be289fbecef",

  // Rooms
  deluxeRoom: "1611892440504-42a792e24d32",
  suite: "1618773928121-c32242e63f39",
  presidential: "1595576508898-0ad5c879a061",
  villaRoom: "1631049307264-da0ec9d70304",
  executiveRoom: "1590490360182-c33d57733427",
  standardRoom: "1564501049412-61c2a3083791",
  bathroom: "1552321554-5fefe8c9ef14",
  bedroomView: "1578683010236-d716f9a3f461",

  // Amenities / services
  spa: "1544161515-4ab6ce6db874",
  poolAmenity: "1571003123894-1f0594d2b5d9",
  restaurant: "1414235077428-338989a2e8c0",
  fineDining: "1517248135467-4c7edcad34c4",
  gym: "1534438327276-14e5300c3a48",
  bar: "1470337458703-46ad1756a187",
  conference: "1497366216548-37526070297c",
  concierge: "1566073771259-6a8506099945",

  // Destinations
  paris: "1502602898657-3e91760cbb34",
  maldives: "1514282401047-d79a71a590e8",
  bali: "1537996194471-e657df975ab4",
  dubai: "1512453979798-5ea266f8880c",
  santorini: "1570077188670-e3a8d69ac5ff",
  tokyo: "1540959733332-eab4deabeeaf",
  newyork: "1496442226666-8d4d0e62e6e9",
  swissAlps: "1531366936337-7c912a4589a7",

  // People
  guest1: "1494790108377-be9c29b29330",
  guest2: "1500648767791-00dcc994a43e",
  guest3: "1438761681033-6461ffad8d80",
  guest4: "1507003211169-0a1dd7228f2d",
  guest5: "1544005313-94ddf0286df2",
  guest6: "1519085360753-af0119f7cbe7",
  team1: "1560250097-0b93528c311a",
  team2: "1573496359142-b8d87734a5a2",
  team3: "1472099645785-5658abf4ff4e",
  team4: "1580489944761-15a19d654956",

  // Gallery extras
  lobbyDetail: "1551882547-ff40c63fe5fa",
  terrace: "1596394516093-501ba68a0ba6",
  garden: "1600585154340-be6161a56a0c",
  detail: "1584132967334-10e028bd69f7",
} as const;
