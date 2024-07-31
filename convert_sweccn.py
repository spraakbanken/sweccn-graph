
import re
import json
from pathlib import Path

ccn_file = Path("konstruktikon-2024-05-13.json")
roles_file = Path("konstruktikon-roller-2024-05-13.json")
types_file = Path("konstruktikon-typer-2024-05-13.json")

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

def convert_ccn():
    with open(ccn_file) as file:
        ccns = json.load(file)
    # with open(roles_file) as file:
    #     roles = json.load(file)
    with open(types_file) as file:
        types = json.load(file)

    nodes: dict[str, dict[str, str]] = {}
    edges: list[dict[str, str]] = []

    nodesets = {
        'cxn': ccns,
        # 'role': roles,
        'type': types,
    }

    for type, data in nodesets.items():
        for elem in data['hits']:
            elem = elem['entry']
            id = elem['constructionID']
            if id in SKIP_IDS:
                continue
            assert id not in nodes, (elem, nodes[id])
            title: list[str] = []
            if (struct := elem.get('structure')):
                assert len(struct) == 1
                struct = struct[0]
                struct = re.sub(r"\.\.\d+", "", struct)  # saldo sense identifiers
                struct = re.sub(r",,[^\s|\]]+", "", struct)  # superscripts
                struct = re.sub(r"_[^\s\]\/]+", "", struct)  # subscripts
                title.append(struct)
            if (ill := elem.get('illustration')):
                title.append('"' + ill + '"')
            if (defn := elem.get('definition')):
                title.append(defn['text'])
            nodes[id] = {
                'id': id,
                'name': id.replace("_", " "),
                'type': type,
                'title': "\n\n".join(title),
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
                        'from': other,
                        'to': id,
                    })
                    if id == "funktion.evaluering":
                        import sys
                        print(edges[-1], file=sys.stderr)
                        print(nodes[id], file=sys.stderr)

    # Add nodes for undefined elements (including all frames)
    for edge in edges:
        rel = edge['rel']
        for id, other in [(edge['from'], edge['to']), (edge['to'], edge['from'])]:
            if id not in nodes:
                type = RELTYPES.get(rel, nodes[other]['type'])
                type = UNKNOWN_TYPES[type]
                nodes[id] = {
                    'id': id,
                    'name': id.replace("_", " "),
                    'type': type,
                    'title': "",
                }

    print("var ccNodes = [")
    for node in nodes.values():
        print("    " + json.dumps(node) + ",")
    print("];")
    print("var ccEdges = [")
    for edge in edges:
        print("    " + json.dumps(edge) + ",")
    print("];")


if __name__ == '__main__':
    convert_ccn()

