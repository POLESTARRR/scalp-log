/* Reference data. Kept apart from app logic so it can be corrected
   without touching anything that runs. */

/* Malassezia feeds on fatty acids in roughly the C11–C24 range, so the
   categories below are about chain length and structure, not marketing.
   "conditional" exists because a flat safe/unsafe verdict is wrong for a
   handful of ingredients whose behaviour depends on how they were made. */
const INGREDIENTS = [

  /* ---- feeders ---- */
  { name:'Oleic Acid', cat:'feeder', note:'The fatty acid Malassezia prefers most, and the dominant one in human sebum. Anything built around it is working against the antifungal.' },
  { name:'Stearic Acid', cat:'feeder', note:'C18 saturated. Extremely common as an emulsifier and thickener, so it hides in products that never call themselves oils.' },
  { name:'Palmitic Acid', cat:'feeder', note:'C16 saturated, present in most plant butters and many creams.' },
  { name:'Lauric Acid', cat:'feeder', note:'C12, and roughly 42–48% of coconut oil. Antibacterial in other contexts, which is why it gets marketed as clean — still inside the yeast feeding range.' },
  { name:'Myristic Acid', cat:'feeder', note:'C14, common in coconut and palm kernel oil.' },
  { name:'Isopropyl Myristate', cat:'feeder', note:'Synthetic ester used to make heavy lotions feel light. Hydrolyses back to a feeder acid on skin.' },
  { name:'Isopropyl Palmitate', cat:'feeder', note:'Same logic as isopropyl myristate — the ester form is not an escape.' },
  { name:'Glyceryl Stearate', cat:'feeder', note:'Stearic-acid emulsifier. One of the most common entries on a "gentle, fragrance-free" moisturiser.' },
  { name:'Polysorbate 20', cat:'feeder', note:'Fatty-acid-ester emulsifier, usually lauric. Breaks down into something usable by the yeast.' },
  { name:'Polysorbate 60', cat:'feeder', note:'Stearate version of the same emulsifier family.' },
  { name:'Polysorbate 80', cat:'feeder', note:'Oleate version. Same family, same problem.' },
  { name:'Sorbitan Oleate', cat:'feeder', note:'Oleic acid ester used as an emulsifier.' },
  { name:'PEG-100 Stearate', cat:'feeder', note:'Stearic-acid PEG emulsifier, near-universal in creams.' },
  { name:'Coconut Oil', cat:'feeder', note:'Around 42–48% lauric acid. Worth separating from two things it gets confused with: coconut-derived surfactants and MCT oil are both chemically altered and behave differently.' },
  { name:'Cocos Nucifera', cat:'feeder', note:'The INCI name for coconut oil.' },
  { name:'Olive Oil', cat:'feeder', note:'Roughly 55–83% oleic acid, among the highest in common use.' },
  { name:'Olea Europaea', cat:'feeder', note:'The INCI name for olive oil.' },
  { name:'Avocado Oil', cat:'feeder', note:'Around 50–70% oleic acid.' },
  { name:'Persea Gratissima', cat:'feeder', note:'The INCI name for avocado oil.' },
  { name:'Argan Oil', cat:'feeder', note:'Around 43–49% oleic acid.' },
  { name:'Shea Butter', cat:'feeder', note:'Roughly half oleic and half stearic, so it lands on both major feeder acids at once.' },
  { name:'Butyrospermum Parkii', cat:'feeder', note:'The INCI name for shea butter.' },
  { name:'Marula Oil', cat:'feeder', note:'Around 70–78% oleic acid — one of the highest of any carrier oil.' },
  { name:'Cocoa Butter', cat:'feeder', note:'Roughly 60–65% stearic and palmitic combined.' },
  { name:'Sweet Almond Oil', cat:'feeder', note:'Around 65–70% oleic acid.' },
  { name:'Castor Oil', cat:'feeder', note:'80–90% ricinoleic acid, a C18. Sources genuinely disagree here — some argue ricinoleic acid is antifungal — but the chain length sits in the feeding range, so it is listed cautiously rather than cleared.' },

  /* ---- actives ---- */
  { name:'Ketoconazole', cat:'active', note:'First-line azole. Mutations in the ERG11 gene are the best-documented resistance route, and they apply to the whole azole class at once — which is why swapping one azole for another often changes nothing.' },
  { name:'Ciclopirox', cat:'active', note:'Not an azole. Works by chelating iron, so resistance to ketoconazole does not carry over. A genuinely different lever.' },
  { name:'Zinc Pyrithione', cat:'active', note:'Disrupts membrane transport in the yeast. Broad, well tolerated, and easy to find.' },
  { name:'Piroctone Olamine', cat:'active', note:'Non-azole, common in European formulations and rare on US shelves. Worth seeking out precisely because most people have never rotated through it.' },
  { name:'Octopirox', cat:'active', note:'Trade name for piroctone olamine.' },
  { name:'Climbazole', cat:'active', note:'Azole class but structurally distinct from ketoconazole. Appears in some EU-market formulations.' },
  { name:'Selenium Sulfide', cat:'active', note:'Antifungal and keratolytic at once.' },
  { name:'Selenium Disulfide', cat:'active', note:'Recent clinical guidance singles this out as unusually versatile — antifungal, sebum-reducing and keratolytic — useful for both knocking down a flare and holding the line afterwards.' },
  { name:'Coal Tar', cat:'active', note:'Antiproliferative with mild antifungal action. Stains, smells, and raises photosensitivity.' },
  { name:'Sulfur', cat:'active', note:'Keratolytic and mildly antimicrobial. Drying, which cuts both ways.' },
  { name:'Undecylenic Acid', cat:'active', note:'A fatty acid that is itself antifungal — its chain structure works against Malassezia rather than feeding it. The exception that proves the chain-length rule.' },
  { name:'Clotrimazole', cat:'active', note:'Azole. Shares the ERG11 resistance story with ketoconazole.' },
  { name:'Salicylic Acid', cat:'active', note:'Keratolytic, not antifungal. It dissolves the scale that shelters the yeast and helps the real antifungal reach skin.' },
  { name:'Betaine Salicylate', cat:'active', note:'A gentler salicylate ester, increasingly used where plain salicylic acid is too harsh.' },

  /* ---- conditional ---- */
  { name:'MCT Oil', cat:'conditional', note:'Not one fixed thing. A true medium-chain triglyceride oil runs about 57% caprylic (C8) and 40% capric (C10) with under 1% lauric — both too short for the yeast to use. But "MCT oil" is not a regulated term and some bottles blend lauric acid back in. If the label does not say Caprylic/Capric Triglyceride, treat it as probably fine rather than known safe.' },
  { name:'Fractionated Coconut Oil', cat:'conditional', note:'Ambiguous by name. Sometimes it means coconut oil with the long chains stripped out, sometimes it is just a nicer word for MCT oil. Same caveat applies.' },
  { name:'Caprylic/Capric Triglyceride', cat:'conditional', note:'The purified version — C8 and C10 only, no meaningful lauric acid. This is the exact INCI name to look for if you want the well-defined form of MCT oil.' },
  { name:'Squalene', cat:'conditional', note:'Note the spelling: no "a". This is the unstable precursor to squalane. If it was not fully hydrogenated during manufacture, it oxidises into inflammatory peroxides. Squalane is the version you want.' },
  { name:'Jojoba Oil', cat:'conditional', note:'Technically a liquid wax ester rather than a triglyceride, so it does not break down the way other oils do. It still carries some oleic acid. Reasonable diluted or rinsed off, riskier neat and left on.' },
  { name:'Cocamidopropyl Betaine', cat:'conditional', note:'The "coco" is misleading — the fatty acid has been converted into a betaine surfactant and is not what the yeast eats. Separate issue entirely: it is a recognised contact allergen for a minority of people, which is worth knowing if a "gentle" product keeps stinging.' },
  { name:'Tea Tree Oil', cat:'conditional', note:'Mostly terpenes, so outside the yeast fuel supply. But it only meaningfully inhibits Malassezia above roughly 30% concentration, far above normal use, and neat application is a known sensitiser. Diluted in a rinse-off is a different proposition from a drop on skin.' },

  /* ---- safe ---- */
  { name:'Glycerin', cat:'safe', note:'Humectant. Pulls water into skin and feeds nothing.' },
  { name:'Urea', cat:'safe', note:'Humectant, and mildly keratolytic at higher strengths.' },
  { name:'Hyaluronic Acid', cat:'safe', note:'Humectant, structurally unrelated to any fatty acid.' },
  { name:'Niacinamide', cat:'safe', note:'Supports barrier function, calms inflammation, and modestly reduces sebum output. Actively useful rather than merely harmless.' },
  { name:'Squalane', cat:'safe', note:'Fully hydrogenated and shelf-stable, comedogenic rating around 1, inert to Malassezia. Sugarcane-derived is more reliably pure than olive-derived, which can carry trace impurities in cheaper grades.' },
  { name:'Colloidal Oatmeal', cat:'safe', note:'Anti-inflammatory and barrier-soothing.' },
  { name:'Panthenol', cat:'safe', note:'Pro-vitamin B5. Supports barrier repair and hydration.' },
  { name:'Centella Asiatica', cat:'safe', note:'Anti-inflammatory botanical, common in barrier-repair formulas.' },
  { name:'Ceramide NP', cat:'safe', note:'One of the ceramide subtypes measurably depleted in seborrheic dermatitis skin. Direct replacement of what is missing.' },
  { name:'Ceramide AP', cat:'safe', note:'Another subtype depleted in lesional skin.' },
  { name:'Ceramide EOP', cat:'safe', note:'A third barrier-relevant ceramide.' },
  { name:'Cholesterol', cat:'safe', note:'Works alongside ceramides and fatty acids. The ratio matters: studies use roughly 3:1:1 ceramide to cholesterol to fatty acid, and any one or two of the three alone delays barrier recovery instead of helping.' },
  { name:'Allantoin', cat:'safe', note:'Soothing and barrier-supportive.' },
  { name:'Aloe Barbadensis', cat:'safe', note:'Aloe vera. Soothing, not a fuel source.' },
  { name:'Mineral Oil', cat:'safe', note:'A pure hydrocarbon with no fatty acid chains at all, which makes it one of the most reliably inert occlusives available — despite its reputation in general skincare folklore.' },
  { name:'Petrolatum', cat:'safe', note:'Same hydrocarbon logic as mineral oil.' },
  { name:'Dimethicone', cat:'safe', note:'Silicone, not a lipid, so the yeast cannot metabolise it. One caveat that is about occlusion rather than feeding: very heavy silicone formulas can trap sweat and existing yeast against the hairline.' },
  { name:'Cyclopentasiloxane', cat:'safe', note:'Lightweight volatile silicone. Evaporates rather than sitting on skin.' },
  { name:'Sodium Cocoyl Isethionate', cat:'safe', note:'Another misleading "coco" name — converted into an isethionate surfactant. A gentle cleansing base.' },
  { name:'Decyl Glucoside', cat:'safe', note:'Mild sugar-based surfactant.' },
  { name:'Coco-Glucoside', cat:'safe', note:'Glucoside surfactant, same reasoning as decyl glucoside.' },
  { name:'Grapeseed Oil', cat:'safe', note:'Around 70% linoleic acid, the fatty acid consistently associated with lower feeding potential than oleic-dominant oils.' },
  { name:'Sunflower Seed Oil', cat:'safe', note:'Linoleic-dominant, same lower-risk profile as grapeseed.' },
  { name:'Safflower Oil', cat:'safe', note:'Also linoleic-dominant.' },
  { name:'Polyquaternium-10', cat:'safe', note:'Cationic conditioning polymer, not a fatty acid. No feeding mechanism, though seb-derm-specific research on it is thin.' },
  { name:'Behentrimonium Methosulfate', cat:'safe', note:'Conditioning agent. Low concern by mechanism.' },

  /* ---- irritants ---- */
  { name:'Fragrance', cat:'irritant', note:'A leading cause of the contact dermatitis that mimics and worsens seb derm. Nothing to do with feeding the yeast — a separate way to stay inflamed.' },
  { name:'Parfum', cat:'irritant', note:'The EU label term for fragrance.' },
  { name:'Sodium Lauryl Sulfate', cat:'irritant', note:'Effective but harsh. Strips barrier lipids from skin that is already short of them.' },
  { name:'Propylene Glycol', cat:'irritant', note:'Present in many antifungal shampoos themselves, and a known contact allergen for a minority. Worth patch testing before blaming the active ingredient.' },
  { name:'Denatured Alcohol', cat:'irritant', note:'Drying and barrier-disrupting with frequent use.' },
  { name:'Methylisothiazolinone', cat:'irritant', note:'Preservative with a growing contact-allergy record.' },
  { name:'Menthol', cat:'irritant', note:'Feels soothing on contact and irritates compromised skin anyway.' }
];

