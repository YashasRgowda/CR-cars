/**
 * What CR Cars does, in the owner's three categories.
 *
 * House style for every line in this file, because the owner asked for it
 * directly and it is the easiest thing on a site to lose: plain English,
 * short, and no sentence that takes two readings. A customer deciding
 * whether to call should understand a service from its name alone; the
 * line underneath only exists to answer the one obvious follow-up.
 *
 * So: no "comprehensive solutions", no "state-of-the-art", no paragraph
 * where a clause will do. If a description runs past about twelve words it
 * is doing too much and should be cut, not rephrased.
 *
 * Prices are deliberately absent. Cost depends on the car, and a number
 * that goes stale is worse than a number that was never there — every card
 * ends at a phone call instead.
 *
 * NEEDS CONFIRMATION: this list is built from what a full-service garage in
 * Bengaluru normally offers. The owner should strike out anything CR Cars
 * does not do and add anything missed, especially on modification, where
 * shops specialise.
 */

export type ServiceItem = {
  /** Short enough to read at a glance. This is the promise. */
  title: string;
  /** One line. Answers the obvious follow-up, then stops. */
  line: string;
  /** A lucide-react icon name. */
  icon: string;
};

export type ServiceGroup = {
  slug: string;
  /** The nav label and the page title. */
  name: string;
  /** Sits above the heading, in small caps. */
  eyebrow: string;
  /** The page's one-sentence promise. */
  promise: string;
  /** Two or three short lines for the page intro. Never a wall. */
  intro: string[];
  /** The 4:3 card image, used on the home page. */
  image: string;
  imageAlt: string;
  /**
   * The page-header image — the panel beside the page title.
   *
   * Separate from the card image because it is doing a different job: the
   * card has to read at thumbnail size in a row of three, while this one
   * is large, undimmed, and is what tells the visitor which page they
   * have landed on. It is also where each page shows the kind of car this
   * shop actually sees.
   */
  headerImage: string;
  headerAlt: string;
  /** Focus of the header photo inside its wide band, as an object-position. */
  headerFocus: string;
  /** 'contain' shows the whole photo on a matte instead of filling the
   *  band — for a small or oddly shaped picture that cover would crop to
   *  an unreadable sliver. */
  headerFit?: { fit: 'contain'; matte: string; ratio: number };
  items: ServiceItem[];
};

/* ------------------------------------------------------------------ *
 *  Servicing & repairs — the main branch
 * ------------------------------------------------------------------ */
export const SERVICING: ServiceGroup = {
  slug: 'services',
  name: 'Car Service',
  eyebrow: 'Service & Repair',
  promise: 'Everything your car needs, under one roof.',
  intro: [
    'We service all makes and models — hatchback, sedan, SUV, luxury.',
    'You get told what is wrong and what it costs before any work starts.',
  ],
  image: '/images/service/bay-bright.jpg',
  imageAlt: 'A technician working on an engine in a bright workshop',
  headerImage: '/images/hero/head-service.jpg',
  headerAlt: 'A red car on a two-post lift with its bonnet open',
  headerFocus: '50% 60%',
  items: [
    { title: 'General service', line: 'Oil, filters, plugs and a full health check.', icon: 'Wrench' },
    { title: 'Engine work', line: 'From a noise you noticed to a full overhaul.', icon: 'Cog' },
    { title: 'AC service', line: 'Gas refill, cooling coil cleaning, compressor repair.', icon: 'Snowflake' },
    { title: 'Brakes & clutch', line: 'Pads, discs, clutch plates and bleeding.', icon: 'Disc' },
    { title: 'Suspension & steering', line: 'Shockers, bushes, rack and ball joints.', icon: 'CircleDot' },
    { title: 'Denting & painting', line: 'Dent removal and colour-matched paint.', icon: 'PaintBucket' },
    { title: 'Electrical & wiring', line: 'Starting trouble, lights, sensors, shorts.', icon: 'Zap' },
    { title: 'Battery', line: 'Testing, charging and replacement.', icon: 'BatteryCharging' },
    { title: 'Tyres & alignment', line: 'Fitting, balancing and wheel alignment.', icon: 'Gauge' },
    { title: 'Computer diagnostics', line: 'Scanner check to find the fault properly.', icon: 'Settings' },
    { title: 'Insurance claim work', line: 'Accident repairs, and we help with the paperwork.', icon: 'ShieldCheck' },
    { title: 'Pickup & drop', line: 'We collect the car and bring it back.', icon: 'Truck' },
  ],
};

/* ------------------------------------------------------------------ *
 *  Modification — the reason people travel to a shop
 * ------------------------------------------------------------------ */
