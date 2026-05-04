import SwiftUI

struct TransactionsView: View {
    private let loan = DemoData.activeLoan
    private let reservation = DemoData.reservation
    @State private var bannerText = "Showing active loan and reservation records from the ontology examples."

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    InfoCard(title: "Transaction Center", subtitle: "Interactive mock records") {
                        Text(bannerText)
                            .font(.subheadline.weight(.medium))
                    }

                    NavigationLink {
                        TransactionDetailView(
                            title: "Loan Transaction",
                            identifier: loan.id,
                            rows: [
                                ("Resource", loan.resourceTitle),
                                ("Member", loan.memberName),
                                ("Processed By", loan.librarianName),
                                ("Start Date", loan.startDate),
                                ("Due Date", loan.dueDate)
                            ]
                        )
                    } label: {
                        transactionCard(title: "Loan Transaction", subtitle: loan.id, accent: AppPalette.blue) {
                            VStack(alignment: .leading, spacing: 10) {
                                transactionRow("Resource", loan.resourceTitle)
                                transactionRow("Member", loan.memberName)
                                transactionRow("Processed By", loan.librarianName)
                                transactionRow("Start Date", loan.startDate)
                                transactionRow("Due Date", loan.dueDate)
                            }
                        }
                    }

                    NavigationLink {
                        TransactionDetailView(
                            title: "Reservation Transaction",
                            identifier: reservation.id,
                            rows: [
                                ("Resource", reservation.resourceTitle),
                                ("Member", reservation.memberName),
                                ("Processed By", reservation.librarianName),
                                ("Start Date", reservation.startDate)
                            ]
                        )
                    } label: {
                        transactionCard(title: "Reservation Transaction", subtitle: reservation.id, accent: AppPalette.gold) {
                            VStack(alignment: .leading, spacing: 10) {
                                transactionRow("Resource", reservation.resourceTitle)
                                transactionRow("Member", reservation.memberName)
                                transactionRow("Processed By", reservation.librarianName)
                                transactionRow("Start Date", reservation.startDate)
                            }
                        }
                    }

                    InfoCard(title: "Quick Demo Controls") {
                        HStack {
                            Button {
                                bannerText = "Loan_001 connects a member, a resource, and a librarian through ontology properties."
                            } label: {
                                PrimaryActionButton(title: "Explain Loan", systemImage: "text.bubble.fill")
                            }

                            Button {
                                bannerText = "Reservation_001 shows how a member can reserve an available digital resource."
                            } label: {
                                SecondaryActionButton(title: "Explain Reservation", systemImage: "bookmark.fill")
                            }
                        }
                    }

                    InfoCard(title: "Why This Matches The Ontology") {
                        VStack(alignment: .leading, spacing: 10) {
                            Text("Loan_001 uses: loanedTo, loanedResource, processedBy, dueDate.")
                            Text("Reservation_001 uses: reservedBy, reservedResource, processedBy.")
                        }
                    }
                }
                .padding(20)
            }
            .navigationTitle("Transactions")
            .demoBackground()
        }
    }

    private func transactionRow(_ title: String, _ value: String) -> some View {
        HStack(alignment: .top) {
            Text(title)
                .foregroundStyle(.secondary)
                .frame(width: 96, alignment: .leading)
            Text(value)
                .fontWeight(.medium)
            Spacer()
        }
        .font(.subheadline)
    }

    private func transactionCard<Content: View>(title: String, subtitle: String, accent: Color, @ViewBuilder content: () -> Content) -> some View {
        HStack(alignment: .top, spacing: 14) {
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(title)
                            .font(.headline)
                            .foregroundStyle(AppPalette.ink)
                        Text(subtitle)
                            .font(.subheadline)
                            .foregroundStyle(AppPalette.mutedInk)
                    }
                    Spacer()
                    Circle()
                        .fill(accent)
                        .frame(width: 12, height: 12)
                }

                content()
            }

            Image(systemName: "chevron.right")
                .font(.footnote.weight(.bold))
                .foregroundStyle(AppPalette.mutedInk)
                .padding(.top, 6)
        }
        .padding(18)
        .background(AppPalette.card)
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(AppPalette.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
    }
}

struct TransactionDetailView: View {
    let title: String
    let identifier: String
    let rows: [(String, String)]
    @State private var note = "Ready for instructor presentation."

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                InfoCard(title: title, subtitle: identifier) {
                    VStack(alignment: .leading, spacing: 10) {
                        ForEach(Array(rows.enumerated()), id: \.offset) { _, row in
                            HStack(alignment: .top) {
                                Text(row.0)
                                    .foregroundStyle(AppPalette.mutedInk)
                                    .frame(width: 100, alignment: .leading)
                                Text(row.1)
                                    .foregroundStyle(AppPalette.ink)
                                    .fontWeight(.medium)
                                Spacer()
                            }
                            .font(.subheadline)
                        }
                    }
                }

                InfoCard(title: "Mock Workflow") {
                    VStack(alignment: .leading, spacing: 10) {
                        Text(note)
                            .font(.subheadline.weight(.medium))

                        HStack {
                            Button {
                                note = "Record checked successfully. The system would now sync this transaction to the ontology-backed service."
                            } label: {
                                PrimaryActionButton(title: "Validate", systemImage: "checkmark.shield.fill")
                            }

                            Button {
                                note = "Summary generated. This screen is behaving like a working admin panel for demonstration purposes."
                            } label: {
                                SecondaryActionButton(title: "Generate Summary", systemImage: "doc.text.fill")
                            }
                        }
                    }
                }
            }
            .padding(20)
        }
        .navigationTitle(title)
        .navigationBarTitleDisplayMode(.inline)
        .demoBackground()
    }
}
