class e extends Error{constructor(e){super();let t="";for(const i in e)switch(i){case"name":this.name=e[i];break;case"message":t=`${e[i]}\n${t}`;break;default:{const a=`${i}: ${e[i]}`;t=`${t}${r(a,"gray",1)}\n`}}this.message=t||""}}const t=(e,{modifiers:t=[],tabs:r=0,tabSize:a=4}={})=>{let s="";for(const e of t)s=`${s}${e}`;const n=i.decorations.reset;return`${s}${" ".repeat(r*a)}${e}${n}`},r=(e,r,a=0)=>{const s=i.fgColors[r];return t(e,s?{modifiers:[s],tabs:a}:{tabs:a})},i={fgColors:{black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m",gray:"[90m"},bgColors:{black:"[40m",red:"[41m",green:"[42m",yellow:"[43m",blue:"[44m",magenta:"[45m",cyan:"[46m",white:"[47m",gray:"[100m"},decorations:{reset:"[0m",bright:"[1m",dim:"[2m",underline:"[4m",blink:"[5m",reverse:"[7m",hidden:"[8m"}},a=t=>{const r=t[0].length,i=[];for(const a of t){if(a.length!==r)throw new e({name:"ChannelError",message:"Channel row width does not match sample width","sample-width":length,"row-width":a.length});i.push(...a)}return i};class s{#e;#t;constructor({image:e,sample:t}){this.#e=e,this.#t={...t,max:Math.max(t.width,t.height)}}resize(e){this.#e.height=Math.round(this.#e.height*e/this.#e.width),this.#e.width=e}get image(){return this.#e}get sample(){return this.#t}}class n{#r;#i;#a;#s;#n;constructor({length:e=16,size:t=Math.floor(6*e/8),buffer:r=new ArrayBuffer(t)}={}){this.#r=r,this.#i=0,this.#a=0,this.#s=0,this.#n=0}write(e,{size:t=n.#o(e),offset:r=this.#s,signed:i=!1}={}){return this.#h().append(e,{size:t,offset:r,signed:i}).isWriteable?this.#l(e,{size:t,offset:r,signed:i}):NaN}writeAbsolute(e,{offset:t=this.#s,signed:r=!1}={}){const i={value:n.#o(e),size:5};if(!this.#h().append(i.value,{...i,offset:t}).append(e,{signed:r}).isWriteable)return NaN;this.#l(i.value,{...i,offset:t});return this.#l(e,{signed:r})}writeRelative(e,{offset:t=this.#s,signed:r=!1}={}){0===e&&(e=1);const i=n.#o(e)-this.#n,a={value:i>0?1<<i>>>0:0,size:Math.abs(i)+1};if(!this.#h().append(a.value,{...a,offset:t}).append(e,{signed:r}).isWriteable)return NaN;this.#l(a.value,{...a,offset:t});return this.#l(e,{signed:r})}writeString(e,{offset:t=this.#s}={}){const r={value:n.#o(e.length),size:5};let i=this.#h().append(r.value,{...r}).append(e.length);for(let t=0;t<e.length;t++)i=i.append(0,{size:8});if(!i.isWriteable)return"";this.#l(r.value,{...r,offset:t}),this.#l(e.length);for(const t of e)this.#l(t.charCodeAt(0),{size:8});return e}read(e,{offset:t=this.#i,signed:r=!1}={}){return this.#d().append(e,{offset:t,signed:r}).isReadable?this.#c(e,{offset:t,signed:r}):NaN}readAbsolute({offset:e=this.#i,signed:t=!1}={}){const r=this.#i,i=this.#a,a=this.#d().append(5,{offset:e});let s=0;return a.isReadable&&(s=this.#c(5,{offset:e}),a.append(s,{signed:t})),a.isReadable&&s?this.#c(s,{signed:t}):(this.#i=r,this.#a=i,NaN)}readRelative({offset:e=this.#i,signed:t=!1}={}){const r=this.#i,i=this.#a;let a=1;const s=this.#d().append(1,{offset:e});s.isReadable&&(a=this.#c(1,{offset:e})?1:-1);let n=0;for(;s.append(1).isReadable&&!this.#c(1);)n++;const o=i+a*n;return s.append(o,{signed:t}),s.isReadable&&o?(this.#i--,this.#c(o,{signed:t})):(this.#i=r,this.#a=i,NaN)}readString({offset:e=this.#i}={}){const t=this.#i,r=this.#a,i=this.#d().append(5,{offset:e});let a=0;i.isReadable&&(a=this.#c(5,{offset:e})),i.append(a);let s=0;if(i.isReadable&&(s=this.#c(a)),!i.isReadable||!s)return this.#i=t,this.#a=r,"";let n="";for(let e=0;e<s;e++){if(i.append(8),!i.isReadable)return this.#i=t,this.#a=r,"";n+=String.fromCharCode(this.#c(8))}return n}copy({target:t,targetStart:r=t?.writePointer||0,sourceStart:i=0,sourceEnd:a=this.bitLength}={}){if(i<0||a>this.bitLength)throw new e({name:"BitBufferError",message:"Requested bits out of source buffer range","source-start":i,"source-end":a,"source-bit-length":this.bitLength});const s=a-i,o=Math.ceil((s+r)/8);t??=new n({size:o});const h=t.bitLength-r;if(s>h)throw new e({name:"BitBufferError",message:"Source bits exceed bits available in target buffer","source-bits":s,"target-bits":h});for(let e=0;e<s;e++)t.write(this.#c(1,{offset:i+e}),{size:1,offset:r+e});return t}toString(){let e="",t=0,r=0;const i=new Uint8Array(this.#r);for(let a=0;a<3*Math.ceil(this.byteLength/3);a++){r=(r|(i[a]||0)<<16-8*t)>>>0,t=++t%3,t||(e+=n.#u(r),r=0)}return e}#h(){const e={writeable:!0,offset:this.#s},t=(r,{size:i=n.#o(r),offset:a=e.offset,signed:s=!1}={})=>{if(e.writeable){const t=Math.abs(r),o=this.bitLength-a;e.writeable=!(!s&&r<0)&&(!(n.#o(t)>i)&&(!!Number.isInteger(t)&&(!(i<0||i>32)&&!(i+(s?1:0)>o))))}return e.offset+=i,{append:t,get isWriteable(){return e.writeable}}};return{append:t,get isWriteable(){return e.writeable}}}#l(e,{size:t=n.#o(e),offset:r=this.#s,signed:i=!1}={}){const a=Math.abs(e),{view:s,byteLength:o,subBit:h}=this.#f(t,r);for(let e=0;e<o;e++){const r=s.getUint8(e);let i=0;for(let s=0;s<8;s++){const n=8*e+s;i|=(n<h||n>h+t?r<<24+s>>>31:a<<32-t+(n-h)>>>31)<<7-s}s.setUint8(e,i)}return this.#s=r+t,i&&this.#l(e>=0?1:0,{size:1}),this.#n=t,e}#d(){const e={readable:!0,offset:this.#i},t=(r,{offset:i=e.offset,signed:a=!1}={})=>{if(e.readable){const t=this.bitLength-i;e.readable=!(r<0||r>32)&&!(r+(a?1:0)>t)}return e.offset+=r,{append:t,get isReadable(){return e.readable}}};return{append:t,get isReadable(){return e.readable}}}#c(e,{offset:t=this.#i,signed:r=!1}={}){const{view:i,byteLength:a,subBit:s}=this.#f(e,t);let n=0;for(let e=0;e<a;e++){const t=24+s-8*e;n=t>=0?(n|i.getUint8(e)<<t)>>>0:(n|i.getUint8(e)>>>-t)>>>0}this.#i=t+e;const o=r&&0===this.#c(1)?-1:1;return this.#a=e,o*(n>>>32-e)}#f(e,t){const r=Math.floor(t/8),i=t-8*r,a=Math.ceil((i+e)/8);this.byteLength;return{view:new DataView(this.#r,r,a),byteLength:a,subBit:i}}get bitLength(){return this.byteLength<<3}get byteLength(){return this.#r.byteLength}get readPointer(){return this.#i}set readPointer(e){e<0||e>this.bitLength||(this.#i=e)}get lastReadSize(){return this.#a}set lastReadSize(e){e<0||e>32||(this.#a=e)}get writePointer(){return this.#s}set writePointer(e){e<0||e>this.bitLength||(this.#s=e)}get lastWriteSize(){return this.#n}set lastWriteSize(e){e<0||e>32||(this.#n=e)}static from(t){if(!t.match(/^[A-Za-z0-9\-_]*$/))throw new e({name:"BitBufferError",message:"Encoded string is not url-safe base 64 encoded","encoded-string":t});const r=new n({size:Math.ceil(3*t.length/4)}),i=/[A-Za-z0-9\-_]{1,4}/g;for(const e of t.match(i)||[]){const t=n.#m(e.padEnd(4,"A"));r.write(t,{size:24})}return r.writePointer=0,r.readPointer=0,r}static#m(e){let t=0;for(const[r,i]of e.split("").entries()){t=(t|n.#g.indexOf(i)<<18-6*r)>>>0}return t}static#u(e){let t="";for(let r=0;r<4;r++){const i=e>>>18-6*r<<26>>>26;t+=n.#g[i]}return t}static#o(e){return Math.abs(e).toString(2).length}static get#g(){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"}}class o{#b=[];#w=new Map;#p;#v;constructor(e,{limit:t=4}={}){this.#p=e,this.#v=t}addWorker(){const e=this.#p();return this.#w.set(e,NaN),e}postWorker(e,t,r){this.#w.set(e,NaN),e.onmessage=t=>{this.#L(e),r(t)},e.postMessage(t)}enqueue(e,t){let r;for(const[e,t]of this.#w)if(t){r=e;break}r?this.postWorker(r,e,t):this.#w.size<this.#v?(r=this.addWorker(),this.postWorker(r,e,t)):this.#b.push({message:e,callback:t})}#L(e){const{message:t,callback:r}=this.#b.shift()||{};t&&r?this.postWorker(e,t,r):(this.#w.set(e,Date.now()),setTimeout((()=>{const t=this.#w.get(e);Date.now()-t>1e3&&(e.terminate(),this.#w.delete(e))}),1050))}}class h{#A;#P;#R;#S;constructor(t){const{luma:r,chromaBlue:i,chromaRed:a}=t.match(/^(?<luma>[0-7]):(?<chromaBlue>[0-7]):(?<chromaRed>[0-7])$/)?.groups||{};if(!r||!i||!a)throw new e({name:"SubsamplingError",message:'Must be of form "x:y:z", digits from 0-7 inclusive',"subsampling-string":t});this.#A=parseInt(r),this.#P=parseInt(i),this.#R=parseInt(a),this.#S=this.#A+this.#P+this.#R}key(e){const t=e%this.#S;return t<this.#A?"luma":t<this.#A+this.#P?"chromaBlue":"chromaRed"}get luma(){return this.#A}get chromaBlue(){return this.#P}get chromaRed(){return this.#R}}function*l(e,t){const r=Array.from(Array.from({length:e}),(()=>Array.from({length:t}).fill(0)));let[i,a]=[0,0];for(;;)if(r[i][a]=yield r,0===a||i===e-1){const r=i+a+1;if(r>e+t-1)break;a=i>=t-1?t-1:i+1,i=r-a}else a--,i++}const d=(e,t=0,r=255,i=!0)=>(i&&(e=Math.round(e),t=Math.ceil(t),r=Math.floor(r)),Math.max(t,Math.min(r,e))),c=(e,t,r)=>{const i=[];for(let a=0;a<r.sample.width;a++){const r=e[a];i.push(f(r,t.y))}return f(i,t.x)},u=e=>{for(;e>=2*Math.PI;)e-=2*Math.PI;return e>Math.PI&&(e=2*Math.PI-e),e>Math.PI/2?5*(e=(e-Math.PI)*(e-Math.PI))/(e+Math.PI*Math.PI)-1:1-5*(e*=e)/(e+Math.PI*Math.PI)},f=(e,t)=>{let r=0;for(let i=0;i<e.length;i++){let a=e[i]*u((2*t+1)*Math.PI*i/(2*e.length));a*=0===i?Math.SQRT1_2:1,r+=a}return r*=Math.sqrt(2/e.length),r=Math.round(r),r},m=0,g=48,b=57,w=8;class p{#M;#r;#y;#z;constructor(t){if(!t.match(/^[A-Za-z0-9\-_]{16,}$/))throw new e({name:"BlurridDecoderError",message:"String minimum 16 url-safe base 64 encoded chars","serialized-dct":t});this.#M=t,this.#r=n.from(t),this.#y=new s(this.#_()),this.#z=this.#E()}toImageData(){const{luma:t,chromaBlue:r,chromaRed:i}=this.#z;return((e,t=255)=>{const r=[];for(let n=0;n<e.length;n+=3){const{red:o,green:h,blue:l}=(i=e[n],a=e[n+1],s=e[n+2],i=d(i),a=d(a),s=d(s),a-=128,{red:d(i+1.4*(s-=128)),green:d(i-.34*a-.71*s),blue:d(i+1.77*a)});r.push(o,h,l,t)}var i,a,s;return r})((t=>{const r=t.map((e=>a(e))),i=r[0].length,s=Array.from({length:r.length*i}).fill(0);for(const[t,a]of r.entries()){if(a.length!==i)throw new e({name:"ChannelError",message:"Sample channels not of same length","default-length":i,"channel-length":a.length});for(const[e,i]of a.entries())s[r.length*e+t]=i}return s})(((e,t)=>{const[r,i,a]=e,s=()=>Array.from(Array.from({length:t.image.height}),(()=>Array.from({length:t.image.width}).fill(0))),n=[s(),s(),s()],[o,h,l]=n;for(let e=0;e<t.image.height;e++)for(let s=0;s<t.image.width;s++){const n={x:s/t.image.width*t.sample.width,y:e/t.image.height*t.sample.height};o[e][s]=c(r,n,t),h[e][s]=c(i,n,t),l[e][s]=c(a,n,t)}return n})([t,r,i],this.#y)))}#_(){this.#r.readPointer=m;return{image:{width:this.#r.read(16),height:this.#r.read(16)},sample:{width:this.#r.read(8),height:this.#r.read(8)}}}#I(){this.#r.readPointer=g;const e=this.#r.read(3),t=this.#r.read(3),r=this.#r.read(3);return new h(`${e}:${t}:${r}`)}#E(){const e=this.#k();let[t,r,i]=e.next().value;for(this.#r.readPointer=b,this.#r.lastReadSize=w;;){const a=this.#r.readRelative({signed:!0});if(isNaN(a))break;[t,r,i]=e.next(a).value}return{luma:t,chromaBlue:r,chromaRed:i}}#k(){return function*(e,t,r){const i={luma:l(e,t),chromaBlue:l(e,t),chromaRed:l(e,t)},a=[i.luma.next().value,i.chromaBlue.next().value,i.chromaRed.next().value];let s=0;do{const e=yield a,t=r.key(s),n=i[t].next(e);if(n.done)break;"luma"===t?a[0]=n.value:"chromaBlue"===t?a[1]=n.value:a[2]=n.value}while(++s)}(this.#y.sample.width,this.#y.sample.height,this.#I())}get serializedDct(){return this.#M}get metadata(){return this.#y}get coefficients(){return this.#z}}const v=e=>{const t=document.createElement("canvas");t.width=e.image.width,t.height=e.image.height;const r=t.getContext("2d");return{canvas:t,context:r}},L=(e,t)=>{const r=e.createProgram();return e.attachShader(r,t.vertex),e.attachShader(r,t.fragment),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)||(console.warn(e.getProgramInfoLog(r)),e.deleteProgram(r)),r},A=(e,t,r,i={})=>{for(const e in i){const t=new RegExp(`{{${e}}}`,"g");r=r.replaceAll(t,`${i[e]}`)}const a=e.createShader(t);return e.shaderSource(a,r),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)||(console.warn(e.getShaderInfoLog(a)),e.deleteShader(a)),a},P=e=>{const{metadata:t,coefficients:r}=e,{canvas:i,context:a,program:s}=(e=>{const t=document.createElement("canvas");t.width=e.image.width,t.height=e.image.height;const r=t.getContext("webgl"),i={vertex:A(r,r.VERTEX_SHADER,"#define GLSLIFY 1\nattribute vec4 a_position;void main(){gl_Position=a_position;}"),fragment:A(r,r.FRAGMENT_SHADER,"precision mediump float;\n#define GLSLIFY 1\nuniform vec4 u_color;uniform float u_image_width;uniform float u_image_height;uniform float u_lumaDct[{{SAMPLE_NORMALIZED_TOTAL}}];uniform float u_chromaBlueDct[{{SAMPLE_NORMALIZED_TOTAL}}];uniform float u_chromaRedDct[{{SAMPLE_NORMALIZED_TOTAL}}];float kFactor(int x){if(x==0){return 0.7071;}else{return 1.0;}}float decode1D(float array1D[{{SAMPLE_MAX}}],float point,int samples){float float_samples=float(samples);float result=0.0;for(int i=0;i<{{SAMPLE_MAX}};i++){if(float(array1D[i])==0.0||i>=samples){break;}float partial=float(array1D[i])*cos(((2.0*point+1.0)*3.14*float(i))/(2.0*float_samples));partial*=kFactor(i);result+=partial;}result*=sqrt(2.0/float_samples);return result;}float decode2D(float array2D[{{SAMPLE_NORMALIZED_TOTAL}}],vec2 uv){float row[{{SAMPLE_MAX}}];float x=uv.x*{{SAMPLE_WIDTH}}.0;float y=(1.0-uv.y)*{{SAMPLE_HEIGHT}}.0;for(int i=0;i<{{SAMPLE_MAX}};i++){float column[{{SAMPLE_MAX}}];for(int j=0;j<{{SAMPLE_MAX}};j++){column[j]=array2D[i*{{SAMPLE_MAX}}+j];}row[i]=decode1D(column,y,{{SAMPLE_HEIGHT}});}float result=decode1D(row,x,{{SAMPLE_WIDTH}});return result;}vec4 yCbCrToRgb(float luma,float chromaBlue,float chromaRed){float red=luma+1.40*(chromaRed-128.0);float green=luma-0.34*(chromaBlue-128.0)-0.71*(chromaRed-128.0);float blue=luma+1.77*(chromaBlue-128.0);red=floor(clamp(red,0.0,255.0)+0.5)/255.0;green=floor(clamp(green,0.0,255.0)+0.5)/255.0;blue=floor(clamp(blue,0.0,255.0)+0.5)/255.0;return vec4(red,green,blue,1.0);}void main(){vec2 uv=gl_FragCoord.xy;uv.x/=u_image_width;uv.y/=u_image_height;gl_FragColor=yCbCrToRgb(decode2D(u_lumaDct,uv),decode2D(u_chromaBlueDct,uv),decode2D(u_chromaRedDct,uv));}",{SAMPLE_WIDTH:e.sample.width,SAMPLE_HEIGHT:e.sample.height,SAMPLE_MAX:e.sample.max,SAMPLE_NORMALIZED_TOTAL:e.sample.max**2})},a=L(r,i),s={index:r.getAttribLocation(a,"a_position"),size:2,type:r.FLOAT,normalize:!1,stride:0,offset:0},n=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,n),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,1,1,1,1,-1,1,-1,-1,-1,-1,1]),r.STATIC_DRAW),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(a),r.enableVertexAttribArray(s.index);const{index:o,size:h,type:l,normalize:d,stride:c,offset:u}=s;return r.vertexAttribPointer(o,h,l,d,c,u),{canvas:t,context:r,program:a}})(t),n={u_color:{type:"uniform4fv",data:[1,0,0,1]},u_image_width:{type:"uniform1f",data:t.image.width},u_image_height:{type:"uniform1f",data:t.image.height},u_lumaDct:{type:"uniform1fv",data:R(r.luma,t)},u_chromaBlueDct:{type:"uniform1fv",data:R(r.chromaBlue,t)},u_chromaRedDct:{type:"uniform1fv",data:R(r.chromaRed,t)}};for(const e in n){const t=a.getUniformLocation(s,e);a[n[e].type](t,n[e].data)}const o={primitiveType:a.TRIANGLES,offset:0,count:6},{primitiveType:h,offset:l,count:d}=o;return a.drawArrays(h,l,d),i.toDataURL()},R=(e,t)=>{const r=t.sample.max;return Array.from({length:r**2},((t,i)=>e.flatMap((e=>Array.from({length:r},((t,r)=>e[r]||0))))[i]||0))},S=()=>new Worker(new URL("./worker.js",import.meta.url),{type:"module"});class M extends HTMLImageElement{decoder=new p(this.dataset.blurrid||"A".repeat(10));constructor(){super();const e=()=>{this.removeEventListener("load",e),this.blur(),"onclick"===this.dataset.loading?this.loadOnClick():"lazy"===this.dataset.loading?this.loadOnIntersection():this.loadImage()};this.addEventListener("load",e),this.#D&&this.decoder.metadata.resize(this.#D);const{canvas:t}=v(this.decoder.metadata);this.src=t.toDataURL()}blur(){const e=this.decoder.metadata.sample.max;!window.WebGLRenderingContext||e>16?this.dataset.loading="eager":this.src=P(this.decoder)}loadImage(){const e=document.createElement("img");for(const t of this.attributes){const{name:r,value:i}=t;this.#x.includes(r)||e.setAttribute(r,i)}const t=()=>{e.removeEventListener("load",t);const{width:r,height:i}=this.getBoundingClientRect();e.style.width=`${r}px`,e.style.height=`${i}px`;const a=[{opacity:1},{opacity:0}],s={easing:"ease-out",duration:500},n=e.cloneNode();n.style.opacity="0",n.style.position="absolute",this.before(n),this.animate(a,s),n.animate(a,{...s,direction:"reverse"}).addEventListener("finish",(()=>{this.replaceWith(e),n.remove()}))};e.addEventListener("load",t),this.dataset.srcset&&e.setAttribute("srcset",this.dataset.srcset),e.setAttribute("src",this.dataset.src||"")}loadOnClick(){const e=()=>{this.removeEventListener("click",e),this.loadImage()};this.addEventListener("click",e)}loadOnIntersection(){const e=new IntersectionObserver((t=>{t[0].isIntersecting&&(e.disconnect(),this.loadImage())}),{threshold:.5});e.observe(this)}get#D(){if(this.dataset.size)return parseInt(this.dataset.size);if(!this.sizes||!this.dataset.srcset)return;let e;const t=/(?<query>\(.*\))[\s\n]*(?<width>\d*)(?<unit>px|vw),/g,r=/(?<width>\d*)(?<unit>px|vw)[\s\n]*$/,i=/[\s\n](?<srcsetWidth>\d*)w,?/g;for(const r of this.sizes.matchAll(t)){const{query:t,width:i,unit:a}=r?.groups||{};if(matchMedia(t).matches){e={width:i,unit:a};break}}if(!e){const{width:t,unit:i}=this.sizes.match(r)?.groups||{};e={width:t,unit:i}}const a="vw"===e?.unit?parseInt(e?.width||"0")/100*window.innerWidth:parseInt(e?.width||"0");for(const e of this.dataset.srcset.matchAll(i)){const{srcsetWidth:t}=e?.groups||{};if(parseInt(t)>=a)return parseInt(t)}}get#x(){return["is","src","data-src","data-srcset","data-loading","data-blurrid","data-worker-start","data-worker-steps"]}}let y;class z extends M{#B=parseInt(this.dataset.workerStart||"16");#W=parseInt(this.dataset.workerSteps||"2");constructor(){super()}blur(){const e=this.decoder.metadata.sample.max;if(!window.WebGLRenderingContext||e>16){y||(y=new o(S));const e=v(this.decoder.metadata);this.stepWorker(e.canvas.toDataURL(),e)}else this.src=P(this.decoder)}stepWorker(e,t,r){if(this.src=e,r??=this.#B,r<this.#B*2**this.#W){const e={serializedDct:this.decoder.serializedDct,width:2*r};y?.enqueue(e,(e=>{const{imageData:r,imageData:{width:i}}=e.data;((e,t,r)=>new Promise((i=>{const a=document.createElement("img"),s=()=>{const{width:t,height:r}=e.canvas;e.context.drawImage(a,0,0,t,r),a.removeEventListener("load",s),a.remove(),i(e.canvas.toDataURL())};a.addEventListener("load",s),r.metadata.resize(t.width);const{canvas:n,context:o}=v(r.metadata);o.putImageData(t,0,0),a.src=n.toDataURL()})))(t,r,this.decoder).then((e=>{this.stepWorker(e,t,i)}))}))}}}export{M as BlurridImage,z as BlurridImageWorker,P as getDataUrl};
