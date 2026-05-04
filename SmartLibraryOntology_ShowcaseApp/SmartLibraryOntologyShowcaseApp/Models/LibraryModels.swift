import Foundation
import SwiftUI

enum ResourceKind: String {
    case printedBook = "Printed Book"
    case eBook = "E-Book"
    case journalArticle = "Journal Article"

    var icon: String {
        switch self {
        case .printedBook:
            return "books.vertical.fill"
        case .eBook:
            return "ipad.and.iphone"
        case .journalArticle:
            return "doc.text.fill"
        }
    }
}

enum ResourceStatus: String {
    case available = "Available"
    case onLoan = "On Loan"
    case reserved = "Reserved"

    var color: Color {
        switch self {
        case .available:
            return Color(red: 0.16, green: 0.56, blue: 0.36)
        case .onLoan:
            return Color(red: 0.82, green: 0.46, blue: 0.12)
        case .reserved:
            return Color(red: 0.66, green: 0.32, blue: 0.18)
        }
    }
}

struct LibraryResource: Identifiable {
    let id: String
    let title: String
    let kind: ResourceKind
    let status: ResourceStatus
    let year: String
    let author: String?
    let publisher: String
    let branch: String?
    let isbn: String?
    let accessURL: String?
}

struct PersonRecord: Identifiable {
    let id: String
    let name: String
    let role: String
    let email: String
}

struct BranchRecord: Identifiable {
    let id: String
    let name: String
    let address: String
}

struct LoanRecord: Identifiable {
    let id: String
    let resourceTitle: String
    let memberName: String
    let librarianName: String
    let startDate: String
    let dueDate: String
}

struct ReservationRecord: Identifiable {
    let id: String
    let resourceTitle: String
    let memberName: String
    let librarianName: String
    let startDate: String
}

struct OntologyGroup: Identifiable {
    let id = UUID()
    let title: String
    let items: [String]
}

struct CompetencyQuestion: Identifiable {
    let id = UUID()
    let code: String
    let text: String
}
