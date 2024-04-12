import{j as t,f as e,o as i,c as o,w as s,k as n,l,a,d as r,b as c,F as u,r as h,h as p,t as f,i as d,m,p as g,q as _,s as b,u as x,g as y,v as w,x as k,y as C,n as v,e as j}from"./index-e7053d0b.js";import{_ as S}from"./uni-title.5087d969.js";import{_ as $,r as E}from"./uni-app.es.b97e5c84.js";import{_ as B}from"./uni-row.3f9c9d85.js";import{_ as z}from"./uni-card.94f306e1.js";import{_ as q}from"./uni-section.75e3ef8d.js";import{_ as T,a as D}from"./uni-list.6a1a4cf6.js";import{_ as I}from"./uni-notice-bar.a1d2abc5.js";import{_ as P}from"./uni-icons.dc13f8bb.js";import{C as F,_ as A,a as W}from"./createexpense.fa556e71.js";import{q as L}from"./qs.f1a07ed8.js";import{d as M}from"./format.e6ea6446.js";import{u as U}from"./useStat.e4f62411.js";import"./lodash.78ef8cd2.js";import{E as O}from"./index.2bcaaaf1.js";import"./uni-easyinput.5d5f265f.js";import"./uni-forms.7670594f.js";import"./uni-datetime-picker.ffbd05fd.js";import"./uni-tag.faf84d28.js";import"./v4.ba5d26a9.js";const V=$({name:"UniFab",emits:["fabClick","trigger"],props:{pattern:{type:Object,default:()=>({})},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:()=>[]},show:{type:Boolean,default:!1},popMenu:{type:Boolean,default:!0}},data:()=>({fabShow:!1,isShow:!1,isAndroidNvue:!1,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#007AFF",iconColor:"#fff",icon:"plusempty"}}),computed:{contentWidth(t){return 55*(this.content.length+1)+15+"px"},contentWidthMin:()=>"55px",boxWidth(){return this.getPosition(3,"horizontal")},boxHeight(){return this.getPosition(3,"vertical")},leftBottom(){return this.getPosition(0,"left","bottom")},rightBottom(){return this.getPosition(0,"right","bottom")},leftTop(){return this.getPosition(0,"left","top")},rightTop(){return this.getPosition(0,"right","top")},flexDirectionStart(){return this.getPosition(1,"vertical","top")},flexDirectionEnd(){return this.getPosition(1,"vertical","bottom")},horizontalLeft(){return this.getPosition(2,"horizontal","left")},horizontalRight(){return this.getPosition(2,"horizontal","right")},nvueBottom:()=>(t().windowBottom,30)},watch:{pattern:{handler(t,e){this.styles=Object.assign({},this.styles,t)},deep:!0}},created(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=Object.assign({},this.styles,this.pattern)},methods:{_onClick(){this.$emit("fabClick"),this.popMenu&&(this.isShow=!this.isShow)},open(){this.isShow=!0},close(){this.isShow=!1},_onItemClick(t,e){this.isShow&&this.$emit("trigger",{index:t,item:e})},getPosition(t,e,i){return 0===t?this.horizontal===e&&this.vertical===i:1===t?this.direction===e&&this.vertical===i:2===t?this.direction===e&&this.horizontal===i:this.isShow&&this.direction===e?this.contentWidth:this.contentWidthMin}}},[["render",function(t,_,b,x,y,w){const k=d,C=m,v=g,j=E(e("uni-icons"),P);return i(),o(k,{class:"uni-cursor-point"},{default:s((()=>[b.popMenu&&(w.leftBottom||w.rightBottom||w.leftTop||w.rightTop)&&b.content.length>0?(i(),o(k,{key:0,class:n([{"uni-fab--leftBottom":w.leftBottom,"uni-fab--rightBottom":w.rightBottom,"uni-fab--leftTop":w.leftTop,"uni-fab--rightTop":w.rightTop},"uni-fab"]),style:l(w.nvueBottom)},{default:s((()=>[a(k,{class:n([{"uni-fab__content--left":"left"===b.horizontal,"uni-fab__content--right":"right"===b.horizontal,"uni-fab__content--flexDirection":"vertical"===b.direction,"uni-fab__content--flexDirectionStart":w.flexDirectionStart,"uni-fab__content--flexDirectionEnd":w.flexDirectionEnd,"uni-fab__content--other-platform":!y.isAndroidNvue},"uni-fab__content"]),style:l({width:w.boxWidth,height:w.boxHeight,backgroundColor:y.styles.backgroundColor}),elevation:"5"},{default:s((()=>[w.flexDirectionStart||w.horizontalLeft?(i(),o(k,{key:0,class:"uni-fab__item uni-fab__item--first"})):r("",!0),(i(!0),c(u,null,h(b.content,((t,e)=>(i(),o(k,{key:e,class:n([{"uni-fab__item--active":y.isShow},"uni-fab__item"]),onClick:i=>w._onItemClick(e,t)},{default:s((()=>[a(C,{src:t.active?t.selectedIconPath:t.iconPath,class:"uni-fab__item-image",mode:"aspectFit"},null,8,["src"]),a(v,{class:"uni-fab__item-text",style:l({color:t.active?y.styles.selectedColor:y.styles.color})},{default:s((()=>[p(f(t.text),1)])),_:2},1032,["style"])])),_:2},1032,["class","onClick"])))),128)),w.flexDirectionEnd||w.horizontalRight?(i(),o(k,{key:1,class:"uni-fab__item uni-fab__item--first"})):r("",!0)])),_:1},8,["class","style"])])),_:1},8,["class","style"])):r("",!0),a(k,{class:n([{"uni-fab__circle--leftBottom":w.leftBottom,"uni-fab__circle--rightBottom":w.rightBottom,"uni-fab__circle--leftTop":w.leftTop,"uni-fab__circle--rightTop":w.rightTop,"uni-fab__content--other-platform":!y.isAndroidNvue},"uni-fab__circle uni-fab__plus"]),style:l({"background-color":y.styles.buttonColor,bottom:w.nvueBottom}),onClick:w._onClick},{default:s((()=>[a(j,{class:n(["fab-circle-icon",{"uni-fab__plus--active":y.isShow&&b.content.length>0}]),type:y.styles.icon,color:y.styles.iconColor,size:"32"},null,8,["type","color","class"])])),_:1},8,["class","style","onClick"])])),_:1})}],["__scopeId","data-v-b7eca566"]]),N={income:"收入",spending:"支出"};const H=$({components:{CreateExpense:F,TagEditor:A,Empty:O},data:()=>({expenses:[],expenseId:"",query:_()[_().length-1].$page.options}),onLoad(){b({title:this.query.title})},onShow(){this.fetchExpenses()},computed:{stat(){return U(this.expenses)}},methods:{qs:L,delExpense(t){x({title:"操作提醒",content:"确认删除该收支记录吗？该操作无法撤回",success:e=>{if(e.confirm){const e=`bill-${this.query.id}-expense-keys`,i=y(e)||[];i.splice(i.indexOf(t),1),w(e,i),k(`bill-${this.query.id}-expense-${t}`),C({title:"收支记录已删除",mask:!0}),this.fetchExpenses()}}})},setDialog(t){this.$refs.popup[t?"open":"close"]()},close(t){"extra"===t&&this.setDialog(!1)},updated(){this.setDialog(!1),this.fetchExpenses()},openDialog(t){this.expenseId=t,this.setDialog(!0)},noteFormat(t){const{amount:e,type:i,datetime:o}=t;return`${N[i]} ${e} 元，记录于 ${M(o)}`},fetchExpenses(){this.expenses=[],this.$nextTick((()=>{this.expenses=(y(`bill-${this.query.id}-expense-keys`)||[]).map((t=>y(`bill-${this.query.id}-expense-${t}`)))}))},goto(t){v({url:t})}}},[["render",function(t,n,l,p,f,m){const g=E(e("uni-title"),S),_=d,b=E(e("uni-row"),B),x=E(e("uni-card"),z),y=E(e("uni-section"),q),w=E(e("uni-list-item"),T),k=E(e("uni-list"),D),C=E(e("uni-notice-bar"),I),v=j("TagEditor"),$=j("Empty"),P=E(e("uni-fab"),V),F=j("CreateExpense"),A=E(e("uni-popup"),W);return i(),o(_,null,{default:s((()=>[a(y,{title:"收支简报",type:"line","sub-title":"对收入和支出进行统计",class:"br-8 over-hide shadow"},{default:s((()=>[a(x,{"is-full":"","is-shadow":!1},{default:s((()=>[a(b,{class:"flex"},{default:s((()=>[a(g,{type:"h1",title:`总收支：${m.stat.expense}`},null,8,["title"]),a(_,null,{default:s((()=>[a(g,{type:"h4",title:`总收入：${m.stat.income}`},null,8,["title"]),a(g,{type:"h4",title:`总支出：${m.stat.spending}`},null,8,["title"])])),_:1})])),_:1})])),_:1})])),_:1}),a(k,{class:"my-16 br-8 over-hide shadow"},{default:s((()=>[a(w,{title:"收支报表",showArrow:"",clickable:"",extraIcon:{color:"#000000",size:"24",type:"color"},showExtraIcon:"",to:`/pages/expensegui/expensegui?${m.qs(f.query)}`},null,8,["to"]),a(w,{title:"账本详情及设置",showArrow:"",clickable:"",extraIcon:{color:"#000000",size:"24",type:"gear"},showExtraIcon:"",to:`/pages/billsetting/billsetting?id=${f.query.id}`},null,8,["to"])])),_:1}),a(C,{text:"长摁收支记录可进行删除操作",showClose:""}),a(y,{title:"收支记录",subTitle:"收入及支出收支的详细信息",type:"line",class:"mt-16 br-8 shadow over-hide"},{default:s((()=>[a(k,null,{default:s((()=>[(i(!0),c(u,null,h(f.expenses,(t=>(i(),o(w,{title:t.name,note:m.noteFormat(t),clickable:"",showArrow:"",onClick:e=>m.openDialog(t.id),direction:"column",onLongpress:e=>m.delExpense(t.id),class:"p-4"},{footer:s((()=>[a(v,{modelValue:t.tags,"onUpdate:modelValue":e=>t.tags=e,class:"mt-4"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["title","note","onClick","onLongpress"])))),256)),f.expenses.length?r("",!0):(i(),o(w,{key:0},{body:s((()=>[a($,{text:"无任何流水记录, 先去记录一下流水吧!"})])),_:1}))])),_:1})])),_:1}),a(P,{ref:"fab",pattern:t.pattern,content:t.content,horizontal:"right",onFabClick:n[0]||(n[0]=t=>m.goto(`/pages/createexpense/createexpense?${m.qs(f.query)}`))},null,8,["pattern","content"]),a(A,{ref:"popup",type:"bottom"},{default:s((()=>[a(x,{"is-full":"",title:"修改收支记录",extra:"轻触灰色背景区域关闭",onClick:m.close,style:{height:"80vh",overflow:"auto"},class:"br-8"},{default:s((()=>[a(F,{expenseId:f.expenseId,onUpdated:m.updated},null,8,["expenseId","onUpdated"])])),_:1},8,["onClick"])])),_:1},512)])),_:1})}],["__scopeId","data-v-48ffb7c4"]]);export{H as default};