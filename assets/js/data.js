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

  /* ---------- hair-loss actives ----------
     Not antifungal, but people put them on the same scalp, and the vehicle
     they arrive in is often the thing that decides whether seb derm flares. */
  { name:'Minoxidil', cat:'hair', note:'The mainstay of topical hair regrowth, and a genuine complication on a seb-derm scalp. In confirmed contact dermatitis cases 74.7% reacted to minoxidil itself; scalp irritation affects roughly 7% on 2% solution and more on 5%. Not a reason to avoid it — a reason to pick the formulation carefully and pair it with an antifungal shampoo.' },
  { name:'Nanoxidil', cat:'hair', note:'A minoxidil analogue with lower molecular weight, marketed as less irritating. Far less evidence behind it than minoxidil, and the vehicle still matters more than the molecule.' },
  { name:'Aminexil', cat:'hair', note:'Structurally related to minoxidil, used widely in European hair products. Evidence is thinner and mostly manufacturer-sponsored.' },
  { name:'Finasteride', cat:'hair', note:'5-alpha reductase inhibitor. Topical forms reach scalp DHT with less systemic exposure than oral, but contact dermatitis has been reported at 12–24% in some combination formulations — attributed to vehicle alcohol and propylene glycol as much as to the drug.' },
  { name:'Dutasteride', cat:'hair', note:'Dual 5-alpha reductase inhibitor, more potent than finasteride at suppressing DHT. Published research on the topical form is limited, and compounded versions vary considerably in what they are dissolved in.' },
  { name:'Tretinoin', cat:'hair', note:'Sometimes compounded with minoxidil to improve penetration. It also thins the stratum corneum, which on an inflamed seb-derm scalp increases irritation and stinging. Use with caution during a flare.' },
  { name:'Latanoprost', cat:'hair', note:'Prostaglandin analogue borrowed from glaucoma treatment. Real but limited scalp evidence; mostly used for eyelashes and eyebrows.' },
  { name:'Rosemary Oil', cat:'hair', note:'A randomised trial of 100 patients found it comparable to minoxidil 2% at six months, with significantly less scalp itching — which matters on skin that is already inflamed. It remains an essential oil and can sensitise if used undiluted.' },
  { name:'Rosmarinus Officinalis', cat:'hair', note:'INCI name for rosemary. Same trial evidence and the same caution about undiluted use.' },
  { name:'Saw Palmetto', cat:'hair', note:'Botanical 5-alpha reductase inhibitor, sold widely in serums. Evidence is weak and inconsistent, though the safety profile is good and it is not a yeast feeder.' },
  { name:'Serenoa Repens', cat:'hair', note:'INCI name for saw palmetto.' },
  { name:'Redensyl', cat:'hair', note:'Two patented molecules — DHQG from larch and EGCG2 from green tea — plus glycine and zinc chloride, carried in roughly 50% glycerin. Water-and-glycerin based, so nothing in it feeds the yeast. Full INCI: glycerin, water, Larix europea wood extract, glycine, Camellia sinensis leaf extract, zinc chloride, sodium metabisulfite.' },
  { name:'Dihydroquercetin Glucoside', cat:'hair', note:'DHQG, one of the two active molecules in Redensyl. A larch-derived flavonoid, water-soluble, not a lipid.' },
  { name:'Epigallocatechin Gallate Glucoside', cat:'hair', note:'EGCG2, the green tea polyphenol derivative in Redensyl. Water-soluble and inert to Malassezia.' },
  { name:'Larix Europea Wood Extract', cat:'safe', note:'The larch source of DHQG in Redensyl. Botanical extract, not an oil.' },
  { name:'Camellia Sinensis Leaf Extract', cat:'safe', note:'Green tea leaf extract — the EGCG source. Antioxidant, water-based. Not to be confused with camellia <em>oil</em>, which is oleic-rich and a feeder.' },
  { name:'Argania Spinosa Sprout Cell Extract', cat:'hair', note:'Argan <strong>stem cell</strong> extract — and this is a genuinely important distinction. It is a plant cell culture extract carried in isomalt, lecithin and water, not a triglyceride. Unlike argan oil, which is 43–49% oleic acid and a clear feeder, this is not one. Same plant, opposite verdict.' },
  { name:'Argania Spinosa Callus Culture Extract', cat:'hair', note:'The callus-culture form of argan stem cell extract. Same reasoning — a cell extract, not the oil.' },
  { name:'Argan Stem Cells', cat:'hair', note:'Marketing name for Argania Spinosa sprout or callus cell extract. Not argan oil, and not a feeder — check the INCI to confirm which one the bottle actually contains.' },
  { name:'Xylishine', cat:'safe', note:'A sugar-based humectant blend with brown algae extract — xylitylglucoside, anhydroxylitol, maltitol, xylitol and Pelvetia canaliculata. Marketed for shine, but the relevant part here is that it is described as reinforcing the scalp barrier, which is the thing seb derm degrades. No lipids in it.' },
  { name:'Xylitylglucoside', cat:'safe', note:'Sugar-derived humectant, the main component of Xylishine.' },
  { name:'Anhydroxylitol', cat:'safe', note:'Sugar alcohol humectant.' },
  { name:'Xylitol', cat:'safe', note:'Sugar alcohol humectant. Also mildly antimicrobial.' },
  { name:'Maltitol', cat:'safe', note:'Sugar alcohol humectant.' },
  { name:'Pelvetia Canaliculata Extract', cat:'safe', note:'Brown algae extract used for barrier support. Water-based.' },
  { name:'Promois WJ', cat:'safe', note:'Hydrolyzed pea protein from Seiwa Kasei, marketed as a keratin-like botanical protein because its amino acid profile resembles keratin. A protein fragment, so no feeding mechanism.' },
  { name:'Hydrolyzed Pea Protein', cat:'safe', note:'The INCI behind Promois WJ and similar keratin-substitute actives. Protein fragment, inert to the yeast.' },
  { name:'Calcium Pantothenate', cat:'safe', note:'The calcium salt of vitamin B5 — the same vitamin as panthenol, in a different form. Water-soluble, supports barrier repair, feeds nothing.' },
  { name:'Sodium Metabisulfite', cat:'safe', note:'Antioxidant and preservative used at trace levels, including inside Redensyl. Can sensitise a small minority.' },
  { name:'Zinc Chloride', cat:'safe', note:'Zinc salt used in hair actives for its role in keratin cross-linking. Not an antifungal like zinc pyrithione.' },
  { name:'Glycine', cat:'safe', note:'Amino acid, a building block of hair keratin proteins. Water-soluble.' },
  { name:'Isomalt', cat:'safe', note:'Sugar alcohol used to carry plant stem cell extracts. Inert.' },
  { name:'Lecithin', cat:'conditional', note:'A phospholipid usually derived from soy, used to carry actives. It contains fatty acid chains, so on a seb-derm scalp treat it cautiously — though it typically appears at very low levels as a carrier rather than as an emollient.' },
  { name:'Procapil', cat:'hair', note:'Trade-name blend of a peptide, apigenin and oleanolic acid. Manufacturer-sponsored evidence. Note some formulations carry it in oleic-acid-derived carriers, so read the rest of the list.' },
  { name:'Capixyl', cat:'hair', note:'Peptide plus red clover extract complex. Supplier-generated evidence.' },
  { name:'Baicapil', cat:'hair', note:'Botanical complex marketed for the anagen phase. Supplier evidence only.' },
  { name:'AnaGain', cat:'hair', note:'Pea sprout extract complex. Supplier evidence only.' },
  { name:'Acetyl Tetrapeptide-3', cat:'hair', note:'The peptide inside several branded hair complexes. Inert with respect to Malassezia.' },
  { name:'Biotinoyl Tripeptide-1', cat:'hair', note:'Biotin-linked peptide used in hair serums. Not a yeast fuel source.' },
  { name:'Copper Tripeptide-1', cat:'hair', note:'Also labelled GHK-Cu. Wound-healing peptide used in scalp serums. Inert to the yeast.' },
  { name:'Adenosine', cat:'hair', note:'One of the better-evidenced non-prescription hair actives, approved for the purpose in Japan. Water-soluble and irrelevant to Malassezia.' },
  { name:'Melatonin', cat:'hair', note:'Topical melatonin has modest supporting data for androgenetic alopecia. Usually formulated in alcohol, which is the part to watch on inflamed skin.' },
  { name:'Stemoxydine', cat:'hair', note:'Follicle-focused active from a major cosmetics house. Brand-sponsored evidence.' },
  { name:'Caffeine', cat:'hair', note:'Blocks DHT effects on the follicle in laboratory work; human evidence is modest but it is cheap, well tolerated and does not feed the yeast.' },
  { name:'Biotin', cat:'hair', note:'Only useful if you are actually deficient, which most people are not. Harmless either way, topically or orally.' },
  { name:'Ketoconazole 2%', cat:'active', note:'Worth calling out separately from plain ketoconazole because this is the strength with hair evidence: improved hair density and anagen proportion in androgenetic alopecia, additive with finasteride. The rare product that treats the seb derm and the hair loss at once.' },
  { name:'Onion Extract', cat:'hair', note:'Some small trial support for alopecia areata specifically, not pattern hair loss. Sulphur-containing and generally not a feeder.' },
  { name:'Pumpkin Seed Oil', cat:'feeder', note:'Promoted for hair loss on the back of one oral supplement trial. As a topical it is a triglyceride oil with meaningful oleic and linoleic content, so on a seb-derm scalp it works against you.' },

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
  { name:'Vitis Vinifera Seed Oil', cat:'safe', note:'INCI name for grapeseed oil. Linoleic-dominant.' },
  { name:'Sunflower Seed Oil', cat:'safe', note:'Linoleic-dominant, same lower-risk profile. Also has barrier-repair evidence of its own.' },
  { name:'Helianthus Annuus', cat:'safe', note:'INCI name for sunflower. Linoleic-dominant, and one of the better-tolerated oils on compromised skin.' },
  { name:'Safflower Oil', cat:'safe', note:'Linoleic-dominant.' },
  { name:'Carthamus Tinctorius', cat:'safe', note:'INCI name for safflower. Linoleic-dominant.' },
  { name:'Simmondsia Chinensis', cat:'conditional', note:'INCI name for jojoba — a liquid wax ester rather than a triglyceride, so it behaves differently from true oils. Same qualified caution as jojoba oil.' },
  { name:'Prunus Armeniaca Kernel Oil', cat:'feeder', note:'INCI name for apricot kernel oil. Around 60% oleic acid.' },
  { name:'Sesamum Indicum', cat:'feeder', note:'INCI name for sesame oil. Roughly 40% oleic.' },
  { name:'Macadamia Ternifolia', cat:'feeder', note:'INCI name for macadamia oil. Oleic-dominant.' },
  { name:'Rosa Canina Fruit Oil', cat:'feeder', note:'INCI name for rosehip oil. Linoleic and linolenic dominant, but still a triglyceride.' },
  { name:'Cannabis Sativa Seed Oil', cat:'feeder', note:'INCI name for hemp seed oil. Linoleic-dominant triglyceride.' },
  { name:'Oryza Sativa Bran Oil', cat:'feeder', note:'INCI name for rice bran oil. Oleic and linoleic in roughly equal share.' },
  { name:'Theobroma Cacao', cat:'feeder', note:'INCI name for cocoa butter. Stearic and palmitic dominant.' },
  { name:'Elaeis Guineensis', cat:'feeder', note:'INCI name for palm oil. Palmitic and oleic dominant.' },
  { name:'Sodium Olivate', cat:'feeder', note:'Saponified olive oil — the olive fatty acids in soap form. Rinses off, but it is still the oleic-rich chain.' },
  { name:'Sodium Cocoate', cat:'feeder', note:'Saponified coconut oil. Same reasoning as sodium olivate.' },
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

  /* ---------- alcohols ----------
     The single most confused group on any label. Short-chain alcohols strip
     and dry. Fatty alcohols are waxy emollients that do the opposite. They
     share a word and nothing else. */
  { name:'Alcohol Denat', cat:'irritant', note:'Denatured ethanol. Evaporates fast, carries actives well, and strips barrier lipids from skin that is already short of them. The most common drying alcohol in serums and sprays.' },
  { name:'SD Alcohol 40', cat:'irritant', note:'Specially denatured ethanol, the version used in most minoxidil foams and sprays. Same drying behaviour as alcohol denat.' },
  { name:'Ethanol', cat:'irritant', note:'Plain ethyl alcohol. In minoxidil solutions it sits alongside propylene glycol as the other half of the drying vehicle.' },
  { name:'Isopropyl Alcohol', cat:'irritant', note:'Rubbing alcohol. Harsher on skin than ethanol and no gentler on an inflamed scalp.' },
  { name:'Benzyl Alcohol', cat:'safe', note:'Despite the name this is a preservative used at fractions of a percent, not a drying solvent. A recognised contact allergen for a small minority, but not comparable to alcohol denat.' },
  { name:'Myristyl Alcohol', cat:'conditional', note:'Fatty alcohol, C14. Waxy emollient rather than a solvent — it does not dry skin. Same caveat as the other fatty alcohols: check what it is emulsified with.' },
  { name:'Lauryl Alcohol', cat:'conditional', note:'Fatty alcohol, C12. Not a drying alcohol. Frequently a feedstock for the sulfate surfactants further up the label.' },
  { name:'Oleyl Alcohol', cat:'conditional', note:'Fatty alcohol derived from oleic acid. The most cautious of the fatty alcohols for this condition, given its origin.' },

  /* ---------- shampoo surfactants ---------- */
  { name:'Ammonium Lauryl Sulfate', cat:'irritant', note:'Sulfate cleanser, comparable in harshness to SLS. Effective and stripping.' },
  { name:'Ammonium Laureth Sulfate', cat:'safe', note:'Ethoxylated, so milder than the plain lauryl version. Not a feeder, though still a fairly strong cleanser.' },
  { name:'Sodium Coco-Sulfate', cat:'irritant', note:'Marketed as the natural alternative to SLS. Chemically very close to it and no gentler in practice.' },
  { name:'TEA-Lauryl Sulfate', cat:'irritant', note:'Triethanolamine sulfate salt. Same stripping behaviour as the sodium version.' },
  { name:'Sodium C14-16 Olefin Sulfonate', cat:'irritant', note:'Common sulfate-free replacement that is not actually gentle — it can be as drying as SLS.' },
  { name:'Sodium Methyl Cocoyl Taurate', cat:'safe', note:'Genuinely mild taurate surfactant. A good sign on a label.' },
  { name:'Disodium Laureth Sulfosuccinate', cat:'safe', note:'Mild secondary surfactant, common in low-irritation shampoos.' },
  { name:'Sodium Lauroyl Sarcosinate', cat:'safe', note:'Mild amino-acid-derived cleanser.' },
  { name:'Sodium Cocoyl Glycinate', cat:'safe', note:'Amino-acid surfactant, mild and pH-friendly.' },
  { name:'Coco-Betaine', cat:'conditional', note:'Close relative of cocamidopropyl betaine. Not a feeder, but shares the contact-allergy caveat.' },
  { name:'Cocamidopropyl Hydroxysultaine', cat:'safe', note:'Mild amphoteric surfactant, used where extra gentleness is wanted.' },
  { name:'Disodium Cocoamphodiacetate', cat:'safe', note:'Very mild amphoteric surfactant, common in baby and sensitive-scalp shampoos.' },
  { name:'Sodium Lauroamphoacetate', cat:'safe', note:'Another mild amphoteric cleanser.' },
  { name:'Cocamide MEA', cat:'feeder', note:'A coconut fatty acid amide used to thicken and boost foam. Unlike the betaine and isethionate surfactants, this one retains a usable fatty acid chain — treat it as a feeder.' },
  { name:'Cocamide DEA', cat:'feeder', note:'Same fatty acid amide chemistry as cocamide MEA, with additional safety questions of its own.' },
  { name:'Lauramide DEA', cat:'feeder', note:'Lauric acid amide foam booster. Same reasoning.' },
  { name:'PEG-150 Distearate', cat:'feeder', note:'Stearate thickener, extremely common in shampoo. Easy to miss because it reads as a PEG rather than as a fat.' },
  { name:'PEG-7 Glyceryl Cocoate', cat:'feeder', note:'Coconut-derived refatting agent added to soften harsh cleansers. Well intentioned, wrong ingredient for this condition.' },
  { name:'Glyceryl Cocoate', cat:'feeder', note:'Coconut fatty acid ester used as an emollient in wash-off products.' },

  /* ---------- conditioning agents ---------- */
  { name:'Cetrimonium Chloride', cat:'safe', note:'Cationic detangler and antistatic agent. Not a lipid, no feeding mechanism.' },
  { name:'Behentrimonium Chloride', cat:'safe', note:'Conditioning quaternary ammonium compound. Low concern by mechanism.' },
  { name:'Stearalkonium Chloride', cat:'safe', note:'Older conditioning quat, still common in rinse-out conditioners.' },
  { name:'Polyquaternium-11', cat:'safe', note:'Film-forming conditioning polymer.' },
  { name:'Hydrolyzed Keratin', cat:'safe', note:'Protein fragment for hair strength. Nothing here for the yeast.' },
  { name:'Hydrolyzed Silk Protein', cat:'safe', note:'Protein fragment, inert to Malassezia.' },
  { name:'Hydrolyzed Rice Protein', cat:'safe', note:'Protein fragment, inert.' },
  { name:'Behenoxy Dimethicone', cat:'safe', note:'Silicone conditioner. Not metabolisable by the yeast.' },
  { name:'Bis-Aminopropyl Dimethicone', cat:'safe', note:'Repair-focused silicone, same reasoning as other silicones.' },

  /* ---------- preservatives, chelators, pH ---------- */
  { name:'Methylparaben', cat:'safe', note:'Well-studied preservative with a low irritation rate. The controversy around parabens is not a seb-derm issue.' },
  { name:'Propylparaben', cat:'safe', note:'Same family and reasoning as methylparaben.' },
  { name:'Diazolidinyl Urea', cat:'irritant', note:'Formaldehyde-releasing preservative. Unrelated to plain urea despite the name.' },
  { name:'Chlorphenesin', cat:'safe', note:'Mild preservative, occasionally sensitising.' },
  { name:'Disodium EDTA', cat:'safe', note:'Chelator that stops minerals in hard water interfering with the formula. Present in trace amounts.' },
  { name:'Tetrasodium EDTA', cat:'safe', note:'Same chelating role as disodium EDTA.' },
  { name:'Sodium Hydroxide', cat:'safe', note:'pH adjuster, fully neutralised in the finished product.' },
  { name:'Sodium Chloride', cat:'safe', note:'Salt, used to thicken surfactant systems. Can feel drying at high levels but is not an irritant in the usual sense.' },
  { name:'Carbomer', cat:'safe', note:'Synthetic thickener. Inert.' },
  { name:'Hydroxyethylcellulose', cat:'safe', note:'Cellulose thickener. Inert.' },
  { name:'Butylene Glycol', cat:'safe', note:'Humectant and solvent, and the usual stand-in when a formulator wants to avoid propylene glycol. Much better tolerated.' },
  { name:'Pentylene Glycol', cat:'safe', note:'Humectant with mild preservative action. Well tolerated.' },
  { name:'Bentonite', cat:'safe', note:'Clay used in scalp detox products. Absorbent and inert, though drying with frequent use.' },
  { name:'Charcoal', cat:'safe', note:'Adsorbent, mostly a marketing ingredient in shampoo. Harmless.' },
  { name:'Butylated Hydroxytoluene', cat:'safe', note:'BHT, an antioxidant that stops the formula going rancid. Present in tiny amounts, including in minoxidil foam.' },

  /* ---------- irritants ---------- */
  { name:'Fragrance', cat:'irritant', note:'A leading cause of the contact dermatitis that mimics and worsens seb derm. Nothing to do with feeding the yeast — a separate way to stay inflamed.' },
  { name:'Parfum', cat:'irritant', note:'EU label term for fragrance.' },
  { name:'Linalool', cat:'irritant', note:'A fragrance component that must be declared separately in the EU because of its allergy record.' },
  { name:'Limonene', cat:'irritant', note:'Another separately-declared fragrance allergen. Oxidises over time into a stronger sensitiser.' },
  { name:'Citronellol', cat:'irritant', note:'Declared fragrance allergen.' },
  { name:'Geraniol', cat:'irritant', note:'Declared fragrance allergen.' },
  { name:'Sodium Lauryl Sulfate', cat:'irritant', note:'Effective but harsh. Strips barrier lipids from skin already short of them.' },
  { name:'Propylene Glycol', cat:'irritant', note:'Present in many antifungal shampoos themselves, and a known contact allergen for a minority. Worth patch testing before blaming the active ingredient.' },
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
  feeder:      { label:'Feeds the yeast',    flag:true  },
  active:      { label:'Antifungal active',  flag:false },
  hair:        { label:'Hair-loss active',   flag:false },
  conditional: { label:'Depends on type',    flag:false },
  safe:        { label:'Safe to use',        flag:false },
  irritant:    { label:'Irritant risk',      flag:true  }
};

