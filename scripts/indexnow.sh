#!/usr/bin/env bash
# 把站点 URL 推给 IndexNow（必应即时收录；Yandex/Seznam/Naver 共用同一协议）。
#   bash scripts/indexnow.sh              # 默认推 dist/sitemap.xml 里的全部 URL
#   bash scripts/indexnow.sh <url> [...]  # 只推指定 URL（发新页时用）
# 端点：默认走必应自己的入口 https://www.bing.com/indexnow（实测必应通、api.indexnow.net 在部分
#       代理节点上 TLS 握手会被挡）。可换：INDEXNOW_ENDPOINT=https://api.indexnow.net/IndexNow
# 代理：境外服务，WSL 直连不通；默认本机 7897，可用 INDEXNOW_PROXY 覆盖，设成空串则直连。
set -euo pipefail
cd "$(dirname "$0")/.."

# key 文件：public/<key>.txt，名字本身是 key（32 位十六进制；不能误抓 robots.txt / baidu-urls.txt）
# 注意：不能只按 [A-Za-z0-9-] 匹配 —— 构建产物 baidu-urls.txt 也满足那个字符集，会误抓。
# 我们生成的 key 是 32 位十六进制（uuid4().hex），按这个形状认。
KEYFILE=$(find public -maxdepth 1 -type f -name '*.txt' -printf '%f\n' | grep -E '^[0-9a-f]{32}\.txt$' | head -1 || true)
[ -n "$KEYFILE" ] || { echo "✗ 找不到 public/<key>.txt（IndexNow 的 key 文件）"; exit 1; }
KEY="${KEYFILE%.txt}"
HOST="b64file.cn"
LOCATION="https://$HOST/$KEY.txt"
ENDPOINT="${INDEXNOW_ENDPOINT:-https://www.bing.com/indexnow}"

if [ "$#" -gt 0 ]; then
  URLS=("$@")
else
  [ -f dist/sitemap.xml ] || { echo "✗ 没有 dist/sitemap.xml，先 pnpm build"; exit 1; }
  mapfile -t URLS < <(grep -o '<loc>[^<]*</loc>' dist/sitemap.xml | sed 's|</\?loc>||g')
fi
[ "${#URLS[@]}" -gt 0 ] || { echo "✗ 没有要推的 URL"; exit 1; }

PAYLOAD=$(python3 - "$HOST" "$KEY" "$LOCATION" "${URLS[@]}" <<'PY'
import json, sys
host, key, loc = sys.argv[1], sys.argv[2], sys.argv[3]
print(json.dumps({"host": host, "key": key, "keyLocation": loc, "urlList": sys.argv[4:]}, ensure_ascii=False))
PY
)

PROXY="${INDEXNOW_PROXY-http://127.0.0.1:7897}"
PROXY_ARG=(); [ -n "$PROXY" ] && PROXY_ARG=(-x "$PROXY")

RESP="${TMPDIR:-/tmp}/indexnow-resp.txt"
echo "推 ${#URLS[@]} 个 URL → $ENDPOINT"
echo "  host: $HOST | keyLocation: $LOCATION"
set +e
CODE=$(curl -s "${PROXY_ARG[@]}" --max-time 60 -o "$RESP" -w '%{http_code}' \
  -X POST "$ENDPOINT" -H 'Content-Type: application/json; charset=utf-8' -d "$PAYLOAD")
RC=$?
set -e
if [ "$RC" -ne 0 ]; then
  echo "✗ curl 退出码 $RC（TLS/网络失败：换 INDEXNOW_ENDPOINT 或换代理节点）"; exit 2
fi
case "$CODE" in
  200|202) echo "✓ HTTP $CODE 已受理（必应通常几分钟内来抓）";;
  400) echo "✗ HTTP 400 请求格式错";;
  403) echo "✗ HTTP 403 key 校验失败：确认 https://$HOST/$KEY.txt 能打开、内容就是 key";;
  422) echo "✗ HTTP 422 URL 与 host 不匹配";;
  429) echo "✗ HTTP 429 推太频繁";;
  *)   echo "✗ HTTP $CODE";;
esac
head -c 300 "$RESP" 2>/dev/null; echo