export const MODIFICATION: ServiceGroup = {
  slug: 'modification',
  name: 'Modification',
  eyebrow: 'Custom Work',
  promise: 'All types of modification, done properly.',
  intro: [
    'Tell us how you want the car to look. We will tell you what it takes.',
    'Nothing is started until you have seen the plan and the price.',
  ],
  image: '/images/hero/head-modification.jpg',
  imageAlt: 'A black Mahindra Thar with custom wheels and bumper',
  /* DEMO PLACEHOLDER — a 564px video still with a third party's logo,
     chosen for the client demo only. Not from Unsplash and not licensed:
     replace with the owner's own photo before the site goes live. */
  headerImage: '/images/hero/head-modify-demo.jpg',
  headerAlt: 'Blue flames from the exhaust of a white sports car at night',
  headerFocus: '50% 50%',
  /* The still is 2:1 and 564px wide: filled into the band it was cropped
     to the bumper and blown up 3.5x. Shown whole, on a matte matched to
     its own night-time edges, it reads as a car and is stretched far less. */
  headerFit: { fit: 'contain', matte: '#05070d', ratio: 2 },
  items: [
    { title: 'Full body wrap', line: 'Change the colour without touching the paint.', icon: 'Layers' },
    { title: 'Paint protection film', line: 'Clear film that takes the scratches for you.', icon: 'ShieldCheck' },
    { title: 'Body kits', line: 'Bumpers, spoilers, skirts and bonnet work.', icon: 'CarFront' },
    { title: 'Alloy wheels', line: 'New alloys, sizing advice and fitting.', icon: 'CircleDot' },
    { title: 'Lighting', line: 'Headlamps, DRLs, fog lamps and interior lights.', icon: 'Lightbulb' },
    { title: 'Interior & seat covers', line: 'Leather seats, roof lining and floor mats.', icon: 'Armchair' },
    { title: 'Music system', line: 'Speakers, amplifiers, subwoofers and tuning.', icon: 'Music' },
    { title: 'Android screens', line: 'Touchscreen, reverse camera and sensors.', icon: 'Camera' },
    { title: 'Suspension', line: 'Lowering or lifting, set up for Indian roads.', icon: 'Gauge' },
    { title: 'Exhaust', line: 'Sound and flow work, tuned to what you want.', icon: 'Cylinder' },
  ],
};

/* ------------------------------------------------------------------ *
 *  The wash centre — the second branch
 * ------------------------------------------------------------------ */
export const WASH: ServiceGroup = {
  slug: 'car-wash',
  name: 'Car Wash',
  eyebrow: 'Wash & Detailing',
  promise: 'Every kind of wash, for every kind of car.',
  intro: [
    'Our wash centre is a minute down the road from the service centre.',
    'From a quick foam wash to full detailing and coating.',
  ],
  image: '/images/wash/foam-bay.jpg',
  imageAlt: 'A car covered in foam under the lights of a wash bay',
  headerImage: '/images/hero/head-wash.jpg',
  headerAlt: 'A hatchback being pressure-washed at a wash centre',
  headerFocus: '50% 60%',
  items: [
    { title: 'Foam wash', line: 'Thick foam, soft wash, no swirl marks.', icon: 'Droplets' },
    { title: 'Full body wash', line: 'Outside washed, dried and finished by hand.', icon: 'Car' },
    { title: 'Underbody wash', line: 'High pressure under the car. Good before monsoon.', icon: 'Waves' },
    { title: 'Interior cleaning', line: 'Vacuum, seats, dashboard and roof lining.', icon: 'Sofa' },
    { title: 'Rubbing & polishing', line: 'Takes out light scratches and dullness.', icon: 'Sparkles' },
    { title: 'Ceramic coating', line: 'A hard gloss layer that lasts months, not days.', icon: 'ShieldCheck' },
    { title: 'Teflon coating', line: 'Shine and protection at a lower cost.', icon: 'Brush' },
    { title: 'Engine bay cleaning', line: 'Degreased and cleaned without wetting the wiring.', icon: 'Cog' },
    { title: 'Headlight restoration', line: 'Clears yellowed, foggy headlamps.', icon: 'Lightbulb' },
    { title: 'Dry cleaning', line: 'Deep seat and carpet shampoo.', icon: 'Wind' },
  ],
};

export const GROUPS = [SERVICING, MODIFICATION, WASH] as const;

/* ------------------------------------------------------------------ *
 *  Accessories
 *
 *  Available at the service centre, all the time. The four below are
 *  categories, shown with stock photographs — not a stock list, which the
 *  owner has not sent. Each tile opens WhatsApp asking about that thing,
 *  so the site never has to claim a particular part is on the shelf.
 * ------------------------------------------------------------------ */
export const ACCESSORIES = {
  eyebrow: 'In Stock',
  title: 'Car accessories',
  line: 'Accessories are available at the service centre every day. Call us and ask — if we do not have it, we will get it.',
};

/**
 * NEEDS CONFIRMATION: that these four are categories the shop sells.
 *
 * Each has a `tile` shape in the home-page mosaic, and its photograph is
 * cropped for that shape: the seat back is tall, the exhaust tips run
 * sideways, the wheel and the headlight sit in compact frames.
 */
export const ACCESSORY_SHOWCASE = [
  {
    label: 'Seat covers',
    tile: 'tall',
    image: '/images/accessories/sport-seats-tall.jpg',
    alt: 'Black sport seats with red hexagon stitching',
    focus: '70% 50%',
  },
  {
    label: 'Exhausts',
    tile: 'wide',
    image: '/images/accessories/exhaust-carbon-wide.jpg',
    alt: 'Twin exhaust tips with carbon-fibre sleeves',
    focus: '40% 55%',
  },
  {
    label: 'Alloy wheels',
    tile: 'small',
    image: '/images/accessories/alloy-gold.jpg',
    alt: 'A gold multi-spoke alloy wheel',
    focus: '50% 50%',
  },
  {
    label: 'LED lights',
    tile: 'small',
    image: '/images/accessories/led-headlight.jpg',
    alt: 'An LED headlight and daytime running light on a grey car',
    focus: '60% 35%',
  },
] as const;
