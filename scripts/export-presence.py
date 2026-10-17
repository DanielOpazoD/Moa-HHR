"""Build an offline review from delivered PNG pixels. No network dependencies."""
import base64,json
from pathlib import Path
r=Path(__file__).resolve().parents[1]
scenes=[json.loads(p.read_text()) for p in sorted((r/'new-scenes/scenes').glob('presence-i*.json'))]
fields=['id','title','frames','durations','cycles','still','src','frameSize','renderMode']
scenes=[{k:s[k] for k in fields} for s in scenes]
(r/'presence.json').write_text(json.dumps(scenes,ensure_ascii=False,indent=2)+'\n')
for s in scenes:s['src']='data:image/png;base64,'+base64.b64encode((r/s['src']).read_bytes()).decode()
html=(r/'presence.html').read_text().replace('<link rel="stylesheet" href="src/presence.css">','<style>'+(r/'src/presence.css').read_text()+'</style>')
js=(r/'src/player.js').read_text().split('export class MoaPlayer')[0].replace('export ','')+'\n'+(r/'src/presence-schedule.js').read_text().replace('export ','')+'\n'+ '\n'.join(l for l in (r/'src/presence.js').read_text().splitlines() if not l.startswith('import '))
data=json.dumps(scenes,ensure_ascii=False).replace('<','\\u003c')
html=html.replace('<script type="module" src="src/presence.js"></script>',f'<script>window.MOA_PRESENCE={data};</script><script type="module">{js}</script>')
(r/'review/moa-presence.html').write_text(html)
print('Exported',len(scenes),'scenes:',(r/'review/moa-presence.html').stat().st_size,'bytes')
