/**
 * Yntelli Office: planta 3D arquitetônica procedural.
 * Nenhum dado de cliente ou consulta de crédito é transformado em geometria.
 * O mundo é ambientação funcional; estados das sessões vêm de OfficeSnapshot.
 * Carregamento sob demanda, WebGL reduzido e descarte completo ao desmontar.
 */
import * as T from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { ZONES, type ZoneId, type Zone } from './zones';
import type { AgentInfo } from '../../../shared/types';


const C = { floor: 0x17191b, dark: 0x111319, graphite: 0x24272c, wood: 0x594738, woodTop: 0x94775c, steel: 0x41464c, glass: 0x9cc7d1, lime: 0xd6ff3f, white: 0xebeee8, warm: 0xffd6a1 };
const mats = {
  floor: new T.MeshStandardMaterial({ color: C.floor, roughness: .83, metalness: .07 }),
  wall: new T.MeshStandardMaterial({ color: 0x292d30, roughness: .8 }),
  carpet: new T.MeshStandardMaterial({ color: 0x22262b, roughness: .95 }),
  wood: new T.MeshStandardMaterial({ color: C.woodTop, metalness: .02, roughness: .6 }),
  steel: new T.MeshStandardMaterial({ color: C.steel, metalness: .7, roughness: .36 }),
  glass: new T.MeshPhysicalMaterial({ color: C.glass, transparent: true, opacity: .22, metalness: .18, roughness: .13, depthWrite: false, side: T.DoubleSide }),
  screen: new T.MeshStandardMaterial({ color: 0x071c21, emissive: 0x0a272d, emissiveIntensity: .54, roughness: .22, metalness: .35 }),
  silver: new T.MeshStandardMaterial({ color: 0xb1b5b6, metalness: .65, roughness: .27 }),
  paper: new T.MeshStandardMaterial({ color: 0xe4e5da, roughness: .94 }),
  lime: new T.MeshStandardMaterial({ color: C.lime, emissive: C.lime, emissiveIntensity: .22, metalness: .18, roughness: .5 }),
  plant: new T.MeshStandardMaterial({ color: 0x344f39, roughness: .95, side: T.DoubleSide }),
  soil: new T.MeshStandardMaterial({ color: 0x292923, roughness: 1 }),
  leather: new T.MeshStandardMaterial({ color: 0x25272a, metalness: .05, roughness: .77 }),
};

