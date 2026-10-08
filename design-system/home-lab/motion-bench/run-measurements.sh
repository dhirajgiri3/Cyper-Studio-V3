#!/usr/bin/env bash
# Sequential on purpose; run on a quiet machine (nothing else using the CPU or the network).
cd "$(dirname "$0")/measure"
LOG=../results/run.log; : > $LOG
log(){ echo "[$(date +%H:%M:%S)] $*" | tee -a $LOG; }
log "perf + a11y (bench)"
for v in s0 s1 s2 s3 s4; do
  node perf.mjs $v http://127.0.0.1:4173/$v.html --runs=3 --cpu=4 2>&1 | tail -1 | tee -a $LOG
  node perf.mjs $v http://127.0.0.1:4173/$v.html --runs=3 --cpu=4 --mobile 2>&1 | tail -1 | tee -a $LOG
  node a11y.mjs $v http://127.0.0.1:4173/$v.html 2>&1 | tail -1 | cut -c1-320 | tee -a $LOG
done
node perf.mjs s0-fallback "http://127.0.0.1:4173/s0.html?fallback=1" --runs=3 --cpu=4 2>&1 | tail -1 | tee -a $LOG
for a in none webp webp-grain video webgl; do
  node perf.mjs atmos-$a http://127.0.0.1:4173/atmos-$a.html --runs=3 --cpu=4 --out=../results/perf-atmos-$a.json 2>&1 | tail -1 | tee -a $LOG
done
log "lighthouse (bench, 5 runs each)"
node lh.mjs 5 s0=http://127.0.0.1:4173/s0.html s1=http://127.0.0.1:4173/s1.html s2=http://127.0.0.1:4173/s2.html s3=http://127.0.0.1:4173/s3.html s4=http://127.0.0.1:4173/s4.html 2>&1 | tee -a $LOG
node lh.mjs 5 atmos-none=http://127.0.0.1:4173/atmos-none.html atmos-webp=http://127.0.0.1:4173/atmos-webp.html atmos-webp-grain=http://127.0.0.1:4173/atmos-webp-grain.html atmos-video=http://127.0.0.1:4173/atmos-video.html atmos-webgl=http://127.0.0.1:4173/atmos-webgl.html 2>&1 | tee -a $LOG
log "lighthouse (heroes + baseline, 5 runs each)"
node lh.mjs 5 hero-a=http://127.0.0.1:4174/home-lab/heroes/hero-a-reskin.html hero-b=http://127.0.0.1:4174/home-lab/heroes/hero-b-editorial.html hero-c=http://127.0.0.1:4174/home-lab/heroes/hero-c-pair.html hero-d=http://127.0.0.1:4174/home-lab/heroes/hero-d-your-name.html baseline=http://127.0.0.1:4174/Reference-page.html 2>&1 | tee -a $LOG
log "DONE"
