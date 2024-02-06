let e;import{createIcons as t,Info as r}from"lucide";function i(e){return e&&e.__esModule?e.default:e}class a extends Error{constructor(e){super();let t="";for(let r in e)switch(r){case"name":this.name=e[r];break;case"message":t=`${e[r]}
${t}`;break;default:{let i=`${r}: ${e[r]}`;t=`${t}${n(i,"gray",1)}
`}}this.message=t||""}}let s=(e,{modifiers:t=[],tabs:r=0,tabSize:i=4}={})=>{let a="";for(let e of t)a=`${a}${e}`;let s=o.decorations.reset,n=" ".repeat(r*i);return`${a}${n}${e}${s}`},n=(e,t,r=0)=>{let i=o.fgColors[t];return i?s(e,{modifiers:[i],tabs:r}):s(e,{tabs:r})},o={fgColors:{black:"\x1b[30m",red:"\x1b[31m",green:"\x1b[32m",yellow:"\x1b[33m",blue:"\x1b[34m",magenta:"\x1b[35m",cyan:"\x1b[36m",white:"\x1b[37m",gray:"\x1b[90m"},decorations:{reset:"\x1b[0m",bright:"\x1b[1m",dim:"\x1b[2m",underline:"\x1b[4m",blink:"\x1b[5m",reverse:"\x1b[7m",hidden:"\x1b[8m"}},l=e=>{let t=e.map(e=>h(e)),r=t[0].length,i=Array.from({length:t.length*r}).fill(0);for(let[e,s]of t.entries()){if(s.length!==r)throw new a({name:"ChannelError",message:"Sample channels not of same length","default-length":r,"channel-length":s.length});for(let[r,a]of s.entries())i[t.length*r+e]=a}return i},h=e=>{let t=e[0].length,r=[];for(let i of e){if(i.length!==t)throw new a({name:"ChannelError",message:"Channel row width does not match sample width","sample-width":length,"row-width":i.length});r.push(...i)}return r};class d{#e;#t;constructor({image:e,sample:t}){this.#e=e,this.#t={...t,max:Math.max(t.width,t.height)}}resize(e){this.#e.height=Math.round(this.#e.height*e/this.#e.width),this.#e.width=e}get image(){return this.#e}get sample(){return this.#t}}class u{#r;#i;#a;#s;#n;constructor({length:e=16,size:t=Math.floor(6*e/8),buffer:r=new ArrayBuffer(t)}={}){this.#r=r,this.#i=0,this.#a=0,this.#s=0,this.#n=0}write(e,{size:t=u.#o(e),offset:r=this.#s,signed:i=!1}={}){return this.#l().append(e,{size:t,offset:r,signed:i}).isWriteable?this.#h(e,{size:t,offset:r,signed:i}):NaN}writeAbsolute(e,{offset:t=this.#s,signed:r=!1}={}){let i={value:u.#o(e),size:5};return this.#l().append(i.value,{...i,offset:t}).append(e,{signed:r}).isWriteable?(this.#h(i.value,{...i,offset:t}),this.#h(e,{signed:r})):NaN}writeRelative(e,{offset:t=this.#s,signed:r=!1}={}){0===e&&(e=1);let i=u.#o(e)-this.#n,a={value:i>0?1<<i>>>0:0,size:Math.abs(i)+1};return this.#l().append(a.value,{...a,offset:t}).append(e,{signed:r}).isWriteable?(this.#h(a.value,{...a,offset:t}),this.#h(e,{signed:r})):NaN}writeString(e,{offset:t=this.#s}={}){let r={value:u.#o(e.length),size:5},i=this.#l().append(r.value,{...r}).append(e.length);for(let t=0;t<e.length;t++)i=i.append(0,{size:8});if(!i.isWriteable)return"";for(let i of(this.#h(r.value,{...r,offset:t}),this.#h(e.length),e))this.#h(i.charCodeAt(0),{size:8});return e}read(e,{offset:t=this.#i,signed:r=!1}={}){return this.#d().append(e,{offset:t,signed:r}).isReadable?this.#u(e,{offset:t,signed:r}):NaN}readAbsolute({offset:e=this.#i,signed:t=!1}={}){let r=this.#i,i=this.#a,a=this.#d().append(5,{offset:e}),s=0;return(a.isReadable&&(s=this.#u(5,{offset:e}),a.append(s,{signed:t})),a.isReadable&&s)?this.#u(s,{signed:t}):(this.#i=r,this.#a=i,NaN)}readRelative({offset:e=this.#i,signed:t=!1}={}){let r=this.#i,i=this.#a,a=1,s=this.#d().append(1,{offset:e});s.isReadable&&(a=this.#u(1,{offset:e})?1:-1);let n=0;for(;s.append(1).isReadable&&!this.#u(1);)n++;let o=i+a*n;return(s.append(o,{signed:t}),s.isReadable&&o)?(this.#i--,this.#u(o,{signed:t})):(this.#i=r,this.#a=i,NaN)}readString({offset:e=this.#i}={}){let t=this.#i,r=this.#a,i=this.#d().append(5,{offset:e}),a=0;i.isReadable&&(a=this.#u(5,{offset:e})),i.append(a);let s=0;if(i.isReadable&&(s=this.#u(a)),!i.isReadable||!s)return this.#i=t,this.#a=r,"";let n="";for(let e=0;e<s;e++){if(i.append(8),!i.isReadable)return this.#i=t,this.#a=r,"";n+=String.fromCharCode(this.#u(8))}return n}copy({target:e,targetStart:t=e?.writePointer||0,sourceStart:r=0,sourceEnd:i=this.bitLength}={}){if(r<0||i>this.bitLength)throw new a({name:"BitBufferError",message:"Requested bits out of source buffer range","source-start":r,"source-end":i,"source-bit-length":this.bitLength});let s=i-r,n=(e??=new u({size:Math.ceil((s+t)/8)})).bitLength-t;if(s>n)throw new a({name:"BitBufferError",message:"Source bits exceed bits available in target buffer","source-bits":s,"target-bits":n});for(let i=0;i<s;i++)e.write(this.#u(1,{offset:r+i}),{size:1,offset:t+i});return e}toString(){let e="",t=0,r=0,i=new Uint8Array(this.#r);for(let a=0;a<3*Math.ceil(this.byteLength/3);a++)r=(r|(i[a]||0)<<16-8*t)>>>0,(t=++t%3)||(e+=u.#f(r),r=0);return e}#l(){let e={writeable:!0,offset:this.#s},t=(r,{size:i=u.#o(r),offset:a=e.offset,signed:s=!1}={})=>{if(e.writeable){let t=Math.abs(r),n=this.bitLength-a;e.writeable=(!!s||!(r<0))&&!(u.#o(t)>i)&&!!Number.isInteger(t)&&!(i<0)&&!(i>32)&&!(i+(s?1:0)>n)}return e.offset+=i,{append:t,get isWriteable(){return e.writeable}}};return{append:t,get isWriteable(){return e.writeable}}}#h(e,{size:t=u.#o(e),offset:r=this.#s,signed:i=!1}={}){let a=Math.abs(e),{view:s,byteLength:n,subBit:o}=this.#m(t,r);for(let e=0;e<n;e++){let r=s.getUint8(e),i=0;for(let s=0;s<8;s++){let n=8*e+s;i|=(n<o||n>o+t?r<<24+s>>>31:a<<32-t+(n-o)>>>31)<<7-s}s.setUint8(e,i)}return this.#s=r+t,i&&this.#h(e>=0?1:0,{size:1}),this.#n=t,e}#d(){let e={readable:!0,offset:this.#i},t=(r,{offset:i=e.offset,signed:a=!1}={})=>{if(e.readable){let t=this.bitLength-i;e.readable=!(r<0)&&!(r>32)&&!(r+(a?1:0)>t)}return e.offset+=r,{append:t,get isReadable(){return e.readable}}};return{append:t,get isReadable(){return e.readable}}}#u(e,{offset:t=this.#i,signed:r=!1}={}){let{view:i,byteLength:a,subBit:s}=this.#m(e,t),n=0;for(let e=0;e<a;e++){let t=24+s-8*e;n=t>=0?(n|i.getUint8(e)<<t)>>>0:(n|i.getUint8(e)>>>-t)>>>0}this.#i=t+e;let o=r&&0===this.#u(1)?-1:1;return this.#a=e,o*(n>>>32-e)}#m(e,t){let r=Math.floor(t/8),i=t-8*r,a=Math.ceil((i+e)/8);return this.byteLength,{view:new DataView(this.#r,r,a),byteLength:a,subBit:i}}get bitLength(){return this.byteLength<<3}get byteLength(){return this.#r.byteLength}get readPointer(){return this.#i}set readPointer(e){e<0||e>this.bitLength||(this.#i=e)}get lastReadSize(){return this.#a}set lastReadSize(e){e<0||e>32||(this.#a=e)}get writePointer(){return this.#s}set writePointer(e){e<0||e>this.bitLength||(this.#s=e)}get lastWriteSize(){return this.#n}set lastWriteSize(e){e<0||e>32||(this.#n=e)}static from(e){if(!e.match(/^[A-Za-z0-9\-_]*$/))throw new a({name:"BitBufferError",message:"Encoded string is not url-safe base 64 encoded","encoded-string":e});let t=new u({size:Math.ceil(3*e.length/4)});for(let r of e.match(/[A-Za-z0-9\-_]{1,4}/g)||[]){let e=u.#c(r.padEnd(4,"A"));t.write(e,{size:24})}return t.writePointer=0,t.readPointer=0,t}static #c(e){let t=0;for(let[r,i]of e.split("").entries())t=(t|u.#g.indexOf(i)<<18-6*r)>>>0;return t}static #f(e){let t="";for(let r=0;r<4;r++){let i=e>>>18-6*r<<26>>>26;t+=u.#g[i]}return t}static #o(e){return Math.abs(e).toString(2).length}static get #g(){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"}}class f{#b=[];#p=new Map;#w;#v;constructor(e,{limit:t=4}={}){this.#w=e,this.#v=t}addWorker(){let e=this.#w();return this.#p.set(e,NaN),e}postWorker(e,t,r){this.#p.set(e,NaN),e.onmessage=t=>{this.#L(e),r(t)},e.postMessage(t)}enqueue(e,t){let r;for(let[e,t]of this.#p)if(t){r=e;break}r?this.postWorker(r,e,t):this.#p.size<this.#v?(r=this.addWorker(),this.postWorker(r,e,t)):this.#b.push({message:e,callback:t})}#L(e){let{message:t,callback:r}=this.#b.shift()||{};t&&r?this.postWorker(e,t,r):(this.#p.set(e,Date.now()),setTimeout(()=>{let t=this.#p.get(e);Date.now()-t>1e3&&(e.terminate(),this.#p.delete(e))},1050))}}class m{#A;#P;#R;#S;constructor(e){let{luma:t,chromaBlue:r,chromaRed:i}=e.match(/^(?<luma>[0-7]):(?<chromaBlue>[0-7]):(?<chromaRed>[0-7])$/)?.groups||{};if(!t||!r||!i)throw new a({name:"SubsamplingError",message:'Must be of form "x:y:z", digits from 0-7 inclusive',"subsampling-string":e});this.#A=parseInt(t),this.#P=parseInt(r),this.#R=parseInt(i),this.#S=this.#A+this.#P+this.#R}key(e){let t=e%this.#S;return t<this.#A?"luma":t<this.#A+this.#P?"chromaBlue":"chromaRed"}get luma(){return this.#A}get chromaBlue(){return this.#P}get chromaRed(){return this.#R}}function*c(e,t){let r=Array.from(Array.from({length:e}),()=>Array.from({length:t}).fill(0)),[i,a]=[0,0];for(;;)if(r[i][a]=yield r,0===a||i===e-1){let r=i+a+1;if(r>e+t-1)break;i=r-(a=i>=t-1?t-1:i+1)}else a--,i++}let g=(e,t=0,r=255,i=!0)=>(i&&(e=Math.round(e),t=Math.ceil(t),r=Math.floor(r)),Math.max(t,Math.min(r,e))),b=(e,t,r)=>(e=g(e),t=g(t),r=g(r),t-=128,{red:g(e+1.4*(r-=128)),green:g(e-.34*t-.71*r),blue:g(e+1.77*t)}),p=(e,t=255)=>{let r=[];for(let i=0;i<e.length;i+=3){let{red:a,green:s,blue:n}=b(e[i],e[i+1],e[i+2]);r.push(a,s,n,t)}return r},w=(e,t)=>{let[r,i,a]=e,s=()=>Array.from(Array.from({length:t.image.height}),()=>Array.from({length:t.image.width}).fill(0)),n=[s(),s(),s()],[o,l,h]=n;for(let e=0;e<t.image.height;e++)for(let s=0;s<t.image.width;s++){let n={x:s/t.image.width*t.sample.width,y:e/t.image.height*t.sample.height};o[e][s]=v(r,n,t),l[e][s]=v(i,n,t),h[e][s]=v(a,n,t)}return n},v=(e,t,r)=>{let i=[];for(let a=0;a<r.sample.width;a++){let r=e[a];i.push(A(r,t.y))}return A(i,t.x)},L=e=>{for(;e>=2*Math.PI;)e-=2*Math.PI;return(e>Math.PI&&(e=2*Math.PI-e),e>Math.PI/2)?5*(e=(e-Math.PI)*(e-Math.PI))/(e+Math.PI*Math.PI)-1:1-5*(e*=e)/(e+Math.PI*Math.PI)},A=(e,t)=>{let r=0;for(let i=0;i<e.length;i++){let a=e[i]*L((2*t+1)*Math.PI*i/(2*e.length));a*=0===i?Math.SQRT1_2:1,r+=a}return r*=Math.sqrt(2/e.length),r=Math.round(r)};class P{#M;#r;#_;#z;constructor(e){if(!e.match(/^[A-Za-z0-9\-_]{16,}$/))throw new a({name:"BlurridDecoderError",message:"String minimum 16 url-safe base 64 encoded chars","serialized-dct":e});this.#M=e,this.#r=u.from(e),this.#_=new d(this.#x()),this.#z=this.#y()}toImageData(){let{luma:e,chromaBlue:t,chromaRed:r}=this.#z;return p(l(w([e,t,r],this.#_)))}#x(){return this.#r.readPointer=0,{image:{width:this.#r.read(16),height:this.#r.read(16)},sample:{width:this.#r.read(8),height:this.#r.read(8)}}}#E(){this.#r.readPointer=48;let e=this.#r.read(3),t=this.#r.read(3),r=this.#r.read(3);return new m(`${e}:${t}:${r}`)}#y(){let e=this.#I(),[t,r,i]=e.next().value;for(this.#r.readPointer=57,this.#r.lastReadSize=8;;){let a=this.#r.readRelative({signed:!0});if(isNaN(a))break;[t,r,i]=e.next(a).value}return{luma:t,chromaBlue:r,chromaRed:i}}#I(){return function*(e,t,r){let i={luma:c(e,t),chromaBlue:c(e,t),chromaRed:c(e,t)},a=[i.luma.next().value,i.chromaBlue.next().value,i.chromaRed.next().value],s=0;do{let e=yield a,t=r.key(s),n=i[t].next(e);if(n.done)break;"luma"===t?a[0]=n.value:"chromaBlue"===t?a[1]=n.value:a[2]=n.value}while(++s)}(this.#_.sample.width,this.#_.sample.height,this.#E())}get serializedDct(){return this.#M}get metadata(){return this.#_}get coefficients(){return this.#z}}var R={};R="#define GLSLIFY 1\nattribute vec4 a_position;\n\nvoid main() {\n    gl_Position = a_position;\n}\n";var S={};S="precision mediump float;\n#define GLSLIFY 1\n\nuniform vec4 u_color;\nuniform float u_image_width;\nuniform float u_image_height;\n\nuniform float u_lumaDct[{{SAMPLE_NORMALIZED_TOTAL}}];\nuniform float u_chromaBlueDct[{{SAMPLE_NORMALIZED_TOTAL}}];\nuniform float u_chromaRedDct[{{SAMPLE_NORMALIZED_TOTAL}}];\n\nfloat kFactor(int x) {\n    if (x == 0) { return 0.7071; }\n    else { return 1.0; }\n}\n\nfloat decode1D(float array1D[{{SAMPLE_MAX}}], float point, int samples) {\n    float float_samples = float(samples);\n\n    float result = 0.0;\n\n    for (int i = 0; i < {{SAMPLE_MAX}}; i ++) {\n        if (float(array1D[i]) == 0.0 || i >= samples) { break; }\n\n        float partial = float(array1D[i]) * cos(\n            ((2.0 * point + 1.0) * 3.14 * float(i)) / (2.0 * float_samples)\n        );\n\n        partial *= kFactor(i);\n        result += partial;\n    }\n\n    result *= sqrt(2.0 / float_samples);\n\n    return result;\n}\n\nfloat decode2D(float array2D[{{SAMPLE_NORMALIZED_TOTAL}}], vec2 uv) {\n    float row[{{SAMPLE_MAX}}];\n\n    float x = uv.x * {{SAMPLE_WIDTH}}.0;\n    float y = (1.0 - uv.y) * {{SAMPLE_HEIGHT}}.0;\n\n    for (int i = 0; i < {{SAMPLE_MAX}}; i ++) {\n        float column[{{SAMPLE_MAX}}];\n        for (int j = 0; j < {{SAMPLE_MAX}}; j ++) {\n            column[j] = array2D[i * {{SAMPLE_MAX}} + j];\n        }\n        row[i] = decode1D(column, y, {{SAMPLE_HEIGHT}});\n    }\n\n    float result = decode1D(row, x, {{SAMPLE_WIDTH}});\n\n    return result;\n}\n\nvec4 yCbCrToRgb(float luma, float chromaBlue, float chromaRed) {\n    //\n    float red = luma + 1.40 * (chromaRed - 128.0);\n    float green = luma - 0.34 * (chromaBlue - 128.0) - 0.71 * (chromaRed - 128.0);\n    float blue = luma + 1.77 * (chromaBlue - 128.0);\n\n    //\n    red = floor(clamp(red, 0.0, 255.0) + 0.5) / 255.0;\n    green = floor(clamp(green, 0.0, 255.0) + 0.5) / 255.0;\n    blue = floor(clamp(blue, 0.0, 255.0) + 0.5) / 255.0;\n\n    return vec4(red, green, blue, 1.0);\n}\n\nvoid main() {\n    //\n    vec2 uv = gl_FragCoord.xy;\n    uv.x /= u_image_width;\n    uv.y /= u_image_height;\n\n    //\n    gl_FragColor = yCbCrToRgb(\n        decode2D(u_lumaDct, uv),\n        decode2D(u_chromaBlueDct, uv),\n        decode2D(u_chromaRedDct, uv)\n    );\n}\n";let M=e=>{let t=document.createElement("canvas");t.width=e.image.width,t.height=e.image.height;let r=t.getContext("webgl"),a={vertex:x(r,r.VERTEX_SHADER,i(R)),fragment:x(r,r.FRAGMENT_SHADER,i(S),{SAMPLE_WIDTH:e.sample.width,SAMPLE_HEIGHT:e.sample.height,SAMPLE_MAX:e.sample.max,SAMPLE_NORMALIZED_TOTAL:e.sample.max**2})},s=z(r,a),n={index:r.getAttribLocation(s,"a_position"),size:2,type:r.FLOAT,normalize:!1,stride:0,offset:0},o=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,o),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,1,1,1,1,-1,1,-1,-1,-1,-1,1]),r.STATIC_DRAW),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(s),r.enableVertexAttribArray(n.index);let{index:l,size:h,type:d,normalize:u,stride:f,offset:m}=n;return r.vertexAttribPointer(l,h,d,u,f,m),{canvas:t,context:r,program:s}},_=e=>{let t=document.createElement("canvas");t.width=e.image.width,t.height=e.image.height;let r=t.getContext("2d");return{canvas:t,context:r}},z=(e,t)=>{let r=e.createProgram();return e.attachShader(r,t.vertex),e.attachShader(r,t.fragment),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)||(console.warn(e.getProgramInfoLog(r)),e.deleteProgram(r)),r},x=(e,t,r,i={})=>{for(let e in i){let t=RegExp(`{{${e}}}`,"g");r=r.replaceAll(t,`${i[e]}`)}let a=e.createShader(t);return e.shaderSource(a,r),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)||(console.warn(e.getShaderInfoLog(a)),e.deleteShader(a)),a},y=e=>{let{metadata:t,coefficients:r}=e,{canvas:i,context:a,program:s}=M(t),n={u_color:{type:"uniform4fv",data:[1,0,0,1]},u_image_width:{type:"uniform1f",data:t.image.width},u_image_height:{type:"uniform1f",data:t.image.height},u_lumaDct:{type:"uniform1fv",data:E(r.luma,t)},u_chromaBlueDct:{type:"uniform1fv",data:E(r.chromaBlue,t)},u_chromaRedDct:{type:"uniform1fv",data:E(r.chromaRed,t)}};for(let e in n){let t=a.getUniformLocation(s,e);a[n[e].type](t,n[e].data)}let{primitiveType:o,offset:l,count:h}={primitiveType:a.TRIANGLES,offset:0,count:6};return a.drawArrays(o,l,h),i.toDataURL()},E=(e,t)=>{let r=t.sample.max;return Array.from({length:r**2},(t,i)=>e.flatMap(e=>Array.from({length:r},(t,r)=>e[r]||0))[i]||0)},I=(e,t,r)=>new Promise(i=>{let a=document.createElement("img"),s=()=>{let{width:t,height:r}=e.canvas;e.context.drawImage(a,0,0,t,r),a.removeEventListener("load",s),a.remove(),i(e.canvas.toDataURL())};a.addEventListener("load",s),r.metadata.resize(t.width);let{canvas:n,context:o}=_(r.metadata);o.putImageData(t,0,0),a.src=n.toDataURL()}),k=()=>new Worker(new URL("worker.e95a93f7.js",import.meta.url));class D extends HTMLImageElement{decoder=new P(this.dataset.blurrid||"A".repeat(10));constructor(){super();let e=()=>{this.removeEventListener("load",e),this.blur(),"onclick"===this.dataset.loading?this.loadOnClick():"lazy"===this.dataset.loading?this.loadOnIntersection():this.loadImage()};this.addEventListener("load",e),this.#k&&this.decoder.metadata.resize(this.#k);let{canvas:t}=_(this.decoder.metadata);this.src=t.toDataURL()}blur(){let e=this.decoder.metadata.sample.max;!window.WebGLRenderingContext||e>16?this.dataset.loading="eager":this.src=y(this.decoder)}loadImage(){let e=document.createElement("img");for(let t of this.attributes){let{name:r,value:i}=t;this.#D.includes(r)||e.setAttribute(r,i)}let t=()=>{e.removeEventListener("load",t);let{width:r,height:i}=this.getBoundingClientRect();e.style.width=`${r}px`,e.style.height=`${i}px`;let a=[{opacity:1},{opacity:0}],s={easing:"ease-out",duration:500},n=e.cloneNode();n.style.opacity="0",n.style.position="absolute",this.before(n),this.animate(a,s),n.animate(a,{...s,direction:"reverse"}).addEventListener("finish",()=>{this.replaceWith(e),n.remove()})};e.addEventListener("load",t),this.dataset.srcset&&e.setAttribute("srcset",this.dataset.srcset),e.setAttribute("src",this.dataset.src||"")}loadOnClick(){let e=()=>{this.removeEventListener("click",e),this.loadImage()};this.addEventListener("click",e)}loadOnIntersection(){let e=new IntersectionObserver(t=>{t[0].isIntersecting&&(e.disconnect(),this.loadImage())},{threshold:.5});e.observe(this)}get #k(){let e;if(this.dataset.size)return parseInt(this.dataset.size);if(!this.sizes||!this.dataset.srcset)return;let t={sizes:/(?<query>\(.*\))[\s\n]*(?<width>\d*)(?<unit>px|vw),/g,sizesFallback:/(?<width>\d*)(?<unit>px|vw)[\s\n]*$/,srcset:/[\s\n](?<srcsetWidth>\d*)w,?/g};for(let r of this.sizes.matchAll(t.sizes)){let{query:t,width:i,unit:a}=r?.groups||{};if(matchMedia(t).matches){e={width:i,unit:a};break}}if(!e){let{width:r,unit:i}=this.sizes.match(t.sizesFallback)?.groups||{};e={width:r,unit:i}}let r=e?.unit==="vw"?parseInt(e?.width||"0")/100*window.innerWidth:parseInt(e?.width||"0");for(let e of this.dataset.srcset.matchAll(t.srcset)){let{srcsetWidth:t}=e?.groups||{};if(parseInt(t)>=r)return parseInt(t)}}get #D(){return["is","src","data-src","data-srcset","data-loading","data-blurrid","data-worker-start","data-worker-steps"]}}class B extends D{#B=parseInt(this.dataset.workerStart||"16");#W=parseInt(this.dataset.workerSteps||"2");constructor(){super()}blur(){let t=this.decoder.metadata.sample.max;if(!window.WebGLRenderingContext||t>16){e||(e=new f(k));let t=_(this.decoder.metadata);this.stepWorker(t.canvas.toDataURL(),t)}else this.src=y(this.decoder)}stepWorker(t,r,i){if(this.src=t,(i??=this.#B)<this.#B*2**this.#W){let t={serializedDct:this.decoder.serializedDct,width:2*i};e?.enqueue(t,e=>{let{imageData:t,imageData:{width:i}}=e.data;I(r,t,this.decoder).then(e=>{this.stepWorker(e,r,i)})})}}}t({icons:{Info:r}}),customElements.define("blurrid-image",B,{extends:"img"});
//# sourceMappingURL=index.6581faf8.js.map
