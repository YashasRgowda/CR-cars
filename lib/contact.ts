import { BUSINESS } from './business';

/**
 * Every way the site can start a conversation.
 *
 * There is no form and no database on this site — the owner did not want
 * anything to log into — so these four links ARE the conversion funnel.
 * They are built here rather than inline so that a number only ever
 * changes in lib/business.ts, and so the prefilled WhatsApp text stays in
 * one voice instead of drifting per page.
 */

/** tel: wants no spaces. The display string keeps them. */
export const telHref = (phone: string = BUSINESS.phone) =>
  `tel:+91${phone.replace(/\D/g, '').replace(/^0/, '')}`;

/**
 * A WhatsApp deep link with the first message already typed.
 *
 * wa.me rather than api.whatsapp.com: it is the short form Meta documents,
 * it opens the installed app on a phone and WhatsApp Web on a desktop, and
 * it does not bounce through a consent interstitial on the way.
 *
 * The prefilled text is written in the CUSTOMER's voice, not the shop's —
 * it is going to appear in their chat window as something they said. It
 * also names the service, because a message that says only "Hi" makes the
 * owner do the work of asking what it is about.
 */
export const waHref = (message?: string) => {
  const text = message ?? 'Hi, I would like to know about your car services.';
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
};

/** "Hi, I would like to book a general service for my car." */
export const waForService = (service: string) =>
  waHref(`Hi, I would like to ask about ${service.toLowerCase()} for my car.`);

export const MAPS_SEARCH =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('CR Cars Service Center, Thirupalya Main Road, Bommasandra, Bengaluru 560099');
