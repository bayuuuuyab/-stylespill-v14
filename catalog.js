const BUILTIN_PRODUCTS = [
  {number:'SS-001', id:'loose-pants', name:'Formal Easy — Loose Pants', short:'Loose Pants Black', category:'Celana', color:'Black', price:'154850', image:'assets/loose-pants.jpg', url:'https://id.shp.ee/bHcjpPUt', badge:"Editor's pick", style:'Clean / Formal', desc:'Celana formal hitam dengan siluet loose yang cocok untuk clean, basic, dan smart-casual outfit.'},
  {number:'SS-002', id:'rise-oversized-tee', name:'RISE Graphic Oversized Tee', short:'RISE Graphic Oversized Tee', category:'Kaos', color:'Black / Multiple Colors', price:'44497–59000', image:'assets/rise-oversized-tee.jpg', url:'https://id.shp.ee/tyHPjjeU', badge:'Trending', style:'Streetwear / Korean', desc:'Graphic tee oversized dengan desain RISE yang bold untuk gaya streetwear dan Korean-inspired.'}
];
const CATEGORIES=['Kaos','Celana','Kemeja','Jaket','Sepatu','Topi','Tas','Aksesori'];
const STYLES=['Clean','Minimal','Streetwear','Korean','Casual','Formal'];
const LS_PRODUCTS='stylespill_products_v13', LS_OVERRIDES='stylespill_overrides_v13', LS_HIDDEN='stylespill_hidden_v13', LS_PROFILE='stylespill_profile_v13', LS_WISH='stylespill_wishlist_v13', LS_RECENT='stylespill_recent_v13', LS_CLICKS='stylespill_clicks_v13';
function loadJSON(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
function saveJSON(k,v){localStorage.setItem(k,JSON.stringify(v))}
function catalog(){const custom=loadJSON(LS_PRODUCTS,[]),overrides=loadJSON(LS_OVERRIDES,{}),hidden=loadJSON(LS_HIDDEN,[]);return [...BUILTIN_PRODUCTS.map(p=>({...p,...(overrides[p.id]||{})})),...custom].filter(p=>!hidden.includes(p.id))}
function productById(id){return catalog().find(p=>p.id===id)}
function saveProduct(p){p.id=p.id||('custom-'+Date.now());const custom=loadJSON(LS_PRODUCTS,[]),overrides=loadJSON(LS_OVERRIDES,{}),builtin=BUILTIN_PRODUCTS.some(x=>x.id===p.id);if(builtin){overrides[p.id]=p;saveJSON(LS_OVERRIDES,overrides)}else{const i=custom.findIndex(x=>x.id===p.id);if(i>=0)custom[i]=p;else custom.push(p);saveJSON(LS_PRODUCTS,custom)}return p}
function deleteProduct(id){if(BUILTIN_PRODUCTS.some(x=>x.id===id)){const hidden=loadJSON(LS_HIDDEN,[]);if(!hidden.includes(id))hidden.push(id);saveJSON(LS_HIDDEN,hidden)}else saveJSON(LS_PRODUCTS,loadJSON(LS_PRODUCTS,[]).filter(x=>x.id!==id))}
function resetCatalog(){[LS_PRODUCTS,LS_OVERRIDES,LS_HIDDEN,LS_WISH,LS_RECENT,LS_CLICKS].forEach(k=>localStorage.removeItem(k))}
function exportCatalog(){const payload={version:13,products:catalog(),profile:getProfile(),wishlist:getWishlist(),clicks:loadJSON(LS_CLICKS,{})};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='stylespill-catalog-v13.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function importCatalog(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.products))throw Error('Format katalog tidak valid');saveJSON(LS_PRODUCTS,d.products.filter(p=>!BUILTIN_PRODUCTS.some(b=>b.id===p.id)));const o={};d.products.filter(p=>BUILTIN_PRODUCTS.some(b=>b.id===p.id)).forEach(p=>o[p.id]=p);saveJSON(LS_OVERRIDES,o);if(d.profile)saveJSON(LS_PROFILE,d.profile);if(Array.isArray(d.wishlist))saveJSON(LS_WISH,d.wishlist);if(d.clicks)saveJSON(LS_CLICKS,d.clicks);resolve(d)}catch(e){reject(e)}};r.onerror=reject;r.readAsText(file)})}
function normalizeShopeeProduct(d){return {id:d.id||('custom-'+Date.now()),number:d.number||nextProductNumber(),name:d.name||'Produk Shopee',short:d.short||d.name||'Produk Shopee',category:d.category||guessCategory(d.name||''),color:d.color||'',price:d.price||'',image:d.image||'assets/profile.svg',url:d.url||'',badge:d.badge||'New',style:d.style||guessStyle(d.name||''),desc:d.desc||'Produk pilihan StyleSpill dari Shopee.'}}
function nextProductNumber(){const nums=catalog().map(p=>String(p.number||'').match(/(\d+)$/)?.[1]).filter(Boolean).map(Number);const n=(nums.length?Math.max(...nums):0)+1;return 'SS-'+String(n).padStart(3,'0')}
function guessCategory(n){const x=n.toLowerCase();if(/sepatu|sneaker|sandal/.test(x))return 'Sepatu';if(/topi|cap/.test(x))return 'Topi';if(/celana|pants|trouser/.test(x))return 'Celana';if(/jaket|jacket|hoodie/.test(x))return 'Jaket';if(/kemeja|shirt/.test(x))return 'Kemeja';if(/tas|bag/.test(x))return 'Tas';return 'Kaos'}
function guessStyle(n){const x=n.toLowerCase();if(/street|oversize|graphic|distro/.test(x))return 'Streetwear';if(/formal|trouser|office/.test(x))return 'Formal';if(/korean/.test(x))return 'Korean';return 'Casual'}

/* StyleSpill CapCut Creator */
const CAPCUT_CREATOR = {
  name: 'StyleSpill Edit',
  handle: '@stylespilledit',
  followers: '12.4K',
  templates: '28',
  category: 'Fashion',
  profileUrl: '', // Tempel URL profil CapCut kamu di sini setelah kamu kirim
  bioLines: [
    '🎬 Cinematic Fashion Templates',
    '👕 Outfit • Fashion • Affiliate',
    '⚡ Edit cepat, hasil cinematic'
  ]
};
function getCapcutCreator(){return CAPCUT_CREATOR}

function getProfile(){return loadJSON(LS_PROFILE,{name:'StyleSpill',tagline:"Men's Fashion Store",bio:'Curated fashion pria, outfit inspiration, dan creator tools.',avatar:'assets/profile.svg',handle:'@stylespill',capcutUrl:'capcut.html',location:'Indonesia',about:'Fashion, outfit inspiration, dan cinematic creator tools.',quote:'Wear less. Look better.',instagramUrl:'',tiktokUrl:'',shopeeUrl:''})}
function saveProfile(p){saveJSON(LS_PROFILE,p)}
function rupiah(v){if(v===undefined||v===null||v==='')return '-';const s=String(v).replace(/^Rp\s*/,'').replace(/\./g,'').replace(/,/g,'');if(/[–-]/.test(s)){return s.split(/[–-]/).map(x=>'Rp'+new Intl.NumberFormat('id-ID').format(Number(x.trim())||0)).join(' – ')}return 'Rp'+new Intl.NumberFormat('id-ID').format(Number(s)||0)}
function escapeHTML(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function getWishlist(){return loadJSON(LS_WISH,[])}
function isWishlisted(id){return getWishlist().includes(id)}
function toggleWishlist(id){let w=getWishlist();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];saveJSON(LS_WISH,w);return w.includes(id)}
function addRecent(id){let r=loadJSON(LS_RECENT,[]).filter(x=>x!==id);r.unshift(id);saveJSON(LS_RECENT,r.slice(0,8))}
function getRecent(){return loadJSON(LS_RECENT,[]).map(id=>productById(id)).filter(Boolean)}
function trackClick(id){const c=loadJSON(LS_CLICKS,{});c[id]=(c[id]||0)+1;saveJSON(LS_CLICKS,c)}
function getClickCount(id){return loadJSON(LS_CLICKS,{})[id]||0}
