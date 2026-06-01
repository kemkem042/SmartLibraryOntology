from __future__ import annotations

import csv
import textwrap
from pathlib import Path

from pyshacl import validate
from rdflib import Graph
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
ONTOLOGY = ROOT / "ontology/smart-library.ttl"
SHAPES = ROOT / "shapes/smart-library.shacl.ttl"


QUERIES = {
    "available_resources": """
        PREFIX slo: <https://example.org/smart-library-ontology#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?title WHERE {
          ?resource a/rdfs:subClassOf* slo:LibraryResource ;
                    slo:title ?title ;
                    slo:hasStatus slo:Available .
        }
    """,
    "resource_topics": """
        PREFIX slo: <https://example.org/smart-library-ontology#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?title ?topicName WHERE {
          ?resource a/rdfs:subClassOf* slo:LibraryResource ;
                    slo:title ?title ;
                    slo:hasTopic ?topic .
          ?topic slo:name ?topicName .
        }
        ORDER BY ?title ?topicName
    """,
    "provenance_sources": """
        PREFIX slo: <https://example.org/smart-library-ontology#>
        SELECT ?title ?sourceName WHERE {
          ?resource slo:title ?title ;
                    slo:describedBy ?record .
          ?record slo:retrievedFromSource ?source .
          ?source slo:name ?sourceName .
        }
        ORDER BY ?title ?sourceName
    """,
    "recommendations": """
        PREFIX slo: <https://example.org/smart-library-ontology#>
        SELECT ?memberName ?title ?score WHERE {
          ?recommendation a slo:Recommendation ;
                          slo:recommendedFor ?member ;
                          slo:recommendedResource ?resource ;
                          slo:profileScore ?score .
          ?member slo:name ?memberName .
          ?resource slo:title ?title .
        }
        ORDER BY DESC(?score)
    """,
    "status_counts": """
        PREFIX slo: <https://example.org/smart-library-ontology#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?statusName (COUNT(?resource) AS ?resourceCount) WHERE {
          ?resource a/rdfs:subClassOf* slo:LibraryResource ;
                    slo:hasStatus ?status .
          ?status slo:name ?statusName .
        }
        GROUP BY ?statusName
        ORDER BY DESC(?resourceCount)
    """,
}


def ensure_dirs() -> tuple[Path, Path]:
    sparql_dir = ROOT / "results/sparql"
    validation_dir = ROOT / "results/validation"
    sparql_dir.mkdir(parents=True, exist_ok=True)
    validation_dir.mkdir(parents=True, exist_ok=True)
    return sparql_dir, validation_dir


def run_queries(graph: Graph, out_dir: Path) -> None:
    summary_lines = ["# SPARQL Result Summary", ""]

    for name, query in QUERIES.items():
        rows = list(graph.query(query))
        headers = [str(v) for v in rows[0].labels.keys()] if rows else []
        if not headers:
            parsed = graph.query(query)
            headers = [str(v) for v in parsed.vars]
            rows = list(parsed)

        csv_path = out_dir / f"{name}.csv"
        with csv_path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.writer(handle)
            writer.writerow(headers)
            for row in rows:
                writer.writerow([str(cell) for cell in row])

        summary_lines.append(f"## {name}")
        summary_lines.append(f"- Rows returned: {len(rows)}")
        if rows:
            summary_lines.append(f"- Example row: {', '.join(str(c) for c in rows[0])}")
        summary_lines.append("")

    (out_dir / "query-results-summary.md").write_text("\n".join(summary_lines), encoding="utf-8")


def run_validation(data_graph: Graph, validation_dir: Path) -> None:
    conforms, report_graph, report_text = validate(
        data_graph=data_graph,
        shacl_graph=str(SHAPES),
        inference="rdfs",
        abort_on_first=False,
        meta_shacl=False,
        debug=False,
    )

    (validation_dir / "shacl-validation-report.txt").write_text(
        f"Conforms: {conforms}\n\n{report_text}",
        encoding="utf-8",
    )
    report_graph.serialize(
        destination=validation_dir / "shacl-validation-report.ttl",
        format="turtle",
    )


def markdown_to_simple_pdf(markdown_path: Path, pdf_path: Path, title: str) -> None:
    styles = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=15,
        spaceAfter=8,
    )
    heading1 = ParagraphStyle(
        "H1",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#13395e"),
        spaceAfter=12,
    )
    heading2 = ParagraphStyle(
        "H2",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=colors.HexColor("#13395e"),
        spaceBefore=10,
        spaceAfter=8,
    )
    heading3 = ParagraphStyle(
        "H3",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor("#204e7d"),
        spaceBefore=8,
        spaceAfter=6,
    )

    story = [Paragraph(title, heading1), Spacer(1, 0.2 * cm)]
    lines = markdown_path.read_text(encoding="utf-8").splitlines()

    for raw in lines:
        line = raw.strip()
        if not line:
            continue
        safe = (
            line.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        )
        if line.startswith("# "):
            story.append(Paragraph(safe[2:], heading1))
        elif line.startswith("## "):
            story.append(Paragraph(safe[3:], heading2))
        elif line.startswith("### "):
            story.append(Paragraph(safe[4:], heading3))
        elif line.startswith("- "):
            story.append(Paragraph(f"• {safe[2:]}", body))
        elif line.startswith("|"):
            story.append(Paragraph(safe, body))
        else:
            wrapped = "<br/>".join(textwrap.wrap(safe, 110))
            story.append(Paragraph(wrapped, body))

    pdf = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.5 * cm,
    )
    pdf.build(story)


def main() -> None:
    sparql_dir, validation_dir = ensure_dirs()
    graph = Graph()
    graph.parse(ONTOLOGY, format="turtle")
    run_queries(graph, sparql_dir)
    run_validation(graph, validation_dir)

    report_md = ROOT / "docs/reports/project-report-v2.md"
    spec_md = ROOT / "docs/specification-v2.md"
    report_pdf = ROOT / "docs/reports/SmartLibraryOntology_Project_Report_v2.pdf"
    spec_pdf = ROOT / "docs/Ontology_Requirements_Specification_v2.pdf"
    markdown_to_simple_pdf(report_md, report_pdf, "Smart Library Ontology Project Report v2")
    markdown_to_simple_pdf(spec_md, spec_pdf, "Smart Library Ontology Specification v2")

    submission = ROOT / "submission"
    submission.mkdir(exist_ok=True)
    (submission / "SmartLibraryOntology_Project_Report_v2.pdf").write_bytes(report_pdf.read_bytes())
    (submission / "Ontology_Requirements_Specification_v2.pdf").write_bytes(spec_pdf.read_bytes())


if __name__ == "__main__":
    main()
