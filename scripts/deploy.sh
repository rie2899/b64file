#!/usr/bin/env bash
# b64file.cn 一键部署（无人值守可用，无交互）。
#   bash scripts/deploy.sh            # 测试 → 构建 → 备份 → 上传 → 验线上
# 任何一步失败立刻退出，绝不把旧 dist 传上去。
set -euo pipefail
cd "$(dirname "$0")/.."

KEY="$HOME/.ssh/tencent-ubuntu.pem"
HOST="ubuntu@82.157.202.200"
REMOTE_DIR="/data/b64file/html"
LOG=/tmp/b64file-deploy-$(date +%Y%m%d-%H%M).log
: > "$LOG"

say() { echo "$@" | tee -a "$LOG"; }
strip_ansi() { sed -E 's/\x1b\[[0-9;]*[mGKHF]//g'; }

say "== 1/5 测试 =="
set +e
pnpm test > /tmp/b64-test-raw.log 2>&1
TEST_RC=$?
set -e
strip_ansi < /tmp/b64-test-raw.log | grep -E 'Tests +[0-9]+ (passed|failed)' | tail -2 | tee -a "$LOG"
if [ "$TEST_RC" != "0" ]; then say "✗ 测试命令退出码 $TEST_RC"; exit 1; fi
if ! strip_ansi < /tmp/b64-test-raw.log | grep -qE 'Tests +[0-9]+ passed'; then
  say "✗ 测试没有出现 passed 行，视为失败"; exit 1
fi
if strip_ansi < /tmp/b64-test-raw.log | grep -qE 'Tests +[0-9]+ failed'; then
  say "✗ 有测试失败"; exit 1
fi
say "✓ 测试全绿"

say "== 2/5 构建 =="
set +e
pnpm build > /tmp/b64-build.log 2>&1
BUILD_RC=$?
set -e
tail -3 /tmp/b64-build.log | tee -a "$LOG"
if [ "$BUILD_RC" != "0" ] || ! grep -q '✓ built in' /tmp/b64-build.log; then
  say "✗ 构建失败（退出码 $BUILD_RC 或无 built 标记）"; exit 1
fi
say "✓ 构建完成：dist 页面 $(find dist -name index.html | wc -l) 个，sitemap $(grep -c '<loc>' dist/sitemap.xml) 条"

say "== 3/5 服务器端备份 =="
ssh -i "$KEY" -o StrictHostKeyChecking=no "$HOST" \
  "sudo -n tar -C /data/b64file -czf html-backup-$(date +%Y%m%d-%H%M).tar.gz html" | tee -a "$LOG"
say "✓ 备份完成"

say "== 4/5 上传 =="
tar -C dist -czf - . | ssh -i "$KEY" -o StrictHostKeyChecking=no "$HOST" "sudo -n tar -C $REMOTE_DIR -xzf -"
say "✓ 上传完成"

say "== 5/5 线上验证 =="
sleep 2
LOCAL_N=$(grep -c '<loc>' dist/sitemap.xml)
LIVE_N=$(curl -s --max-time 20 https://b64file.cn/sitemap.xml | grep -c '<loc>' || true)
say "sitemap 本地=$LOCAL_N 线上=$LIVE_N"
[ "$LOCAL_N" = "$LIVE_N" ] || { say "✗ sitemap 条数不一致，上传可能没生效"; exit 1; }

FAIL=0
while read -r u; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$u")
  [ "$code" = "200" ] || { say "✗ $u → $code"; FAIL=1; }
done < <(grep -o '<loc>[^<]*' dist/sitemap.xml | sed 's/<loc>//')
[ "$FAIL" = "0" ] && say "✓ sitemap 全部 URL 200"
say "favicon.ico → $(curl -s -o /dev/null -w '%{http_code}' --max-time 20 https://b64file.cn/favicon.ico)"
say "✓ 部署完成（日志 $LOG）"
