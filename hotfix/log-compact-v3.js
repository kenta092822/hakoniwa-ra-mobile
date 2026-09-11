/* Hotfix v3: flatten grouped turn logs into dense one-line records. */
renderLogs=(i)=>{
  const source=i.logs||[];
  const q=logQuery.trim().toLowerCase();
  const filtered=source.filter(l=>{
    const category=logCategory(l.text);
    return(logFilter==='all'||category===logFilter)&&(!q||String(l.text).toLowerCase().includes(q)||String(l.turn).includes(q));
  });
  $('#logCount').textContent=`${filtered.length}/${source.length}件`;
  if(!filtered.length){
    $('#logs').innerHTML=`<div class="log-empty"><span>📭</span><strong>${source.length?'条件に合う記録はありません':'まだ出来事はありません'}</strong><small>${source.length?'絞り込みを変えてみてください':'ターンが進むとここに島の出来事が並びます'}</small></div>`;
    return;
  }
  $('#logs').innerHTML=filtered.map(l=>{
    const category=logCategory(l.text),m=logCategoryMeta(category);
    return `<article class="log-line log-${category}"><span class="log-line-turn">T${l.turn}</span><span class="log-line-type">${m.label}</span>${l.secret?'<span class="log-line-secret">🔒</span>':''}<p>${escapeHtml(l.text)}</p></article>`;
  }).join('');
};
