# Ontology Requirements Specification Document - Version 2

## Author(s)
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Guvercin
- 210316078 Khaled ALISMAIL

## Version
- Previous version: `0.1.0`
- Current version: `0.2.0`
- Document label: `Specification v2`
- Update date: `2026-05-14`

## What Changed Compared to Version 1
Version 2 preserves the original circulation core and adds four Phase 2 extensions:

1. A provenance and data acquisition layer:
   `DataSource`, `AcquisitionBatch`, `MetadataRecord`

2. A topical enrichment layer:
   `Topic`, `hasTopic`

3. A personalization-ready layer:
   `MemberProfile`, `InteractionEvent`, `Recommendation`

4. Stronger documentation and validation support:
   updated SPARQL queries, SHACL shapes, and explicit mapping to acquisition seed files

## 1. Purpose
The purpose of the Smart Library Loan Ontology is to provide a formal semantic model for representing the core concepts and relationships of a library circulation system while also documenting how metadata are acquired, normalized, and prepared for semantic retrieval and recommendation. Version 2 expands the ontology from a basic proof-of-concept into a small but more complete knowledge engineering artifact that supports provenance, topical enrichment, and lightweight personalization.

## 2. Scope

### Included in Scope
- library resources such as printed books, e-books, and journal articles
- members and librarians
- circulation transactions such as loans and reservations
- publishers and physical branches
- controlled resource status values
- acquisition provenance for populated resource metadata
- semantic topics for retrieval and recommendation
- user-profile and interaction concepts for future personalization

### Excluded from Scope
- full-scale fine and payment management
- inter-library loan workflows
- complete authentication and access control
- production-grade recommendation training pipelines
- detailed copy-level inventory and barcode management

## 3. Implementation Language
The ontology is implemented in OWL/RDF and provided in:

- Turtle: `ontology/smart-library.ttl`
- RDF/XML OWL: `ontology/smart-library.owl`

## 4. Intended End-Users
- library system administrators
- librarians
- library members
- knowledge engineering students and evaluators
- developers of semantic library services

## 5. Intended Uses
The ontology is designed for the following uses:

1. Representing core library circulation knowledge.
2. Tracking who borrowed or reserved which resource.
3. Capturing provenance about where metadata came from.
4. Enriching resources with topics for semantic retrieval.
5. Supporting profile-based recommendation experiments.
6. Serving as a reusable schema for a small smart-library knowledge graph.

## 6. Reused Ontologies and Vocabularies
Version 2 explicitly reuses lightweight external vocabularies:

- Dublin Core (`dc`, `dcterms`) for ontology metadata and subject alignment
- Schema.org (`schema`) for high-level alignment such as `schema:CreativeWork`, `schema:Book`, `schema:Organization`, `schema:name`, and `schema:isbn`

These were reused as lightweight interoperability anchors rather than imported as full external modules.

## 7. Ontology Expansion Methodology
The Phase 2 extension follows a structured ontology engineering style inspired mainly by METHONTOLOGY and modular ontology design ideas.

### Applied principles
- keep the original circulation ontology stable
- extend with separate conceptual modules
- preserve readable names and direct competency-question traceability
- document data acquisition and validation explicitly

### Logical modules
- Core circulation module
- Bibliographic description module
- Acquisition provenance module
- Personalization and interaction module

## 8. Ontology Requirements

### Non-Functional Requirements

| ID | Requirement | Explanation |
|---|---|---|
| NFR-01 | The ontology must remain understandable. | Labels and comments should stay human-readable in Protégé and documentation. |
| NFR-02 | The ontology must be extendable. | New modules should not break the circulation core. |
| NFR-03 | The ontology must record provenance. | Resource metadata should be traceable to sources and batches. |
| NFR-04 | The ontology must support validation. | SHACL constraints should be definable for key entities. |
| NFR-05 | The ontology must support semantic retrieval. | Topic-based and profile-aware queries should be possible. |

### Functional Requirements and Competency Questions

| ID | Competency Question | Requirement Sentence |
|---|---|---|
| CQ-01 | Which resources are currently available? | The ontology must represent resource availability status. |
| CQ-02 | Which resources are currently on loan? | The ontology must identify loaned resources. |
| CQ-03 | Which member borrowed a specific resource? | The ontology must connect loans to members and resources. |
| CQ-04 | Which branch stores a printed book? | The ontology must connect physical resources to branches. |
| CQ-05 | Which topics are linked to each resource? | The ontology must semantically enrich resources with reusable topics. |
| CQ-06 | Which data sources were used to populate a resource? | The ontology must preserve metadata provenance. |
| CQ-07 | Which metadata records belong to the phase 2 acquisition batch? | The ontology must support acquisition-run traceability. |
| CQ-08 | Which resources match a member's topic interests? | The ontology must support profile-based semantic retrieval. |
| CQ-09 | Which recommendation candidates are available for a member? | The ontology must support recommendation-ready outputs. |
| CQ-10 | How many resources belong to each status or source? | The ontology must support aggregation queries for analytics. |

## 9. Core Classes in Version 2

### Original core classes retained
- `Member`
- `Librarian`
- `LibraryResource`
- `Book`
- `PrintedBook`
- `EBook`
- `JournalArticle`
- `Loan`
- `Reservation`
- `LibraryBranch`
- `Author`
- `Publisher`
- `ResourceStatus`

### New classes added in Version 2
- `DataSource`
- `AcquisitionBatch`
- `MetadataRecord`
- `Topic`
- `MemberProfile`
- `InteractionEvent`
- `Recommendation`

## 10. Core Relationships in Version 2

### Existing relationships retained
- `loanedTo`
- `loanedResource`
- `reservedBy`
- `reservedResource`
- `processedBy`
- `locatedAt`
- `writtenBy`
- `publishedBy`
- `hasStatus`

### New relationships added
- `hasTopic`
- `describedBy`
- `describesResource`
- `retrievedFromSource`
- `generatedInBatch`
- `hasProfile`
- `hasInterestTopic`
- `recordsMember`
- `interactedWithResource`
- `recommendedFor`
- `recommendedResource`

## 11. Example Individuals Added in Version 2
- `DataSource_OpenLibraryAPI`
- `DataSource_GoogleBooksAPI`
- `DataSource_DepartmentSeedSheet`
- `AcquisitionBatch_2026_05_Phase2`
- `MetadataRecord_B5001`
- `MetadataRecord_EB5002`
- `Topic_OntologyEngineering`
- `Topic_KnowledgeGraphs`
- `Topic_SemanticWeb`
- `Profile_Aylin_Demir`
- `Interaction_View_001`
- `Interaction_Search_001`
- `Recommendation_001`

## 12. Validation and Quality
Version 2 is paired with a SHACL file:

- `shapes/smart-library.shacl.ttl`

This file checks mandatory constraints for loans, reservations, metadata records, resources, and recommendations.

## 13. Summary
Specification v2 extends the original Smart Library Loan Ontology into a more complete semantic project artifact. The ontology now documents not only circulation relationships but also how data are acquired, semantically enriched, validated, and prepared for future personalization.
