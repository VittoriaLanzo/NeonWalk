/* ─── src/content/sections.ts ─────────────────────────────────────────────
   Single source of truth for every section's content.
   ─────────────────────────────────────────────────────────────────────── */

// ─── Types ────────────────────────────────────────────────────────────────

export interface Stat {
  value: string;
  label: string;
}

export interface Experience {
  year: string;
  role: string;
  org: string;
  desc: string;
}

export type PaperStatus = 'accepted' | 'submitted' | 'published';
export type ContribStatus = 'merged' | 'in-review';

export interface Paper {
  id: string;
  name: string;
  venue: string;
  status: PaperStatus;
  year: string;
  desc: string;
  abstract: string;
  stats: Stat[];
  stack: string[];
  link: string | null;
}

export interface Contribution {
  id: string;
  repo: string;
  pr: string;
  href: string;
  status: ContribStatus;
  year: string;
  title: string;
  desc: string;
  fix: string;
  metrics: string[];
  hasPipeline?: boolean;
}

// ─── Research ─────────────────────────────────────────────────────────────

export const RESEARCH = {
  headline: 'Does guidance\nlocalise?',
  tagline: 'ML Research · EEML 2026 · Accepted',

  papers: [
    {
      id: '01',
      name: 'Windowed Minority Guidance in Diffusion Denoising',
      venue: 'EEML 2026 · Extended Abstract',
      status: 'accepted' as PaperStatus,
      year: '2026',
      desc: 'Minority guidance (Um et al., ICLR 2024) fires at every denoising step. This work asks whether the effect is actually uniform — or concentrated in a narrow phase. Mid-chain window recovers 45.6% of full-chain loss reduction. 250 runs, 50 seeds, Wilcoxon p < 0.001.',
      stats: [
        { value: '250',     label: 'Total runs' },
        { value: '50',      label: 'Seeds' },
        { value: '45.6%',   label: 'Mid-window loss reduction' },
        { value: 'p<0.001', label: 'Wilcoxon (mid vs baseline)' },
      ] as Stat[],
      abstract: `Minority guidance (Um et al., 2024) steers diffusion sampling toward under-represented data regions by injecting a classifier gradient at every denoising timestep. The premise of this work is a simple question: is that effect actually uniform across the denoising trajectory, or is it concentrated in a specific phase?

If minority guidance derives most of its effect from a narrow window of timesteps, applying it at every step wastes compute — and may introduce noise outside the effective window. Prior work on the denoising process suggests that different phases of sampling contribute differently to output structure, but whether this asymmetry extends to guidance effectiveness is not established.

The denoising trajectory is partitioned into three equal-thirds windows — early, mid, and late — defined over the original DDPM noise schedule index space, with timestep_respacing=250 mapping each window to a subset of the 250 executed steps. Each windowed condition is compared against a full-chain minority guidance baseline and a no-guidance baseline. Experiments use the LSUN Bedroom 256×256 model with the frozen minority classifier chain from Um et al. (2024), at a fixed guidance scale of 1.0, with a single target class and n=1 sample per seed.

The study ran 50 seeds × 5 conditions = 250 total runs. Primary metric is classifier cross-entropy loss at the minority class, where lower values indicate stronger guidance signal. Within this experimental scope, the mid-chain window is the strongest single contributor to minority guidance effectiveness. Early guidance shows relatively stable behaviour across seeds. Late guidance underperforms both other windows and in some cases reduces minority affinity below the no-guidance baseline.

These findings are preliminary: single class, single dataset, fixed guidance scale, one sample per seed. They suggest a testable hypothesis about timestep localisation in minority guidance, not a settled result.`,
      stack: ['Python', 'Diffusion Models', 'DDPM', 'Kaggle P100', 'Agentic Pipeline'],
      link: 'https://github.com/VittoriaLanzo/windowed-minority-guidance',
      pdf: 'https://github.com/VittoriaLanzo/windowed-minority-guidance/blob/main/windowed-minority-guidance.pdf',
      stars: 2,
      topics: ['diffusion-models', 'ablation-study', 'DDPM', 'classifier-guidance', 'minority-guidance', 'LSUN-bedroom', 'timestep-localization'],
      previewImages: [
        'https://raw.githubusercontent.com/VittoriaLanzo/windowed-minority-guidance/main/docs/preview/page-1.png',
        'https://raw.githubusercontent.com/VittoriaLanzo/windowed-minority-guidance/main/docs/preview/page-2.png',
        'https://raw.githubusercontent.com/VittoriaLanzo/windowed-minority-guidance/main/docs/preview/page-3.png',
        'https://raw.githubusercontent.com/VittoriaLanzo/windowed-minority-guidance/main/docs/preview/page-4.png',
      ],
      results: [
        { condition: 'baseline',       meanLoss: '11.978', winRate: '—',    relEffect: '0.000' },
        { condition: 'minority-early', meanLoss: '11.129', winRate: '50/50', relEffect: '0.162' },
        { condition: 'minority-mid',   meanLoss: '9.591',  winRate: '39/50', relEffect: '0.456' },
        { condition: 'minority-late',  meanLoss: '10.717', winRate: '34/50', relEffect: '0.241' },
        { condition: 'minority-full',  meanLoss: '6.741',  winRate: '44/50', relEffect: '1.000' },
      ],
    },
  ] as Paper[],
};

