!function(){class e extends Error{constructor(e){super();let t="";for(let r in e)switch(r){case"name":this.name=e[r];break;case"message":t=`${e[r]}
${t}`;break;default:{let a=`${r}: ${e[r]}`;t=`${t}${i(a,"gray",1)}
`}}this.message=t||""}}let t=(e,{modifiers:t=[],tabs:i=0,tabSize:a=4}={})=>{let s="";for(let e of t)s=`${s}${e}`;let h=r.decorations.reset,n=" ".repeat(i*a);return`${s}${n}${e}${h}`},i=(e,i,a=0)=>{let s=r.fgColors[i];return s?t(e,{modifiers:[s],tabs:a}):t(e,{tabs:a})},r={fgColors:{black:"\x1b[30m",red:"\x1b[31m",green:"\x1b[32m",yellow:"\x1b[33m",blue:"\x1b[34m",magenta:"\x1b[35m",cyan:"\x1b[36m",white:"\x1b[37m",gray:"\x1b[90m"},decorations:{reset:"\x1b[0m",bright:"\x1b[1m",dim:"\x1b[2m",underline:"\x1b[4m",blink:"\x1b[5m",reverse:"\x1b[7m",hidden:"\x1b[8m"}},a=t=>{let i=t.map(e=>s(e)),r=i[0].length,a=Array.from({length:i.length*r}).fill(0);for(let[t,s]of i.entries()){if(s.length!==r)throw new e({name:"ChannelError",message:"Sample channels not of same length","default-length":r,"channel-length":s.length});for(let[e,r]of s.entries())a[i.length*e+t]=r}return a},s=t=>{let i=t[0].length,r=[];for(let a of t){if(a.length!==i)throw new e({name:"ChannelError",message:"Channel row width does not match sample width","sample-width":length,"row-width":a.length});r.push(...a)}return r};class h{#e;#t;constructor({image:e,sample:t}){this.#e=e,this.#t={...t,max:Math.max(t.width,t.height)}}resize(e){this.#e.height=Math.round(this.#e.height*e/this.#e.width),this.#e.width=e}get image(){return this.#e}get sample(){return this.#t}}class n{#i;#r;#a;#s;#h;constructor({length:e=16,size:t=Math.floor(6*e/8),buffer:i=new ArrayBuffer(t)}={}){this.#i=i,this.#r=0,this.#a=0,this.#s=0,this.#h=0}write(e,{size:t=n.#n(e),offset:i=this.#s,signed:r=!1}={}){return this.#l().append(e,{size:t,offset:i,signed:r}).isWriteable?this.#o(e,{size:t,offset:i,signed:r}):NaN}writeAbsolute(e,{offset:t=this.#s,signed:i=!1}={}){let r={value:n.#n(e),size:5};return this.#l().append(r.value,{...r,offset:t}).append(e,{signed:i}).isWriteable?(this.#o(r.value,{...r,offset:t}),this.#o(e,{signed:i})):NaN}writeRelative(e,{offset:t=this.#s,signed:i=!1}={}){0===e&&(e=1);let r=n.#n(e)-this.#h,a={value:r>0?1<<r>>>0:0,size:Math.abs(r)+1};return this.#l().append(a.value,{...a,offset:t}).append(e,{signed:i}).isWriteable?(this.#o(a.value,{...a,offset:t}),this.#o(e,{signed:i})):NaN}writeString(e,{offset:t=this.#s}={}){let i={value:n.#n(e.length),size:5},r=this.#l().append(i.value,{...i}).append(e.length);for(let t=0;t<e.length;t++)r=r.append(0,{size:8});if(!r.isWriteable)return"";for(let r of(this.#o(i.value,{...i,offset:t}),this.#o(e.length),e))this.#o(r.charCodeAt(0),{size:8});return e}read(e,{offset:t=this.#r,signed:i=!1}={}){return this.#d().append(e,{offset:t,signed:i}).isReadable?this.#f(e,{offset:t,signed:i}):NaN}readAbsolute({offset:e=this.#r,signed:t=!1}={}){let i=this.#r,r=this.#a,a=this.#d().append(5,{offset:e}),s=0;return(a.isReadable&&(s=this.#f(5,{offset:e}),a.append(s,{signed:t})),a.isReadable&&s)?this.#f(s,{signed:t}):(this.#r=i,this.#a=r,NaN)}readRelative({offset:e=this.#r,signed:t=!1}={}){let i=this.#r,r=this.#a,a=1,s=this.#d().append(1,{offset:e});s.isReadable&&(a=this.#f(1,{offset:e})?1:-1);let h=0;for(;s.append(1).isReadable&&!this.#f(1);)h++;let n=r+a*h;return(s.append(n,{signed:t}),s.isReadable&&n)?(this.#r--,this.#f(n,{signed:t})):(this.#r=i,this.#a=r,NaN)}readString({offset:e=this.#r}={}){let t=this.#r,i=this.#a,r=this.#d().append(5,{offset:e}),a=0;r.isReadable&&(a=this.#f(5,{offset:e})),r.append(a);let s=0;if(r.isReadable&&(s=this.#f(a)),!r.isReadable||!s)return this.#r=t,this.#a=i,"";let h="";for(let e=0;e<s;e++){if(r.append(8),!r.isReadable)return this.#r=t,this.#a=i,"";h+=String.fromCharCode(this.#f(8))}return h}copy({target:t,targetStart:i=t?.writePointer||0,sourceStart:r=0,sourceEnd:a=this.bitLength}={}){if(r<0||a>this.bitLength)throw new e({name:"BitBufferError",message:"Requested bits out of source buffer range","source-start":r,"source-end":a,"source-bit-length":this.bitLength});let s=a-r,h=(t??=new n({size:Math.ceil((s+i)/8)})).bitLength-i;if(s>h)throw new e({name:"BitBufferError",message:"Source bits exceed bits available in target buffer","source-bits":s,"target-bits":h});for(let e=0;e<s;e++)t.write(this.#f(1,{offset:r+e}),{size:1,offset:i+e});return t}toString(){let e="",t=0,i=0,r=new Uint8Array(this.#i);for(let a=0;a<3*Math.ceil(this.byteLength/3);a++)i=(i|(r[a]||0)<<16-8*t)>>>0,(t=++t%3)||(e+=n.#u(i),i=0);return e}#l(){let e={writeable:!0,offset:this.#s},t=(i,{size:r=n.#n(i),offset:a=e.offset,signed:s=!1}={})=>{if(e.writeable){let t=Math.abs(i),h=this.bitLength-a;e.writeable=(!!s||!(i<0))&&!(n.#n(t)>r)&&!!Number.isInteger(t)&&!(r<0)&&!(r>32)&&!(r+(s?1:0)>h)}return e.offset+=r,{append:t,get isWriteable(){return e.writeable}}};return{append:t,get isWriteable(){return e.writeable}}}#o(e,{size:t=n.#n(e),offset:i=this.#s,signed:r=!1}={}){let a=Math.abs(e),{view:s,byteLength:h,subBit:l}=this.#g(t,i);for(let e=0;e<h;e++){let i=s.getUint8(e),r=0;for(let s=0;s<8;s++){let h=8*e+s;r|=(h<l||h>l+t?i<<24+s>>>31:a<<32-t+(h-l)>>>31)<<7-s}s.setUint8(e,r)}return this.#s=i+t,r&&this.#o(e>=0?1:0,{size:1}),this.#h=t,e}#d(){let e={readable:!0,offset:this.#r},t=(i,{offset:r=e.offset,signed:a=!1}={})=>{if(e.readable){let t=this.bitLength-r;e.readable=!(i<0)&&!(i>32)&&!(i+(a?1:0)>t)}return e.offset+=i,{append:t,get isReadable(){return e.readable}}};return{append:t,get isReadable(){return e.readable}}}#f(e,{offset:t=this.#r,signed:i=!1}={}){let{view:r,byteLength:a,subBit:s}=this.#g(e,t),h=0;for(let e=0;e<a;e++){let t=24+s-8*e;h=t>=0?(h|r.getUint8(e)<<t)>>>0:(h|r.getUint8(e)>>>-t)>>>0}this.#r=t+e;let n=i&&0===this.#f(1)?-1:1;return this.#a=e,n*(h>>>32-e)}#g(e,t){let i=Math.floor(t/8),r=t-8*i,a=Math.ceil((r+e)/8);return this.byteLength,{view:new DataView(this.#i,i,a),byteLength:a,subBit:r}}get bitLength(){return this.byteLength<<3}get byteLength(){return this.#i.byteLength}get readPointer(){return this.#r}set readPointer(e){e<0||e>this.bitLength||(this.#r=e)}get lastReadSize(){return this.#a}set lastReadSize(e){e<0||e>32||(this.#a=e)}get writePointer(){return this.#s}set writePointer(e){e<0||e>this.bitLength||(this.#s=e)}get lastWriteSize(){return this.#h}set lastWriteSize(e){e<0||e>32||(this.#h=e)}static from(t){if(!t.match(/^[A-Za-z0-9\-_]*$/))throw new e({name:"BitBufferError",message:"Encoded string is not url-safe base 64 encoded","encoded-string":t});let i=new n({size:Math.ceil(3*t.length/4)});for(let e of t.match(/[A-Za-z0-9\-_]{1,4}/g)||[]){let t=n.#m(e.padEnd(4,"A"));i.write(t,{size:24})}return i.writePointer=0,i.readPointer=0,i}static #m(e){let t=0;for(let[i,r]of e.split("").entries())t=(t|n.#b.indexOf(r)<<18-6*i)>>>0;return t}static #u(e){let t="";for(let i=0;i<4;i++){let r=e>>>18-6*i<<26>>>26;t+=n.#b[r]}return t}static #n(e){return Math.abs(e).toString(2).length}static get #b(){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"}}class l{#c;#w;#p;#z;constructor(t){let{luma:i,chromaBlue:r,chromaRed:a}=t.match(/^(?<luma>[0-7]):(?<chromaBlue>[0-7]):(?<chromaRed>[0-7])$/)?.groups||{};if(!i||!r||!a)throw new e({name:"SubsamplingError",message:'Must be of form "x:y:z", digits from 0-7 inclusive',"subsampling-string":t});this.#c=parseInt(i),this.#w=parseInt(r),this.#p=parseInt(a),this.#z=this.#c+this.#w+this.#p}key(e){let t=e%this.#z;return t<this.#c?"luma":t<this.#c+this.#w?"chromaBlue":"chromaRed"}get luma(){return this.#c}get chromaBlue(){return this.#w}get chromaRed(){return this.#p}}function*o(e,t){let i=Array.from(Array.from({length:e}),()=>Array.from({length:t}).fill(0)),[r,a]=[0,0];for(;;)if(i[r][a]=yield i,0===a||r===e-1){let i=r+a+1;if(i>e+t-1)break;r=i-(a=r>=t-1?t-1:r+1)}else a--,r++}let d=(e,t=0,i=255,r=!0)=>(r&&(e=Math.round(e),t=Math.ceil(t),i=Math.floor(i)),Math.max(t,Math.min(i,e))),f=(e,t,i)=>(e=d(e),t=d(t),i=d(i),t-=128,{red:d(e+1.4*(i-=128)),green:d(e-.34*t-.71*i),blue:d(e+1.77*t)}),u=(e,t=255)=>{let i=[];for(let r=0;r<e.length;r+=3){let{red:a,green:s,blue:h}=f(e[r],e[r+1],e[r+2]);i.push(a,s,h,t)}return i},g=(e,t)=>{let[i,r,a]=e,s=()=>Array.from(Array.from({length:t.image.height}),()=>Array.from({length:t.image.width}).fill(0)),h=[s(),s(),s()],[n,l,o]=h;for(let e=0;e<t.image.height;e++)for(let s=0;s<t.image.width;s++){let h={x:s/t.image.width*t.sample.width,y:e/t.image.height*t.sample.height};n[e][s]=m(i,h,t),l[e][s]=m(r,h,t),o[e][s]=m(a,h,t)}return h},m=(e,t,i)=>{let r=[];for(let a=0;a<i.sample.width;a++){let i=e[a];r.push(c(i,t.y))}return c(r,t.x)},b=e=>{for(;e>=2*Math.PI;)e-=2*Math.PI;return(e>Math.PI&&(e=2*Math.PI-e),e>Math.PI/2)?5*(e=(e-Math.PI)*(e-Math.PI))/(e+Math.PI*Math.PI)-1:1-5*(e*=e)/(e+Math.PI*Math.PI)},c=(e,t)=>{let i=0;for(let r=0;r<e.length;r++){let a=e[r]*b((2*t+1)*Math.PI*r/(2*e.length));a*=0===r?Math.SQRT1_2:1,i+=a}return i*=Math.sqrt(2/e.length),i=Math.round(i)};class w{#P;#i;#R;#M;constructor(t){if(!t.match(/^[A-Za-z0-9\-_]{16,}$/))throw new e({name:"BlurridDecoderError",message:"String minimum 16 url-safe base 64 encoded chars","serialized-dct":t});this.#P=t,this.#i=n.from(t),this.#R=new h(this.#S()),this.#M=this.#x()}toImageData(){let{luma:e,chromaBlue:t,chromaRed:i}=this.#M;return u(a(g([e,t,i],this.#R)))}#S(){return this.#i.readPointer=0,{image:{width:this.#i.read(16),height:this.#i.read(16)},sample:{width:this.#i.read(8),height:this.#i.read(8)}}}#y(){this.#i.readPointer=48;let e=this.#i.read(3),t=this.#i.read(3),i=this.#i.read(3);return new l(`${e}:${t}:${i}`)}#x(){let e=this.#v(),[t,i,r]=e.next().value;for(this.#i.readPointer=57,this.#i.lastReadSize=8;;){let a=this.#i.readRelative({signed:!0});if(isNaN(a))break;[t,i,r]=e.next(a).value}return{luma:t,chromaBlue:i,chromaRed:r}}#v(){return function*(e,t,i){let r={luma:o(e,t),chromaBlue:o(e,t),chromaRed:o(e,t)},a=[r.luma.next().value,r.chromaBlue.next().value,r.chromaRed.next().value],s=0;do{let e=yield a,t=i.key(s),h=r[t].next(e);if(h.done)break;"luma"===t?a[0]=h.value:"chromaBlue"===t?a[1]=h.value:a[2]=h.value}while(++s)}(this.#R.sample.width,this.#R.sample.height,this.#y())}get serializedDct(){return this.#P}get metadata(){return this.#R}get coefficients(){return this.#M}}onmessage=e=>{let t=new w(e.data.serializedDct);t.metadata.resize(e.data.width),postMessage({imageData:new ImageData(new Uint8ClampedArray(t.toImageData()),t.metadata.image.width,t.metadata.image.height)})}}();
//# sourceMappingURL=worker.234ccd80.js.map
