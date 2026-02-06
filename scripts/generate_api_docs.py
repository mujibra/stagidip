#!/usr/bin/env python3
from pathlib import Path
import re, json
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]
API = ROOT / 'app/api'
PRISMA = ROOT / 'prisma/schema.prisma'
OUT = ROOT / 'docs/api/generated'
OUT.mkdir(parents=True, exist_ok=True)

schema = PRISMA.read_text(encoding='utf-8', errors='ignore')
model_fields = {}
for mm in re.finditer(r'(?ms)^model\s+(\w+)\s*\{(.*?)^\}', schema):
    model = mm.group(1)
    body = mm.group(2)
    fields = {}
    for ln in body.splitlines():
        s = ln.strip()
        if not s or s.startswith('//'):
            continue
        m = re.match(r'(\w+)\s+([A-Za-z][A-Za-z0-9_]*\??)', s)
        if m:
            fields[m.group(1)] = m.group(2).rstrip('?')
    model_fields[model] = fields

field_type_index = {}
for _, fields in model_fields.items():
    for k, v in fields.items():
        field_type_index.setdefault(k, v)


def sample_from_type(name: str, typ: str = 'String'):
    lname = name.lower(); t = typ.lower()
    if 'int' in t or 'bigint' in t:
        if 'id' in lname: return 1
        if 'no_' in lname: return 1001
        return 1
    if 'float' in t or 'decimal' in t: return 1.5
    if 'boolean' in t: return True
    if 'datetime' in t: return '2026-01-01T00:00:00.000Z'
    if 'date' in t: return '2026-01-01'
    if 'email' in lname: return 'qa@example.com'
    if 'password' in lname: return 'Secret123!'
    if 'phone' in lname or 'contact_no' in lname: return '081234567890'
    if lname.startswith('sn') or '_sn' in lname: return 'SN-0001'
    if 'status' in lname: return 'ACTIVE'
    if 'token' in lname: return 'jwt_token_here'
    if 'address' in lname: return 'Jl. Example No. 1'
    if 'name' in lname: return 'Sample Name'
    if lname.startswith('id') or '_id' in lname: return 1
    return 'sample'


def guess_type(name: str):
    n = name.lower()
    if n.startswith('id') or n.endswith('id') or '_id' in n: return 'Int'
    if n.startswith('is_') or n.startswith('has_'): return 'Boolean'
    if 'date' in n or 'tanggal' in n or n.startswith('tgl'): return 'DateTime'
    if 'no_' in n: return 'Int'
    return 'String'


def extract_functions(ts: str):
    out = []
    for m in re.finditer(r'export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)\s*\(', ts):
        method = m.group(1)
        start = ts.find('{', m.end())
        if start < 0: continue
        i = start; depth = 0
        while i < len(ts):
            c = ts[i]
            if c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    out.append((method, ts[start+1:i]))
                    break
            i += 1
    return out


def extract_body_keys(block: str):
    keys = set()
    vars = set(re.findall(r'const\s+(\w+)\s*=\s*await\s*(?:parseBody(?:<[^>]+>)?|\w+\.json)\s*\(', block))
    vars.add('body')
    for v in vars:
        keys.update(re.findall(rf'\b{re.escape(v)}\.([A-Za-z_][A-Za-z0-9_]*)\b', block))
    return sorted(keys)


entries = []
for p in sorted(API.rglob('route.ts')):
    rel = p.relative_to(API)
    route = '/' + '/'.join(seg for seg in rel.parts[:-1] if not (seg.startswith('(') and seg.endswith(')')))
    txt = p.read_text(encoding='utf-8', errors='ignore')
    path_params = re.findall(r'\[([^\]]+)\]', route)
    for method, block in extract_functions(txt):
        query = sorted(set(re.findall(r'searchParams\.get\(["\']([^"\']+)["\']\)', block)))
        needs_body = bool(re.search(r'await\s*(?:parseBody(?:<[^>]+>)?|\w+\.json)\s*\(', block))
        body_keys = extract_body_keys(block)
        req = {}
        if needs_body:
            for k in body_keys:
                req[k] = sample_from_type(k, field_type_index.get(k, guess_type(k)))
            if not req:
                req = {'id': 1}
        prisma_models = sorted(set(re.findall(r'prisma\.([A-Za-z_][A-Za-z0-9_]*)\.', block)))
        data = {}
        if prisma_models and prisma_models[0] in model_fields:
            for fk, ft in list(model_fields[prisma_models[0]].items())[:6]:
                data[fk] = sample_from_type(fk, ft)
        if not data and req:
            data = dict(list(req.items())[:6])
        entries.append({
            'path': route,
            'method': method,
            'path_params': path_params,
            'query_params': query,
            'needs_body': needs_body,
            'request_example': req,
            'response_example': {'success': True, 'message': 'Request processed successfully', **({'data': data} if data else {})},
            'file': str(p.relative_to(ROOT)),
        })

entries.sort(key=lambda e: (e['path'], e['method']))

# inventory
by = defaultdict(list)
for e in entries:
    key = e['path'].strip('/').split('/')[0] if e['path'].strip('/') else '(root)'
    by[key].append(e)