// ─── Performance Engineering ──────────────────────────────────────────────

export const PERFORMANCE = {
  headline: 'The work\nthat shipped.',
  tagline: 'Open-source performance engineering · 3 merged · 4 in review',

  contributions: [
    {
      id: '01',
      repo: 'PrefectHQ/prefect',
      pr: '#21707',
      href: 'https://github.com/PrefectHQ/prefect/pull/21707',
      status: 'merged' as ContribStatus,
      year: '2026',
      title: 'Replace correlated EXISTS with JOIN fast-path in count_flow_runs',
      desc: 'count_flow_runs generated one correlated EXISTS subquery per active filter dimension, re-evaluated for every candidate row — O(k·N·log M) complexity.',
      fix: 'Explicit JOINs on N:1 foreign keys reduce complexity to O(N + ΣMᵢ). NULL FK values correctly excluded via INNER JOIN semantics.',
      metrics: ['SQLite 13.5–66× at 100k rows', 'PostgreSQL 5.4–18.3× at 100k rows', '21 regression tests'],
      hasPipeline: true,
    },
    {
      id: '02',
      repo: 'PrefectHQ/prefect',
      pr: '#21754',
      href: 'https://github.com/PrefectHQ/prefect/pull/21754',
      status: 'merged' as ContribStatus,
      year: '2026',
      title: 'Eliminate O(N²) checksum scan in read_block_schemas',
      desc: 'read_block_schemas scanned the full result set linearly for every nested reference lookup — O(N²) behavior degrading all block listing operations.',
      fix: 'checksum_index dict built once at call start, threaded through all helpers. O(N) scans replaced with O(1) dict.get(). First-wins guard preserves None-checksum semantics.',
      metrics: ['~125× at 1,000 schemas (55.9ms → 0.39ms)', '12 new tests', '41 total passing'],
      hasPipeline: true,
    },
    {
      id: '03',
      repo: 'PrefectHQ/prefect',
      pr: '#21004',
      href: 'https://github.com/PrefectHQ/prefect/pull/21004',
      status: 'merged' as ContribStatus,
      year: '2026',
      title: 'Add --no-create-pool-if-not-found to prefect worker start',
      desc: 'No escape hatch to skip pool creation. Operators connecting to pre-existing work pools got silent side-effects with no override.',
      fix: '--no-create-pool-if-not-found flag suppresses creation entirely. Zero impact on existing scripts.',
      metrics: ['Silent side-effect eliminated', 'Fully backward-compatible', 'Multi-agent pipeline end-to-end'],
      hasPipeline: true,
    },
    {
      id: '04',
      repo: 'sktime/sktime-mcp',
      pr: '#126 + #124',
      href: 'https://github.com/sktime/sktime-mcp/pull/126',
      status: 'in-review' as ContribStatus,
      year: '2026',
      title: '5 bugs in RegistryInterface — 2 race conditions, 3 correctness errors',
      desc: 'Unsynchronized double-checked locking (race on _loaded), shallow tag copies causing cross-request mutation, three logic errors in registry query paths.',
      fix: 'Proper threading.Lock, deep tag copy isolation, corrected query semantics. Single load call replaces redundant per-request loads.',
      metrics: ['7.8× throughput (239ms → 31ms)', '100% branch coverage', 'Thread-safe under concurrent load'],
      hasPipeline: true,
    },
    {
      id: '05',
      repo: 'SWE-agent/mini-swe-agent',
      pr: '#821',
      href: 'https://github.com/SWE-agent/mini-swe-agent/pull/821',
      status: 'in-review' as ContribStatus,
      year: '2026',
      title: 'Persist full model response in extra dict on FormatError',
      desc: 'FormatError discarded the raw model response on parse failure. Trajectory logs showed the error marker but nothing to inspect or debug from.',
      fix: 'try/except FormatError in all 7 model query() wrappers. repr() fallback when model_dump() fails. Full response preserved in extra dict.',
      metrics: ['16 regression tests', 'All 7 query() wrappers covered', 'Trajectory logs fully inspectable'],
      hasPipeline: true,
    },
    {
      id: '06',
      repo: 'fastapi/fastapi',
      pr: '#15476',
      href: 'https://github.com/fastapi/fastapi/pull/15476',
      status: 'in-review' as ContribStatus,
      year: '2026',
      title: 'Skip set(obj.keys()) allocation in jsonable_encoder when filters absent',
      desc: 'set(obj.keys()) built unconditionally on every dict branch — pure allocation overhead on the common path through every JSON response.',
      fix: 'Allocation skipped entirely when include and exclude are None. Membership test short-circuits the same way.',
      metrics: ['−8.2% small dict (5.37µs → 4.93µs)', '−6.0% large nested dict', '7 regression tests'],
      hasPipeline: false,
    },
    {
      id: '07',
      repo: 'Lightricks/LTX-2',
      pr: '#215',
      href: 'https://github.com/Lightricks/LTX-2/pull/215',
      status: 'in-review' as ContribStatus,
      year: '2026',
      title: 'Mini-batch VAE encoding + linspace hoisting in tiled_encode_video',
      desc: 'Tiled encoding called the VAE encoder once per spatial tile — 15 calls at 1080p, 60 at 4K. Linspace feathering vectors reallocated on every tile.',
      fix: 'tile_batch_size groups same-shape tiles into a single encoder call. Linspace vectors hoisted outside the loop.',
      metrics: ['4K: 60 → 4 encoder calls (15×)', '1080p: 15 → 4 calls (3.75×)', '12 tests'],
      hasPipeline: true,
    },
  ] as Contribution[],
};

