# Scalp Log

A private tracker for treatment-resistant seborrheic dermatitis.

Most dandruff apps are storefronts. This one sells nothing. It does three things:

- **Logs flares** with severity, itch, product and triggers, then tells you which product
  actually correlated with your better days rather than which one you remember liking.
- **Scans ingredient lists** against the fatty acids *Malassezia* feeds on, because a
  conditioner built on coconut oil can quietly undo the shampoo you just used. It reads
  position as well as presence. Coconut oil second on a label is a different product
  from coconut oil twenty-second.
- **Maps the treatment ladder**, including the rungs above the pharmacy shelf that
  nobody offers unless you ask for them by name.

Everything stays in your browser's local storage. There is no account, no server, and
no analytics. Export to CSV before you switch devices, because clearing site data will
take the log with it.

## Running it

No build step, no dependencies, no package manager. Open `index.html` in a browser and
it works.

To serve it locally:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. **Settings → Pages → Source**, choose `Deploy from a branch`.
3. Pick your branch and the `/ (root)` folder, then save.

The site is plain HTML, CSS and JavaScript, so Pages serves it as-is. The `.nojekyll`
file stops GitHub from running the files through Jekyll first.

## Layout

```
index.html            markup for all four views
assets/css/app.css    design tokens and components
assets/js/data.js     ingredient reference, treatment ladder, routine
assets/js/app.js      state, rendering, storage
```

`data.js` is deliberately separate. Correcting a fact about an ingredient should never
mean touching code that runs.

## On the ingredient data

189 entries, each with the reasoning written out rather than a bare verdict.

The categories follow from one fact: *Malassezia* has no fatty acid synthase gene. It
cannot build the lipids it needs, so it secretes lipases and scavenges chains of roughly
C11 to C24 off the skin. Free fatty acids in that range feed it, esters of those acids feed
it once lipases split them, and things outside the range or without an ester bond at
all, like silicones, mineral oil and squalane, generally do not.

There is a deliberate fifth category, `conditional`, for ingredients where a flat verdict
would be wrong. MCT oil is the clearest case: the real thing is about 57% caprylic and
40% capric acid with almost no lauric, which puts it below the feeding range, but the
term is unregulated and some bottles blend lauric acid back in.

**Position matters too.** Ingredient lists run in descending order of concentration until
the 1% mark, after which order is arbitrary (EC Regulation 1223/2009, Article 19). The
scanner reports where each match sits and weights its verdict accordingly, so a feeder in
the top five reads as a real problem and one near the end reads as a trace.

This is a screening heuristic, not a lab result. Formulation and whether a product rinses
off still change how much a flagged ingredient matters in practice.

## Not medical advice

This is a patient's reference tool. The doses and drug names are here so you can have a
better-informed conversation with a dermatologist, not so you can skip one.
