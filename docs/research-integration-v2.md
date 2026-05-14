# Research Integration - Phase 2

## Selected Study
Alrehaili, N. A., Aslam, M. A., Alahmadi, D. H., Alrehaili, D. A., Asif, M., & Malik, M. S. A. (2021). *Ontology-Based Smart System to Automate Higher Education Activities*. Complexity. https://doi.org/10.1155/2021/5588381

## Why This Study Was Selected
This study was selected because it does not treat the ontology as a static vocabulary only. Instead, it presents an end-to-end framework that starts with heterogeneous raw data sources and continues through extraction, conceptualization, ontology development, reasoning, and query answering. That structure is directly relevant to the second phase of the Smart Library Loan Ontology project, where the expectation is not only to define classes and properties, but also to explain how real data are acquired, preprocessed, mapped, and queried.

The paper is also strong methodologically for this project because it separates the work into identifiable phases: specification, knowledge acquisition, conceptualization, ontology development, and SPARQL endpoint usage. This is close to what our project needs in Phase 2. It therefore provides a suitable academic justification for moving from a small proof-of-concept ontology toward a more operational knowledge graph pipeline.

## Relevance to the Smart Library Project
The Smart Library domain has the same basic challenge highlighted in the selected study: relevant knowledge exists in multiple formats and is difficult to use intelligently unless it is semantically normalized. In our project, library metadata are not expected to come from one perfect source. Instead, they may come from APIs, spreadsheets, local seed files, documentation, or catalog exports. The selected study is relevant because it shows how an ontology-centered workflow can unify these different inputs and make them queryable through a consistent semantic layer.

The study is also relevant at the reasoning level. In the paper, semantic relations are not stored merely for documentation; they are used to support ranking and smart retrieval. We adapted this idea to the library setting by extending our ontology with `Topic`, `MetadataRecord`, `DataSource`, `AcquisitionBatch`, `MemberProfile`, `InteractionEvent`, and `Recommendation`. These additions allow the project to move from simple circulation tracking toward a foundation for recommendation and semantic retrieval.

## Planned Integration Points

### 1. Architecture
The paper's staged framework inspired the architecture of the Phase 2 project. Our adapted pipeline is:

1. Specification: define competency questions, target data entities, and library analytics goals.
2. Knowledge acquisition: collect bibliographic and profile signals from APIs, documents, and seed tables.
3. Conceptualization: define topics, sources, metadata records, and personalization concepts.
4. Ontology development: extend the original circulation ontology with provenance and profile modules.
5. Query and reasoning layer: execute SPARQL queries and SHACL validation over the populated graph.

### 2. Ontology Design
The paper motivated us to add explicit provenance-aware concepts instead of inserting resource data as isolated instances. As a result, Phase 2 introduces:

- `DataSource` for documenting where data came from.
- `AcquisitionBatch` for versioning and traceability of collection runs.
- `MetadataRecord` for resource-level provenance.
- `Topic` for semantic enrichment of resources and user profiles.
- `MemberProfile`, `InteractionEvent`, and `Recommendation` for personalization-ready modeling.

This follows the paper's idea that semantic structure should support downstream reasoning rather than only store labels.

### 3. Data Processing Layer
The paper emphasizes extracting data from mixed resources and transforming them into machine-understandable form. We adapted this by defining a small but explicit acquisition methodology:

- bibliographic metadata are collected from public APIs and curated seed files,
- normalized into tabular seed datasets,
- cleaned and aligned to ontology identifiers,
- then mapped into RDF individuals such as `MetadataRecord_B5001` and `MetadataRecord_EB5002`.

### 4. Reasoning and Query Layer
The selected study uses ontology-backed queries to answer domain questions. In our project, this idea is reflected in the expanded query set. Phase 2 queries now cover:

- circulation state,
- topical enrichment,
- source provenance,
- member-profile matching,
- recommendation candidates,
- aggregation over statuses, sources, and interactions.

## Concrete Outcome in This Project
The selected study was not used only as literature support; it affected actual project artifacts. Specifically, it influenced:

- the updated ontology version `0.2.0`,
- the addition of provenance and acquisition concepts,
- the Data Acquisition section of the report,
- the updated competency-query set,
- the SHACL validation design,
- the planned reasoning-oriented recommendation layer.

## Summary
The selected study is relevant because it offers a realistic ontology engineering workflow that begins with raw data and ends with semantic reasoning. This directly supports the Smart Library project's transition from a small ontology draft into a better documented, acquisition-aware, and query-ready semantic system.
