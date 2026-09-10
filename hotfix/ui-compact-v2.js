/* Hotfix v2: concise labels/values for compact mobile summaries. */
function compactMoney(v){return `${formatInt(v)}億`}
function compactFood(v){return `${formatInt(Number(v||0)*100)}t`}
function compactFarm(v){return `${formatInt(Number(v||0)*1000)}人`}
function compactBio(b){return b?`🧬 ${escapeHtml(b.name)} ${escapeHtml(b.status)}`:''}

renderHomeLeaders=()=>{
  const el=$('#homeLeaders');
  if(!el)return;
  const leaders=[
    {label:'👥 人口',field:'population',format:i=>popText(i.population)},
    {label:'🏝️ 面積',field:'area',format:i=>areaText(i.area)},
    {label:'🚜 農場',field:'farm',format:i=>facilityText(i.farm)},
    {label:'🏭 工場',field:'factory',format:i=>facilityText(i.factory)},
    {label:'🧳 観光',field:'tourists',format:i=>popText(i.tourists)}
  ];
  if(!islands.length){
    el.innerHTML='<div class="hero-leader"><span class="hero-leader-label">ランキング</span><strong class="hero-leader-name">まだ島がありません</strong><span class="hero-leader-value">—</span></div>';
    return;
  }
  const base=leaders.map(entry=>{
    const island=topIslandBy(entry.field);
    return `<div class="hero-leader"><span class="hero-leader-label">${entry.label}</span><strong class="hero-leader-name">${escapeHtml(island.name)}島</strong><span class="hero-leader-value">${entry.format(island)}</span></div>`;
  });
  const cup=topCupIsland();
  if(cup)base.push(`<div class="hero-leader cup-leader"><span class="hero-leader-label">🏆 Cup</span><strong class="hero-leader-name">${escapeHtml(cup.name)}島</strong><span class="hero-leader-value">${formatInt(cup.hakoniwaCup.championships)}勝</span></div>`);
  el.innerHTML=base.join('');
};

renderPrizes=(i)=>{
  const a=i.prizes?.awards||[];
  $('#prizes').innerHTML=a.length?a.map(p=>`<span class="prize-badge" title="${escapeHtml(p.name)}"><img src="/assets/${p.image}" alt="">${escapeHtml(p.name)}</span>`).join(''):'';
};

renderStats=(i)=>{
  const sats=Object.values(i.satellites||{}).filter(s=>Number(s?.charge)>0);
  const hc=i.hakoniwaCup;
  const items=[
    `💰 ${compactMoney(i.money)}`,
    `👥 ${popText(i.population)}`,
    `🌾 ${compactFood(i.food)}`,
    `🏝️ ${areaText(i.area)}`,
    `⭐ ${formatInt(i.points||0)}pt`,
    `🚜 ${compactFarm(i.farm)}`
  ];
  if(Number(i.houses)>0)items.push(`🏠 ${formatInt(i.taxRate||0)}%`);
  if(Number(i.tourists)>0)items.push(`🧳 ${popText(i.tourists)}`);
  if(sats.length)items.push(`🛰️ ${sats.length}基`);
  if(i.biology)items.push(compactBio(i.biology));
  if(hc)items.push(`⚽ ${formatInt(hc.points)}pt ${cupStageText(hc.stage)}`);
  $('#stats').innerHTML=items.map(v=>`<span class="stat">${v}</span>`).join('');
};

/* Re-render the home summary once after the original bootstrap. */
renderHomeLeaders();
