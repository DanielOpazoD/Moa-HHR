import {test} from 'node:test';
import assert from 'node:assert/strict';
import {choosePresence,quietDelay} from '../src/presence-schedule.js';
test('welcome is never selected by the recurring scheduler; rare gestures do not repeat',()=>{
 for(let previous=1;previous<=10;previous++)for(let i=0;i<=100;i++){
  const next=choosePresence(previous,()=>i/100);assert.ok(next>=1&&next<=9);assert.ok(next!==previous||next===1);
 }
});
test('pauses are bounded and reproducible',()=>{assert.equal(quietDelay(()=>0),10000);assert.equal(quietDelay(()=>1),22000);});
