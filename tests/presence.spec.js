import {test,expect} from '@playwright/test';
import fs from 'node:fs';
test('ten scenes load on demand, inspect, move, finish, and retain smooth pixels',async({page})=>{
 test.setTimeout(90000);
 const requests=[];page.on('request',r=>{if(r.url().endsWith('.png'))requests.push(r.url());});
 await page.goto('/presence.html');await expect(page.locator('#list button')).toHaveCount(10);
 await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i01');
 expect(requests.length).toBe(1);
 const scenes=JSON.parse(fs.readFileSync('presence.json','utf8'));
 for(let i=0;i<10;i++){
  await page.locator('#list button').nth(i).click();await expect(page.locator('#stage')).toHaveAttribute('data-scene',scenes[i].id);
  await page.locator('#frame').focus();await page.keyboard.press('Home');for(let k=0;k<5;k++)await page.keyboard.press('ArrowRight');await expect(page.locator('#stage')).toHaveAttribute('data-frame','5');
  await page.locator('#play').click();await expect(page.locator('#stage')).toHaveAttribute('data-frame','0');
  await expect(page.locator('#stage')).not.toHaveAttribute('data-frame','0',{timeout:4500});
  await expect(page.locator('#status')).toHaveText('Gesto terminado',{timeout:7000});
 }
 await page.screenshot({path:'evidence/presence-desktop.png'});
});
test('pause freezes, Escape stops, reduced motion stays still',async({page})=>{
 await page.goto('/presence.html');await expect(page.locator('#stage')).toHaveAttribute('data-frame','0');
 await page.locator('#play').click();await expect(page.locator('#stage')).not.toHaveAttribute('data-frame','0');
 await page.locator('#pause').click();const frame=await page.locator('#stage').getAttribute('data-frame');
 await page.waitForTimeout(600);await expect(page.locator('#stage')).toHaveAttribute('data-frame',frame);
 await page.locator('#pause').click();await page.keyboard.press('Escape');await expect(page.locator('#stage')).toHaveAttribute('data-frame','0');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#companion').click();
 await expect(page.locator('#status')).toHaveText('Movimiento reducido: pose quieta');await page.waitForTimeout(500);
 await expect(page.locator('#stage')).toHaveAttribute('data-frame','0');
});
test('mobile controls fit and image failure preserves previous canvas',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/presence.html');await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i01');
 await page.route('**/moa-presence-i03-v1.png',r=>r.abort());await page.locator('#list button').nth(2).click();
 await expect(page.locator('#status')).toContainText('No se pudo cargar');await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i01');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.screenshot({path:'evidence/presence-mobile.png',fullPage:true});
});
test('offline document works without external requests',async({page})=>{
 const external=[];page.on('request',r=>{if(r.url().startsWith('http')&&!r.url().endsWith('moa-presence.html'))external.push(r.url());});
 await page.goto('/review/moa-presence.html');await expect(page.locator('#list button')).toHaveCount(10);
 await page.locator('#list button').nth(9).click();await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i10');expect(external).toEqual([]);
});
test('visibility suspends motion and an obsolete image cannot replace selection',async({page})=>{
 await page.goto('/presence.html');await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i01');
 await page.locator('#play').click();await expect(page.locator('#stage')).not.toHaveAttribute('data-frame','0');
 // Inject visibility only for a deterministic lifecycle test; rendered frame must remain fixed.
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
 const frame=await page.locator('#stage').getAttribute('data-frame');await page.waitForTimeout(700);await expect(page.locator('#stage')).toHaveAttribute('data-frame',frame);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.locator('#stage')).not.toHaveAttribute('data-frame',frame);
 let release;const gate=new Promise(r=>release=r);
 await page.route('**/moa-presence-i03-v1.png',async r=>{await gate;await r.continue();});
 await page.locator('#list button').nth(2).click();await page.locator('#list button').nth(1).click();
 await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i02');release();await page.waitForTimeout(500);
 await expect(page.locator('#stage')).toHaveAttribute('data-scene','presence-i02');
});
