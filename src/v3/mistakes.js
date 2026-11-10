// Canonical store with backwards-compatible projections for existing V1/V2 screens.
// Old representations are imported only once; updates made by old screens are reconciled.
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function migrateMistakes(d){
 if(d.mistakeStore?.version===1)return projectMistakes(d);
 const records={};for(const id of new Set([...(d.mistakes||[]),...Object.keys(d.mistakeDetails||{})])){const detail=d.mistakeDetails?.[id]||{};records['lesson:'+id]={...detail,type:'lesson',id,status:(d.mistakes||[]).includes(id)?'unresolved':detail.status||'corrected'}}
 for(const [topic,t] of Object.entries(d.v22||{}))for(const [id,r] of Object.entries(t.reviews||{}))records['tool:'+topic+':'+id]={...r,type:'tool',topic,id,status:r.stage>=3?'corrected':'unresolved'};
 return projectMistakes({...d,mistakeStore:{version:1,records},mistakeMigrationBackup:{mistakes:d.mistakes||[],mistakeDetails:d.mistakeDetails||{},v22Reviews:Object.fromEntries(Object.entries(d.v22||{}).map(([topic,t])=>[topic,t.reviews||{}]))}});
}
export function projectMistakes(d){const records=d.mistakeStore?.records||{},mistakes=[],details={},v22={...(d.v22||{})};
 for(const k of Object.keys(v22))v22[k]={...v22[k],reviews:{}};
 for(const r of Object.values(records)){if(r.type==='lesson'){if(r.status==='unresolved')mistakes.push(r.id);const {type,id,...detail}=r;details[id]=detail}else if(r.type==='tool'){const {type,topic,id,status,...review}=r;v22[topic]={...(v22[topic]||{}),reviews:{...(v22[topic]?.reviews||{}),[id]:review}}}}
 return {...d,v22,mistakes,mistakeDetails:details,mistakeIndex:records};
}
export function reconcileMistakes(prev,next){const records={...(prev.mistakeStore?.records||{})};
 const ids=new Set([...(prev.mistakes||[]),...(next.mistakes||[]),...Object.keys(prev.mistakeDetails||{}),...Object.keys(next.mistakeDetails||{})]);
 for(const id of ids){const before=(prev.mistakes||[]).includes(id),after=(next.mistakes||[]).includes(id),a=prev.mistakeDetails?.[id],b=next.mistakeDetails?.[id];if(before===after&&same(a,b))continue;const old=records['lesson:'+id]||{},status=before!==after?(after?'unresolved':'corrected'):(b?.status||old.status||(after?'unresolved':'corrected'));records['lesson:'+id]={...old,...b,type:'lesson',id,status}}
 const topics=new Set([...Object.keys(prev.v22||{}),...Object.keys(next.v22||{})]);for(const topic of topics){const a=prev.v22?.[topic]?.reviews||{},b=next.v22?.[topic]?.reviews||{};for(const id of new Set([...Object.keys(a),...Object.keys(b)])){if(same(a[id],b[id]))continue;if(b[id])records['tool:'+topic+':'+id]={...records['tool:'+topic+':'+id],...b[id],type:'tool',topic,id,status:b[id].stage>=3?'corrected':'unresolved'};else delete records['tool:'+topic+':'+id]}}
 // New native callers may update the canonical store directly.
 if(next.mistakeStore!==prev.mistakeStore&&next.mistakeStore?.records)Object.assign(records,next.mistakeStore.records);
 return projectMistakes({...next,mistakeStore:{version:1,records}});
}
