import Foundation

enum DemoData {
    static let branch = BranchRecord(
        id: "BR-001",
        name: "Central Library Branch",
        address: "Main Campus, Library Building"
    )

    static let member = PersonRecord(
        id: "M-1001",
        name: "Aylin Demir",
        role: "Member",
        email: "aylin.demir@example.edu"
    )

    static let librarian = PersonRecord(
        id: "L-2001",
        name: "Emre Kaya",
        role: "Librarian",
        email: "emre.kaya@example.edu"
    )

    static let resources: [LibraryResource] = [
        LibraryResource(
            id: "B-5001",
            title: "Ontology Design Principles",
            kind: .printedBook,
            status: .onLoan,
            year: "2024",
            author: "Tom Gruber",
            publisher: "MIT Press",
            branch: "Central Library Branch",
            isbn: "978-0-000-00001-1",
            accessURL: nil
        ),
        LibraryResource(
            id: "EB-5002",
            title: "Introduction to Knowledge Graphs",
            kind: .eBook,
            status: .available,
            year: "2025",
            author: nil,
            publisher: "MIT Press",
            branch: nil,
            isbn: "978-0-000-00002-8",
            accessURL: "https://example.org/ebooks/knowledge-graphs"
        )
    ]

    static let activeLoan = LoanRecord(
        id: "LN-0001",
        resourceTitle: "Ontology Design Principles",
        memberName: "Aylin Demir",
        librarianName: "Emre Kaya",
        startDate: "2026-04-20",
        dueDate: "2026-05-04"
    )

    static let reservation = ReservationRecord(
        id: "RS-0001",
        resourceTitle: "Introduction to Knowledge Graphs",
        memberName: "Aylin Demir",
        librarianName: "Emre Kaya",
        startDate: "2026-04-25"
    )

    static let ontologyGroups: [OntologyGroup] = [
        OntologyGroup(
            title: "Core Classes",
            items: ["Member", "Librarian", "LibraryResource", "Loan", "Reservation", "LibraryBranch"]
        ),
        OntologyGroup(
            title: "Object Properties",
            items: ["loanedTo", "loanedResource", "processedBy", "locatedAt", "writtenBy", "hasStatus"]
        ),
        OntologyGroup(
            title: "Resource Status",
            items: ["Available", "OnLoan", "Reserved"]
        )
    ]

    static let questions: [CompetencyQuestion] = [
        CompetencyQuestion(code: "CQ-01", text: "Which resources are currently available?"),
        CompetencyQuestion(code: "CQ-03", text: "Which member borrowed a specific resource?"),
        CompetencyQuestion(code: "CQ-05", text: "Which librarian processed a loan or reservation?"),
        CompetencyQuestion(code: "CQ-10", text: "What is the due date of a specific loan?")
    ]
}
