from pathlib import Path
from PIL import Image
import json,hashlib
root=Path(__file__).resolve().parents[1];inventory=json.loads((root/'docs/inventory.json').read_text());original=0
for item in inventory['files']:
 p=root/item['path'];assert p.stat().st_size==item['bytes'];assert hashlib.sha256(p.read_bytes()).hexdigest()==item['sha256'],p
 if p.suffix=='.png':original+=item['bytes']
assert original<4194304;assert len([s for s in inventory['files'] if s['path'].endswith('.png')])==18
scenes=json.loads((root/'scenes.json').read_text());ids=set();totalnew=0
for s in scenes:
 assert s['id'] not in ids;ids.add(s['id']);n=s['frames'];assert 1<=n<=24
 assert len(s['durations'])==n and all(d>0 for d in s['durations']);assert 2999.99<=sum(s['durations'])*s['cycles']<=6000.01
 assert 0<=s['still']<n;path=root/s['src'];assert path.stat().st_size<300000,(s['id'],path.stat().st_size)
 im=Image.open(path).convert('RGBA');assert im.size==(n*288,168);hashes=set()
 for i in range(n):
  f=im.crop((i*288,0,(i+1)*288,168));a=f.getchannel('A');assert a.getextrema()[0]==0 and a.getextrema()[1]>200;hashes.add(hashlib.sha256(f.tobytes()).hexdigest())
  if s['pack']=='new':
   assert a.crop((240,0,288,48)).getbbox() is None,(s['id'],i,'X overlap')
   assert a.crop((0,0,288,3)).getbbox() is None,(s['id'],i,'top clip')
 assert len(hashes)==n,(s['id'],'duplicate frames')
 if s['pack']=='new':totalnew+=path.stat().st_size;assert hashlib.sha256(path.read_bytes()).hexdigest()==s['sha256']
print(f'{len(scenes)} scenes validated; original={original:,} / 4,194,304 bytes; separate new package={totalnew:,} bytes. Every atlas <300,000 bytes.')
