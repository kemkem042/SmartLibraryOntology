import SwiftUI

struct ResourcesView: View {
    private let resources = DemoData.resources
    @State private var selectedActionMessage = ""
    @State private var showActionAlert = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    SectionTitle(eyebrow: "Catalog", title: "Library resources")

                    ForEach(resources) { resource in
                        VStack(alignment: .leading, spacing: 14) {
                            NavigationLink {
                                ResourceDetailView(resource: resource)
                            } label: {
                                HStack(alignment: .top, spacing: 14) {
                                    Image(systemName: resource.kind.icon)
                                        .font(.title3.weight(.semibold))
                                        .foregroundStyle(AppPalette.blue)
                                        .frame(width: 44, height: 44)
                                        .background(AppPalette.blue.opacity(0.12))
                                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

                                    VStack(alignment: .leading, spacing: 8) {
                                        Text(resource.title)
                                            .font(.headline)
                                            .foregroundStyle(AppPalette.ink)
                                        Text("\(resource.kind.rawValue) • \(resource.publisher)")
                                            .font(.subheadline)
                                            .foregroundStyle(AppPalette.mutedInk)
                                        StatusBadge(status: resource.status)
                                    }

                                    Spacer()

                                    Image(systemName: "chevron.right")
                                        .font(.footnote.weight(.bold))
                                        .foregroundStyle(AppPalette.mutedInk)
                                }
                            }

                            HStack {
                                Button {
                                    selectedActionMessage = "\(resource.title) record opened successfully."
                                    showActionAlert = true
                                } label: {
                                    PrimaryActionButton(title: "Open Record", systemImage: "arrow.up.forward.app.fill")
                                }

                                Button {
                                    selectedActionMessage = resource.status == .available
                                        ? "Demo action: a reservation request was created for \(resource.title)."
                                        : "Demo action: \(resource.title) is already on loan, so the app would place the user into a waitlist."
                                    showActionAlert = true
                                } label: {
                                    SecondaryActionButton(title: "Try Action", systemImage: "sparkles")
                                }
                            }
                        }
                        .padding(18)
                        .background(AppPalette.card)
                        .overlay(
                            RoundedRectangle(cornerRadius: 22, style: .continuous)
                                .stroke(AppPalette.line, lineWidth: 1)
                        )
                        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                        .shadow(color: .black.opacity(0.05), radius: 12, x: 0, y: 8)
                    }
                }
                .padding(20)
            }
            .navigationTitle("Resources")
            .demoBackground()
            .alert("Demo Action", isPresented: $showActionAlert) {
                Button("OK", role: .cancel) {}
            } message: {
                Text(selectedActionMessage)
            }
        }
    }
}

struct ResourceDetailView: View {
    let resource: LibraryResource
    @State private var showDemoAlert = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                InfoCard(title: resource.title, subtitle: resource.kind.rawValue) {
                    VStack(alignment: .leading, spacing: 12) {
                        StatusBadge(status: resource.status)
                        detailRow("Identifier", resource.id)
                        detailRow("Publication Year", resource.year)
                        detailRow("Publisher", resource.publisher)

                        if let author = resource.author {
                            detailRow("Author", author)
                        }

                        if let isbn = resource.isbn {
                            detailRow("ISBN", isbn)
                        }

                        if let branch = resource.branch {
                            detailRow("Located At", branch)
                        }

                        if let accessURL = resource.accessURL {
                            detailRow("Access URL", accessURL)
                        }
                    }
                }

                InfoCard(title: "Demo Actions", subtitle: "Made for presentation flow") {
                    HStack {
                        Button {
                            showDemoAlert = true
                        } label: {
                            PrimaryActionButton(title: "Borrow / Reserve", systemImage: "checkmark.circle.fill")
                        }

                        Button {
                            showDemoAlert = true
                        } label: {
                            SecondaryActionButton(title: "Share Record", systemImage: "square.and.arrow.up")
                        }
                    }
                }

                InfoCard(title: "Ontology Mapping") {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Class: \(resource.kind == .eBook ? "EBook" : "PrintedBook")")
                        Text("Object properties: publishedBy, hasStatus\(resource.branch == nil ? "" : ", locatedAt")")
                        Text("Data properties: title, isbn, publicationYear\(resource.accessURL == nil ? "" : ", accessUrl")")
                    }
                    .font(.subheadline)
                }
            }
            .padding(20)
        }
        .navigationTitle("Resource Detail")
        .navigationBarTitleDisplayMode(.inline)
        .demoBackground()
        .alert("Demo Completed", isPresented: $showDemoAlert) {
            Button("Close", role: .cancel) {}
        } message: {
            Text("This is a presentation prototype, so the button currently shows a mock workflow instead of changing a real database.")
        }
    }

    private func detailRow(_ title: String, _ value: String) -> some View {
        HStack {
            Text(title)
                .foregroundStyle(AppPalette.mutedInk)
            Spacer()
            Text(value)
                .foregroundStyle(AppPalette.ink)
                .multilineTextAlignment(.trailing)
        }
        .font(.subheadline)
    }
}
