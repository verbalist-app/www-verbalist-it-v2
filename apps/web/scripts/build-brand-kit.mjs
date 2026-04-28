#!/usr/bin/env node
/**
 * Genera apps/web/public/brand/verbalist-brand-kit.zip con tutti gli asset di brand.
 * Eseguire dopo aver aggiornato logotipo / marchio / pattern.
 */
import { createWriteStream, readdirSync, statSync, readFileSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync } from "node:zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND_DIR = join(__dirname, "..", "public", "brand");
const ZIP_PATH = join(BRAND_DIR, "verbalist-brand-kit.zip");

// Walk recursivo escludendo il file zip stesso e i .DS_Store
function walk(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === ".DS_Store") continue;
    const full = join(dir, entry);
    const rel = relative(base, full);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walk(full, base));
    } else if (full !== ZIP_PATH) {
      out.push({ rel: rel.split("\\").join("/"), full });
    }
  }
  return out;
}

// Mini implementazione ZIP "stored + deflate" senza dipendenze
function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const { rel, full } of entries) {
    const data = readFileSync(full);
    const compressed = deflateRawSync(data, { level: 9 });
    const useDeflate = compressed.length < data.length;
    const stored = useDeflate ? compressed : data;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(data);
    const nameBuf = Buffer.from(rel, "utf8");

    const localHeader = Buffer.alloc(30 + nameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);          // version needed
    localHeader.writeUInt16LE(0, 6);           // flags
    localHeader.writeUInt16LE(method, 8);
    localHeader.writeUInt16LE(0, 10);          // mod time
    localHeader.writeUInt16LE(0, 12);          // mod date
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(stored.length, 18);
    localHeader.writeUInt32LE(data.length, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);          // extra field length
    nameBuf.copy(localHeader, 30);
    localParts.push(localHeader, stored);

    const centralHeader = Buffer.alloc(46 + nameBuf.length);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);        // version made by
    centralHeader.writeUInt16LE(20, 6);        // version needed
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(method, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(stored.length, 20);
    centralHeader.writeUInt32LE(data.length, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);        // extra
    centralHeader.writeUInt16LE(0, 32);        // comment
    centralHeader.writeUInt16LE(0, 34);        // disk no
    centralHeader.writeUInt16LE(0, 36);        // internal attr
    centralHeader.writeUInt32LE(0, 38);        // external attr
    centralHeader.writeUInt32LE(offset, 42);
    nameBuf.copy(centralHeader, 46);
    centralParts.push(centralHeader);

    offset += localHeader.length + stored.length;
  }

  const centralStart = offset;
  const central = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(central.length, 12);
  eocd.writeUInt32LE(centralStart, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, central, eocd]);
}

const entries = walk(BRAND_DIR).sort((a, b) => a.rel.localeCompare(b.rel));
mkdirSync(BRAND_DIR, { recursive: true });
const zip = buildZip(entries);
const ws = createWriteStream(ZIP_PATH);
ws.write(zip);
ws.end();
ws.on("finish", () => {
  const sizeKB = (zip.length / 1024).toFixed(1);
  console.log(`OK verbalist-brand-kit.zip · ${entries.length} file · ${sizeKB} KB`);
  for (const e of entries) console.log(`  + ${e.rel}`);
});