// ─── Experience ───────────────────────────────────────────────────────────

export const EXPERIENCE = {
  headline: 'The record.',

  timeline: [
    {
      year: '2026',
      role: 'ML Researcher',
      org: 'EEML 2026 · Class of 2026',
      desc: 'Eastern European Machine Learning Summer School, class of 2026. Extended abstract on minority guidance timestep-localization accepted.',
    },
    {
      year: '2026',
      role: 'OSS Performance Engineer',
      org: 'PrefectHQ · sktime · Lightricks · FastAPI · SWE-agent',
      desc: '7 performance contributions to production open-source codebases. 3 merged into PrefectHQ/prefect: O(N²)→O(1) checksum index, EXISTS→JOIN fast-path, and a missing operator escape hatch. 4 in review: sktime-mcp race conditions, SWE-agent FormatError persistence, FastAPI lazy allocation, Lightricks LTX-2 VAE tiling.',
    },
    {
      year: '2026',
      role: 'Product Lead · AI Engineer',
      org: 'MEGA Hackathon — Sestara · Silver Medal',
      desc: 'Free edtech platform built end-to-end in-contest, 900+ participants. React · TypeScript · Supabase · Gemini.',
    },
  ] as Experience[],
};

// ─── About ────────────────────────────────────────────────────────────────

export const ABOUT = {
  tagline: 'ML Researcher · Agentic Architect · Performance Engineer',
  headline: 'Vittoria Lanzo\n17 · Cesena, Italy',

  pitch: 'Accepted to EEML 2026 with an extended abstract on timestep-localisation in diffusion denoising — the Eastern European Machine Learning Summer School, one of the most selective ML summer schools in Europe. Probably one of the youngest attendees.',

  detail: 'On the engineering side: three PRs merged into PrefectHQ/prefect, four more open across Lightricks LTX-2, FastAPI, sktime-mcp, and SWE-agent. Built using a multi-agent contribution pipeline that handles spec, adversarial review, and regression tests end-to-end. Open to ML research, interesting problems, and things worth shipping.',

  availability: 'Open to ML research collaborations, agentic architecture projects, and performance engineering work.',

  stats: [
    { value: '3',      label: 'Merged PRs' },
    { value: '4',      label: 'In Review' },
    { value: 'EEML',   label: '2026 · Accepted' },
    { value: 'Silver', label: 'MEGA Hackathon' },
  ] as Stat[],

  experiences: [] as Experience[],
};
