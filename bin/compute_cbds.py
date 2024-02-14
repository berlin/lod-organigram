import argparse
import json
from pathlib import Path
from rdflib import Graph, BNode
from rdflib.namespace import split_uri

parser = argparse.ArgumentParser(
    description="Compute the concise bounded description for each subject in the input file.")
parser.add_argument('--source',
                    default=Path('data/temp/all.nt'),
                    type=Path,
                    help="Path to the input file. Default is `data/temp/all.nt`.")
parser.add_argument('--output',
                    help="Path to the folder for the output files",
                    type=Path,
                    default=Path('_includes/cbds')
                    )
parser.add_argument('--base',
                    help="Base URI of the resources to be considered.",
                    default="")
args = parser.parse_args()
all = Graph()
all.parse(args.source)

cbds = {}

for subject in all.subjects():
    try:
        namespace = str(subject)
        if subject == args.base:
            namespace = split_uri(subject)[0]
        if args.base in namespace:
            cbd = all.cbd(subject)
            name = subject.removeprefix(args.base)
            name = name.replace("/", "_")
            name = f"_{name}"
            cbd_dict = json.loads(cbd.serialize(format="json-ld"))
            out_path = args.output / name
            outpath = f"{out_path}.json"
            with open(outpath, 'w') as cbd_file:
                json.dump(cbd_dict, cbd_file, indent=2)
    except ValueError:
        next