const CATEGORIES = {
  feeder:      { label:'Feeds the yeast',   flag:true  },
  active:      { label:'Antifungal active', flag:false },
  conditional: { label:'Depends on type',   flag:false },
  safe:        { label:'Safe to use',       flag:false },
  irritant:    { label:'Irritant risk',     flag:false }
};

const LADDER = [
  {
    tier:'0', title:'Technique, before anything stronger',
    tag:'Established', hot:false,
    intro:'Worth exhausting first, because it costs nothing and it quietly explains a share of cases that look resistant.',
    items:[
      'Three to five minutes of contact time, worked into the <strong>scalp</strong> rather than the hair. A lather-and-rinse delivers almost nothing.',
      'Two or three washes a week during a flare, tapering to weekly once it settles.',
      'Rotate two unrelated actives rather than running one to failure — an azole one wash, zinc pyrithione or selenium the next.',
      'The same antifungal shampoo works on facial seb derm: two to three minutes, then rinse. Same mechanism, unfamiliar real estate.',
      'Barrier cream afterwards. Look for <strong>ceramide, cholesterol and fatty acid together</strong>, ideally near a 3:1:1 ratio — one or two of the three alone measurably slows recovery.'
    ],
    note:'Do not stack irritants. Tar plus salicylic acid plus a strong azole adds barrier damage without adding yeast control.'
  },
  {
    tier:'1', title:'Over the counter',
    tag:'Established', hot:false,
    intro:'The shelf you have probably already worked through: ketoconazole 1–2%, zinc pyrithione, selenium sulfide, coal tar, salicylic acid, ciclopirox.',
    items:[
      '<strong>Selenium disulfide</strong> is singled out in recent guidance as unusually versatile — antifungal, sebum-reducing and keratolytic at once.',
      '<strong>Piroctone olamine</strong> and <strong>climbazole</strong> are common in Europe and scarce in the US. Different mechanism, so azole resistance does not transfer.'
    ],
    note:''
  },
  {
    tier:'2', title:'Prescription topical',
    tag:'FDA approved', hot:false,
    intro:'',
    items:[
      'Ketoconazole 2%, or prescription-strength ciclopirox.',
      'Steroids matched to site and potency: <strong>desonide 0.05%</strong> (low) on the face, <strong>fluocinolone acetonide 0.01%</strong> oil (medium) on the scalp. Flares only — continuous use thins skin.',
      '<strong>Tacrolimus 0.1%</strong> or <strong>pimecrolimus 1%</strong> for face and eyelids, where long-term steroids are a bad trade. A studied pattern: twice daily up to four weeks to clear, then twice weekly for twenty weeks to hold.',
      '<strong>Roflumilast foam 0.3%</strong>, a PDE4 inhibitor approved for seb derm in December 2023. Phase III trials put roughly 80% of patients clear or almost clear at one year, with itch relief sustained across 52 weeks.'
    ],
    note:''
  },
  {
    tier:'3', title:'Oral and systemic',
    tag:'Prescriber-led', hot:false,
    intro:'This is the rung most people never reach, usually because nobody offered it.',
    items:[
      'Pulse-dose <strong>itraconazole</strong> — a common protocol is 200mg daily for the first week of each month. Trials report around 90% improvement at four months with lower recurrence than topicals alone.',
      '<strong>Fluconazole</strong>, either 50mg daily for two weeks or 200–300mg weekly.',
      '<strong>Low-dose isotretinoin</strong>, 10–20mg, studied specifically in refractory disease. Head-to-head data favours 20mg for control and recurrence. Needs monitoring.',
      'Tetracycline-class antibiotics, used for the anti-inflammatory effect rather than the antibacterial one.',
      'Narrowband UVB phototherapy.'
    ],
    note:''
  },
  {
    tier:'4', title:'Refractory and emerging',
    tag:'Case-report level', hot:false,
    intro:'Conversation territory with a dermatologist who follows the literature — not self-directed experimentation.',
    items:[
      '<strong>Topical ruxolitinib</strong>, a JAK inhibitor, with case reports of clearing facial disease that had failed everything else.',
      '<strong>Crisaborole</strong> and <strong>apremilast</strong>, two more PDE4 inhibitors under investigation.',
      '<strong><em>Lactobacillus paracasei</em></strong> supplementation — one double-blind trial found reduced erythema, seborrhea and flaking over 56 days.'
    ],
    note:''
  },
  {
    tier:'5', title:'1726nm laser',
    tag:'New — Feb 2026', hot:true,
    intro:'Works upstream of the entire ladder. Rather than fighting the yeast or calming inflammation, it selectively heats and shrinks the sebaceous glands that produce the oil the yeast lives on, while a cooling tip protects the surface.',
    items:[
      'The published case: a 32-year-old with a <strong>five-year refractory scalp history</strong> that had not responded to conventional treatment.',
      'Three sessions, two weeks apart.',
      'Complete clearance, still holding at six-month follow-up.'
    ],
    note:'One case report, not a trial. But the literature did not exist a year ago, which means you may well hear about it before your dermatologist does.'
  }
];

