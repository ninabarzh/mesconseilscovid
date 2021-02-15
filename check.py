#!/usr/bin/env python3
import json
import time
from html.parser import HTMLParser
from http import HTTPStatus
from pathlib import Path

import httpx
from minicli import cli, run

from build import each_folder_from, each_file_from

HERE = Path(__file__).parent
SRC_DIR = HERE / "src"
DIAGRAMMES_DIR = HERE / "diagrammes"
CONTENUS_DIR = HERE / "contenus"


class LinkExtractor(HTMLParser):
    def reset(self):
        HTMLParser.reset(self)
        self.links = set()

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            attrs = dict(attrs)
            url = attrs["href"]
            if url.startswith("http"):
                if url.startswith(
                    (
                        "https://www.facebook.com/",
                        "https://twitter.com/",
                        "https://github.com/",
                    )
                ):
                    return
                self.links.add(url)


@cli
def links(timeout: int = 10, delay: float = 0.1):
    parser = LinkExtractor()
    content = (SRC_DIR / "index.html").read_text()
    parser.feed(content)
    for link in sorted(parser.links):
        print(link)
        with httpx.stream(
            "GET",
            link,
            timeout=timeout,
            verify=False,  # ignore SSL certificate validation errors
        ) as response:
            if response.status_code == HTTPStatus.TOO_MANY_REQUESTS:
                print("Warning: we’re being throttled, skipping link (429)")
                continue
            if response.status_code != HTTPStatus.OK:
                raise Exception(f"{link} is broken! ({response.status_code})")
        time.sleep(delay)  # avoid being throttled


@cli
def versions():
    content = open(HERE / "static" / "version.json").read()
    data = json.loads(content)
    version = data["version"]
    line_prefix = "const CACHE_NAME = "
    for line in open(SRC_DIR / "service-worker.js"):
        if line.startswith(line_prefix):
            break
    if version not in line:
        raise Exception(
            f"Version mismatch between version.json ({version}) and service-worker.js"
        )


@cli
def orphelins():
    template = (SRC_DIR / "template.html").read_text()
    for folder in each_folder_from(CONTENUS_DIR, exclude=["nouveaux_contenus"]):
        for file_path, filename in each_file_from(
            folder, pattern="*.md", exclude=["README.md"]
        ):
            if filename.startswith("meta_") or filename.startswith("config_"):
                continue
            if filename[: -len(".md")] not in template:
                raise Exception(f"Reference missing for {filename}")


@cli
def diagrammes():
    matrice_content = (DIAGRAMMES_DIR / "matrice-statuts-conseils.md").read_text()
    matrice_statuts = {
        line.strip()
        for line in matrice_content.split("\n")
        if line.strip().startswith("statut_")
    }
    matrice_conseils = {
        line.strip()
        for line in matrice_content.split("\n")
        if line.strip().startswith("conseils_")
    }
    statuts_filenames = {
        filename
        for file_path, filename in each_file_from(
            CONTENUS_DIR / "statuts", pattern="*.md", exclude=["README.md"]
        )
    }
    conseils_filenames = {
        filename
        for file_path, filename in each_file_from(
            CONTENUS_DIR / "conseils",
            pattern="conseils_personnels_*.md",
            exclude=["README.md"],
        )
    }
    if matrice_statuts - statuts_filenames:
        raise Exception(
            f"Statut file(s) missing for: {matrice_statuts - statuts_filenames}"
        )

    if matrice_conseils - conseils_filenames:
        raise Exception(
            f"Conseils file(s) missing for: {matrice_conseils - conseils_filenames}"
        )

    if statuts_filenames - matrice_statuts:
        raise Exception(
            f"Non-existent statut from matrice: {statuts_filenames - matrice_statuts}"
        )

    if conseils_filenames - matrice_conseils:
        raise Exception(
            f"Non-existent conseils personnels from matrice: {conseils_filenames - matrice_conseils}"
        )


if __name__ == "__main__":
    run()