inv = [
    '# StagiDIP API Endpoint Inventory (Generated)',
    '',
    f'- Total endpoint-method entries: **{len(entries)}**',
    '- Base prefix: `/api`',
    '',
    '| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |',
    '|---|---|---|---|---|---|---|',
]
for g in sorted(by):
    inv.append(f'| `-` | `# Group: {g}` | `-` | `-` | `-` | `-` | `-` |')
    for e in by[g]:
        req = f"`{json.dumps(e['request_example'], ensure_ascii=False)}`" if e['needs_body'] else '-'
        resp = f"`{json.dumps(e['response_example'], ensure_ascii=False)}`"
        inv.append(
            f"| `{e['method']}` | `{e['path']}` | `{', '.join(e['path_params']) if e['path_params'] else '-'}` | `{', '.join(e['query_params']) if e['query_params'] else '-'}` | {req} | {resp} | `{e['file']}` |"
        )

(OUT / 'endpoints-inventory.md').write_text('\n'.join(inv) + '\n', encoding='utf-8')

# response examples
rx = ['# StagiDIP API Response Examples (Generated)', '']
for e in entries:
    rx += [f"## `{e['method']} {e['path']}`", f"Source: `{e['file']}`", '']
    if e['needs_body']:
        rx += ['### Request body', '```json', json.dumps(e['request_example'], indent=2, ensure_ascii=False), '```', '']
    rx += ['### 200', '```json', json.dumps(e['response_example'], indent=2, ensure_ascii=False), '```', '']

(OUT / 'response-examples.md').write_text('\n'.join(rx), encoding='utf-8')

# openapi yaml-ish
spec = {
    'openapi': '3.0.3',
    'info': {'title': 'StagiDIP API (Generated)', 'version': '1.0.0'},
    'servers': [{'url': '/api'}],
    'paths': {}
}
for e in entries:
    opath = re.sub(r'\[([^\]]+)\]', r'{\1}', e['path'])
    spec['paths'].setdefault(opath, {})
    params = ([{'name': p, 'in': 'path', 'required': True, 'schema': {'type': 'string'}} for p in e['path_params']] +
              [{'name': q, 'in': 'query', 'required': False, 'schema': {'type': 'string'}} for q in e['query_params']])
    op = {
        'summary': f"{e['method']} {e['path']}",
        'description': f"Source: `{e['file']}`",
        'responses': {
            '200': {'description': 'Success', 'content': {'application/json': {'example': e['response_example']}}}
        }
    }
    if params: op['parameters'] = params
    if e['needs_body'] and e['method'] in {'POST', 'PUT', 'PATCH', 'DELETE'}:
        op['requestBody'] = {
            'required': False,
            'content': {'application/json': {'schema': {'type': 'object'}, 'example': e['request_example']}}
        }
    spec['paths'][opath][e['method'].lower()] = op


def dump_yaml(v, ind=0):
    sp = '  ' * ind
    lines = []
    if isinstance(v, dict):
        for k, val in v.items():
            if isinstance(val, (dict, list)):
                lines.append(f'{sp}{k}:')
                lines.extend(dump_yaml(val, ind + 1))
            else:
                lines.append(f'{sp}{k}: {json.dumps(val, ensure_ascii=False)}')
    elif isinstance(v, list):
        for it in v:
            if isinstance(it, (dict, list)):
                lines.append(f'{sp}-')
                lines.extend(dump_yaml(it, ind + 1))
            else:
                lines.append(f'{sp}- {json.dumps(it, ensure_ascii=False)}')
    return lines

(OUT / 'openapi.yaml').write_text('\n'.join(dump_yaml(spec)) + '\n', encoding='utf-8')

# postman
coll = {
    'info': {'name': 'StagiDIP API (Generated)', 'schema': 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'},
    'variable': [{'key': 'baseUrl', 'value': 'http://localhost:3000/api'}],
    'item': []
}
folders = defaultdict(list)
for e in entries:
    grp = e['path'].strip('/').split('/')[0] if e['path'].strip('/') else 'root'
    req = {'method': e['method'], 'header': [], 'url': {'raw': '{{baseUrl}}' + re.sub(r'\[([^\]]+)\]', r':\1', e['path'])}}
    if e['query_params']:
        req['url']['query'] = [{'key': q, 'value': 'sample'} for q in e['query_params']]
    if e['needs_body'] and e['method'] in {'POST', 'PUT', 'PATCH', 'DELETE'}:
        req['header'].append({'key': 'Content-Type', 'value': 'application/json'})
        req['body'] = {'mode': 'raw', 'raw': json.dumps(e['request_example'], indent=2, ensure_ascii=False)}
    folders[grp].append({'name': f"{e['method']} {e['path']}", 'request': req, 'response': []})

for g in sorted(folders):
    coll['item'].append({'name': g, 'item': folders[g]})

(OUT / 'stagidip.postman_collection.json').write_text(json.dumps(coll, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'generated {len(entries)} endpoint-method docs -> {OUT.relative_to(ROOT)}')
