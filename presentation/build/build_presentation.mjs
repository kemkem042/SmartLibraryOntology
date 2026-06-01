// Node-oriented editable pro deck builder.
// Run this after editing SLIDES, SOURCES, and layout functions.
// The init script installs a sibling node_modules/@oai/artifact-tool package link
// and package.json with type=module for shell-run eval builders. Run with the
// Node executable from Codex workspace dependencies or the platform-appropriate
// command emitted by the init script.
// Do not use pnpm exec from the repo root or any Node binary whose module
// lookup cannot resolve the builder's sibling node_modules/@oai/artifact-tool.

const fs = await import("node:fs/promises");
const path = await import("node:path");
const { Presentation, PresentationFile } = await import("@oai/artifact-tool");

const W = 1280;
const H = 720;

const DECK_ID = "smartlibrary-final";
const OUT_DIR = "/Users/kemalmertceyhan/Desktop/untitled folder/SmartLibraryOntology/presentation/out";
const REF_DIR = "/Users/kemalmertceyhan/Desktop/untitled folder/SmartLibraryOntology/presentation/references";
const SCRATCH_DIR = path.resolve(process.env.PPTX_SCRATCH_DIR || path.join("tmp", "slides", DECK_ID));
const PREVIEW_DIR = path.join(SCRATCH_DIR, "preview");
const VERIFICATION_DIR = path.join(SCRATCH_DIR, "verification");
const INSPECT_PATH = path.join(SCRATCH_DIR, "inspect.ndjson");
const MAX_RENDER_VERIFY_LOOPS = 3;

const INK = "#101214";
const GRAPHITE = "#30363A";
const MUTED = "#687076";
const PAPER = "#F7F4ED";
const PAPER_96 = "#F7F4EDF5";
const WHITE = "#FFFFFF";
const ACCENT = "#27C47D";
const ACCENT_DARK = "#116B49";
const GOLD = "#D7A83D";
const CORAL = "#E86F5B";
const TRANSPARENT = "#00000000";

const TITLE_FACE = "Caladea";
const BODY_FACE = "Lato";
const MONO_FACE = "Aptos Mono";

const FALLBACK_PLATE_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";

const SOURCES = {
  repo: "SmartLibraryOntology GitHub repository and local project artifacts.",
  ontology: "ontology/smart-library.ttl, version 0.2.0.",
  queries: "queries/competency-questions.rq and results/sparql/query-results-summary.md.",
  shacl: "shapes/smart-library.shacl.ttl and results/validation/shacl-validation-report.txt.",
  data: "data/phase2/resource_metadata_seed.csv and data/phase2/member_interest_seed.csv.",
  research: "Alrehaili et al. (2021), Ontology-Based Smart System to Automate Higher Education Activities.",
  mandatory: "Fernandez et al. (2023), Personalized ontology and deep training tree-based optimal GRU-RNN for prediction of students' behavior.",
};

