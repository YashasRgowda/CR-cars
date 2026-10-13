# CR Cars

Marketing site for CR Cars — car service, modification and car wash, Bommasandra, Bengaluru.

Next.js 16 · TypeScript · Tailwind 3 · Framer Motion. Five static pages, no
database, no admin panel, no login. The owner asked for nothing to maintain,
so the site is a set of files: change a file, redeploy, done.

**The site is light throughout.** There are no dark sections — not the hero,
not the footer, not a feature band. Nothing is laid over a photograph either:
no scrims, no tints, no gradient washes. Every pixel is either a photograph at
full strength or a flat paper ground, and all type sits on the paper. If a
future change needs white text on an image, it is going against the brief.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npx eslint .       # lint
```

---

## Where to change things

Almost everything the owner might want changed lives in two files.

| You want to change… | Edit |
| --- | --- |
| Phone number, WhatsApp number, hours, addresses, rating | `lib/business.ts` |
| The list of services, modifications or wash types | `lib/services.ts` |
| Wording on the home page sections | `components/home/*.tsx` |
| Colours, fonts, spacing | `tailwind.config.mjs` |
| Photographs | `scripts/images.json`, then re-run the fetch script |

Nothing is duplicated: the phone number appears in nine places on the site and
all nine read from `BUSINESS.phone`.

### Still needed from the owner

Search the code for `NEEDS CONFIRMATION` — every open question is flagged at
the point it matters, and `UNCONFIRMED` at the top of `lib/business.ts` lists
them together. In short:

- The **wash branch address**. The site currently says, truthfully, that it is
  a short drive away and to call for directions. It does not invent a street.
- **Opening time** (Google only publishes the 8:30 pm close) and any weekly off.
- Whether the wash branch has its **own phone line**.
- Whether **pickup and drop** and the other four promises in `WhyUs.tsx` are
  ones the shop will actually keep.
- The **accessories list** — `ACCESSORY_ITEMS` in `lib/services.ts` is empty
  and the section degrades gracefully to "call and ask" until it is filled.

---

## Photographs

Every photograph is a placeholder standing in for CR Cars' own work.

They come from **Unsplash**, whose licence permits commercial use with no
attribution and no permission. Nothing here came from a general image search —
a client site must never carry a photograph somebody can invoice for.

The full list is `scripts/images.json`. To change one, edit its entry and:

```bash
python3 scripts/fetch-images.py            # fetch anything missing
python3 scripts/fetch-images.py --force    # re-fetch everything
```

To drop in the owner's real photographs instead, overwrite the file in
`public/images/` keeping the same name and aspect ratio, and delete its entry
from `images.json` so the script stops managing it.

**Aspect ratios matter.** The hero crops to roughly 16:7 full-bleed; page
header panels are 4:3; cards are 4:3. A photo used at the wrong ratio gets a
band taken out of its middle by `object-cover`, which is how the first set of
headers ended up showing a strip of shadow. The wide cuts live in
`public/images/hero/`.

**Pick bright photographs.** Since nothing is darkened, a murky image stays
murky. `scripts/` has no tool for this, but the quick check is to open the
file and ask whether you can tell what is happening in it at a glance.

**The cars should be the ones people here actually drive.** An earlier set
led with a McLaren and a Lamborghini restoration bay; they were beautiful and
had nothing to do with a workshop in Bommasandra. Fortuner, Thar, Innova,
Seltos, Swift — aspirational but real.

If an image looks stale in dev after you replace it, Next has cached the
optimised variant — `rm -rf .next/dev/cache/images` and restart.

---

## The brand mark

CR Cars had no logo, so one was designed: a roundel with a brass ring and the
letters set in the site's own display face.

- On the page: `components/brand/Logo.tsx` (SVG).
- Favicons and app icons: `python3 scripts/make-icons.py`, which redraws the
  same geometry in Pillow so the small sizes can be tuned — below 24px the
  inner ring is dropped, because there are not enough pixels for a stroke, a
  gap and two letter counters.

If the owner later supplies a real logo, replace `Logo.tsx` and re-point
`scripts/make-icons.py` at it.

---

## Accessibility

`scripts/check-contrast.py` verifies every text colour against every
background it can land on — including the ivory band and the inside of a
well, which is where small print normally fails.

```bash
pip install numpy
python3 scripts/check-contrast.py
```

There is no check for text over photographs because there is none on the
site. `brass` at full strength is a fill and `placeholder` is for form fields;
both are reported but not graded, and neither should ever be used as body
text. If you move one into the graded list and it fails, that is the script
working.

---

## Deploying

Built for Vercel; any Next.js host works.

1. Push to a Git repository and import it.
2. Set `NEXT_PUBLIC_SITE_URL` to the live domain, **Production environment
   only** — canonicals, Open Graph and the structured data all read it. Without
   it they point at the per-deployment `*.vercel.app` hostname, which changes
   on every push. It is baked in at build time, so it needs a redeploy.
3. Point the domain, then submit `/sitemap.xml` in Google Search Console.

### After launch

Add the website URL to the **Google Business Profile**. Nearly all of this
site's traffic will come from local search, and the profile is what feeds it.
The structured data in `components/seo/JsonLd.tsx` tells Google the two
branches are one business — keep `BUSINESS.rating` and `reviewCount` in step
with the live profile, or delete the `aggregateRating` block rather than let
it go stale.
