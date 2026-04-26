# Smart Library Loan Ontology

## Group Members
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Güvercin
- 210316078 Khaled ALISMAIL

## Project Overview
This repository contains the initial phase deliverables for the Knowledge Engineering and Ontologies course project. The selected domain is a **Smart Library Loan System**. The ontology models how library resources, members, librarians, loans, reservations, authors, publishers, and branch locations relate to one another.

## Purpose
The purpose of this ontology is to provide a clear semantic model for representing and querying library circulation knowledge. It can support questions such as:

- Which resources are currently on loan?
- Which member borrowed a specific resource?
- Which librarian processed a loan or reservation?
- Where is a printed book located?
- Which resources were written by a specific author?

## Scope
The initial version focuses on a small-scale but meaningful part of the library domain:

Included:
- Library resources: printed books, e-books, and journal articles
- People: members, librarians, authors
- Organizations: publishers and library branches
- Circulation transactions: loans and reservations
- Resource availability statuses
- Example individuals for testing the ontology

Out of scope for the initial phase:
- Payment and fine management
- Inter-library loan workflows
- Full authentication/authorization processes
- Detailed acquisition and procurement workflows
- Recommendation algorithms

## Repository Structure

```text
SmartLibraryOntology/
├── README.md
├── ontology/
│   ├── smart-library.ttl
│   └── smart-library.owl
├── docs/
│   ├── specification-draft.md
│   └── design-decisions.md
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

## Example Instances
The ontology includes sample individuals such as:
- `Member_Aylin_Demir`
- `Librarian_Emre_Kaya`
- `CentralBranch`
- `Book_OntologyDesign`
- `EBook_KnowledgeGraphs`
- `Loan_001`
- `Reservation_001`

## Competency Questions
The ontology is designed to answer the following initial competency questions:

1. Which resources are currently available?
2. Which resources are currently on loan?
3. Which member borrowed a specific resource?
4. Which resource is linked to a specific loan transaction?
5. Which librarian processed a specific loan or reservation?
6. Which branch stores a printed book?
7. Which author wrote a specific resource?
8. Which publisher published a specific resource?
9. Which resources are reserved by a member?
10. What is the due date of a loan?

## How to Open and Test
1. Open `ontology/smart-library.ttl` or `ontology/smart-library.owl` in Protégé.
2. Check that the class hierarchy, object properties, data properties, and individuals are loaded.
3. Use a reasoner such as HermiT or Pellet to check ontology consistency.
4. Run SPARQL queries to test the competency questions.

## Version
Initial draft version: `0.1.0`

## Authors
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Güvercin
- 210316078 Khaled ALISMAIL


## SPARQL Queries
The file `queries/competency-questions.rq` contains example SPARQL queries for the competency questions listed above.
