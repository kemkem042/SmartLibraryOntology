# LLM Integration - Phase 2

## Objective
The role of the LLM in the Smart Library project is not to replace the ontology or the knowledge graph. Instead, it acts as a natural-language interface layer on top of verified semantic data. The objective is to let a user ask a question in natural language and receive an answer that is grounded in ontology-backed SPARQL results.

## Proposed Workflow

1. The user asks a natural-language question.
   Example: "Which available resources are related to knowledge graphs?"

2. The system interprets the question by using ontology vocabulary and competency-question patterns.

3. The LLM maps the request to a SPARQL query template.

4. The query is executed against the knowledge graph.

5. The graph result is returned to the LLM as structured evidence.

6. The LLM generates a concise natural-language answer strictly grounded in the returned triples.

## Why This Integration Is Useful
This approach improves usability because non-technical users do not need to write SPARQL manually. It also improves explainability because answers are linked to explicit ontology entities, properties, and retrieved graph results.

## Hallucination Mitigation Strategy
The project uses a knowledge-grounded answering approach. The LLM should not answer freely from background knowledge alone. Instead, it must:

- use ontology-aware prompting,
- rely on retrieved SPARQL output,
- avoid claims not supported by the graph,
- report when no matching graph evidence exists.

## Example Prompting Logic
The semantic layer defines the allowed concepts: `LibraryResource`, `Loan`, `Reservation`, `Topic`, `MemberProfile`, and related properties. The prompt can instruct the LLM to only use these terms and to generate queries using the project namespace `slo`.

## Current Project Status
The present submission documents the LLM integration architecture and prepares the ontology for this workflow, but it does not yet include a production-grade deployed chat interface. The semantic foundation, competency questions, query layer, and provenance-aware data structures are already in place for future implementation.
