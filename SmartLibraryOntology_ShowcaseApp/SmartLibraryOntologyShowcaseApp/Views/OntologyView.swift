import SwiftUI

struct OntologyView: View {
    @State private var selectedQuestion = "Tap any question below to show a sample answer."

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    InfoCard(title: "Ontology Snapshot", subtitle: "Quick structure for presentation") {
                        VStack(alignment: .leading, spacing: 10) {
                            Text("Top idea: a smart library domain modeled with OWL/RDF.")
                            Text("Main concepts: people, resources, organizations, transactions, and statuses.")
                        }
                        .font(.subheadline)
                    }

                    ForEach(DemoData.ontologyGroups) { group in
                        InfoCard(title: group.title) {
                            LazyVGrid(columns: [GridItem(.adaptive(minimum: 130), spacing: 10)], spacing: 10) {
                                ForEach(group.items, id: \.self) { item in
                                    Text(item)
                                        .font(.subheadline.weight(.medium))
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 12)
                                        .frame(maxWidth: .infinity)
                                        .background(Color(red: 0.12, green: 0.34, blue: 0.54).opacity(0.08))
                                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                                }
                            }
                        }
                    }

                    InfoCard(title: "Competency Questions", subtitle: "Tap to simulate query results") {
                        VStack(alignment: .leading, spacing: 12) {
                            ForEach(DemoData.questions) { question in
                                Button {
                                    selectedQuestion = sampleAnswer(for: question.code)
                                } label: {
                                    HStack(alignment: .top) {
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text(question.code)
                                                .font(.caption.weight(.bold))
                                                .foregroundStyle(AppPalette.blue)
                                            Text(question.text)
                                                .font(.subheadline)
                                                .foregroundStyle(AppPalette.ink)
                                        }
                                        Spacer()
                                        Image(systemName: "play.circle.fill")
                                            .foregroundStyle(AppPalette.blue)
                                    }
                                }
                                .buttonStyle(.plain)
                                .padding(14)
                                .background(AppPalette.blue.opacity(0.06))
                                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                            }
                        }
                    }

                    InfoCard(title: "Sample Answer Output") {
                        Text(selectedQuestion)
                            .font(.subheadline.weight(.medium))
                            .foregroundStyle(AppPalette.ink)
                    }
                }
                .padding(20)
            }
            .navigationTitle("Ontology")
            .demoBackground()
        }
    }

    private func sampleAnswer(for code: String) -> String {
        switch code {
        case "CQ-01":
            return "Available resource: Introduction to Knowledge Graphs."
        case "CQ-03":
            return "Member Aylin Demir borrowed Ontology Design Principles."
        case "CQ-05":
            return "Librarian Emre Kaya processed both the loan and reservation examples."
        case "CQ-10":
            return "The due date of Loan_001 is 2026-05-04."
        default:
            return "No sample result prepared."
        }
    }
}
