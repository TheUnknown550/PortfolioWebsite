#!/usr/bin/env bash
set -euo pipefail

# Usage:
#  HOST=1.2.3.4 USER=root DEST=/var/www/mattcosh.com ./deploy/deploy.sh
# Optional:
#  DIST=dist    # source build directory

if [[ -z "${HOST:-}" || -z "${USER:-}" || -z "${DEST:-}" ]]; then
  echo "Required env: HOST, USER, DEST" >&2
  exit 1
fi

DIST_DIR="${DIST:-dist}"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Build output '$DIST_DIR' not found. Run 'npm run build' first." >&2
  exit 1
fi

echo "Creating remote directory $DEST ..."
ssh -o StrictHostKeyChecking=accept-new "$USER@$HOST" "sudo mkdir -p '$DEST' && sudo chown -R \$(whoami):\$(id -gn) '$DEST' || true"

echo "Syncing $DIST_DIR/ → $HOST:$DEST ..."
rsync -av --delete "$DIST_DIR/" "$USER@$HOST:$DEST/"

echo "Done. Remember to reload nginx on the server if needed: sudo systemctl reload nginx"

