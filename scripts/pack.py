"""Package imagegen raster cells; no drawing, pose duplication or per-frame scaling.
Register rows to a common baseline, then use ONE union crop and scale for the scene.
"""
from PIL import Image
from pathlib import Path
import json,sys,hashlib
root=Path(__file__).resolve().parents[1]
def pack(scene):
    source=root/scene['source'];im=Image.open(source).convert('RGBA');cols=4;rows=scene['frames']//cols
    alpha=im.getchannel('A'); mask=alpha.point(lambda a:255 if a>=64 else 0)
    occupied=[y for y in range(im.height) if mask.crop((0,y,im.width,y+1)).getbbox()]
    runs=[]
    for y in occupied:
        if not runs or y>runs[-1][-1]+1:runs.append([y])
        else:runs[-1].append(y)
    runs=[r for r in runs if len(r)>20]
    if len(runs)!=rows:raise ValueError(f'{scene["id"]}: expected {rows} visible rows, got {[(r[0],r[-1]) for r in runs]}')
    cuts=[0]+[(runs[i][-1]+runs[i+1][0])//2 for i in range(rows-1)]+[im.height]
    cellw=im.width//cols;cellh=max(cuts[i+1]-cuts[i] for i in range(rows))+30
    registered=[];offsets=[]
    for row in range(rows):
        baseline=runs[row][-1]+1
        for col in range(cols):
            cell=im.crop((col*cellw,cuts[row],(col+1)*cellw,cuts[row+1]))
            canvas=Image.new('RGBA',(cellw,cellh))
            offset=cellh-8-(baseline-cuts[row]);canvas.paste(cell,(0,offset))
            registered.append(canvas);offsets.append([0,offset])
    boxes=[f.getchannel('A').point(lambda a:255 if a>=8 else 0).getbbox() for f in registered]
    if any(b is None for b in boxes):raise ValueError('Empty frame')
    union=(max(0,min(b[0] for b in boxes)-3),max(0,min(b[1] for b in boxes)-3),min(cellw,max(b[2] for b in boxes)+3),min(cellh,max(b[3] for b in boxes)+3))
    w,h=union[2]-union[0],union[3]-union[1];scale=min(228/w,150/h);size=(round(w*scale),round(h*scale));frames=[]
    for f in registered:
        frame=Image.new('RGBA',(288,168));tile=f.crop(union).resize(size,Image.Resampling.NEAREST)
        frame.paste(tile,(120-size[0]//2,162-size[1]));frames.append(frame)
    atlas=Image.new('RGBA',(288*len(frames),168))
    for i,f in enumerate(frames):atlas.paste(f,(288*i,0))
    out=root/scene['src'];out.parent.mkdir(parents=True,exist_ok=True);atlas.quantize(colors=256,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE).save(out,optimize=True)
    # Review the exact delivered palette/alpha, not the pre-optimization canvas.
    delivered=Image.open(out).convert('RGBA');frames=[delivered.crop((i*288,0,(i+1)*288,168)) for i in range(scene['frames'])]
    scene['bytes']=out.stat().st_size;scene['sha256']=hashlib.sha256(out.read_bytes()).hexdigest()
    scene['packaging']={'sourceSize':im.size,'rowCuts':cuts,'rowBaselineRegistration':offsets,'unionCrop':union,'sharedScale':scale,'frameSize':[288,168],'origin':[0,0],'trajectory':[[0,0],[0,0]]}
    # Visual review artifacts retain all frames, no invented inbetweens.
    review=root/'evidence'/scene['id'];review.mkdir(exist_ok=True)
    for bg,color in [('light','#f5f6f0'),('dark','#18282d'),('blue','#174f7d')]:
        sheet=Image.new('RGB',(4*288,rows*168),color)
        for i,f in enumerate(frames):sheet.paste(f,(i%4*288,i//4*168),f)
        sheet.save(review/f'{bg}-frames.png')
        anim=[]
        for f in frames:
            rgb=Image.new('RGB',f.size,color);rgb.paste(f,(0,0),f);anim.append(rgb.resize((144,84),Image.Resampling.NEAREST))
        # GIF is review evidence only; PNG atlas is production, finite player controls motion.
        anim[0].save(review/f'{bg}-preview.gif',save_all=True,append_images=anim[1:],duration=scene['durations'],loop=0)
    print(scene['id'],len(frames),'frames',scene['bytes'],'bytes')
if __name__=='__main__':
    path=root/'new-scenes/manifest.json';scenes=json.loads(path.read_text())
    for scene in scenes:
        if scene.get('source') and (not sys.argv[1:] or scene['id'] in sys.argv[1:]):pack(scene)
    path.write_text(json.dumps(scenes,ensure_ascii=False,indent=2)+'\n')
