#!/bin/sh
set -e

mkdir -p /root/.claude

cat > /root/.claude.json <<EOF
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "brave-search-mcp"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    },
    "gitea": {
      "command": "gitea-mcp",
      "args": ["-t", "stdio"],
      "env": {
        "GITEA_ACCESS_TOKEN": "${GITEA_ACCESS_TOKEN}",
        "GITEA_HOST": "${GITEA_HOST}"
      }
    }
  }
}
EOF

exec claude "$@"