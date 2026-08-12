/* Reference data. Kept apart from app logic so a fact can be corrected
   without touching anything that runs.

   Why the categories are what they are: Malassezia has no fatty acid
   synthase gene. It cannot build C14–C16 chains itself, so it secretes
   lipases and scavenges them from whatever is on the skin. Published work
   puts the usable range at roughly C11 to C24. That single fact decides
   most of this list — free fatty acids in range feed it, esters of those
   acids feed it once lipases split them, and anything outside the range or
   without an ester bond generally does not.

   "conditional" exists because a flat verdict would be wrong for a handful
   of ingredients whose behaviour depends on how they were manufactured. */

const INGREDIENTS = [

  /* ---------- free fatty acids in range ---------- */
  { name:'Oleic Acid', cat:'feeder', note:'C18:1, and the acid Malassezia grows on most readily in culture. Also the dominant fatty acid in human sebum, which is a large part of why this disease sits where the oil glands are.' },
  { name:'Stearic Acid', cat:'feeder', note:'C18 saturated. Hides in products that never call themselves oils — it is a thickener and emulsifier as much as a lipid.' },
  { name:'Palmitic Acid', cat:'feeder', note:'C16 saturated. One of the two acids used as the standard growth substrate in Malassezia culture media.' },
  { name:'Lauric Acid', cat:'feeder', note:'C12, and 42–48% of coconut oil. Antibacterial in other contexts, which earns it clean-beauty marketing, but still squarely inside the usable range.' },
  { name:'Myristic Acid', cat:'feeder', note:'C14, common in coconut and palm kernel oil.' },
  { name:'Linoleic Acid', cat:'feeder', note:'C18:2. Lower feeding potential than oleic and often recommended for acne generally, but still within range as a free acid. Oils that are linoleic-dominant behave better than the acid alone suggests.' },
  { name:'Behenic Acid', cat:'feeder', note:'C22. Near the top of the usable range but not outside it.' },
  { name:'Arachidic Acid', cat:'feeder', note:'C20 saturated.' },
  { name:'Ricinoleic Acid', cat:'feeder', note:'C18 hydroxy acid, 80–90% of castor oil. Sources genuinely disagree — some argue it is antifungal — but the chain length is in range, so it is flagged rather than cleared.' },

  /* ---------- esters and emulsifiers ---------- */
  { name:'Isopropyl Myristate', cat:'feeder', note:'Synthetic ester used to make heavy lotions feel light. Lipases split it back into myristic acid on skin, so the ester form is not an escape route.' },
  { name:'Isopropyl Palmitate', cat:'feeder', note:'Same logic as isopropyl myristate.' },
  { name:'Ethylhexyl Palmitate', cat:'feeder', note:'A very common lightweight emollient, including in sunscreens marketed as non-greasy. Still a palmitic acid ester.' },
  { name:'Ethylhexyl Stearate', cat:'feeder', note:'Stearic acid ester, same reasoning.' },
  { name:'Cetyl Palmitate', cat:'feeder', note:'Palmitic acid ester, common in creams and lip products.' },
  { name:'Myristyl Myristate', cat:'feeder', note:'Myristic acid ester — both halves of the molecule sit in range.' },
  { name:'Glyceryl Stearate', cat:'feeder', note:'Stearic acid emulsifier and one of the most common entries on any "gentle, fragrance-free" moisturiser.' },
  { name:'Glyceryl Oleate', cat:'feeder', note:'Oleic acid emulsifier.' },
  { name:'Glyceryl Laurate', cat:'feeder', note:'Lauric acid ester, sometimes sold as an antimicrobial. Not for this yeast.' },
  { name:'PEG-100 Stearate', cat:'feeder', note:'Stearate PEG emulsifier, near-universal in creams and almost always paired with glyceryl stearate.' },
  { name:'PEG-40 Hydrogenated Castor Oil', cat:'feeder', note:'Castor-derived solubiliser used to dissolve fragrance and actives into water-based products.' },
  { name:'Polysorbate 20', cat:'feeder', note:'Fatty acid ester emulsifier, usually lauric.' },
  { name:'Polysorbate 60', cat:'feeder', note:'Stearate version of the same family.' },
  { name:'Polysorbate 80', cat:'feeder', note:'Oleate version of the same family.' },
  { name:'Sorbitan Oleate', cat:'feeder', note:'Oleic acid ester used as an emulsifier.' },
  { name:'Sorbitan Stearate', cat:'feeder', note:'Stearic acid ester, same family.' },
  { name:'Sorbitan Laurate', cat:'feeder', note:'Lauric acid ester, same family.' },
  { name:'Ceteareth-20', cat:'feeder', note:'Ethoxylated fatty alcohol emulsifier. Treated cautiously because the manufacturing feedstock is a fatty chain in range.' },
  { name:'Steareth-20', cat:'feeder', note:'Stearyl ethoxylate, same reasoning as ceteareth-20.' },
  { name:'Glycol Distearate', cat:'feeder', note:'The ingredient that makes shampoo look pearlescent. Stearic acid ester.' },
  { name:'Sucrose Stearate', cat:'feeder', note:'Sugar ester of stearic acid, popular in "clean" formulations.' },
  { name:'Sucrose Laurate', cat:'feeder', note:'Sugar ester of lauric acid.' },
  { name:'Isostearyl Isostearate', cat:'feeder', note:'Branched C18 ester. Branching slows lipases but does not put it outside the range.' },
  { name:'Lanolin', cat:'feeder', note:'A complex mix of wax esters and fatty acids from wool. Rich in exactly what the yeast wants.' },
  { name:'Sodium Stearate', cat:'feeder', note:'The salt of stearic acid — a soap. Rinses off, but still the same chain.' },

  /* ---------- oils and butters ---------- */
  { name:'Coconut Oil', cat:'feeder', note:'42–48% lauric acid. Worth separating from two things it is confused with: coconut-derived surfactants and MCT oil are both chemically altered and behave differently.' },
  { name:'Cocos Nucifera', cat:'feeder', note:'INCI name for coconut oil.' },
  { name:'Olive Oil', cat:'feeder', note:'55–83% oleic acid, among the highest in common use.' },
  { name:'Olea Europaea', cat:'feeder', note:'INCI name for olive oil.' },
  { name:'Avocado Oil', cat:'feeder', note:'50–70% oleic acid.' },
  { name:'Persea Gratissima', cat:'feeder', note:'INCI name for avocado oil.' },
  { name:'Argan Oil', cat:'feeder', note:'43–49% oleic acid. Extremely common in hair oils that end up on the hairline.' },
  { name:'Shea Butter', cat:'feeder', note:'Roughly half oleic and half stearic, so it lands on both major feeder acids at once.' },
  { name:'Butyrospermum Parkii', cat:'feeder', note:'INCI name for shea butter.' },
  { name:'Marula Oil', cat:'feeder', note:'70–78% oleic acid, one of the highest of any carrier oil.' },
  { name:'Cocoa Butter', cat:'feeder', note:'60–65% stearic and palmitic combined.' },
  { name:'Sweet Almond Oil', cat:'feeder', note:'65–70% oleic acid.' },
  { name:'Prunus Amygdalus', cat:'feeder', note:'INCI name for sweet almond oil.' },
  { name:'Castor Oil', cat:'feeder', note:'80–90% ricinoleic acid. Very common in scalp oiling traditions, which makes it worth knowing about here.' },
  { name:'Ricinus Communis', cat:'feeder', note:'INCI name for castor oil.' },
  { name:'Sesame Oil', cat:'feeder', note:'Roughly 40% oleic. Another staple of traditional scalp oiling.' },
  { name:'Macadamia Oil', cat:'feeder', note:'55–65% oleic acid.' },
  { name:'Apricot Kernel Oil', cat:'feeder', note:'Around 60% oleic acid.' },
  { name:'Wheat Germ Oil', cat:'feeder', note:'Mixed profile, meaningful oleic and palmitic content.' },
  { name:'Palm Oil', cat:'feeder', note:'Roughly 44% palmitic, 39% oleic.' },
  { name:'Palm Kernel Oil', cat:'feeder', note:'Lauric-dominant, similar to coconut oil.' },
  { name:'Tamanu Oil', cat:'feeder', note:'Oleic and linoleic rich. Marketed for skin healing, still a feeder here.' },
  { name:'Moringa Oil', cat:'feeder', note:'Very high oleic content.' },
  { name:'Baobab Oil', cat:'feeder', note:'Oleic and linoleic dominant.' },
  { name:'Camellia Oil', cat:'feeder', note:'Around 80% oleic acid.' },
  { name:'Peanut Oil', cat:'feeder', note:'Also labelled Arachis Hypogaea. Oleic dominant.' },
  { name:'Arachis Hypogaea', cat:'feeder', note:'INCI name for peanut oil.' },
  { name:'Evening Primrose Oil', cat:'feeder', note:'Linoleic dominant with GLA. Lower risk than oleic oils but not clear.' },
  { name:'Borage Seed Oil', cat:'feeder', note:'Linoleic and GLA rich, same qualified caution as evening primrose.' },
  { name:'Black Seed Oil', cat:'feeder', note:'Nigella sativa. Linoleic and oleic rich. Has some antifungal literature behind it, but the lipid load is real.' },
  { name:'Rosehip Oil', cat:'feeder', note:'Linoleic and linolenic dominant. Better than oleic oils, still a triglyceride.' },
  { name:'Hemp Seed Oil', cat:'feeder', note:'Linoleic dominant.' },
  { name:'Rice Bran Oil', cat:'feeder', note:'Oleic and linoleic, roughly even.' },
  { name:'Soybean Oil', cat:'feeder', note:'Also labelled Glycine Soja. Linoleic dominant.' },
  { name:'Glycine Soja', cat:'feeder', note:'INCI name for soybean oil.' },
  { name:'Jojoba Esters', cat:'feeder', note:'Unlike whole jojoba oil, the processed ester form is closer to a conventional emollient ester. Treated cautiously.' },
  { name:'Beeswax', cat:'feeder', note:'Wax esters with free fatty acid content. Occlusive on top of that.' },
  { name:'Cera Alba', cat:'feeder', note:'INCI name for beeswax.' },

  /* ---------- actives ---------- */
  { name:'Ketoconazole', cat:'active', note:'First-line azole. Mutations in the ERG11 gene are the best-documented resistance route and they apply to the whole azole class at once, which is why swapping one azole for another often changes nothing.' },
  { name:'Ciclopirox', cat:'active', note:'Not an azole. Works by chelating iron, so azole resistance does not carry over. A genuinely different lever if ketoconazole has stopped working.' },
  { name:'Zinc Pyrithione', cat:'active', note:'Disrupts membrane transport in the yeast. Broad, cheap, easy to find.' },
  { name:'Piroctone Olamine', cat:'active', note:'Non-azole, common in European formulations and scarce on US shelves. Worth seeking out precisely because most people have never rotated through it.' },
  { name:'Octopirox', cat:'active', note:'Trade name for piroctone olamine.' },
  { name:'Climbazole', cat:'active', note:'Azole class but structurally distinct from ketoconazole. Appears in some EU-market shampoos.' },
  { name:'Selenium Sulfide', cat:'active', note:'Antifungal and keratolytic at once.' },
  { name:'Selenium Disulfide', cat:'active', note:'Recent clinical guidance singles this out as unusually versatile — antifungal, sebum-reducing and keratolytic — useful both for knocking down a flare and holding the line after.' },
  { name:'Coal Tar', cat:'active', note:'Antiproliferative with mild antifungal action. Stains, smells, and raises photosensitivity.' },
  { name:'Sulfur', cat:'active', note:'Keratolytic and mildly antimicrobial. Drying, which cuts both ways.' },
  { name:'Undecylenic Acid', cat:'active', note:'C11 and antifungal rather than nutritive — it sits right at the edge of the usable range and inhibits instead of feeding. The exception that proves the chain-length rule.' },
  { name:'Clotrimazole', cat:'active', note:'Azole. Shares the ERG11 resistance story.' },
  { name:'Miconazole', cat:'active', note:'Azole, widely available over the counter as an antifungal cream.' },
  { name:'Econazole', cat:'active', note:'Azole, prescription in most markets.' },
  { name:'Bifonazole', cat:'active', note:'Azole with a longer skin residence time than most.' },
  { name:'Terbinafine', cat:'active', note:'Allylamine rather than azole. Strong against dermatophytes; evidence in seborrheic dermatitis is thinner than for the azoles.' },
  { name:'Salicylic Acid', cat:'active', note:'Keratolytic, not antifungal. It dissolves the scale that shelters the yeast and lets the real antifungal reach skin.' },
  { name:'Betaine Salicylate', cat:'active', note:'Gentler salicylate ester, useful where plain salicylic acid is too harsh.' },
  { name:'Urea', cat:'active', note:'Humectant at low percentages, keratolytic above roughly 10%. Rare in doing both jobs well.' },
  { name:'Lactic Acid', cat:'active', note:'Keratolytic and humectant. Gentler than salicylic on the face.' },
  { name:'Glycolic Acid', cat:'active', note:'Keratolytic. Effective but easy to overdo on an already inflamed barrier.' },
  { name:'Lithium Succinate', cat:'active', note:'An older seb-derm-specific treatment that still appears in clinical guidance and rarely in anything you can buy casually. Worth asking about by name.' },
  { name:'Lithium Gluconate', cat:'active', note:'The other lithium salt used for the same purpose.' },
  { name:'Azelaic Acid', cat:'active', note:'C9 dicarboxylic acid — too short to feed the yeast, and anti-inflammatory. Useful on facial involvement where redness is the main complaint.' },
  { name:'Roflumilast', cat:'active', note:'PDE4 inhibitor, FDA-approved for seborrheic dermatitis in December 2023. Prescription.' },
  { name:'Tacrolimus', cat:'active', note:'Calcineurin inhibitor for face and eyelids where long-term steroids are a bad trade. Prescription.' },
  { name:'Pimecrolimus', cat:'active', note:'The other calcineurin inhibitor used the same way.' },
  { name:'Hydrocortisone', cat:'active', note:'Low-potency steroid. Fine for short flare control, not for maintenance — continuous use thins skin.' },
  { name:'Desonide', cat:'active', note:'Low-potency steroid usually chosen for the face. Flares only.' },
  { name:'Fluocinolone Acetonide', cat:'active', note:'Medium-potency steroid, commonly supplied as a scalp oil. Flares only.' },
  { name:'Chlorhexidine', cat:'active', note:'Antiseptic. A randomised trial paired it with cetrimide for seborrheic dermatitis with useful results.' },

  /* ---------- conditional ---------- */
  { name:'MCT Oil', cat:'conditional', note:'Not one fixed thing. A true medium-chain triglyceride oil runs about 57% caprylic (C8) and 40% capric (C10) with under 1% lauric — both too short to be usable. But "MCT oil" is not a regulated term and some bottles blend lauric acid back in. If the label does not say Caprylic/Capric Triglyceride, treat it as probably fine rather than known safe.' },
  { name:'Fractionated Coconut Oil', cat:'conditional', note:'Ambiguous by name. Sometimes it means coconut oil with the long chains stripped out, sometimes it is a nicer word for MCT oil. Same caveat.' },
  { name:'Caprylic/Capric Triglyceride', cat:'conditional', note:'The purified version — C8 and C10 only, no meaningful lauric acid. This is the exact INCI name to look for if you want the well-defined form of MCT oil.' },
  { name:'Caprylic Acid', cat:'conditional', note:'C8, below the usable range, and there is research suggesting it is actively inhibitory. Listed here rather than as safe only because free acids can sting a broken barrier.' },
  { name:'Capric Acid', cat:'conditional', note:'C10, just below the range. Same reasoning as caprylic acid.' },
  { name:'Squalene', cat:'conditional', note:'Note the spelling: no "a". The unstable precursor to squalane. If it was not fully hydrogenated during manufacture it oxidises into inflammatory peroxides. Squalane is the version you want.' },
  { name:'Jojoba Oil', cat:'conditional', note:'A liquid wax ester rather than a triglyceride, so it does not break down the way other oils do, and many safe-lists clear it. It still carries some oleic and gadoleic acid. Reasonable diluted or rinsed off, riskier neat and left on overnight.' },
  { name:'Cocamidopropyl Betaine', cat:'conditional', note:'The "coco" is misleading — the fatty acid has been converted into a betaine surfactant and is not what the yeast eats. Separate issue entirely: it was named contact allergen of the year in 2004, which is worth knowing if a product marketed as gentle keeps stinging.' },
  { name:'Tea Tree Oil', cat:'conditional', note:'Mostly terpenes, so outside the yeast fuel supply. But it only meaningfully inhibits Malassezia above roughly 30% concentration, far above normal use, and neat application is a known sensitiser. Diluted in a rinse-off is a different proposition from a drop on skin.' },
  { name:'Cetearyl Alcohol', cat:'conditional', note:'A fatty alcohol, not a fatty acid — no carboxyl group for lipases to work on, which is why most safe-lists clear it. The caution is practical rather than biochemical: it is usually paired with an emulsifier that is a feeder.' },
  { name:'Cetyl Alcohol', cat:'conditional', note:'Same fatty alcohol reasoning as cetearyl alcohol.' },
  { name:'Stearyl Alcohol', cat:'conditional', note:'Same fatty alcohol reasoning. Check what it is formulated alongside.' },
  { name:'Behenyl Alcohol', cat:'conditional', note:'C22 fatty alcohol. Same reasoning.' },
  { name:'Honey', cat:'conditional', note:'Medical-grade manuka has real antimicrobial evidence behind it. Ordinary culinary honey does not carry the same data, and sugar on inflamed skin is not automatically neutral.' },
  { name:'Propolis', cat:'conditional', note:'Antimicrobial bee resin with some supporting evidence, and a recognised contact allergen in a minority of people.' },
  { name:'Apple Cider Vinegar', cat:'conditional', note:'Widely reported to reduce flaking, entirely anecdotally. Dilute at least 1:1 — undiluted vinegar can chemically burn broken skin.' },

  /* ---------- safe ---------- */
  { name:'Glycerin', cat:'safe', note:'Humectant. Pulls water into skin and feeds nothing.' },
  { name:'Hyaluronic Acid', cat:'safe', note:'Humectant, structurally unrelated to any fatty acid.' },
  { name:'Sodium Hyaluronate', cat:'safe', note:'The salt form of hyaluronic acid, more stable in formula.' },
  { name:'Niacinamide', cat:'safe', note:'Supports barrier function, calms inflammation, and modestly reduces sebum output. Actively useful rather than merely harmless.' },
  { name:'Panthenol', cat:'safe', note:'Pro-vitamin B5. Supports barrier repair and hydration.' },
  { name:'Allantoin', cat:'safe', note:'Soothing and barrier-supportive.' },
  { name:'Squalane', cat:'safe', note:'Fully hydrogenated, shelf-stable, comedogenic rating around 1, inert to Malassezia. Sugarcane-derived is more reliably pure than olive-derived, which can carry trace impurities in cheaper grades.' },
  { name:'Mineral Oil', cat:'safe', note:'A pure hydrocarbon with no fatty acid chains at all, which makes it one of the most reliably inert occlusives available — despite its reputation in general skincare folklore.' },
  { name:'Petrolatum', cat:'safe', note:'Same hydrocarbon logic as mineral oil.' },
  { name:'Paraffinum Liquidum', cat:'safe', note:'INCI name for mineral oil.' },
  { name:'Dimethicone', cat:'safe', note:'Silicone, not a lipid, so the yeast cannot metabolise it. One caveat about occlusion rather than feeding: heavy silicone formulas can trap sweat and existing yeast against the hairline.' },
  { name:'Cyclopentasiloxane', cat:'safe', note:'Lightweight volatile silicone. Evaporates rather than sitting on skin.' },
  { name:'Dimethiconol', cat:'safe', note:'Silicone used for slip in conditioners.' },
  { name:'Amodimethicone', cat:'safe', note:'Conditioning silicone that binds to damaged hair. Not a lipid.' },
  { name:'Phenyl Trimethicone', cat:'safe', note:'Silicone used for shine in hair products.' },
  { name:'Ceramide NP', cat:'safe', note:'One of the ceramide subtypes measurably depleted in seborrheic dermatitis skin. Direct replacement of what is missing.' },
  { name:'Ceramide AP', cat:'safe', note:'Another subtype depleted in lesional skin.' },
  { name:'Ceramide EOP', cat:'safe', note:'A third barrier-relevant ceramide.' },
  { name:'Cholesterol', cat:'safe', note:'Works alongside ceramides and fatty acids. The ratio matters: studies use roughly 3:1:1 ceramide to cholesterol to fatty acid, and one or two of the three alone delays barrier recovery rather than helping.' },
  { name:'Colloidal Oatmeal', cat:'safe', note:'Anti-inflammatory and barrier-soothing.' },
  { name:'Centella Asiatica', cat:'safe', note:'Anti-inflammatory botanical, common in barrier-repair formulas.' },
  { name:'Madecassoside', cat:'safe', note:'The isolated active from centella.' },
  { name:'Aloe Barbadensis', cat:'safe', note:'Aloe vera. Soothing, not a fuel source.' },
  { name:'Sodium PCA', cat:'safe', note:'Humectant, part of skin’s own natural moisturising factor.' },
  { name:'Betaine', cat:'safe', note:'Humectant. Not to be confused with cocamidopropyl betaine, which is a surfactant.' },
  { name:'Trehalose', cat:'safe', note:'Sugar humectant.' },
  { name:'Zinc PCA', cat:'safe', note:'Sebum-regulating zinc salt. Different from zinc pyrithione, and not an antifungal.' },
  { name:'Sodium Cocoyl Isethionate', cat:'safe', note:'Another misleading "coco" name — converted into an isethionate surfactant. A gentle cleansing base.' },
  { name:'Decyl Glucoside', cat:'safe', note:'Mild sugar-based surfactant.' },
  { name:'Coco-Glucoside', cat:'safe', note:'Glucoside surfactant despite the name.' },
  { name:'Lauryl Glucoside', cat:'safe', note:'Same glucoside family.' },
  { name:'Sodium Cocoyl Glutamate', cat:'safe', note:'Amino-acid surfactant, mild.' },
  { name:'Sodium Lauroyl Methyl Isethionate', cat:'safe', note:'Mild surfactant with a lower sensitisation record than cocamidopropyl betaine.' },
  { name:'Sodium Laureth Sulfate', cat:'safe', note:'Not a feeder. Milder than SLS but still a strong cleanser on a compromised barrier.' },
  { name:'Grapeseed Oil', cat:'safe', note:'Around 70% linoleic acid, the profile consistently associated with lower feeding potential than oleic-dominant oils.' },
  { name:'Sunflower Seed Oil', cat:'safe', note:'Linoleic-dominant, same lower-risk profile. Also has barrier-repair evidence of its own.' },
  { name:'Safflower Oil', cat:'safe', note:'Linoleic-dominant.' },
  { name:'Polyquaternium-10', cat:'safe', note:'Cationic conditioning polymer, not a fatty acid. No feeding mechanism, though seb-derm-specific research on it is thin.' },
  { name:'Polyquaternium-7', cat:'safe', note:'Conditioning polymer, same reasoning.' },
  { name:'Behentrimonium Methosulfate', cat:'safe', note:'Conditioning agent. Low concern by mechanism.' },
  { name:'Guar Hydroxypropyltrimonium Chloride', cat:'safe', note:'Plant-derived conditioning polymer.' },
  { name:'Hydrolyzed Wheat Protein', cat:'safe', note:'Protein fragment, not a lipid. Safe unless you have a wheat allergy.' },
  { name:'Zinc Oxide', cat:'safe', note:'Mineral UV filter. Inert, and the usual first choice for sun protection on seb-derm-prone skin — but check the base it is suspended in, which is where the feeders hide.' },
  { name:'Titanium Dioxide', cat:'safe', note:'The other mineral UV filter. Same reasoning.' },
  { name:'Octocrylene', cat:'safe', note:'Chemical UV filter. An acrylate ester rather than a fatty acid ester, so not a feeder.' },
  { name:'Avobenzone', cat:'safe', note:'Chemical UV filter, not a feeder. Separately, it has a contact-dermatitis record on already inflamed skin.' },
  { name:'Ethylhexyl Salicylate', cat:'safe', note:'Salicylate UV filter, not a fatty acid ester despite the ethylhexyl prefix.' },
  { name:'Phenoxyethanol', cat:'safe', note:'Standard preservative, well tolerated by most.' },
  { name:'Sodium Benzoate', cat:'safe', note:'Preservative.' },
  { name:'Potassium Sorbate', cat:'safe', note:'Preservative.' },
  { name:'Citric Acid', cat:'safe', note:'pH adjuster, usually present in tiny amounts.' },
  { name:'Xanthan Gum', cat:'safe', note:'Thickener, a polysaccharide rather than a lipid.' },
  { name:'Caffeine', cat:'safe', note:'Sometimes added to scalp products. No feeding mechanism.' },

  /* ---------- irritants ---------- */
  { name:'Fragrance', cat:'irritant', note:'A leading cause of the contact dermatitis that mimics and worsens seb derm. Nothing to do with feeding the yeast — a separate way to stay inflamed.' },
  { name:'Parfum', cat:'irritant', note:'EU label term for fragrance.' },
  { name:'Linalool', cat:'irritant', note:'A fragrance component that must be declared separately in the EU because of its allergy record.' },
  { name:'Limonene', cat:'irritant', note:'Another separately-declared fragrance allergen. Oxidises over time into a stronger sensitiser.' },
  { name:'Citronellol', cat:'irritant', note:'Declared fragrance allergen.' },
  { name:'Geraniol', cat:'irritant', note:'Declared fragrance allergen.' },
  { name:'Sodium Lauryl Sulfate', cat:'irritant', note:'Effective but harsh. Strips barrier lipids from skin already short of them.' },
  { name:'Propylene Glycol', cat:'irritant', note:'Present in many antifungal shampoos themselves, and a known contact allergen for a minority. Worth patch testing before blaming the active ingredient.' },
  { name:'Alcohol Denat', cat:'irritant', note:'Drying and barrier-disrupting with frequent use.' },
  { name:'Methylisothiazolinone', cat:'irritant', note:'Preservative with a substantial contact-allergy record.' },
  { name:'Methylchloroisothiazolinone', cat:'irritant', note:'Usually paired with MIT, same concern.' },
  { name:'DMDM Hydantoin', cat:'irritant', note:'Formaldehyde-releasing preservative.' },
  { name:'Imidazolidinyl Urea', cat:'irritant', note:'Another formaldehyde releaser. Unrelated to plain urea.' },
  { name:'Menthol', cat:'irritant', note:'Feels soothing on contact and irritates compromised skin anyway.' },
  { name:'Peppermint Oil', cat:'irritant', note:'Menthol-bearing essential oil, common in "cooling" scalp products.' },
  { name:'Eucalyptus Oil', cat:'irritant', note:'Essential oil with sensitising potential.' },
  { name:'Balsam Of Peru', cat:'irritant', note:'One of the most common contact allergens in patch testing.' }
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
      '<strong>Roflumilast foam 0.3%</strong>, a PDE4 inhibitor approved for seb derm in December 2023. Phase III trials put roughly 80% of patients clear or almost clear at one year, with itch relief sustained across 52 weeks.',
      '<strong>Lithium succinate or gluconate</strong> — an older seb-derm-specific option that still appears in guidance and almost never gets offered.'
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

/* Grouped rather than a flat list, because the groups are the hypotheses:
   diet, body, environment, routine. The correlation engine still sees a
   flat array of whatever was ticked. */
const TRIGGER_GROUPS = [
  { label:'Diet',        items:['Sugar','Dairy','Alcohol','Gluten','Fried food','Caffeine'] },
  { label:'Body',        items:['Stress','Poor sleep','Illness','Hormonal'] },
  { label:'Environment', items:['Sweat','Cold weather','Humidity','Sun','Hard water'] },
  { label:'Routine',     items:['Missed a wash','New product','Skipped moisturiser','Wore a hat'] }
];

/* Seeds the product field so a regimen is one tap rather than retyping a
   drug name every day. The user's own past entries get merged in on top. */
const PRODUCT_PRESETS = [
  'Ketoconazole 2%',
  'Ketoconazole 1%',
  'Zinc pyrithione',
  'Selenium sulfide',
  'Ciclopirox 1%',
  'Coal tar',
  'Salicylic acid',
  'Piroctone olamine',
  'Climbazole',
  'Sulfur + salicylic acid bar',
  'Roflumilast foam 0.3%',
  'Tacrolimus 0.1%',
  'Pimecrolimus 1%',
  'Desonide 0.05%',
  'Fluocinolone scalp oil',
  'Itraconazole (oral)',
  'Fluconazole (oral)',
  'Isotretinoin (oral)',
  'Barrier cream only',
  'Nothing today'
];

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
