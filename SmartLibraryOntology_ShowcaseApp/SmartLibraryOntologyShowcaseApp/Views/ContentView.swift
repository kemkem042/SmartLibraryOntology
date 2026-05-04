import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "rectangle.grid.2x2.fill")
                }

            ResourcesView()
                .tabItem {
                    Label("Resources", systemImage: "books.vertical.fill")
                }

            TransactionsView()
                .tabItem {
                    Label("Transactions", systemImage: "arrow.left.arrow.right.circle.fill")
                }

            OntologyView()
                .tabItem {
                    Label("Ontology", systemImage: "point.3.connected.trianglepath.dotted")
                }
        }
        .tint(Color(red: 0.12, green: 0.34, blue: 0.54))
    }
}