const ROUTINE = [
  { id:'wash',  icon:'drop',   title:'Medicated wash', detail:'Three to five minutes on the scalp, not the hair' },
  { id:'swap',  icon:'swap',   title:'Rotate the active', detail:'Alternate mechanisms so resistance has nothing to build on' },
  { id:'cream', icon:'shield', title:'Barrier cream', detail:'Ceramide, cholesterol and fatty acid together' },
  { id:'log',   icon:'pen',    title:'Log the day', detail:'Sixty seconds now beats guessing in six months' }
];

const TRIGGERS = ['Stress','Poor sleep','Sugar','Alcohol','Dairy','Sweat','Cold weather','Missed a wash','New product'];

const ICONS = {
  home:   '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  steps:  '<path d="M4 19h5v-5H4zM9.5 14h5V9h-5zM15 9h5V4h-5z"/>',
  scan:   '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18"/>',
  chart:  '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  plus:   '<path d="M12 5v14M5 12h14"/>',
  check:  '<path d="m5 12.5 4.5 4.5L19 7"/>',
  drop:   '<path d="M12 3s6 6.3 6 10.2A6 6 0 0 1 6 13.2C6 9.3 12 3 12 3z"/>',
  swap:   '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  shield: '<path d="M12 3l7 3v6c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6z"/>',
  pen:    '<path d="M4 20h4L20 8l-4-4L4 16z"/>',
  spark:  '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  clear:  '<path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm4 6-6 6-3-3"/>'
};
