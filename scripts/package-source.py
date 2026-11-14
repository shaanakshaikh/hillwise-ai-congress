"""Create a portable source ZIP without hosting identity or temporary files."""

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT_FILES = (
    "README.md", "CONTRIBUTING.md", "ATTRIBUTION.md", "LICENSE",
    ".gitignore", "vercel.json", "package.json", "package-lock.json",
)
SOURCE_DIRS = ("dist", "scripts", "examples", ".github")
EXCLUDED_PARTS = {
    ".git", ".openai", ".vercel", "node_modules", "__pycache__",
    ".pytest_cache", "test-results", "playwright-report",
}


def main():
    root = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output", type=Path, default=root / "dist" / "hillwise-source.zip",
        help="ZIP destination (default: dist/hillwise-source.zip)",
    )
    parser.add_argument(
        "--prefix", default="hillwise-ai-congress",
        help="Top-level folder in the archive (default: hillwise-ai-congress)",
    )
    args = parser.parse_args()
    if not args.prefix or args.prefix in {".", ".."} or any(
        char in args.prefix for char in "/\\"
    ):
        parser.error("--prefix must be a single folder name")

    target = args.output.expanduser().resolve()
    candidates = {root / name for name in ROOT_FILES}
    candidates.update((root / "research").glob("*.md"))
    for name in SOURCE_DIRS:
        candidates.update((root / name).rglob("*"))

    files = []
    for file in sorted(candidates):
        relative = file.relative_to(root)
        if not file.is_file() or file.is_symlink() or file.resolve() == target:
            continue
        if any(part in EXCLUDED_PARTS for part in relative.parts):
            continue
        if file.suffix in {".zip", ".pyc"} or file.name == ".DS_Store":
            continue
        if file.name.startswith(".env") or file.name.startswith("qa-"):
            continue
        files.append(file)

    target.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(target, "w", ZIP_DEFLATED) as archive:
        for file in files:
            archive.write(file, Path(args.prefix) / file.relative_to(root))
    print(f"Created {target}: {len(files)} files, {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