/* Fallback classification by chemical naming convention.

   There are tens of thousands of INCI names and no curated list will ever
   hold all of them, so an unknown ingredient must still get a provisional
   read rather than silently vanishing. These fire only when there is no
   exact entry above, and anything they catch is labelled as inferred —
   a guess from the name's shape, not a checked fact.

   Order matters: the first match wins, so the specific lipid patterns are
   listed before the broad ones. */
const PATTERNS = [
  { re:/\b(stearic|palmitic|oleic|lauric|myristic|linoleic|behenic|arachidic|ricinoleic|caprylic|capric)\s+acid\b/i,
    cat:'feeder', why:'Named as a long-chain fatty acid, which is the yeast’s direct food source.' },
  { re:/(stearate|palmitate|myristate|laurate|oleate|linoleate|cocoate|behenate|isostearate|olivate|shorea)/i,
    cat:'feeder', why:'The “-ate” ending marks a fatty acid ester. Skin lipases split these back into the acid the yeast uses.' },
  { re:/(cocamide|lauramide|myristamide|stearamide|oleamide)/i,
    cat:'feeder', why:'A fatty acid amide. Retains the usable chain despite the surfactant-sounding name.' },
  { re:/\b(butter|tallow|lard)\b/i,
    cat:'feeder', why:'Named as a solid plant or animal fat, so a triglyceride of long-chain fatty acids.' },
  { re:/(seed|kernel|nut|fruit|germ|bran)\s+oil\b|\boil$/i,
    cat:'feeder', why:'Reads as a plant oil. Almost all are triglycerides of chains in the C11–C24 range.' },
  { re:/(siloxane|methicone|silanol|silsesquioxane|dimethicone)/i,
    cat:'safe', why:'A silicone. Not a lipid, so the yeast has no way to metabolise it.' },
  { re:/(peptide|polypeptide)\b/i,
    cat:'safe', why:'A peptide — an amino acid chain, not a fatty one.' },
  { re:/^hydrolyzed\s+/i,
    cat:'safe', why:'A hydrolysed protein fragment. No lipid content.' },
  { re:/(callus|sprout|stem)\s+cell|cell\s+culture/i,
    cat:'safe', why:'A plant cell culture extract, carried in water or a sugar alcohol rather than an oil.' },
  { re:/(leaf|root|flower|bark|fruit|stem|seed)\s+extract$|extract$/i,
    cat:'safe', why:'A botanical extract. These are normally water or glycol based rather than oils.' },
  { re:/(glucoside|glycoside|xylitol|maltitol|sorbitol|trehalose|inulin)/i,
    cat:'safe', why:'A sugar or sugar-derived humectant.' },
  { re:/(panthenol|pantothenate|niacinamide|tocopher|ascorb|biotin|vitamin)/i,
    cat:'safe', why:'A vitamin or vitamin derivative, water or alcohol soluble.' },
  { re:/^(aqua|water|purified water|eau|distilled water)$/i,
    cat:'safe', why:'Water.' },
  { re:/^ci\s?\d{5}|(fd&c|d&c)\s/i,
    cat:'safe', why:'A colourant, present in trace amounts.' },
  { re:/paraben$/i,
    cat:'safe', why:'A paraben preservative. Low irritation rate, and unrelated to the yeast question.' },
  { re:/(lauryl|laureth|coco)-?\s*sulfate$/i,
    cat:'irritant', why:'A sulfate cleanser. Effective but stripping on a compromised barrier.' },
  { re:/(fragrance|parfum|perfume)/i,
    cat:'irritant', why:'Fragrance is a leading cause of the contact dermatitis that mimics seb derm.' },
  { re:/(essential oil|oleoresin)/i,
    cat:'irritant', why:'Essential oils are terpene-based rather than fatty, so they do not feed the yeast — but they sensitise readily on inflamed skin.' },
  { re:/(isothiazolinone|hydantoin|imidazolidinyl|diazolidinyl|quaternium-15)/i,
    cat:'irritant', why:'A preservative with a known contact-allergy record.' },
  { re:/(chloride|bromide|citrate|benzoate|sorbate|gluconate|edta|hydroxide|carbonate|phosphate)$/i,
    cat:'safe', why:'A salt or buffer, normally present at trace levels.' },
  { re:/\bgum$|cellulose|carbomer|xanthan/i,
    cat:'safe', why:'A thickener. Inert polysaccharide or synthetic polymer.' }
];

