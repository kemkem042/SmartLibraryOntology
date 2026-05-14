# Smart Library Loan Ontology

## Group Members
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Güvercin
- 210316078 Khaled ALISMAIL

## Project Overview
This repository contains the Phase 1 and Phase 2 deliverables for the Knowledge Engineering and Ontologies course project. The selected domain is a **Smart Library Loan System**. The ontology models how library resources, members, librarians, loans, reservations, authors, publishers, branch locations, metadata sources, semantic topics, and recommendation-ready user signals relate to one another.

## Purpose
The purpose of this ontology is to provide a clear semantic model for representing and querying library circulation knowledge. It can support questions such as:

- Which resources are currently on loan?
- Which member borrowed a specific resource?
- Which librarian processed a loan or reservation?
- Where is a printed book located?
- Which resources were written by a specific author?

## Scope
The initial version focused on a small-scale but meaningful part of the library domain. Phase 2 extends that model with provenance-aware metadata acquisition and lightweight personalization support.

Included:
- Library resources: printed books, e-books, and journal articles
- People: members, librarians, authors
- Organizations: publishers and library branches
- Circulation transactions: loans and reservations
- Resource availability statuses
- Data acquisition provenance: metadata records, sources, and acquisition batches
- Semantic topics for resources and member profiles
- Recommendation-ready interaction and profile concepts
- Example individuals for testing the ontology

Out of scope for the current course scope:
- Payment and fine management
- Inter-library loan workflows
- Full authentication/authorization processes
- Detailed acquisition and procurement workflows
- Production-grade recommendation algorithms

## Repository Structure

```text
SmartLibraryOntology/
├── README.md
├── data/
│   └── phase2/
│       ├── member_interest_seed.csv
│       └── resource_metadata_seed.csv
├── ontology/
│   ├── smart-library.ttl
│   └── smart-library.owl
├── docs/
│   ├── data-acquisition-v2.md
│   ├── design-decisions.md
│   ├── mandatory-paper-review-v2.md
│   ├── reports/
│   │   └── project-report-v2.md
│   ├── research-integration-v2.md
│   ├── specification-draft.md
│   └── specification-v2.md
├── shapes/
│   └── smart-library.shacl.ttl
└── queries/
    └── competency-questions.rq
```

## Ontology Files
- `ontology/smart-library.ttl`: Turtle serialization of the ontology.
- `ontology/smart-library.owl`: RDF/XML OWL serialization generated from the Turtle file.

## Core Classes
- `LibraryEntity`
- `Person`
- `Member`
- `Librarian`
- `Author`
- `Organization`
- `Publisher`
- `LibraryBranch`
- `LibraryResource`
- `Book`
- `PrintedBook`
- `EBook`
- `JournalArticle`
- `CirculationTransaction`
- `Loan`
- `Reservation`
- `ResourceStatus`
- `DataSource`
- `AcquisitionBatch`
- `MetadataRecord`
- `Topic`
- `MemberProfile`
- `InteractionEvent`
- `Recommendation`

## Core Object Properties
- `hasLoan`
- `loanedTo`
- `loanedResource`
- `reservedBy`
- `reservedResource`
- `processedBy`
- `locatedAt`
- `writtenBy`
- `publishedBy`
- `hasStatus`
- `hasTopic`
- `describedBy`
- `retrievedFromSource`
- `generatedInBatch`
- `hasProfile`
- `hasInterestTopic`
- `recordsMember`
- `interactedWithResource`
- `recommendedFor`
- `recommendedResource`

## Core Data Properties
- `identifier`
- `name`
- `title`
- `isbn`
- `publicationYear`
- `startDate`
- `dueDate`
- `returnDate`
- `email`
- `branchAddress`
- `accessUrl`
- `sourceUrl`
- `retrievedAt`
- `confidenceScore`
- `interactionType`
- `profileScore`

## Example Instances
The ontology includes sample individuals such as:
- `Member_Aylin_Demir`
- `Librarian_Emre_Kaya`
- `CentralBranch`
- `Book_OntologyDesign`
- `EBook_KnowledgeGraphs`
- `Loan_001`
- `Reservation_001`
- `DataSource_OpenLibraryAPI`
- `DataSource_GoogleBooksAPI`
- `MetadataRecord_B5001`
- `Profile_Aylin_Demir`
- `Recommendation_001`

## Competency Questions
The ontology is designed to answer the following Phase 2 competency questions:

1. Which resources are currently available?
2. Which resources are currently on loan?
3. Which member borrowed a specific resource?
4. Which branch stores a printed book?
5. Which topics are linked to each resource?
6. Which data sources were used to populate a resource?
7. Which metadata records belong to the phase 2 acquisition batch?
8. Which resources match a member's topic interests?
9. Which recommendation candidates are available for a member?
10. How many resources belong to each status or source category?

## How to Open and Test
1. Open `ontology/smart-library.ttl` or `ontology/smart-library.owl` in Protégé.
2. Check that the class hierarchy, object properties, data properties, and individuals are loaded.
3. Use a reasoner such as HermiT or Pellet to check ontology consistency.
4. Run SPARQL queries to test the competency questions.
5. Use `shapes/smart-library.shacl.ttl` to validate the core constraints.

## Version
Current ontology version: `0.2.0`

## Authors
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Güvercin
- 210316078 Khaled ALISMAIL


## SPARQL Queries
The file `queries/competency-questions.rq` contains updated SPARQL queries for retrieval, provenance, personalization, and aggregation scenarios.

## Phase 2 Documentation
- `docs/research-integration-v2.md`
- `docs/mandatory-paper-review-v2.md`
- `docs/data-acquisition-v2.md`
- `docs/specification-v2.md`
- `docs/reports/project-report-v2.md`
- `docs/reports/SmartLibraryOntology_Project_Report_v2.docx`
- `docs/Ontology_Requirements_Specification_v2.docx`

## Widoco Documentation
Widoco output for the latest ontology version is available under:
- `docs/widoco/index.html`
