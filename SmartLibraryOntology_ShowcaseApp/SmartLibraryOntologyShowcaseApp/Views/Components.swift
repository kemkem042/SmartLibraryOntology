import SwiftUI

enum AppPalette {
    static let ink = Color(red: 0.08, green: 0.12, blue: 0.18)
    static let mutedInk = Color(red: 0.31, green: 0.37, blue: 0.45)
    static let navy = Color(red: 0.10, green: 0.22, blue: 0.35)
    static let blue = Color(red: 0.16, green: 0.39, blue: 0.63)
    static let gold = Color(red: 0.86, green: 0.67, blue: 0.26)
    static let card = Color.white.opacity(0.97)
    static let line = Color.black.opacity(0.08)
}

struct StatusBadge: View {
    let status: ResourceStatus

    var body: some View {
        Text(status.rawValue)
            .font(.caption.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(status.color)
            .clipShape(Capsule())
    }
}

struct InfoCard<Content: View>: View {
    let title: String
    let subtitle: String?
    @ViewBuilder let content: Content

    init(title: String, subtitle: String? = nil, @ViewBuilder content: () -> Content) {
        self.title = title
        self.subtitle = subtitle
        self.content = content()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .foregroundStyle(AppPalette.ink)
                if let subtitle {
                    Text(subtitle)
                        .font(.subheadline)
                        .foregroundStyle(AppPalette.mutedInk)
                }
            }

            content
                .foregroundStyle(AppPalette.ink)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(AppPalette.card)
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(AppPalette.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
        .shadow(color: .black.opacity(0.07), radius: 18, x: 0, y: 10)
    }
}

struct MetricCard: View {
    let label: String
    let value: String
    let systemImage: String

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: systemImage)
                .font(.title3.weight(.semibold))
                .foregroundStyle(.white)
                .frame(width: 42, height: 42)
                .background(Color.white.opacity(0.18))
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

            Text(value)
                .font(.title2.bold())
                .foregroundStyle(.white)

            Text(label)
                .font(.subheadline)
                .foregroundStyle(.white.opacity(0.82))
        }
        .padding(16)
        .frame(maxWidth: .infinity, minHeight: 120, alignment: .leading)
        .background(
            LinearGradient(
                colors: [AppPalette.navy, AppPalette.blue],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: AppPalette.navy.opacity(0.18), radius: 12, x: 0, y: 8)
    }
}

struct PrimaryActionButton: View {
    let title: String
    let systemImage: String

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: systemImage)
            Text(title)
        }
        .font(.subheadline.weight(.semibold))
        .foregroundStyle(.white)
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(AppPalette.navy)
        .clipShape(Capsule())
    }
}

struct SecondaryActionButton: View {
    let title: String
    let systemImage: String

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: systemImage)
            Text(title)
        }
        .font(.subheadline.weight(.semibold))
        .foregroundStyle(AppPalette.navy)
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(AppPalette.navy.opacity(0.08))
        .clipShape(Capsule())
    }
}

struct SectionTitle: View {
    let eyebrow: String
    let title: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(eyebrow.uppercased())
                .font(.caption.weight(.bold))
                .foregroundStyle(AppPalette.blue)
            Text(title)
                .font(.title3.bold())
                .foregroundStyle(AppPalette.ink)
        }
    }
}

struct DemoBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(
                LinearGradient(
                    colors: [
                        Color(red: 0.94, green: 0.96, blue: 0.99),
                        Color(red: 0.91, green: 0.94, blue: 0.98),
                        Color(red: 0.97, green: 0.95, blue: 0.91)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()
            )
    }
}

extension View {
    func demoBackground() -> some View {
        modifier(DemoBackground())
    }
}