/* Co-occurrence rules. A list of ingredients does not tell you much on its
   own — what matters is which ones are sitting in the bottle together. Each
   rule fires only when every ingredient in `needs` is present. */
const INTERACTIONS = [
  {
    needs:['Minoxidil','Propylene Glycol'],
    tone:'bad',
    title:'This is the propylene glycol vehicle',
    text:'In patch-test-confirmed minoxidil contact dermatitis, 17.1% of reactions were to the propylene glycol in the vehicle rather than the drug. Irritation runs higher on 5% solution than 2% precisely because it carries more PG. <strong>Minoxidil foam is propylene-glycol-free</strong> and has significantly lower reported scalp irritation — switching formulation usually fixes this without stopping treatment.'
  },
  {
    needs:['Minoxidil'],
    tone:'warn',
    title:'Minoxidil on a seb-derm scalp',
    text:'Starting topical minoxidil over existing seborrheic dermatitis commonly flares it — drying vehicle plus increased scalp turnover. Note also that minoxidil itself is the more common allergen: 74.7% of confirmed contact dermatitis cases reacted to the drug, not the vehicle. Standard mitigation is ketoconazole 2% or zinc pyrithione shampoo two to three times a week alongside, rather than abandoning the minoxidil.'
  },
  {
    needs:['Ketoconazole','Minoxidil'],
    tone:'good',
    title:'These two work together, not against each other',
    text:'Ketoconazole 2% is not just damage control here. Trials show it improves hair density and the proportion of anagen follicles in androgenetic alopecia via local DHT-pathway disruption, with effects broadly comparable to minoxidil in some head-to-head work and an additive effect alongside finasteride. One bottle is treating the yeast, the other the hair loss, and the antifungal is quietly helping both.'
  },
  {
    needs:['Finasteride','Propylene Glycol'],
    tone:'warn',
    title:'Vehicle irritation, not just the drug',
    text:'Contact dermatitis rates of 12–24% have been reported for some topical finasteride and minoxidil combination formulations, and the irritation is attributed to vehicle components — alcohol and propylene glycol — as much as to the active. Propylene glycol also increases how much drug crosses the skin, which raises systemic exposure.'
  },
  {
    needs:['Rosemary Oil'],
    tone:'good',
    title:'The gentler comparator',
    text:'A randomised trial of 100 patients found rosemary oil comparable to minoxidil 2% for hair count at six months, with <strong>significantly less scalp itching</strong>. On an already inflamed scalp that tolerability difference is the whole point. Note it is still an essential oil and can sensitise undiluted.'
  }
];

