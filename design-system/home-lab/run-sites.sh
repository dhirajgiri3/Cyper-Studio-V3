#!/usr/bin/env bash
# Waits for the bench run to finish, then re-runs the corrected fingerprint on all 14 sites and 3 Lighthouse runs each.
cd "$(dirname "$0")"
while ! grep -q "DONE2" motion-bench/results/run2.log 2>/dev/null; do sleep 20; done
LOG=research-captures/sites-run.log; : > $LOG
S="modeinspect=https://modeinspect.com/ pexo=https://pexo.ai/ legora=https://legora.com/ iru=https://www.iru.com/ clay=https://www.clay.com/ adaline=https://www.adaline.ai/ spacefs=https://spacefs.com/ eden=https://eden.so/ monday=https://monday.com/ getenergy=https://getenergy.com/ workos-atlas=https://workos.com/atlas crealo=https://www.crealo.app/ wama=https://wama.com.br/ handhold=https://handhold.io/"
echo "[$(date +%H:%M:%S)] fingerprint" | tee -a $LOG
for p in $S; do n=${p%%=*}; u=${p#*=}; (cd tools && node probe.mjs $n $u ../../../docs/research/design --only=fingerprint --noshots --out=fingerprint.json 2>&1 | tail -1) | tee -a $LOG; done
echo "[$(date +%H:%M:%S)] lighthouse x3" | tee -a $LOG
args=""; for p in $S; do args="$args site-${p%%=*}=${p#*=}"; done
(cd motion-bench/measure && node lh.mjs 3 $args 2>&1) | tee -a $LOG
echo "[$(date +%H:%M:%S)] SITES DONE" | tee -a $LOG
