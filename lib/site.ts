// Every fact here traces to clients/jammin-car-wash/ in the studio repo (intake.md,
// assets/reviews.md, assets/wash-packages.json). Captured 2026-11-07.
import packages from "./wash-packages.json";

export const site = {
  url: "https://site-jammin-car-wash.vercel.app",
  name: "Jammin Car Wash",
  legalMark: "Jammin Carwash®",
  tagline: "Best Deal in Lutz and Wesley Chapel, FL",
  story:
    "Jammin Carwash® is a family owned business. We are proud to offer the latest in car wash technology. From License Plate Recognition to the best in car wash chemistry. We offer shaded vacuum areas, floor mat cleaners, towels, compressed air, glass cleaner and FREE vacuums that are included with every car wash purchase.",
  phone: { display: "(813) 556-WASH", digits: "(813) 556-9274", tel: "+18135569274" },
  join: "https://jammincarwash.mywashaccount.com/",
  manage: "https://jammincarwash.mywashaccount.com/login",
  hiring: "https://form.jotform.com/92945766778178",
  contactForm: "https://www.jammincarwash.com/contact-us/",
  fleetForm: "https://www.jammincarwash.com/fleet-services/",
  fundraisingForm: "https://www.jammincarwash.com/fundraising-program/",
  facebook: "https://www.facebook.com/pages/category/Car-Wash/Jammin-Car-Wash-422183205267928/",
  currentSite: "https://www.jammincarwash.com/",
  softTouch: "Soft Touch Available. Must self-prep before wash.",
  comingSoon: "30434 SR 56, Wesley Chapel, FL 33543",
} as const;

// Both locations keep the same hours (site + both Google profiles). Index 0 = Sunday.
export const hours = [
  { day: "Sunday", open: "08:00", close: "19:00" },
  { day: "Monday", open: "08:00", close: "20:00" },
  { day: "Tuesday", open: "08:00", close: "20:00" },
  { day: "Wednesday", open: "08:00", close: "20:00" },
  { day: "Thursday", open: "08:00", close: "20:00" },
  { day: "Friday", open: "08:00", close: "20:00" },
  { day: "Saturday", open: "08:00", close: "20:00" },
];
export const hoursSummary = [
  { label: "Monday – Saturday", value: "8 AM – 8 PM" },
  { label: "Sunday", value: "8 AM – 7 PM" },
];

export type Review = { name: string; badge?: string; stars: number; when: string; text: string };

export type Location = {
  slug: "lutz" | "wesley-chapel";
  subject: string; // video-slot subject slug
  name: string;
  googleName: string;
  street: string;
  city: string;
  zip: string;
  geo: { lat: number; lng: number };
  maps: string;
  directions: string;
  review: string;
  rating: { value: number; count: number; histogram: [number, number, number, number, number] };
  topics: string[];
  hero: { src: string; alt: string };
  gallery: { src: string; alt: string; w: number; h: number }[];
  reviews: Review[];
};