function box(parent: T.Object3D, w: number, h: number, d: number, x: number, y: number, z: number, m: T.Material, cast = true): T.Mesh {
  const o = new T.Mesh(new T.BoxGeometry(w,h,d),m);
  o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;parent.add(o);return o;
}
function cyl(parent:T.Object3D,r:number,h:number,x:number,y:number,z:number,m:T.Material):T.Mesh {
  const o=new T.Mesh(new T.CylinderGeometry(r,r,h,12),m);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o;
}
function paint(text:string,opts:{fg?:string,bg?:string,width?:number,height?:number,size?:number}={}):T.CanvasTexture {
  const cn=document.createElement('canvas'); cn.width=opts.width??512;cn.height=opts.height??128;
  const ctx=cn.getContext('2d')!;
  ctx.fillStyle=opts.bg??'#101a1c';ctx.fillRect(0,0,cn.width,cn.height);
  ctx.fillStyle=opts.fg??'#d6ff3f';ctx.font=`600 ${opts.size??38}px system-ui, sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(text,cn.width/2,cn.height/2,cn.width-36);
  const texture=new T.CanvasTexture(cn);texture.colorSpace=T.SRGBColorSpace;return texture;
}
function label(parent:T.Object3D,text:string,x:number,y:number,z:number,w=3.1,opts:{fg?:string,bg?:string}={}):void {
  const sprite=new T.Sprite(new T.SpriteMaterial({map:paint(text,opts),transparent:true,depthTest:false,depthWrite:false}));
  sprite.position.set(x,y,z);sprite.scale.set(w,w*.25,1);parent.add(sprite);
}
function paperDocument(parent:T.Object3D,text:string,x:number,z:number,rotation=0):void {
  const g=new T.Group();g.position.set(x,1.55,z);g.rotation.y=rotation;parent.add(g);
  box(g,.72,.055,.92,0,0,0,mats.paper);
  const card=new T.Mesh(new T.PlaneGeometry(.68,.32),new T.MeshBasicMaterial({map:paint(text,{width:384,height:160,size:55,fg:'#31423b',bg:'#f0f2e8'}),side:T.DoubleSide}));
  card.rotation.x=-Math.PI/2;card.position.set(0,.038,0);g.add(card);
}
function plant(parent:T.Object3D,x:number,z:number,scale=1):void {
  cyl(parent,.27*scale,.55*scale,x,.29*scale,z,mats.soil);
  const leaves=8;for(let i=0;i<leaves;i++){
    const a=i/leaves*Math.PI*2;
    const p=new T.Mesh(new T.SphereGeometry(.33*scale,8,7),mats.plant);
    p.scale.set(.44,1.8,.38);
    p.position.set(x+Math.cos(a)*.18*scale,.78*scale,z+Math.sin(a)*.18*scale);
    p.rotation.z=Math.cos(a)*-.35;p.rotation.x=Math.sin(a)*.3;parent.add(p);
  }
}
function desk(parent:T.Object3D,x:number,z:number,dir=0,finance=false):void {
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=dir;parent.add(g);
  box(g,3.35,.13,1.35,0,1.44,0,mats.wood);
  [-1.42,1.42].forEach(xx=>[-.47,.47].forEach(zz=>box(g,.095,1.36,.095,xx,.72,zz,mats.steel)));
  box(g,1.15,.78,.075,-.25,2.01,-.25,mats.screen);
  box(g,1.2,.85,.07,-.25,2.02,-.30,mats.steel);
  box(g,1.11,.69,.012,-.25,2.02,-.343,mats.screen);
  const lineMat=new T.MeshBasicMaterial({color:0xa6d1b3});
  box(g,.72,.035,.008,-.25,1.95,-.355,lineMat,false);
  box(g,.38,.028,.008,-.42,2.1,-.355,mats.lime,false);
  box(g,.07,.45,.06,-.25,1.49,-.11,mats.steel,false);
  box(g,.42,.04,.24,-.25,1.48,-.07,mats.steel,false);
  box(g,.76,.035,.28,-.22,1.53,.22,mats.silver,false);
  const keys=new T.MeshStandardMaterial({color:0x1d2024,roughness:.93});
  for(let i=0;i<6;i++)box(g,.085,.009,.18,-.54+i*.12,1.55,.2,keys,false);
  box(g,.14,.045,.21,.82,1.53,.15,mats.silver,false);
  // Executive chair with a backrest, arms, and central base.
  box(g,.79,.13,.78,-.2,.69,1.22,mats.leather);
  box(g,.82,1.03,.14,-.2,1.18,1.58,mats.leather);
  cyl(g,.09,.63,.0,.36,1.22,mats.steel);
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5;box(g,.065,.07,.56,Math.cos(a)*.22,.12,1.22+Math.sin(a)*.22,mats.steel,false)}
  if(finance)paperDocument(g,'MARGEM',.97,-.22);
  else paperDocument(g,'PROPOSTA',.95,-.22);
}
function glassPanel(parent:T.Object3D,x:number,z:number,alongX:boolean,length:number):void {
  const mesh=box(parent,alongX?length:.07,3.2,alongX?.07:length,x,1.95,z,mats.glass,false);
  mesh.castShadow=false;
  box(parent,alongX?length:.08,.055,alongX?.08:length,x,.45,z,mats.steel,false);
  box(parent,alongX?length:.08,.055,alongX?.08:length,x,3.55,z,mats.steel,false);
}
function shelf(parent:T.Object3D,x:number,z:number,rot:number):void {
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;parent.add(g);
  for(const h of [.4,1.15,1.9,2.65])box(g,2.4,.10,.5,0,h,0,mats.wood);
  for(const xx of [-1.1,1.1])box(g,.1,2.7,.55,xx,1.36,0,mats.steel);
  ['INSS','SIAPE','CLT','CONVÊNIOS'].forEach((n,i)=>{
    const b=box(g,.39,.49,.34,-.79+i*.52,1.48,0,new T.MeshStandardMaterial({color:[0x536555,0x777b6d,0x5b695d,0x45575d][i]}),false);
    b.rotation.z=(i%2?-.045:.04);
    label(g,n,-.79+i*.52,1.53,.19,.5,{fg:'#e8eee5',bg:'#3c5144'});
  });
}
function room(parent:T.Object3D,zone:Zone,x:number,z:number):T.Object3D {
  const g=new T.Group();g.position.set(x,0,z);parent.add(g);
  box(g,9.2,.18,8.6,0,-.02,0,mats.carpet,false);
  // Brushed aluminum boundary and faint LED baseboard.
  const rail=new T.MeshStandardMaterial({color:0x575c61,metalness:.78,roughness:.34});
  box(g,9.05,.045,.06,0,.12,-4.25,rail,false);
  box(g,9.05,.045,.06,0,.12,4.25,rail,false);
  box(g,.06,.045,8.5,-4.58,.12,0,rail,false);
  box(g,.06,.045,8.5,4.58,.12,0,rail,false);
  box(g,9.2,.11,.11,0,3.7,-4.3,mats.steel,false);
  // Rear office glass allows the space to stay open and navigable.
  glassPanel(g,0,-4.25,true,9.05);
  label(g,zone.name,0,4.35,-3.45,4.25,{fg:'#e7ebe0',bg:'#1f2829'});
  if(zone.id==='recepcao'){
    box(g,4.8,1.12,1.6,0,1,.25,mats.wood);
    box(g,4.85,.14,1.75,0,1.6,.25,mats.steel);
    box(g,4.55,.21,.09,0,1.18,1.09,mats.lime,false);
    label(g,'ATENDIMENTO',0,2.06,1.1,2.8,{fg:'#d6ff3f',bg:'#17221e'});
    plant(g,-3.6,-2.8,1.35);plant(g,3.6,-2.8,1.35);
    desk(g,-2,-2.15,0);desk(g,2,-2.15,0);
  } else if(zone.id==='margens'){
    desk(g,-2.1,-1.1,0,true);desk(g,2,-1.1,0,true);
    shelf(g,0,3.55,0);
    label(g,'INSS · SIAPE · CLT',0,2.72,3.2,4.1,{fg:'#d6ff3f',bg:'#263022'});
    plant(g,-3.6,3.35,.75);
  } else if(zone.id==='central'){
    for(let i=0;i<3;i++){
      box(g,.9,2.12,1.5,-2.2+i*2.2,1.13,-1.35,mats.steel);
      box(g,.71,1.68,.04,-2.2+i*2.2,1.18,-.57,mats.screen,false);
      label(g,['CONSULTAS','CONTRATOS','SERVIÇOS'][i],-2.2+i*2.2,2.8,-.4,1.7,{fg:'#d6ff3f',bg:'#17201d'});
    }
    desk(g,0,2.4,Math.PI);
  } else if(zone.id==='engenharia'){
    desk(g,-1.6,-1.9,0);desk(g,1.7,1.6,Math.PI);
    box(g,4.1,1.85,.11,0,1.7,-3.6,mats.screen,false);
    label(g,'CODEX · CLAUDE',0,2.2,-3.46,3.5,{fg:'#d6ff3f',bg:'#071c21'});
    plant(g,3.6,3.25,.9);
  } else {
    desk(g,-2.1,-1.5,0);desk(g,2,-1.5,0);
    shelf(g,1.5,3.4,0);plant(g,-3.6,3.2,.95);
    if(zone.id==='operacao')label(g,'CONTRATOS · AVERBAÇÃO',0,2.8,3.6,4.45,{fg:'#e4e5da',bg:'#242a27'});
  }
  return g;
}

export interface Office3D {
  selectZone(id:ZoneId):void;
  resetCamera():void;
  updateAgents(agents:readonly AgentInfo[]):void;
  dispose():void;
}

/** Renderizar com qualidade arquitetônica e consumo controlado. */
export function mountOffice3D(canvas:HTMLCanvasElement,selected:(zone:ZoneId)=>void):Office3D {
  const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power',alpha:true});
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=1.35;
  renderer.shadowMap.enabled=window.innerWidth>950;renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<680?1:1.5));
  const scene=new T.Scene();scene.background=new T.Color(0x101417);scene.fog=new T.FogExp2(0x101417,.012);
  const camera=new T.PerspectiveCamera(42,1,.1,135);
  camera.position.set(35,31,39);
  const controls=new OrbitControls(camera,canvas);
  controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=22;controls.maxDistance=72;
  controls.maxPolarAngle=Math.PI*.485; controls.minPolarAngle=.32;controls.enablePan=false;
  controls.target.set(0,0,0);controls.update();
  const hemi=new T.HemisphereLight(0xb3c6d7,0x554732,2.2);scene.add(hemi);
  const sun=new T.DirectionalLight(0xffdfb5,3.1);sun.position.set(-12,34,15);scene.add(sun);
  sun.castShadow=renderer.shadowMap.enabled;
  if(sun.castShadow){sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-30;sun.shadow.camera.right=30;sun.shadow.camera.top=25;sun.shadow.camera.bottom=-25;sun.shadow.bias=-.00025}
  box(scene,42,.65,32,0,-.62,0,mats.floor,false);
  const dots=[-12,-2,8,18];
  dots.forEach(x=>{box(scene,.04,.01,30,x,-.29,0,new T.MeshBasicMaterial({color:0x303b35}),false)});
  const hit:T.Mesh[]=[];let active:ZoneId='margens';
  const xSlots=[-10.2,0,10.2],zSlots=[-5.05,5.05];
  ZONES.forEach((zone,i)=>{
    const x=xSlots[i%3],z=zSlots[Math.floor(i/3)];
    room(scene,zone,x,z);
    const marker=new T.Mesh(new T.PlaneGeometry(9.15,8.5),new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
    marker.rotation.x=-Math.PI/2;marker.position.set(x,.25,z);marker.userData.zone=zone.id;scene.add(marker);hit.push(marker);
  });
  for(const x of [-16,16])for(const z of [-11,11])plant(scene,x,z,1.8);
  // Real Codex/Claude sessions show up only when the authoritative snapshot has them.
  // The engineering zone is a neutral staging area, not a claim of which credit team owns a session.
  const activeAgents=new T.Group();scene.add(activeAgents);
  let agentsSignature='';
  const renderAgents=(agents:readonly AgentInfo[])=>{
    const ongoing=agents.filter(a=>a.status!=='offline'&&a.status!=='done').slice(0,9);
    const signature=ongoing.map(a=>a.id+':'+a.status+':'+a.name).join('|');
    if(signature===agentsSignature)return;
    agentsSignature=signature;
    activeAgents.traverse(o=>{
      if(o instanceof T.Mesh)o.geometry.dispose();
      if(o instanceof T.Sprite){o.material.map?.dispose();o.material.dispose()}
    });
    activeAgents.clear();
    ongoing.forEach((agent,i)=>{
      const actor=new T.Group();
      // Engineering sector is at (10.2,5.05) in the floor layout.
      const x=10.2+((i%3)-1)*2.25;
      const z=5.05+(Math.floor(i/3)-1)*2.55;
      actor.position.set(x,0,z);activeAgents.add(actor);
      const isCodex=agent.provider==='codex';
      const waiting=agent.status==='waiting'||!!agent.permission;
      const shirt=new T.MeshStandardMaterial({
        color:isCodex?0x6d85a4:0x78918a,roughness:.78,metalness:.03,
      });
      cyl(actor,.24,.74,0,.98,0,shirt);
      const skin=new T.MeshStandardMaterial({color:0xc19878,roughness:.89});
      const head=new T.Mesh(new T.SphereGeometry(.21,10,8),skin);
      head.position.set(0,1.57,0);actor.add(head);
      [-.12,.12].forEach(xx=>box(actor,.12,.5,.16,xx,.38,0,mats.leather,false));
      [-.28,.28].forEach(xx=>box(actor,.11,.65,.13,xx,1.01,0,skin,false));
      const status=new T.MeshBasicMaterial({color:waiting?0xef9f27:agent.status==='working'?0x3fe08a:0x85b7eb});
      cyl(actor,.13,.05,0,1.91,0,status);
      label(actor,agent.name.slice(0,14),0,2.35,0,1.72,{fg:'#ebf3eb',bg:'#1a2726'});
      if(waiting)label(actor,'APROVAÇÃO',0,2.75,0,1.6,{fg:'#ef9f27',bg:'#332719'});
    });
  };

  const ray=new T.Raycaster(),pointer=new T.Vector2();let down={x:0,y:0};
  const onDown=(e:PointerEvent)=>{down={x:e.clientX,y:e.clientY}};
  const onClick=(e:MouseEvent)=>{
    if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>8)return;
    const r=canvas.getBoundingClientRect();pointer.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);
    ray.setFromCamera(pointer,camera);
    const found=ray.intersectObjects(hit)[0];
    if(found){selected(found.object.userData.zone as ZoneId)}
  };
  canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('click',onClick);
  let disposed=false,visible=true,last=0,raf=0;
  const resize=()=>{
    const r=canvas.getBoundingClientRect();if(r.width<1||r.height<1)return;
    renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();
  };
  const watch=new ResizeObserver(resize);watch.observe(canvas);resize();
  const update=(t:number)=>{
    if(disposed)return;
    raf=requestAnimationFrame(update);
    if(document.hidden||!visible||t-last<35)return;
    last=t;controls.update();renderer.render(scene,camera);
  };
  raf=requestAnimationFrame(update);
  return {
    selectZone(id){
      active=id;const i=ZONES.findIndex(z=>z.id===id);
      if(i<0)return;
      const x=xSlots[i%3],z=zSlots[Math.floor(i/3)];
      controls.target.set(x,0,z);controls.update();
      // Retain full floor overview; focused area remains selected in the accessible UI.
      camera.position.set(x+22,22,z+24);camera.lookAt(controls.target);
      visible=true;
    },
    updateAgents:renderAgents,
    resetCamera(){
      controls.target.set(0,0,0);
      camera.position.set(35,31,39);controls.update();
    },
    dispose(){
      disposed=true;cancelAnimationFrame(raf);watch.disconnect();
      canvas.removeEventListener('pointerdown',onDown);canvas.removeEventListener('click',onClick);
      controls.dispose();
      scene.traverse(o=>{
        if(o instanceof T.Mesh){o.geometry.dispose()}
        if(o instanceof T.Sprite){o.material.map?.dispose();o.material.dispose()}
      });
      renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
