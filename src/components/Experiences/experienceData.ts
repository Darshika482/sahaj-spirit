export interface ExperienceItem {
  id: string;
  script: string;
  title: string;
  tagline: string;
  body: string;
  images: string[];
  alt: string;
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1200&auto=format&fit=crop`;

export const experiences: ExperienceItem[] = [
  {
    id: '01',
    script: 'Sahaj',
    title: 'Workshop',
    tagline: 'Where Mahavira meets your Monday morning.',
    body: 'An educational session that translates Jain principles — non-violence, non-possessiveness, many-sided understanding — into the texture of an ordinary, modern life. Beyond sects. Beyond rituals. Just lived.',
    images: [
      u('1552664730-d307ca884978'),
      u('1517048676732-d65bc937f952'),
      u('1543269865-cbf427effbad'),
    ],
    alt: 'Sahaj Workshop - Translating deep Jain values to modern life',
  },
  {
    id: '02',
    script: 'Sahaj',
    title: 'Activities',
    tagline: 'Discovery disguised as play.',
    body: 'Creative games, quizzes, self-reflective exercises, and conversations that turn philosophy into experience. You don\'t learn Sahajta. You bump into it.',
    images: [
      u('1529156069898-49953e39b3ac'),
      u('1511632765486-a01980e01a18'),
      u('1556761175-5973dc0f32e7'),
    ],
    alt: 'Sahaj Activities - Playful learning and game simulation',
  },
  {
    id: '03',
    script: 'Sahaj',
    title: 'Poetry',
    tagline: 'Words that hold you when the world won\'t.',
    body: 'Modern poems written in a voice your generation actually speaks. Verses that meet you in the chaos and walk you back to stillness.',
    images: [
      u('1455390582262-044cdead277a'),
      u('1481627834876-b7833e8f5570'),
      u('1457369804613-52c61a468e7d'),
    ],
    alt: 'Sahaj Poetry - Soul-stirring poetry reading session',
  },
  {
    id: '04',
    script: 'Sahaj',
    title: 'Meditation',
    tagline: 'A doorway, not a discipline.',
    body: 'A quiet contemplation of the pure, enlightened self — the Siddha within. Not a technique to master. A homecoming to remember.',
    images: [
      u('1545389336-cf090694435e'),
      u('1506126613408-eca07ce68773'),
      u('1599447421416-3414500d18a5'),
    ],
    alt: 'Sahaj Meditation - Guided pure soul contemplation and mindfulness',
  },
  {
    id: '05',
    script: 'Sahaj',
    title: 'Panel Discussion',
    tagline: 'Real talk. Real life. Real Sahaj.',
    body: 'Unscripted conversations with achievers who carry Sahaj values into worlds of ambition, pressure, and noise. Less interview, more confession.',
    images: [
      u('1591115765373-5207764f72e7'),
      u('1475721027785-f74eccf877e2'),
      u('1505373877841-8d25f7d46678'),
    ],
    alt: 'Sahaj Panel - Direct unscripted conversation with leaders and influencers',
  },
  {
    id: '06',
    script: 'Sahaj',
    title: 'Nukkad Natak',
    tagline: 'Theatre that takes the stage to the street.',
    body: 'A high-energy street play scored by thunderous Nashik dhol — the values of peace, simplicity, and non-violence delivered with the volume they deserve.',
    images: [
      u('1514525253161-7a46d19cd819'),
      u('1465847899084-d164df4dedc6'),
      u('1501386761578-eac5c94b800a'),
    ],
    alt: 'Sahaj Nukkad Natak - High energy theatrical street play with live drums',
  },
  {
    id: '07',
    script: 'Sahaj',
    title: 'Keertan',
    tagline: 'Devotion, unplugged.',
    body: 'A live musical jamming session — soulful voices, modern instruments, lyrics that carry the weight of Jain wisdom into rhythm you can feel in your chest.',
    images: [
      u('1511671782779-c97d3d27a1d4'),
      u('1493225457124-a3eb161ffa5f'),
      u('1485579149621-3123dd979885'),
    ],
    alt: 'Sahaj Keertan - Unplugged soul and acoustic wisdom session',
  },
  {
    id: '08',
    script: 'Sahaj',
    title: 'Specialised Jain Food',
    tagline: 'Non-violence, plated.',
    body: 'Exotic, contemporary dishes from across the world — every one prepared in complete accordance with the Jain food system. Premium. Conscious. Delicious.',
    images: [
      u('1546069901-ba9599a7e63c'),
      u('1540420773420-3366772f4999'),
      u('1512621776951-a57141f2eefd'),
    ],
    alt: 'Specialised Jain Food - Vegetarian culinary fine dining experience',
  },
  {
    id: '09',
    script: 'Sahaj',
    title: 'Sahaj Summit',
    tagline: 'Walking the ground where memory still breathes.',
    body: 'Guided pilgrimage through the Sahaj Summit\'s ancient Jain temples — mythology, history, and presence layered into every step. The land itself becomes the teacher.',
    images: [
      u('1466442929976-97f336a657be'),
      u('1564507592333-c60657eea523'),
      u('1600121848594-d8644e57abab'),
    ],
    alt: 'Sahaj Summit - Walking on sacred grounds of heritage and silence',
  },
];
