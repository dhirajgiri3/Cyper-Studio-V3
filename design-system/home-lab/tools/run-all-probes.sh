#!/usr/bin/env bash
# Sequential on purpose: parallel runs would distort load timings and wheel probes.
cd "$(dirname "$0")"
run() { node probe.mjs "$1" "$2" 2>&1 | tail -1; }
run pexo      https://pexo.ai/
run legora    https://legora.com/
run iru       https://www.iru.com/
run clay      https://www.clay.com/
run adaline   https://www.adaline.ai/
echo "=== NEW SIX DONE ==="
run spacefs       https://spacefs.com/
run eden          https://eden.so/
run monday        https://monday.com/
run getenergy     https://getenergy.com/
run workos-atlas  https://workos.com/atlas
run crealo        https://www.crealo.app/
run wama          https://wama.com.br/
run handhold      https://handhold.io/
echo "=== ALL DONE ==="
