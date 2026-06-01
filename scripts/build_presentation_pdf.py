from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


def build_pdf(preview_dir: Path, output_pdf: Path) -> None:
    slides = sorted(preview_dir.glob("slide-*.png"))
    if not slides:
        raise SystemExit(f"No slide previews found in {preview_dir}")

    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    first_slide = Image.open(slides[0])
    page_width, page_height = first_slide.size
    first_slide.close()

    pdf = canvas.Canvas(str(output_pdf), pagesize=(page_width, page_height))
    for slide_path in slides:
        with Image.open(slide_path) as img:
            reader = ImageReader(img.convert("RGB"))
            pdf.drawImage(reader, 0, 0, width=page_width, height=page_height)
        pdf.showPage()
    pdf.save()


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a PDF from slide preview PNG files.")
    parser.add_argument("preview_dir", type=Path, help="Directory containing slide-XX.png files")
    parser.add_argument("output_pdf", type=Path, help="Target PDF path")
    args = parser.parse_args()
    build_pdf(args.preview_dir, args.output_pdf)


if __name__ == "__main__":
    main()
