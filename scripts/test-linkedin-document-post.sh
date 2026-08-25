#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# test-linkedin-document-post.sh
#
# Smoke-tests the full LinkedIn NATIVE_DOCUMENT upload flow using curl.
# Answers two questions simultaneously:
#   1. Does your token/app have sufficient scope for document posts?
#   2. Does the 3-step upload → post flow work end-to-end?
#
# Usage:
#   export LI_TOKEN="your_access_token"
#   export LI_OWNER="urn:li:person:XXXXXXX"   # personal profile
#   # -- OR for a company page --
#   export LI_OWNER="urn:li:organization:XXXXXXX"
#
#   bash scripts/test-linkedin-document-post.sh [/path/to/test.pdf]
#
# How to get your values:
#   LI_TOKEN  — from your Postiz database: SELECT token FROM "Integration"
#               WHERE identifier = 'linkedin' LIMIT 1;
#               (or grab it from the browser DevTools Network tab while Postiz
#               calls the LinkedIn API)
#   LI_OWNER  — run the helper below, or check your Postiz DB:
#               SELECT "internalId" FROM "Integration" WHERE identifier = 'linkedin' LIMIT 1;
#               then prefix with urn:li:person:
#
# If no PDF path is supplied, a minimal valid 1-page PDF is generated inline.
# ---------------------------------------------------------------------------
set -euo pipefail

# ── colour helpers ──────────────────────────────────────────────────────────
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✓ $*${NC}"; }
fail() { echo -e "${RED}✗ $*${NC}"; exit 1; }
info() { echo -e "${YELLOW}▸ $*${NC}"; }

# ── prerequisites ────────────────────────────────────────────────────────────
command -v curl  >/dev/null || fail "curl is required"
command -v jq    >/dev/null || fail "jq is required  (brew install jq)"

[[ -z "${LI_TOKEN:-}" ]]  && fail "LI_TOKEN is not set. See usage at top of script."
[[ -z "${LI_OWNER:-}" ]]  && fail "LI_OWNER is not set. See usage at top of script."

LI_VERSION="202601"
PDF_PATH="${1:-}"

# ── generate a minimal test PDF if none supplied ─────────────────────────────
if [[ -z "$PDF_PATH" ]]; then
  PDF_PATH="$(mktemp /tmp/linkedin-test-XXXXXX.pdf)"
  # Minimal valid single-page PDF (no external tools needed)
  printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n218\n%%%%EOF\n' > "$PDF_PATH"
  info "No PDF supplied — generated minimal test PDF at $PDF_PATH"
  CLEANUP_PDF=1
else
  CLEANUP_PDF=0
  [[ -f "$PDF_PATH" ]] || fail "PDF not found: $PDF_PATH"
fi

PDF_SIZE=$(wc -c < "$PDF_PATH" | tr -d ' ')
PDF_NAME=$(basename "$PDF_PATH")

echo ""
info "Owner : $LI_OWNER"
info "PDF   : $PDF_PATH ($PDF_SIZE bytes)"
echo ""

# ── Step 1: initializeUpload ─────────────────────────────────────────────────
info "Step 1 — initializeUpload (POST /rest/documents?action=initializeUpload)"

INIT_RESP=$(curl -sf -X POST \
  "https://api.linkedin.com/rest/documents?action=initializeUpload" \
  -H "Authorization: Bearer $LI_TOKEN" \
  -H "LinkedIn-Version: $LI_VERSION" \
  -H "X-Restli-Protocol-Version: 2.0.0" \
  -H "Content-Type: application/json" \
  -d "{\"initializeUploadRequest\":{\"owner\":\"$LI_OWNER\"}}" 2>&1) \
  || { echo "Raw response: $INIT_RESP"; fail "initializeUpload request failed — check token and owner URN. 403 = scope not granted."; }

echo "$INIT_RESP" | jq . 2>/dev/null || echo "$INIT_RESP"

UPLOAD_URL=$(echo "$INIT_RESP" | jq -r '.value.uploadUrl // empty')
DOC_URN=$(echo  "$INIT_RESP" | jq -r '.value.document  // empty')

[[ -z "$UPLOAD_URL" ]] && fail "No uploadUrl in response — see above for error details."
[[ -z "$DOC_URN"    ]] && fail "No document URN in response."

ok "Step 1 passed — document URN: $DOC_URN"
echo ""

# ── Step 2: upload PDF bytes ─────────────────────────────────────────────────
info "Step 2 — upload PDF bytes (PUT $UPLOAD_URL)"

UPLOAD_HTTP=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
  "$UPLOAD_URL" \
  -H "Authorization: Bearer $LI_TOKEN" \
  -H "LinkedIn-Version: $LI_VERSION" \
  -H "X-Restli-Protocol-Version: 2.0.0" \
  -H "Content-Type: application/pdf" \
  --data-binary "@$PDF_PATH")

[[ "$UPLOAD_HTTP" =~ ^2 ]] || fail "PDF upload returned HTTP $UPLOAD_HTTP (expected 2xx)."
ok "Step 2 passed — HTTP $UPLOAD_HTTP"
echo ""

# ── Step 3: create the post ──────────────────────────────────────────────────
info "Step 3 — create post (POST /rest/posts)"

POST_BODY=$(jq -n \
  --arg author  "$LI_OWNER" \
  --arg urn     "$DOC_URN" \
  --arg title   "$PDF_NAME" \
  '{
    author:    $author,
    commentary: "Test document post from Postiz linkedin-native-document-post branch 🧪",
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: []
    },
    content: {
      media: {
        id:    $urn,
        title: $title
      }
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false
  }')

POST_RESP=$(curl -si -X POST \
  "https://api.linkedin.com/rest/posts" \
  -H "Authorization: Bearer $LI_TOKEN" \
  -H "LinkedIn-Version: $LI_VERSION" \
  -H "X-Restli-Protocol-Version: 2.0.0" \
  -H "Content-Type: application/json" \
  -d "$POST_BODY")

POST_HTTP=$(echo "$POST_RESP" | head -1 | grep -oP '\d{3}')
POST_ID=$(echo "$POST_RESP" | grep -i 'x-restli-id:' | awk '{print $2}' | tr -d '\r')

echo "$POST_RESP"
echo ""

[[ "$POST_HTTP" == "201" || "$POST_HTTP" == "200" ]] \
  || fail "Post creation returned HTTP $POST_HTTP (expected 201). See response above."

ok "Step 3 passed — post ID: $POST_ID"
echo ""

# ── cleanup ──────────────────────────────────────────────────────────────────
[[ "$CLEANUP_PDF" == "1" ]] && rm -f "$PDF_PATH"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  All 3 steps passed. Document post is live.${NC}"
echo -e "${GREEN}  Post URL: https://www.linkedin.com/feed/update/${POST_ID}${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
