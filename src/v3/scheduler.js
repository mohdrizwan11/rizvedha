export const INTERVAL_DAYS=[1,3,7,21];
const DAY=86400000;
// An early correct response is useful practice but does not advance delayed mastery.
export function schedule(previous,correct,now=Date.now()){
 const prev=previous||{stage:0,dueAt:null,mastered:false,correctAfterDelay:0};
 if(!correct)return {...prev,stage:0,dueAt:now+DAY,mastered:false,lastReviewedAt:now,correctAfterDelay:0};
 if(prev.dueAt!=null&&now<prev.dueAt)return {...prev,lastReviewedAt:now,earlyCorrect:(prev.earlyCorrect||0)+1};
 if(prev.mastered)return {...prev,lastReviewedAt:now};
 if(prev.dueAt==null)return {...prev,stage:0,dueAt:now+DAY,mastered:false,lastReviewedAt:now};
 const stage=Math.min(prev.stage+1,INTERVAL_DAYS.length);return {...prev,stage,dueAt:stage<INTERVAL_DAYS.length?now+INTERVAL_DAYS[stage]*DAY:null,mastered:stage===INTERVAL_DAYS.length,lastReviewedAt:now,correctAfterDelay:(prev.correctAfterDelay||0)+1};
}
