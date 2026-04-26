# Design Decisions

## Project Team
- 210316051 Kemal Mert Ceyhan
- 190316073 Ahmet Burak Güvercin
- 210316078 Khaled ALISMAIL

## 1. Domain Selection
The selected domain is a Smart Library Loan System. This domain was chosen because it is understandable, has clear real-world entities, and naturally supports ontology modeling through resources, people, transactions, and statuses.

## 2. Modeling Approach
The ontology separates stable domain entities from event-like transaction entities:
- Stable entities: `Member`, `Librarian`, `Book`, `EBook`, `LibraryBranch`, `Publisher`
- Transaction entities: `Loan`, `Reservation`

This avoids directly attaching borrowing dates to a member or book and instead stores them in a `Loan` individual.

## 3. Reuse and Naming
The ontology uses readable English class and property names. The namespace prefix is `slo`, meaning Smart Library Ontology. Labels and comments are included to make the ontology understandable in Protégé.

## 4. Class Hierarchy
`LibraryEntity` is used as a top-level class. Subclasses are organized into people, organizations, resources, transactions, and statuses.

## 5. Property Design
Object properties represent relationships between individuals. Data properties store literal values such as names, dates, ISBNs, and e-mail addresses.

## 6. Constraints
The initial version includes simple OWL restrictions:
- Each `Loan` must be linked to exactly one `Member`.
- Each `Loan` must be linked to exactly one `LibraryResource`.
- Each `Reservation` must be linked to exactly one `Member`.
- Each `Reservation` must be linked to exactly one `LibraryResource`.

## 7. Initial Limitations
This version is intentionally small. It does not yet model fines, renewals, detailed resource copies, advanced user roles, or recommendation features. These can be added in later iterations.
