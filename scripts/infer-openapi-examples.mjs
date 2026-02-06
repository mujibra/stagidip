#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const openApiPath = path.join(repoRoot, 'docs/api/openapi.yaml');
const prismaSchemaPath = path.join(repoRoot, 'prisma/schema.prisma');
const writeMode = process.argv.includes('--write');

function parseModelExamples(schemaText) {
  const models = new Map();
  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\n\}/g;

  for (const match of schemaText.matchAll(modelRegex)) {
    const modelName = match[1];
    const body = match[2];
    const fields = [];
    for (const rawLine of body.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('//') || line.startsWith('@@')) continue;
      const tokens = line.split(/\s+/);
      if (tokens.length < 2) continue;
      const [fieldName, fieldType] = tokens;
      if (fieldName === 'id') continue;
      const bareType = fieldType.replace('?', '');
      if (['String', 'Int', 'BigInt', 'Float', 'Decimal', 'Boolean', 'DateTime'].includes(bareType)) {
        fields.push([fieldName, bareType]);
      }
      if (fields.length >= 4) break;
    }
    if (fields.length > 0) {
      models.set(modelName.toLowerCase(), fields);
    }
  }

  return models;
}

function sampleValue(fieldName, type) {
  if (/email/i.test(fieldName)) return 'user@example.com';
  if (/name|nama/i.test(fieldName)) return 'Example Name';
  if (/status/i.test(fieldName)) return 'ACTIVE';
  if (/date|tanggal|time/i.test(fieldName)) return '2026-01-01T00:00:00.000Z';

  switch (type) {
    case 'String': return `sample_${fieldName}`;
    case 'Int': return 1;
    case 'BigInt': return 1;
    case 'Float':
    case 'Decimal': return 1.5;
    case 'Boolean': return true;
    case 'DateTime': return '2026-01-01T00:00:00.000Z';
    default: return `sample_${fieldName}`;
  }
}

function findBestModelForPath(routePath, modelExamples) {
  const normalized = routePath.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const modelName of modelExamples.keys()) {
    let score = 0;
    for (const part of modelName.split('_')) {
      if (part.length < 3) continue;
      if (normalized.includes(part)) score += part.length;
    }
    if (normalized.includes(modelName)) score += modelName.length * 2;
    if (score > bestScore) {
      bestScore = score;
      best = modelName;
    }
  }

  return bestScore > 0 ? best : null;
}

function buildRequestExample(routePath, modelKey, modelExamples) {
  const lines = [];
  const params = [...routePath.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);

  for (const p of params) {
    const numericHint = /^id|_id$|id_/i.test(p);
    lines.push(`              ${p}: ${numericHint ? 1 : `"sample_${p}"`}`);
  }

  if (modelKey && modelExamples.has(modelKey)) {
    for (const [fieldName, fieldType] of modelExamples.get(modelKey)) {
      const value = sampleValue(fieldName, fieldType);
      lines.push(`              ${fieldName}: ${typeof value === 'string' ? `"${value}"` : value}`);
    }
  }

  if (lines.length === 0) {
    lines.push('              id: 1');
  }

  return lines.join('\n');
}

const openApi = fs.readFileSync(openApiPath, 'utf8');
const prismaSchema = fs.readFileSync(prismaSchemaPath, 'utf8');
const modelExamples = parseModelExamples(prismaSchema);

const pathRegex = /^\s{2}(\/[^:]+):$/gm;
const pathPositions = [];
for (const m of openApi.matchAll(pathRegex)) {
  pathPositions.push({ index: m.index, value: m[1] });
}

function currentPathAt(index) {
  let current = null;
  for (const p of pathPositions) {
    if (p.index > index) break;
    current = p.value;
  }
  return current;
}

let replacements = 0;
let updated = openApi.replace(/(\s{12}example:\n\s{14}exampleField: exampleValue)/g, (full, group, offset) => {
  const routePath = currentPathAt(offset) || '/unknown';
  const modelKey = findBestModelForPath(routePath, modelExamples);
  const requestExample = buildRequestExample(routePath, modelKey, modelExamples);
  replacements += 1;
  return `            example:\n${requestExample}`;
});

updated = updated.replace(/field: exampleField/g, 'field: id');

if (writeMode) {
  fs.writeFileSync(openApiPath, updated, 'utf8');
  console.log(`Updated ${replacements} request example placeholders in docs/api/openapi.yaml`);
} else {
  console.log(`Would update ${replacements} request example placeholders in docs/api/openapi.yaml`);
  console.log('Run with --write to apply the changes.');
}