export const locations: Location[] = [
  {
    slug: "lutz",
    subject: "21356-walmart-way",
    name: "Lutz",
    googleName: "Jammin Car Wash",
    street: "21356 Walmart Way",
    city: "Lutz",
    zip: "33549",
    geo: { lat: 28.1769847, lng: -82.4647521 },
    maps: "https://maps.google.com/?cid=5778009254561544733",
    directions:
      "https://www.google.com/maps/dir//Jammin+Car+Wash,+21356+Walmart+Way,+Lutz,+FL+33549/@28.1770276,-82.4644801,15z",
    review: "https://search.google.com/local/writereview?placeid=ChIJX2m5YuO5wogRHXoPx82cL1A",
    rating: { value: 4.7, count: 743, histogram: [626, 60, 22, 13, 22] },
    topics: ["vacuums", "glass cleaner", "free towels", "air blower"],
    hero: { src: "/photos/lutz-exterior.webp", alt: "Jammin Carwash in Lutz at sunset, with the free vacuum canopies along the lot" },
    gallery: [
      { src: "/photos/lutz-tunnel-lights.webp", alt: "A car in the Lutz tunnel under red and violet lights and soft-touch cloth", w: 2000, h: 1125 },
      { src: "/photos/lutz-team.webp", alt: "Three Jammin team members outside the Lutz building", w: 1822, h: 2000 },
      { src: "/photos/lutz-tunnel-entrance.webp", alt: "A team member welcoming a car at the Lutz tunnel entrance", w: 1024, h: 768 },
      { src: "/photos/lutz-vacuums.webp", alt: "The shaded free-vacuum bays at Jammin Lutz", w: 960, h: 640 },
      { src: "/photos/lutz-tunnel-jeep.webp", alt: "A Jeep rolling through the Lutz tunnel light show", w: 720, h: 720 },
      { src: "/photos/lutz-mat-cleaner.webp", alt: "A customer holding a floor mat at the Lutz mat cleaner", w: 720, h: 1280 },
    ],
    reviews: [
      {
        name: "kailee potkay",
        stars: 5,
        when: "November 2026",
        text: "Best car wash around the area. They offer bug prep to remove bugs before the wash prices are great and in the parking lot they offer mat cleaning stations, compressed air , glass cleaner and towels , air fresheners & air for your tires !!! Will not be disappointed",
      },
      {
        name: "Dee S",
        badge: "Local Guide",
        stars: 5,
        when: "September 2026",
        text: "My first time going to Jammin Car Wash. I was so pleased that I had to buy a package.  Driving the 20 minutes is worth every penny! My children love all the different color lights going through the wash.  The staff are very pleasant and welcoming. I had to come on here to recommend because it is just worth it.",
      },
    ],
  },
  {
    slug: "wesley-chapel",
    subject: "3706-windcrest-dr",
    name: "Wesley Chapel",
    googleName: "Jammin Carwash",
    street: "3706 Windcrest Dr",
    city: "Wesley Chapel",
    zip: "33544",
    geo: { lat: 28.2102445, lng: -82.3543892 },
    maps: "https://maps.google.com/?cid=14565792178885306676",
    directions:
      "https://www.google.com/maps/dir//Jammin+Carwash,+3706+Windcrest+Dr,+Wesley+Chapel,+FL+33544/@28.2102445,-82.3543892,15z",
    review: "https://maps.google.com/?cid=14565792178885306676",
    rating: { value: 4.6, count: 182, histogram: [162, 4, 1, 1, 14] },
    topics: ["vacuums", "graphene x5", "rim cleaning", "glass cleaner"],
    hero: { src: "/photos/wc-exterior.webp", alt: "Jammin Carwash in Wesley Chapel: the blue and cedar building with its vacuum canopies" },
    gallery: [
      { src: "/photos/wc-building.webp", alt: "The Wesley Chapel tunnel exit and vacuum lot under a blue sky", w: 1920, h: 1080 },
      { src: "/photos/wc-entrance.webp", alt: "The pay lanes at the Wesley Chapel entrance, clearance 7'2\"", w: 1920, h: 1440 },
      { src: "/photos/wc-vacuum-i4.webp", alt: "A freshly washed BMW i4 at the Wesley Chapel vacuums", w: 2000, h: 1500 },
      { src: "/photos/wc-mat-station.webp", alt: "Mat cleaner and towel station under the Wesley Chapel canopy", w: 2000, h: 1500 },
      { src: "/photos/wc-truck-shine.webp", alt: "A pickup's glossy paint and tire shine after the wash in Wesley Chapel", w: 1500, h: 2000 },
      { src: "/photos/wc-vacuum-bmw.webp", alt: "A BMW X5 parked at a shaded vacuum bay in Wesley Chapel", w: 1500, h: 2000 },
    ],
    reviews: [
      {
        name: "Angie L",
        stars: 5,
        when: "July 2026",
        text: "I don't write reviews often but Jammin Car Wash is consistently a great experience. The staff is always friendly, helpful and professional.\nMy car came out looking great. The facility is well-maintained, and the whole process was quick and hassle-free. It's clear they take pride in their work and customer service. I'll definitely be back and would highly recommend Jammin Car Wash to anyone looking for a quality car wash at a fair price!",
      },
      {
        name: "Tack",
        badge: "Local Guide",
        stars: 5,
        when: "May 2026",
        text: "I have to say that I’ve been doing a lot of car washes up and down Bruce B Downs Boulevard and off of 56. This happens to be one of the best. I highly recommend this place. The wash is fantastic and the drying areas have everything you need to finish off your car.",
      },
      {
        name: "Muhammad Khan",
        badge: "Local Guide",
        stars: 5,
        when: "April 2026",
        text: "Amazing car wash! I joined this car wash when they just opened up and the workers here have always been very kind and helpful. I had the Graphite unlimited membership. The car wash is fantastic and does a great job cleaning your car. After the car is washed, there are plenty of parking where you'll find towels, interior cleaning solution spray bottle, vacuum, air pressure for cleaning any remaining dust off, also a tire pressure at your parking spot. They pretty much have everything lol love these guys! Unfortunately I'm moving and I'll miss this car wash. Thank you very much!",
      },
    ],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);

export const totalReviews = locations.reduce((n, l) => n + l.rating.count, 0);

export type Tier = (typeof packages.tiers)[number];
export const tiers = packages.tiers;
export const items = packages.items as Record<string, string>;
export const cheapest = tiers[0];

export const difference = [
  {
    n: "01",
    title: "License Plate Recognition",
    body: "Minimize your wait time! Customers on our membership plans can access our wash quickly and easily through express lanes that read and accept your vehicle via our License Plate Recognition machine. You can sign-up and manage your plan online.",
  },
  {
    n: "02",
    title: "Premium Chemistry",
    body: "Our goal is to deliver cleaner, drier and shinier vehicles – consistently. In order to get the best results we have invested in Diamond Shine’s premium, quality chemistry that is applied in proper layering steps to clean your car while protecting paint. We combine that with our soft touch cloth system to clean, protect and shine your vehicle.",
  },
  {
    n: "03",
    title: "Free Shaded Vacuums",
    body: "We offer free, self-service vacuums to complete your car washing experience. Dirt doesn’t stand a chance. The vacuum will stay on for 5 minutes. Since it’s unlimited use, simply push the button again to restart. We ask that you limit your use to 10 minutes so other customers have the chance to use the vacuums.",
  },
  {
    n: "04",
    title: "Jammin Perks",
    body: "Floor Mat Cleaners · Free Towel Use · Free Compressed Air · Free Glass Cleaner Use. And did we mention Free Vacuums?",
  },
  { n: "05", title: "We are Eco-Friendly", body: "We use recycled water." },
];

export const faq = [
  {
    q: "How many vehicles can I use with my membership?",
    a: "Your membership is for one vehicle only. We do not wash rentals or loaner cars in place of your registered vehicle.",
  },
  {
    q: "How do I join the Daily Wash Club?",
    a: "Ready to keep your ride spotless? Sign up online or stop by one of our locations. It’s quick, easy, and gets your car gleaming every day!",
  },
  { q: "When will I be charged for my membership?", a: "You’ll be billed every month on the same day you signed up." },
  {
    q: "What if I get a new license plate or a different car?",
    a: "No problem! You can update your license plate info online under “Manage Membership,” or just chat with our team when you visit. We’ll make sure you keep rollin’ clean.",
  },
  {
    q: "How do I cancel my membership?",
    a: "Need to take a break? You can cancel anytime online or at any of our locations—no hassle, no stress.",
  },
  {
    q: "What happens when I cancel my unlimited plan?",
    a: "Once you cancel, your billing stops immediately. It’s that easy. Enjoy your clean ride while it lasts. You can use the car wash until the end of your paid membership.",
  },
  {
    q: "How often can I wash my car with the Unlimited Membership?",
    a: "You can wash your car once a day every day, after a rainstorm, or whenever you have a few minutes to spare.",
  },
  { q: "Do you offer Fleet Services?", a: "Yes, you can use the form on our fleet page to request more information!" },
];

export const nav = [
  { href: "/wash-club", label: "Wash Club" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/fleet-and-fundraising", label: "Fleet & Fundraising" },
  { href: "/contact", label: "Contact" },
];
