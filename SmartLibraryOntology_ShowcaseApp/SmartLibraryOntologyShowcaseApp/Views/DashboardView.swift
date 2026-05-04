import SwiftUI

struct DashboardView: View {
    private let resources = DemoData.resources
    @State private var selectedStory = "Aylin Demir borrowed \"Ontology Design Principles\" and the loan was processed by Emre Kaya."

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    heroCard

                    HStack(spacing: 14) {
                        MetricCard(label: "Resources", value: "\(resources.count)", systemImage: "books.vertical.fill")
                        MetricCard(label: "Active Loan", value: "1", systemImage: "clock.arrow.trianglehead.counterclockwise.rotate.90")
                    }

                    HStack(spacing: 14) {
                        MetricCard(label: "Reservations", value: "1", systemImage: "bookmark.fill")
                        MetricCard(label: "Branch", value: "1", systemImage: "building.columns.fill")
                    }

                    SectionTitle(eyebrow: "Quick Access", title: "Tap into the demo flow")

                    VStack(spacing: 14) {
                        NavigationLink {
                            ResourceDetailView(resource: DemoData.resources[0])
                        } label: {
                            dashboardLinkCard(
                                title: "Open Loaned Book",
                                subtitle: "See the record for Ontology Design Principles",
                                icon: "book.closed.fill",
                                accent: AppPalette.blue
                            )
                        }

                        NavigationLink {
                            TransactionDetailView(
                                title: "Loan Transaction",
                                identifier: DemoData.activeLoan.id,
                                rows: [
                                    ("Resource", DemoData.activeLoan.resourceTitle),
                                    ("Member", DemoData.activeLoan.memberName),
                                    ("Processed By", DemoData.activeLoan.librarianName),
                                    ("Start Date", DemoData.activeLoan.startDate),
                                    ("Due Date", DemoData.activeLoan.dueDate)
                                ]
                            )
                        } label: {
                            dashboardLinkCard(
                                title: "Open Active Loan",
                                subtitle: "Preview the transaction details and due date",
                                icon: "arrow.left.arrow.right.circle.fill",
                                accent: AppPalette.gold
                            )
                        }
                    }

                    InfoCard(title: "Live Sample Story", subtitle: "Interactive presentation summary") {
                        VStack(alignment: .leading, spacing: 10) {
                            Text(selectedStory)
                                .font(.subheadline.weight(.medium))
                                .foregroundStyle(AppPalette.ink)

                            HStack {
                                Button {
                                    selectedStory = "Aylin Demir borrowed \"Ontology Design Principles\" and the loan was processed by Emre Kaya."
                                } label: {
                                    SecondaryActionButton(title: "Loan Story", systemImage: "clock.fill")
                                }

                                Button {
                                    selectedStory = "\"Introduction to Knowledge Graphs\" is available as an E-Book and can be reserved by a member."
                                } label: {
                                    SecondaryActionButton(title: "E-Book Story", systemImage: "ipad.and.iphone")
                                }
                            }
                        }
                    }

                    InfoCard(title: "Presentation Angle", subtitle: "What to say in one short explanation") {
                        VStack(alignment: .leading, spacing: 10) {
                            Text("This is a mobile prototype built on top of the Smart Library Loan Ontology. It shows how ontology entities can be presented inside a user interface.")
                            Text("The content is based on real sample individuals and relations from the repository, so it visually demonstrates the ontology instead of staying only in Protégé.")
                        }
                        .font(.subheadline)
                        .foregroundStyle(AppPalette.ink)
                    }
                }
                .padding(20)
            }
            .navigationTitle("Overview")
            .navigationBarTitleDisplayMode(.inline)
            .demoBackground()
        }
    }

    private var heroCard: some View {
        ZStack(alignment: .bottomLeading) {
            LinearGradient(
                colors: [AppPalette.navy, AppPalette.blue, AppPalette.gold.opacity(0.9)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )

            VStack(alignment: .leading, spacing: 14) {
                Text("Smart Library")
                    .font(.system(size: 32, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)

                Text("An iPhone-ready concept for your ontology project")
                    .font(.subheadline.weight(.medium))
                    .foregroundStyle(.white.opacity(0.88))

                HStack {
                    PrimaryActionButton(title: "Loan View", systemImage: "book.pages.fill")
                    SecondaryActionButton(title: "Ontology", systemImage: "point.3.connected.trianglepath.dotted")
                }
            }
            .padding(22)
        }
        .frame(maxWidth: .infinity, minHeight: 210, alignment: .leading)
        .clipShape(RoundedRectangle(cornerRadius: 30, style: .continuous))
        .shadow(color: AppPalette.navy.opacity(0.24), radius: 20, x: 0, y: 12)
    }

    private func dashboardLinkCard(title: String, subtitle: String, icon: String, accent: Color) -> some View {
        HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.title3.weight(.bold))
                .foregroundStyle(accent)
                .frame(width: 48, height: 48)
                .background(accent.opacity(0.12))
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(.headline)
                    .foregroundStyle(AppPalette.ink)
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundStyle(AppPalette.mutedInk)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.footnote.weight(.bold))
                .foregroundStyle(AppPalette.mutedInk)
        }
        .padding(18)
        .background(AppPalette.card)
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(AppPalette.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
    }
}