/* Every item carries an id so its status can be tracked. `rx` marks the ones
   that need a prescriber — the ladder is only useful if it is obvious which
   rungs you can reach alone and which need someone to write them down. */
const LADDER = [
  {
    tier:'0', title:'Technique, before anything stronger',
    tag:'Established', hot:false,
    intro:'Worth exhausting first, because it costs nothing and it quietly explains a share of cases that look resistant.',
    items:[
      { id:'t0-contact', text:'Three to five minutes of contact time, worked into the <strong>scalp</strong> rather than the hair. A lather-and-rinse delivers almost nothing.' },
      { id:'t0-freq',    text:'Two or three washes a week during a flare, tapering to weekly once it settles.' },
      { id:'t0-rotate',  text:'Rotate two unrelated actives rather than running one to failure — an azole one wash, zinc pyrithione or selenium the next.' },
      { id:'t0-face',    text:'The same antifungal shampoo works on facial seb derm: two to three minutes, then rinse. Same mechanism, unfamiliar real estate.' },
      { id:'t0-barrier', text:'Barrier cream afterwards. Look for <strong>ceramide, cholesterol and fatty acid together</strong>, ideally near a 3:1:1 ratio — one or two of the three alone measurably slows recovery.' }
    ],
    note:'Do not stack irritants. Tar plus salicylic acid plus a strong azole adds barrier damage without adding yeast control.'
  },
  {
    tier:'1', title:'Over the counter',
    tag:'Established', hot:false,
    intro:'The shelf most people work through first.',
    items:[
      { id:'t1-keto',    text:'<strong>Ketoconazole</strong> 1–2% shampoo.' },
      { id:'t1-zpt',     text:'<strong>Zinc pyrithione</strong>.' },
      { id:'t1-selenium',text:'<strong>Selenium sulfide / disulfide</strong> — singled out in recent guidance as unusually versatile: antifungal, sebum-reducing and keratolytic at once.' },
      { id:'t1-tar',     text:'<strong>Coal tar</strong>.' },
      { id:'t1-sal',     text:'<strong>Salicylic acid</strong> — keratolytic, so it clears the scale rather than killing the yeast.' },
      { id:'t1-ciclo',   text:'<strong>Ciclopirox</strong> — not an azole. Works by iron chelation, so azole resistance does not carry over.' },
      { id:'t1-piroc',   text:'<strong>Piroctone olamine</strong> — non-azole, common in Europe, scarce in the US. Genuinely different mechanism and easy to have missed.' },
      { id:'t1-climb',   text:'<strong>Climbazole</strong> — azole class but structurally distinct from ketoconazole.' },
      { id:'t1-sulfur',  text:'<strong>Sulfur + salicylic acid bar</strong> — drying, but a common last stop before prescriptions.' }
    ],
    note:'Do not stack multiple irritant actives at once. That adds barrier damage without adding yeast control.'
  },
  {
    tier:'2', title:'Prescription topical',
    tag:'Needs a prescriber', hot:false,
    intro:'',
    items:[
      { id:'t2-keto2',   rx:true, text:'Ketoconazole 2% or prescription-strength ciclopirox.' },
      { id:'t2-steroid', rx:true, text:'Steroids matched to site and potency: <strong>desonide 0.05%</strong> (low) on the face, <strong>fluocinolone acetonide 0.01%</strong> oil (medium) on the scalp. Flares only — continuous use thins skin.' },
      { id:'t2-calci',   rx:true, text:'<strong>Tacrolimus 0.1%</strong> or <strong>pimecrolimus 1%</strong> for face and eyelids, where long-term steroids are a bad trade. Studied pattern: twice daily up to four weeks to clear, then twice weekly for twenty weeks to hold.' },
      { id:'t2-roflu',   rx:true, text:'<strong>Roflumilast foam 0.3%</strong>, a PDE4 inhibitor approved for seb derm in December 2023. Phase III put roughly 80% of patients clear or almost clear at one year, with itch relief sustained across 52 weeks.' },
      { id:'t2-lithium', rx:true, text:'<strong>Lithium succinate or gluconate</strong> — an older seb-derm-specific option that still appears in guidance and almost never gets offered.' }
    ],
    note:''
  },
  {
    tier:'3', title:'Oral and systemic',
    tag:'Needs a prescriber', hot:false,
    intro:'The rung most people never reach, usually because nobody offered it.',
    items:[
      { id:'t3-itra',  rx:true, text:'Pulse-dose <strong>itraconazole</strong> — commonly 200mg daily for the first week of each month. Trials report around 90% improvement at four months with lower recurrence than topicals alone.' },
      { id:'t3-fluc',  rx:true, text:'<strong>Fluconazole</strong>, either 50mg daily for two weeks or 200–300mg weekly.' },
      { id:'t3-iso',   rx:true, text:'<strong>Low-dose isotretinoin</strong>, 10–20mg, studied specifically in refractory disease. Head-to-head data favours 20mg for control and recurrence. Needs monitoring.' },
      { id:'t3-tetra', rx:true, text:'Tetracycline-class antibiotics, used for the anti-inflammatory effect rather than the antibacterial one.' },
      { id:'t3-uvb',   rx:true, text:'Narrowband UVB phototherapy.' }
    ],
    note:''
  },
  {
    tier:'4', title:'Refractory and emerging',
    tag:'Case-report level', hot:false,
    intro:'Conversation territory with a dermatologist who follows the literature — not self-directed experimentation.',
    items:[
      { id:'t4-ruxo',  rx:true, text:'<strong>Topical ruxolitinib</strong>, a JAK inhibitor, with case reports of clearing facial disease that had failed everything else.' },
      { id:'t4-pde4',  rx:true, text:'<strong>Crisaborole</strong> and <strong>apremilast</strong>, two more PDE4 inhibitors under investigation.' },
      { id:'t4-probio',         text:'<strong><em>Lactobacillus paracasei</em></strong> supplementation — one double-blind trial found reduced erythema, seborrhea and flaking over 56 days.' }
    ],
    note:''
  },
  {
    tier:'5', title:'1726nm laser',
    tag:'New — Feb 2026', hot:true,
    intro:'Works upstream of the entire ladder. Rather than fighting the yeast or calming inflammation, it selectively heats and shrinks the sebaceous glands that produce the oil the yeast lives on, while a cooling tip protects the surface.',
    items:[
      { id:'t5-laser', rx:true, text:'Three sessions, two weeks apart. The published case was a 32-year-old with a <strong>five-year refractory scalp history</strong> that had failed conventional treatment — complete clearance, still holding at six-month follow-up.' }
    ],
    note:'One case report, not a trial. But this literature did not exist a year ago, which means you may well hear about it before your dermatologist does.'
  }
];

/* Seeded on first run from what has already been tried and failed, so the
   ladder opens showing what is left rather than what is known. */
const PRESEED_FAILED = [
  't1-keto', 't1-zpt', 't1-tar', 't1-sal', 't1-ciclo', 't1-climb',
  't2-keto2', 't3-itra', 't3-fluc'
];

const STATUS = {
  none:    { label:'Not tried',  short:'Try' },
  failed:  { label:'Didn’t work', short:'No' },
  current: { label:'Using now',  short:'Now' }
};

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
