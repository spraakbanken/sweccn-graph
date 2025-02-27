
import sys
import re
import json

RELATIONS = {
    'inheritance': 'SubtypeOf',
    'types': 'TypeAssociation',
    'category': 'CategoryAssociation',
    'framenet': 'FrameAssociation',
}

RELTYPES = {
    'TypeAssociation': 'type',
    'CategoryAssociation': 'category',
    'FrameAssociation': 'frame',
}

UNKNOWN_TYPES = {
    'cxn': 'cxn_unknown',
    'type': 'type_unknown',
    'category': 'category_unknown',
    'frame': 'frame',
}

SKIP_IDS = {'konstruktion', 'Role', 'typ', ''}
# GENERIC_TYPES = {'grammatik', 'semantik', 'övrigt'}


def convert_structure(struct: str) -> str:
    struct = re.sub(r"  +", r" ", struct)           # "   " --> " "
    struct = re.sub(r"(\(|\[|\{) ", r"\1", struct)  # "[ " --> "["
    struct = re.sub(r" (\)|\]|\})", r"\1", struct)  # " ]" --> "]"
    struct = re.sub(r"\.\.(\d+)", r"<sup>\1</sup>", struct)  # saldo sense identifiers
    struct = re.sub(r"\{(.+?)\}", r"<sub>\1</sub>", struct)  # subscripts
    return struct


def convert_ccn(cxn_file: str, types_file: str):
    with open(cxn_file) as file:
        cxns = json.load(file)
    with open(types_file) as file:
        types = json.load(file)

    nodes: dict[str, dict[str, str]] = {}
    edges: list[dict[str, str]] = []

    nodesets = {
        'cxn': cxns,
        'type': types,
    }

    for type, data in nodesets.items():
        for elem in data['hits']:
            elem = elem['entry']
            id = elem['constructionID']
            if id in SKIP_IDS:
                continue
            assert id not in nodes, (elem, nodes[id])
            info: list[str] = []
            if (structs := elem.get('structure')):
                for struct in structs:
                    info.append(convert_structure(struct))
            if (ill := elem.get('illustration')):
                info.append(f'"<em>{ill.strip()}</em>"')
            if (text := elem.get('definition', {}).get('text')):
                info.append(text)
            nodes[id] = {
                'id': id,
                'name': id.replace("_", " "),
                'type': type,
                'info': "<br/>".join(info),
            }
            for rel in RELATIONS:
                if rel not in elem:
                    continue
                others = elem[rel]
                if isinstance(others, str):
                    others = [others]
                for other in others:
                    if other in SKIP_IDS:
                        continue
                    edges.append({
                        'rel': RELATIONS[rel],
                        'start': other,
                        'end': id,
                    })

    # Add nodes for undefined elements (including all frames)
    for edge in edges:
        rel = edge['rel']
        for id, other in [(edge['start'], edge['end']), (edge['end'], edge['start'])]:
            if id not in nodes:
                type = RELTYPES.get(rel, nodes[other]['type'])
                type = UNKNOWN_TYPES[type]
                nodes[id] = {
                    'id': id,
                    'name': id.replace("_", " "),
                    'type': type,
                    'info': "",
                }

    print("var DATA = {};")
    # print(f"DATA.version = {version};")
    print(f"DATA.nodes = [")
    for node in sorted(nodes.values(), key=lambda n: n['id']):
        print("    " + json.dumps(node) + ",")
    print("];")
    print(f"DATA.edges = [")
    for edge in sorted(edges, key=lambda e: tuple(e.values())):
        print("    " + json.dumps(edge) + ",")
    print("];")


if __name__ == '__main__':
    convert_ccn(*sys.argv[1:])