const SLIDES = [
  {
    "kicker": "KNOWLEDGE ENGINEERING AND ONTOLOGIES",
    "title": "Smart Library Loan Ontology",
    "subtitle": "Final presentation for a provenance-aware knowledge graph supporting circulation, validation, and future natural-language access.",
    "expectedVisual": "Title slide with clear academic framing and final-project positioning.",
    "moment": "From library records to a queryable semantic system",
    "notes": "Introduce the project domain, team, and the final goal: a structured knowledge graph for smart library processes.",
    "sources": [
      "repo",
      "ontology"
    ]
  },
  {
    "kicker": "SECTION 02",
    "title": "Problem Definition and Motivation",
    "subtitle": "Library knowledge is fragmented across catalog records, digital resources, and operational transactions.",
    "expectedVisual": "Problem framing with three cards describing why semantic modeling is needed.",
    "cards": [
      [
        "Real-world problem",
        "Traditional library data are spread across metadata records, circulation logs, spreadsheets, and digital platforms, making integrated querying difficult."
      ],
      [
        "Why ontology",
        "An ontology provides shared vocabulary, explicit semantics, and reusable relations for resources, people, transactions, topics, and provenance."
      ],
      [
        "Project goal",
        "Build a smart-library knowledge graph that supports competency questions, SHACL validation, and a future LLM interface grounded in graph results."
      ]
    ],
    "notes": "Emphasize why this is more than a database exercise: the point is semantic integration and explainable retrieval.",
    "sources": [
      "repo",
      "research"
    ]
  },
  {
    "kicker": "SECTION 03",
    "title": "Project Scope and Final Deliverables",
    "subtitle": "The final submission combines ontology modeling, data acquisition, validation, documentation, and reproducibility artifacts.",
    "expectedVisual": "Metric summary of core project artifacts.",
    "metrics": [
      [
        "25",
        "Ontology classes",
        "Phase 2 ontology count"
      ],
      [
        "23",
        "Object properties",
        "Including provenance and profile links"
      ],
      [
        "16",
        "Datatype properties",
        "Including confidence and interaction fields"
      ]
    ],
    "notes": "Point out that the project now includes not only the ontology but also SHACL, SPARQL, documentation, PDF report, specification, and reproducibility files.",
    "sources": [
      "ontology",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 04",
    "title": "System Architecture",
    "subtitle": "The project follows a staged semantic workflow inspired by ontology-centered automation research.",
    "expectedVisual": "A clear process narrative from acquisition to semantic access.",
    "cards": [
      [
        "Specification",
        "Competency questions define what the ontology and graph must answer, including circulation, provenance, and recommendation-ready retrieval."
      ],
      [
        "Acquisition + graph",
        "Data are collected from APIs and seed tables, normalized into semantic topics and metadata records, and represented as RDF triples."
      ],
      [
        "Access + control",
        "SPARQL queries retrieve evidence, SHACL validates quality, and a future LLM layer can translate natural-language questions into graph-grounded answers."
      ]
    ],
    "notes": "Mention that this architecture is consistent with the selected research paper and makes the project easy to extend.",
    "sources": [
      "research",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 05",
    "title": "Ontology Design and Modeling Decisions",
    "subtitle": "The design separates a stable circulation core from newly added provenance and personalization modules.",
    "expectedVisual": "TBox and ABox explanation through three structured cards.",
    "cards": [
      [
        "TBox core",
        "Core classes model members, librarians, resources, branches, publishers, loans, reservations, and resource statuses."
      ],
      [
        "Phase 2 extension",
        "New classes such as DataSource, MetadataRecord, Topic, MemberProfile, InteractionEvent, and Recommendation extend the ontology without breaking the original model."
      ],
      [
        "ABox examples",
        "Individuals such as Book_OntologyDesign, MetadataRecord_B5001, Profile_Aylin_Demir, and Recommendation_001 demonstrate real instance-level use."
      ]
    ],
    "notes": "Use this slide to explain TBox versus ABox and justify why the extension was modular.",
    "sources": [
      "ontology",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 06",
    "title": "Ontology Expansion and Reuse",
    "subtitle": "Version 0.2.0 moves beyond a simple draft by adding reusable semantic modules and lightweight vocabulary alignment.",
    "expectedVisual": "Metrics summarizing the extended ontology.",
    "metrics": [
      [
        "476",
        "RDF triples",
        "Current graph size"
      ],
      [
        "25",
        "Named individuals",
        "ABox instances in the current graph"
      ],
      [
        "v0.2.0",
        "Ontology version",
        "Phase 2 extension"
      ]
    ],
    "notes": "Mention that Schema.org and Dublin Core were reused in a lightweight way to improve interoperability.",
    "sources": [
      "ontology",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 07",
    "title": "Data Acquisition and Mapping",
    "subtitle": "Phase 2 makes the data workflow explicit instead of treating instances as manually inserted examples only.",
    "expectedVisual": "Cards for source, preprocessing, and ontology mapping.",
    "cards": [
      [
        "Data sources",
        "Open Library API and Google Books API provide bibliographic enrichment, while curated seed tables stabilize identifiers, status labels, and topics."
      ],
      [
        "Preprocessing",
        "The workflow normalizes identifiers, resource states, topic labels, and metadata-source references before RDF population."
      ],
      [
        "Ontology mapping",
        "Rows are mapped to LibraryResource, MetadataRecord, DataSource, MemberProfile, and InteractionEvent individuals, making provenance queryable."
      ]
    ],
    "notes": "Connect this slide directly to the Data Acquisition section in the report and to the selected research study.",
    "sources": [
      "data",
      "research"
    ]
  },
  {
    "kicker": "SECTION 08",
    "title": "Knowledge Graph Construction",
    "subtitle": "The ontology and the populated data together form a queryable RDF graph rather than an isolated OWL schema.",
    "expectedVisual": "Three cards showing triples, modules, and deployment logic.",
    "cards": [
      [
        "Representative triples",
        "Loan_001 loanedTo Member_Aylin_Demir, Book_OntologyDesign hasStatus OnLoan, MetadataRecord_B5001 retrievedFromSource Open Library API."
      ],
      [
        "Graph modules",
        "The final graph integrates circulation, bibliographic metadata, provenance, semantic topics, and recommendation-ready profile signals."
      ],
      [
        "Deployment logic",
        "The graph can be loaded into Protégé or a triplestore such as GraphDB, queried with SPARQL, and validated with SHACL."
      ]
    ],
    "notes": "Make clear that the graph is both conceptual and operational: it contains schema, individuals, and validation-ready structure.",
    "sources": [
      "ontology",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 09",
    "title": "SPARQL Queries and Competency Questions",
    "subtitle": "The query layer covers retrieval, provenance, personalization, and aggregation scenarios.",
    "expectedVisual": "Metrics supported by real query outputs.",
    "metrics": [
      [
        "12",
        "SPARQL queries",
        "Across three query types"
      ],
      [
        "4",
        "Topic-resource links",
        "Returned by resource-topic query"
      ],
      [
        "0.93",
        "Recommendation score",
        "For Aylin Demir"
      ]
    ],
    "notes": "Mention concrete results: 1 available e-book, 4 provenance links, and an explicit recommendation candidate for Aylin Demir.",
    "sources": [
      "queries",
      "ontology"
    ]
  },
  {
    "kicker": "SECTION 10",
    "title": "Validation and Data Quality",
    "subtitle": "SHACL makes the expected integrity rules explicit and testable.",
    "expectedVisual": "Cards showing rule types, examples, and validation outcome.",
    "cards": [
      [
        "Shapes defined",
        "LoanShape, ReservationShape, LibraryResourceShape, MetadataRecordShape, and RecommendationShape were implemented for core integrity checks."
      ],
      [
        "Constraint logic",
        "The validation layer enforces cardinality, class membership, mandatory properties, and confidence-score bounds."
      ],
      [
        "Result",
        "The current validation report conforms successfully, showing that the final graph satisfies the SHACL constraints defined for the project."
      ]
    ],
    "notes": "This is an important rubric slide: clearly say the graph was validated and that the report includes the validation artifact.",
    "sources": [
      "shacl",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 11",
    "title": "LLM Integration Workflow",
    "subtitle": "The project prepares a graph-grounded natural-language access layer rather than an unverified free-text answer system.",
    "expectedVisual": "Three cards representing the workflow and hallucination control.",
    "cards": [
      [
        "Input to SPARQL",
        "A user asks a natural-language question, and the system maps it to a SPARQL template using ontology vocabulary and competency-question patterns."
      ],
      [
        "Graph grounding",
        "The knowledge graph returns structured results, which become the evidence layer for any generated answer."
      ],
      [
        "Hallucination mitigation",
        "The answer should be restricted to retrieved graph facts; if no evidence exists, the system should explicitly state that no matching graph result was found."
      ]
    ],
    "notes": "Stress that the semantic graph is the trust layer and the LLM is an interface layer, not the source of truth.",
    "sources": [
      "mandatory",
      "repo"
    ]
  },
  {
    "kicker": "SECTION 12",
    "title": "Evaluation, Limitations, and Final Deliverables",
    "subtitle": "The final project is academically complete, reproducible, and ready for presentation and submission.",
    "expectedVisual": "Metrics highlighting final outputs and project maturity.",
    "metrics": [
      [
        "2",
        "Final PDFs",
        "Report + specification"
      ],
      [
        "1",
        "Public repository",
        "With ontology, queries, SHACL, docs"
      ],
      [
        "1",
        "Widoco site",
        "Hosted documentation target"
      ]
    ],
    "notes": "Conclude with strengths, note that the dataset is intentionally small, and highlight future work such as larger-scale ingestion and a live natural-language interface.",
    "sources": [
      "repo",
      "shacl",
      "queries"
    ]
  },
  {
    "kicker": "SECTION 13",
    "title": "Repository and Documentation Access",
    "subtitle": "The full submission package is publicly accessible and organized for reproducibility.",
    "expectedVisual": "Three cards showing the repository link, Widoco link, and submission artifact set.",
    "cards": [
      [
        "GitHub repository",
        "github.com/kemkem042/SmartLibraryOntology contains the ontology files, queries, SHACL shapes, report artifacts, presentation, results, and scripts."
      ],
      [
        "Widoco documentation",
        "kemkem042.github.io/SmartLibraryOntology/widoco/ provides ontology metadata, class hierarchy, properties, namespaces, and diagrams."
      ],
      [
        "Submission package",
        "The repository also includes report PDF, specification PDF, presentation PDF or PPTX, query results, and SHACL validation outputs."
      ]
    ],
    "notes": "Use this final slide to show the exact repository and documentation links requested in the submission instructions.",
    "sources": [
      "repo",
      "ontology"
    ]
  }
];

const inspectRecords = [];

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readImageBlob(imagePath) {
  const bytes = await fs.readFile(imagePath);
  if (!bytes.byteLength) {
    throw new Error(`Image file is empty: ${imagePath}`);
  }
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function normalizeImageConfig(config) {
  if (!config.path) {
    return config;
  }
  const { path: imagePath, ...rest } = config;
  return {
    ...rest,
    blob: await readImageBlob(imagePath),
  };
}

async function ensureDirs() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const obsoleteFinalArtifacts = [
    "preview",
    "verification",
    "inspect.ndjson",
    ["presentation", "proto.json"].join("_"),
    ["quality", "report.json"].join("_"),
  ];
  for (const obsolete of obsoleteFinalArtifacts) {
    await fs.rm(path.join(OUT_DIR, obsolete), { recursive: true, force: true });
  }
  await fs.mkdir(SCRATCH_DIR, { recursive: true });
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await fs.mkdir(VERIFICATION_DIR, { recursive: true });
}

function lineConfig(fill = TRANSPARENT, width = 0) {
  return { style: "solid", fill, width };
}

function recordShape(slideNo, shape, role, shapeType, x, y, w, h) {
  if (!slideNo) return;
  inspectRecords.push({
    kind: "shape",
    slide: slideNo,
    id: shape?.id || `slide-${slideNo}-${role}-${inspectRecords.length + 1}`,
    role,
    shapeType,
    bbox: [x, y, w, h],
  });
}

function addShape(slide, geometry, x, y, w, h, fill = TRANSPARENT, line = TRANSPARENT, lineWidth = 0, meta = {}) {
  const shape = slide.shapes.add({
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: lineConfig(line, lineWidth),
  });
  recordShape(meta.slideNo, shape, meta.role || geometry, geometry, x, y, w, h);
  return shape;
}

function normalizeText(text) {
  if (Array.isArray(text)) {
    return text.map((item) => String(item ?? "")).join("\n");
  }
  return String(text ?? "");
}

function textLineCount(text) {
  const value = normalizeText(text);
  if (!value.trim()) {
    return 0;
  }
  return Math.max(1, value.split(/\n/).length);
}

function requiredTextHeight(text, fontSize, lineHeight = 1.18, minHeight = 8) {
  const lines = textLineCount(text);
  if (lines === 0) {
    return minHeight;
  }
  return Math.max(minHeight, lines * fontSize * lineHeight);
}

function assertTextFits(text, boxHeight, fontSize, role = "text") {
  const required = requiredTextHeight(text, fontSize);
  const tolerance = Math.max(2, fontSize * 0.08);
  if (normalizeText(text).trim() && boxHeight + tolerance < required) {
    throw new Error(
      `${role} text box is too short: height=${boxHeight.toFixed(1)}, required>=${required.toFixed(1)}, ` +
        `lines=${textLineCount(text)}, fontSize=${fontSize}, text=${JSON.stringify(normalizeText(text).slice(0, 90))}`,
    );
  }
}

function wrapText(text, widthChars) {
  const words = normalizeText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > widthChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) {
    lines.push(current);
  }
  return lines.join("\n");
}

function recordText(slideNo, shape, role, text, x, y, w, h) {
  const value = normalizeText(text);
  inspectRecords.push({
    kind: "textbox",
    slide: slideNo,
    id: shape?.id || `slide-${slideNo}-${role}-${inspectRecords.length + 1}`,
    role,
    text: value,
    textPreview: value.replace(/\n/g, " | ").slice(0, 180),
    textChars: value.length,
    textLines: textLineCount(value),
    bbox: [x, y, w, h],
  });
}

function recordImage(slideNo, image, role, imagePath, x, y, w, h) {
  inspectRecords.push({
    kind: "image",
    slide: slideNo,
    id: image?.id || `slide-${slideNo}-${role}-${inspectRecords.length + 1}`,
    role,
    path: imagePath,
    bbox: [x, y, w, h],
  });
}

function applyTextStyle(box, text, size, color, bold, face, align, valign, autoFit, listStyle) {
  box.text = text;
  box.text.fontSize = size;
  box.text.color = color;
  box.text.bold = Boolean(bold);
  box.text.alignment = align;
  box.text.verticalAlignment = valign;
  box.text.typeface = face;
  box.text.insets = { left: 0, right: 0, top: 0, bottom: 0 };
  if (autoFit) {
    box.text.autoFit = autoFit;
  }
  if (listStyle) {
    box.text.style = "list";
  }
}

function addText(
  slide,
  slideNo,
  text,
  x,
  y,
  w,
  h,
  {
    size = 22,
    color = INK,
    bold = false,
    face = BODY_FACE,
    align = "left",
    valign = "top",
    fill = TRANSPARENT,
    line = TRANSPARENT,
    lineWidth = 0,
    autoFit = null,
    listStyle = false,
    checkFit = true,
    role = "text",
  } = {},
) {
  if (!checkFit && textLineCount(text) > 1) {
    throw new Error("checkFit=false is only allowed for single-line headers, footers, and captions.");
  }
  if (checkFit) {
    assertTextFits(text, h, size, role);
  }
  const box = addShape(slide, "rect", x, y, w, h, fill, line, lineWidth);
  applyTextStyle(box, text, size, color, bold, face, align, valign, autoFit, listStyle);
  recordText(slideNo, box, role, text, x, y, w, h);
  return box;
}

async function addImage(slide, slideNo, config, position, role, sourcePath = null) {
  const image = slide.images.add(await normalizeImageConfig(config));
  image.position = position;
  recordImage(slideNo, image, role, sourcePath || config.path || config.uri || "inline-data-url", position.left, position.top, position.width, position.height);
  return image;
}

async function addPlate(slide, slideNo, opacityPanel = false) {
  slide.background.fill = PAPER;
  const platePath = path.join(REF_DIR, `slide-${String(slideNo).padStart(2, "0")}.png`);
  if (await pathExists(platePath)) {
    await addImage(
      slide,
      slideNo,
      { path: platePath, fit: "cover", alt: `Text-free art-direction plate for slide ${slideNo}` },
      { left: 0, top: 0, width: W, height: H },
      "art plate",
      platePath,
    );
  } else {
    await addImage(
      slide,
      slideNo,
      { dataUrl: FALLBACK_PLATE_DATA_URL, fit: "cover", alt: `Fallback blank art plate for slide ${slideNo}` },
      { left: 0, top: 0, width: W, height: H },
      "fallback art plate",
      "fallback-data-url",
    );
  }
  if (opacityPanel) {
    addShape(slide, "rect", 0, 0, W, H, "#FFFFFFB8", TRANSPARENT, 0, { slideNo, role: "plate readability overlay" });
  }
}

function addHeader(slide, slideNo, kicker, idx, total) {
  addText(slide, slideNo, String(kicker || "").toUpperCase(), 64, 34, 430, 24, {
    size: 13,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    checkFit: false,
    role: "header",
  });
  addText(slide, slideNo, `${String(idx).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, 1114, 34, 104, 24, {
    size: 13,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    align: "right",
    checkFit: false,
    role: "header",
  });
  addShape(slide, "rect", 64, 64, 1152, 2, INK, TRANSPARENT, 0, { slideNo, role: "header rule" });
  addShape(slide, "ellipse", 57, 57, 16, 16, ACCENT, INK, 2, { slideNo, role: "header marker" });
}

function addTitleBlock(slide, slideNo, title, subtitle = null, x = 64, y = 86, w = 780, dark = false) {
  const titleColor = dark ? PAPER : INK;
  const bodyColor = dark ? PAPER : GRAPHITE;
  addText(slide, slideNo, title, x, y, w, 142, {
    size: 40,
    color: titleColor,
    bold: true,
    face: TITLE_FACE,
    role: "title",
  });
  if (subtitle) {
    addText(slide, slideNo, subtitle, x + 2, y + 148, Math.min(w, 720), 70, {
      size: 19,
      color: bodyColor,
      face: BODY_FACE,
      role: "subtitle",
    });
  }
}

function addIconBadge(slide, slideNo, x, y, accent = ACCENT, kind = "signal") {
  addShape(slide, "ellipse", x, y, 54, 54, PAPER_96, INK, 1.2, { slideNo, role: "icon badge" });
  if (kind === "flow") {
    addShape(slide, "ellipse", x + 13, y + 18, 10, 10, accent, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "ellipse", x + 31, y + 27, 10, 10, accent, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "rect", x + 22, y + 25, 19, 3, INK, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
  } else if (kind === "layers") {
    addShape(slide, "roundRect", x + 13, y + 15, 26, 13, accent, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "roundRect", x + 18, y + 24, 26, 13, GOLD, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "roundRect", x + 23, y + 33, 20, 10, CORAL, INK, 1, { slideNo, role: "icon glyph" });
  } else {
    addShape(slide, "rect", x + 16, y + 29, 6, 12, accent, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
    addShape(slide, "rect", x + 25, y + 21, 6, 20, accent, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
    addShape(slide, "rect", x + 34, y + 14, 6, 27, accent, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
  }
}

function addCard(slide, slideNo, x, y, w, h, label, body, { accent = ACCENT, fill = PAPER_96, line = INK, iconKind = "signal" } = {}) {
  if (h < 156) {
    throw new Error(`Card is too short for editable pro-deck copy: height=${h.toFixed(1)}, minimum=156.`);
  }
  addShape(slide, "roundRect", x, y, w, h, fill, line, 1.2, { slideNo, role: `card panel: ${label}` });
  addShape(slide, "rect", x, y, 8, h, accent, TRANSPARENT, 0, { slideNo, role: `card accent: ${label}` });
  addIconBadge(slide, slideNo, x + 22, y + 24, accent, iconKind);
  addText(slide, slideNo, label, x + 88, y + 22, w - 108, 28, {
    size: 15,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    role: "card label",
  });
  const wrapped = wrapText(body, Math.max(34, Math.floor(w / 10.5)));
  const bodyY = y + 80;
  const bodyH = h - (bodyY - y) - 22;
  if (bodyH < 54) {
    throw new Error(`Card body area is too short: height=${bodyH.toFixed(1)}, cardHeight=${h.toFixed(1)}, label=${JSON.stringify(label)}.`);
  }
  addText(slide, slideNo, wrapped, x + 24, bodyY, w - 48, bodyH, {
    size: 14,
    color: INK,
    face: BODY_FACE,
    role: `card body: ${label}`,
  });
}

function addMetricCard(slide, slideNo, x, y, w, h, metric, label, note = null, accent = ACCENT) {
  if (h < 132) {
    throw new Error(`Metric card is too short for editable pro-deck copy: height=${h.toFixed(1)}, minimum=132.`);
  }
  addShape(slide, "roundRect", x, y, w, h, PAPER_96, INK, 1.2, { slideNo, role: `metric panel: ${label}` });
  addShape(slide, "rect", x, y, w, 7, accent, TRANSPARENT, 0, { slideNo, role: `metric accent: ${label}` });
  addText(slide, slideNo, metric, x + 22, y + 24, w - 44, 54, {
    size: 34,
    color: INK,
    bold: true,
    face: TITLE_FACE,
    role: "metric value",
  });
  addText(slide, slideNo, label, x + 24, y + 82, w - 48, 38, {
    size: 16,
    color: GRAPHITE,
    face: BODY_FACE,
    role: "metric label",
  });
  if (note) {
    addText(slide, slideNo, note, x + 24, y + h - 42, w - 48, 22, {
      size: 10,
      color: MUTED,
      face: BODY_FACE,
      role: "metric note",
    });
  }
}

function addNotes(slide, body, sourceKeys) {
  const sourceLines = (sourceKeys || []).map((key) => `- ${SOURCES[key] || key}`).join("\n");
  slide.speakerNotes.setText(`${body || ""}\n\n[Sources]\n${sourceLines}`);
}

function addReferenceCaption(slide, slideNo) {
  addText(
    slide,
    slideNo,
    "All slide content is provided as editable PowerPoint text and shape objects.",
    64,
    674,
    980,
    22,
    {
      size: 10,
      color: MUTED,
      face: BODY_FACE,
      checkFit: false,
      role: "caption",
    },
  );
}

async function slideCover(presentation) {
  const slideNo = 1;
  const data = SLIDES[0];
  const slide = presentation.slides.add();
  await addPlate(slide, slideNo);
  addShape(slide, "rect", 0, 0, W, H, "#FFFFFFCC", TRANSPARENT, 0, { slideNo, role: "cover contrast overlay" });
  addShape(slide, "rect", 64, 86, 7, 455, ACCENT, TRANSPARENT, 0, { slideNo, role: "cover accent rule" });
  addText(slide, slideNo, data.kicker, 86, 88, 520, 26, {
    size: 13,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    role: "kicker",
  });
  addText(slide, slideNo, data.title, 82, 130, 785, 184, {
    size: 48,
    color: INK,
    bold: true,
    face: TITLE_FACE,
    role: "cover title",
  });
  addText(slide, slideNo, data.subtitle, 86, 326, 610, 86, {
    size: 20,
    color: GRAPHITE,
    face: BODY_FACE,
    role: "cover subtitle",
  });
  addShape(slide, "roundRect", 86, 456, 390, 92, PAPER_96, INK, 1.2, { slideNo, role: "cover moment panel" });
  addText(slide, slideNo, data.moment || "Replace with core idea", 112, 478, 336, 40, {
    size: 23,
    color: INK,
    bold: true,
    face: TITLE_FACE,
    role: "cover moment",
  });
  addReferenceCaption(slide, slideNo);
  addNotes(slide, data.notes, data.sources);
}

async function slideCards(presentation, idx) {
  const data = SLIDES[idx - 1];
  const slide = presentation.slides.add();
  await addPlate(slide, idx);
  addShape(slide, "rect", 0, 0, W, H, "#FFFFFFB8", TRANSPARENT, 0, { slideNo: idx, role: "content contrast overlay" });
  addHeader(slide, idx, data.kicker, idx, SLIDES.length);
  addTitleBlock(slide, idx, data.title, data.subtitle, 64, 86, 760);
  const cards = data.cards?.length
    ? data.cards
    : [
        ["Replace", "Add a specific, sourced point for this slide."],
        ["Author", "Use native PowerPoint chart objects for charts; use deterministic geometry for cards and callouts."],
        ["Verify", "Render previews, inspect them at readable size, and fix actionable layout issues within 3 total render loops."],
      ];
  const cols = Math.min(3, cards.length);
  const cardW = (1114 - (cols - 1) * 24) / cols;
  const iconKinds = ["signal", "flow", "layers"];
  for (let cardIdx = 0; cardIdx < cols; cardIdx += 1) {
    const [label, body] = cards[cardIdx];
    const x = 84 + cardIdx * (cardW + 24);
    addCard(slide, idx, x, 390, cardW, 220, label, body, { iconKind: iconKinds[cardIdx % iconKinds.length] });
  }
  addReferenceCaption(slide, idx);
  addNotes(slide, data.notes, data.sources);
}

async function slideMetrics(presentation, idx) {
  const data = SLIDES[idx - 1];
  const slide = presentation.slides.add();
  await addPlate(slide, idx);
  addShape(slide, "rect", 0, 0, W, H, "#FFFFFFBD", TRANSPARENT, 0, { slideNo: idx, role: "metrics contrast overlay" });
  addHeader(slide, idx, data.kicker, idx, SLIDES.length);
  addTitleBlock(slide, idx, data.title, data.subtitle, 64, 86, 700);
  const metrics = data.metrics || [
    ["00", "Replace metric", "Source"],
    ["00", "Replace metric", "Source"],
    ["00", "Replace metric", "Source"],
  ];
  const accents = [ACCENT, GOLD, CORAL];
  for (let metricIdx = 0; metricIdx < Math.min(3, metrics.length); metricIdx += 1) {
    const [metric, label, note] = metrics[metricIdx];
    addMetricCard(slide, idx, 92 + metricIdx * 370, 404, 330, 174, metric, label, note, accents[metricIdx % accents.length]);
  }
  addReferenceCaption(slide, idx);
  addNotes(slide, data.notes, data.sources);
}

async function createDeck() {
  await ensureDirs();
  if (!SLIDES.length) {
    throw new Error("SLIDES must contain at least one slide.");
  }
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  await slideCover(presentation);
  for (let idx = 2; idx <= SLIDES.length; idx += 1) {
    const data = SLIDES[idx - 1];
    if (data.metrics) {
      await slideMetrics(presentation, idx);
    } else {
      await slideCards(presentation, idx);
    }
  }
  return presentation;
}

async function saveBlobToFile(blob, filePath) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(filePath, bytes);
}

async function writeInspectArtifact(presentation) {
  inspectRecords.unshift({
    kind: "deck",
    id: DECK_ID,
    slideCount: presentation.slides.count,
    slideSize: { width: W, height: H },
  });
  presentation.slides.items.forEach((slide, index) => {
    inspectRecords.splice(index + 1, 0, {
      kind: "slide",
      slide: index + 1,
      id: slide?.id || `slide-${index + 1}`,
    });
  });
  const lines = inspectRecords.map((record) => JSON.stringify(record)).join("\n") + "\n";
  await fs.writeFile(INSPECT_PATH, lines, "utf8");
}

async function currentRenderLoopCount() {
  const logPath = path.join(VERIFICATION_DIR, "render_verify_loops.ndjson");
  if (!(await pathExists(logPath))) return 0;
  const previous = await fs.readFile(logPath, "utf8");
  return previous.split(/\r?\n/).filter((line) => line.trim()).length;
}

async function nextRenderLoopNumber() {
  return (await currentRenderLoopCount()) + 1;
}

async function appendRenderVerifyLoop(presentation, previewPaths, pptxPath) {
  const logPath = path.join(VERIFICATION_DIR, "render_verify_loops.ndjson");
  const priorCount = await currentRenderLoopCount();
  const record = {
    kind: "render_verify_loop",
    deckId: DECK_ID,
    loop: priorCount + 1,
    maxLoops: MAX_RENDER_VERIFY_LOOPS,
    capReached: priorCount + 1 >= MAX_RENDER_VERIFY_LOOPS,
    timestamp: new Date().toISOString(),
    slideCount: presentation.slides.count,
    previewCount: previewPaths.length,
    previewDir: PREVIEW_DIR,
    inspectPath: INSPECT_PATH,
    pptxPath,
  };
  await fs.appendFile(logPath, JSON.stringify(record) + "\n", "utf8");
  return record;
}

async function verifyAndExport(presentation) {
  await ensureDirs();
  const nextLoop = await nextRenderLoopNumber();
  if (nextLoop > MAX_RENDER_VERIFY_LOOPS) {
    throw new Error(
      `Render/verify/fix loop cap reached: ${MAX_RENDER_VERIFY_LOOPS} total renders are allowed. ` +
        "Do not rerender; note any remaining visual issues in the final response.",
    );
  }
  await writeInspectArtifact(presentation);
  const previewPaths = [];
  for (let idx = 0; idx < presentation.slides.items.length; idx += 1) {
    const slide = presentation.slides.items[idx];
    const preview = await presentation.export({ slide, format: "png", scale: 1 });
    const previewPath = path.join(PREVIEW_DIR, `slide-${String(idx + 1).padStart(2, "0")}.png`);
    await saveBlobToFile(preview, previewPath);
    previewPaths.push(previewPath);
  }
  const pptxBlob = await PresentationFile.exportPptx(presentation);
  const pptxPath = path.join(OUT_DIR, "output.pptx");
  await pptxBlob.save(pptxPath);
  const loopRecord = await appendRenderVerifyLoop(presentation, previewPaths, pptxPath);
  return { pptxPath, loopRecord };
}

const presentation = await createDeck();
const result = await verifyAndExport(presentation);
console.log(result.pptxPath);
