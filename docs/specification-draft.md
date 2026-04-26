# Ontology Requirements Specification Document

## Author(s)
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Güvercin
- 210316078 Khaled ALISMAIL

## 1. Purpose
The purpose of the Smart Library Loan Ontology is to provide a formal semantic model for representing the core concepts and relationships of a library circulation system. The ontology supports structured knowledge about library resources, members, librarians, loans, reservations, authors, publishers, and branch locations.

This ontology is intended to help users and systems answer questions about resource availability, borrowing status, reservations, responsible librarians, and bibliographic metadata.

## 2. Scope
The ontology covers the initial small-scale domain of a smart library loan and reservation system.

### Included in Scope
- Library resources such as printed books, e-books, and journal articles
- Members who borrow or reserve resources
- Librarians who process circulation transactions
- Loan and reservation records
- Authors and publishers
- Library branches and physical resource locations
- Resource availability statuses

### Excluded from Scope
- Fine calculation and payment processing
- Procurement and acquisition management
- Full digital rights management
- Recommendation algorithms
- Inter-library loan networks
- Authentication and authorization mechanisms

## 3. Implementation Language
The ontology is implemented using OWL/RDF. The initial ontology files are provided in:
- Turtle: `ontology/smart-library.ttl`
- RDF/XML OWL: `ontology/smart-library.owl`

## 4. Intended End-Users
- Library system administrators
- Librarians
- Library members
- Developers of semantic library applications
- Knowledge engineering students and evaluators

## 5. Intended Uses
The ontology is designed for the following uses:
1. Representing library resources and their availability status.
2. Tracking which members borrowed or reserved resources.
3. Connecting loans and reservations to responsible librarians.
4. Describing bibliographic relationships such as authorship and publication.
5. Supporting SPARQL queries over library circulation data.
6. Serving as a foundation for future ontology development iterations.

## 6. Ontology Requirements

### a. Non-Functional Requirements

| ID | Requirement | Explanation |
|---|---|---|
| NFR-01 | The ontology must be understandable. | Classes and properties should have clear labels and comments. |
| NFR-02 | The ontology must be small enough for the initial phase. | The model should be manageable and easy to present in one-on-one meetings. |
| NFR-03 | The ontology must be reusable and extendable. | Future versions should be able to add fines, renewals, resource copies, and recommendations. |
| NFR-04 | The ontology must use standard Semantic Web formats. | OWL/RDF should be provided in a common serialization such as Turtle or RDF/XML. |
| NFR-05 | The ontology must be consistent. | It should load in Protégé and be suitable for reasoner checks. |

### b. Functional Requirements: Competency Questions and Requirement Sentences

| ID | Competency Question | Requirement Sentence |
|---|---|---|
| CQ-01 | Which resources are currently available? | The ontology must represent the status of each library resource. |
| CQ-02 | Which resources are currently on loan? | The ontology must identify resources that are linked to an active loan status. |
| CQ-03 | Which member borrowed a specific resource? | The ontology must connect a loan transaction to a member and a resource. |
| CQ-04 | Which resource is linked to a specific loan? | The ontology must represent the resource involved in each loan. |
| CQ-05 | Which librarian processed a specific loan or reservation? | The ontology must connect circulation transactions to librarians. |
| CQ-06 | Which branch stores a printed book? | The ontology must represent the physical branch location of printed resources. |
| CQ-07 | Which author wrote a specific resource? | The ontology must connect resources to authors. |
| CQ-08 | Which publisher published a specific resource? | The ontology must connect resources to publishers. |
| CQ-09 | Which resources are reserved by a specific member? | The ontology must represent reservation transactions between members and resources. |
| CQ-10 | What is the due date of a specific loan? | The ontology must store due dates for loan transactions. |

## 7. Pre-Glossary of Terms

### a. Terms from Competency Questions
- Resource
- Available
- On loan
- Member
- Loan
- Reservation
- Librarian
- Branch
- Author
- Publisher
- Due date

### b. Terms from Answers
- `LibraryResource`
- `Book`
- `PrintedBook`
- `EBook`
- `JournalArticle`
- `Member`
- `Librarian`
- `Loan`
- `Reservation`
- `LibraryBranch`
- `Author`
- `Publisher`
- `ResourceStatus`

### c. Objects
- `Member_Aylin_Demir`
- `Librarian_Emre_Kaya`
- `CentralBranch`
- `Author_Tom_Gruber`
- `Publisher_MITPress`
- `Book_OntologyDesign`
- `EBook_KnowledgeGraphs`
- `Loan_001`
- `Reservation_001`
- `Available`
- `OnLoan`
- `Reserved`

## Initial Ontology Summary

### Core Classes
The ontology defines classes for people, resources, organizations, transactions, and statuses. The main classes are `Member`, `Librarian`, `LibraryResource`, `Book`, `PrintedBook`, `EBook`, `JournalArticle`, `Loan`, `Reservation`, `LibraryBranch`, `Author`, `Publisher`, and `ResourceStatus`.

### Core Relationships
Important object properties include:
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

### Example Instances
The ontology includes example individuals for testing and demonstration, including a member, librarian, branch, printed book, e-book, loan, and reservation.
