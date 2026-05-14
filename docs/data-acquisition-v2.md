# Data Acquisition - Phase 2

## Overview
Phase 2 extends the original Smart Library Loan Ontology by explicitly documenting how resource metadata and user-interest signals can be collected and transformed into ontology instances. The main objective of this section is to demonstrate that the ontology is not isolated from data, but can be populated from identifiable sources through a traceable process.

## Data Sources

### 1. Open Library API
- Type: public bibliographic API
- Purpose: enrich printed-book metadata
- Example use: titles, ISBNs, publication details, subject-oriented descriptors
- Project role: source for `MetadataRecord_B5001`

### 2. Google Books API
- Type: public bibliographic API
- Purpose: enrich e-book metadata and digital-resource descriptions
- Example use: title normalization, publication year, publisher, topical clues
- Project role: source for `MetadataRecord_EB5002`

### 3. Department seed spreadsheet
- Type: manually curated tabular source
- Purpose: hold project seed data and controlled examples for population
- Example use: resource identifiers, status labels, branch assignments, curated topic alignment
- Project role: local data quality anchor used to reconcile public-source values

### 4. Course-provided documents
- Type: project specification and ontology draft documents
- Purpose: define competency questions, scope, and domain vocabulary
- Project role: conceptual source during ontology extension rather than direct ABox population

## Data Collection Methodology
The collection process follows a lightweight adaptation of the framework used in the selected research study. The workflow is:

1. Identify target entities required by the ontology.
   In Phase 2 these include resources, sources, metadata records, topics, member profiles, and interaction signals.

2. Collect bibliographic and contextual metadata from public and local sources.
   Public APIs are used for descriptive metadata, while the local seed sheet provides controlled identifiers and validation support.

3. Normalize collected fields into project seed tables.
   This step is represented by `data/phase2/resource_metadata_seed.csv` and `data/phase2/member_interest_seed.csv`.

4. Map normalized values to ontology classes and properties.
   The resulting entities are encoded as RDF individuals in `ontology/smart-library.ttl`.

5. Store provenance explicitly.
   `DataSource`, `AcquisitionBatch`, and `MetadataRecord` individuals are used so that each populated resource can be traced back to its acquisition context.

## Preprocessing Steps

### 1. Identifier normalization
Resource identifiers were standardized into concise internal IDs such as `B-5001`, `EB-5002`, and `MR-5001`.

### 2. Status normalization
Different textual resource states were reduced to controlled ontology individuals:
- `Available`
- `OnLoan`
- `Reserved`

### 3. Topic normalization
Free-text themes were reduced to reusable semantic topics:
- `Ontology Engineering`
- `Knowledge Graphs`
- `Semantic Web`

### 4. Source reconciliation
When the same resource can be described by more than one source, the local seed sheet acts as the curated reference for IDs and controlled fields, while public APIs supply descriptive enrichment.

### 5. Structural mapping
Tabular rows were converted conceptually into RDF triples that instantiate:
- `LibraryResource`
- `MetadataRecord`
- `DataSource`
- `MemberProfile`
- `InteractionEvent`

## Mapping of Data to Ontology Concepts

| Data Element | Ontology Concept | Example |
|---|---|---|
| Resource row | `LibraryResource` / subclass | `Book_OntologyDesign`, `EBook_KnowledgeGraphs` |
| Metadata source name | `DataSource` | `DataSource_OpenLibraryAPI` |
| Resource ingestion event | `MetadataRecord` | `MetadataRecord_B5001` |
| Acquisition run | `AcquisitionBatch` | `AcquisitionBatch_2026_05_Phase2` |
| Subject keyword | `Topic` | `Topic_KnowledgeGraphs` |
| User interest signal | `MemberProfile` + `hasInterestTopic` | `Profile_Aylin_Demir` |
| User click/view/search log | `InteractionEvent` | `Interaction_View_001` |
| Recommended item | `Recommendation` | `Recommendation_001` |

## Data Quality Notes
The current dataset is intentionally small because the project remains a course prototype. Its purpose is to show clean ontology population, provenance awareness, and mapping logic rather than large-scale deployment. The main limitations are:

- the seed data are curated rather than harvested in bulk,
- public API responses are not stored as raw snapshots in this repository,
- member behavior signals are illustrative and not collected from a live production system.

Even with these limits, the acquisition pipeline is now explicit, traceable, and suitable for further scaling in later phases.
