"use strict";(self.webpackChunkdiary=self.webpackChunkdiary||[]).push([[185],{50:function(e,t,n){n.d(t,{Xx:function(){return l},fq:function(){return f},Y:function(){return Z},dD:function(){return m},a5:function(){return g},tI:function(){return h},J7:function(){return x},PR:function(){return d},x4:function(){return s},kS:function(){return u},fO:function(){return p},Cx:function(){return v},ym:function(){return y}});var r=n(419),a=n(5646),i="http://localhost:9000",c=function(e,t){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];for(var i in t){var c="".concat(i,"=").concat(t[i]);n.push(c)}var o=n.join("&"),s=o?"".concat(e,"?").concat(o):e;return fetch(s,{credentials:"include"}).then((function(e){return e.json()})).catch((function(e){throw r.ZP.error(a.N.get("request_timeout")),new Error(e)}))}(i+e,t)},o=function(e,t){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={credentials:"include",method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},mode:"cors",cache:"force-cache",body:JSON.stringify(t)};return fetch(e,n).then((function(e){return e.json()})).catch((function(e){throw r.ZP.error(a.N.get("request_timeout")),new Error(e)}))}(i+e,t)},s=function(e){return o("/api/login",e)},l=function(){return c("/api/login")},u=function(){return o("/api/logout")},d=function(){return c("/api/user")},m=function(){return c("/api/articles")},f=function(e){return c("/api/article/".concat(e))},p=function(e){return o("/api/article",e)},h=function(){return c("/api/questions")},g=function(e){return c("/api/question/".concat(e))},v=function(e){return o("/api/question",e)},x=function(e){return c("/api/getTranslateData",e)},y=function(e){return o("/api/updateTransDate",e)},Z=function(){return c("/api/getDulpTranslateData")}},3185:function(e,t,n){n.r(t),n.d(t,{default:function(){return F}});var r=n(1413),a=n(9439),i=n(2791),c=n(5646),o=n(7705),s=n(3963),l=n(5623),u=n(4093),d=n(8442),m=n(1694),f=n.n(m),p=n(1929),h=n(7908),g=n(590),v=n(2832),x=n(6987),y=n(7083),Z=n(8295),N=n(9752),_=n(1113),E=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},b=function(e,t){var n=e.prefixCls,r=e.children,a=e.actions,c=e.extra,o=e.className,u=e.colStyle,d=E(e,["prefixCls","children","actions","extra","className","colStyle"]),m=(0,i.useContext)(w),h=m.grid,g=m.itemLayout,v=(0,i.useContext)(p.E_).getPrefixCls,x=v("list",n),y=a&&a.length>0&&i.createElement("ul",{className:"".concat(x,"-item-action"),key:"actions"},a.map((function(e,t){return i.createElement("li",{key:"".concat(x,"-item-action-").concat(t)},e,t!==a.length-1&&i.createElement("em",{className:"".concat(x,"-item-action-split")}))}))),Z=h?"div":"li",b=i.createElement(Z,(0,s.Z)({},d,h?{}:{ref:t},{className:f()("".concat(x,"-item"),(0,l.Z)({},"".concat(x,"-item-no-flex"),!("vertical"===g?c:!function(){var e;return i.Children.forEach(r,(function(t){"string"===typeof t&&(e=!0)})),e&&i.Children.count(r)>1}())),o)}),"vertical"===g&&c?[i.createElement("div",{className:"".concat(x,"-item-main"),key:"content"},r,y),i.createElement("div",{className:"".concat(x,"-item-extra"),key:"extra"},c)]:[r,y,(0,_.Tm)(c,{key:"extra"})]);return h?i.createElement(N.Z,{ref:t,flex:1,style:u},b):b},j=(0,i.forwardRef)(b);j.Meta=function(e){var t=e.prefixCls,n=e.className,r=e.avatar,a=e.title,c=e.description,o=E(e,["prefixCls","className","avatar","title","description"]),l=(0,(0,i.useContext)(p.E_).getPrefixCls)("list",t),u=f()("".concat(l,"-item-meta"),n),d=i.createElement("div",{className:"".concat(l,"-item-meta-content")},a&&i.createElement("h4",{className:"".concat(l,"-item-meta-title")},a),c&&i.createElement("div",{className:"".concat(l,"-item-meta-description")},c));return i.createElement("div",(0,s.Z)({},o,{className:u}),r&&i.createElement("div",{className:"".concat(l,"-item-meta-avatar")},r),(a||c)&&d)};var S=j,C=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},w=i.createContext({});w.Consumer;function k(e){var t,n=e.pagination,r=void 0!==n&&n,a=e.prefixCls,c=e.bordered,m=void 0!==c&&c,N=e.split,_=void 0===N||N,E=e.className,b=e.children,j=e.itemLayout,S=e.loadMore,k=e.grid,O=e.dataSource,P=void 0===O?[]:O,q=e.size,z=e.header,I=e.footer,T=e.loading,M=void 0!==T&&T,A=e.rowKey,D=e.renderItem,F=e.locale,L=C(e,["pagination","prefixCls","bordered","split","className","children","itemLayout","loadMore","grid","dataSource","size","header","footer","loading","rowKey","renderItem","locale"]),Q=r&&"object"===(0,d.Z)(r)?r:{},J=i.useState(Q.defaultCurrent||1),R=(0,u.Z)(J,2),V=R[0],K=R[1],W=i.useState(Q.defaultPageSize||10),B=(0,u.Z)(W,2),H=B[0],X=B[1],Y=i.useContext(p.E_),G=Y.getPrefixCls,U=Y.renderEmpty,$=Y.direction,ee={},te=function(e){return function(t,n){K(t),X(n),r&&r[e]&&r[e](t,n)}},ne=te("onChange"),re=te("onShowSizeChange"),ae=G("list",a),ie=M;"boolean"===typeof ie&&(ie={spinning:ie});var ce=ie&&ie.spinning,oe="";switch(q){case"large":oe="lg";break;case"small":oe="sm"}var se=f()(ae,(t={},(0,l.Z)(t,"".concat(ae,"-vertical"),"vertical"===j),(0,l.Z)(t,"".concat(ae,"-").concat(oe),oe),(0,l.Z)(t,"".concat(ae,"-split"),_),(0,l.Z)(t,"".concat(ae,"-bordered"),m),(0,l.Z)(t,"".concat(ae,"-loading"),ce),(0,l.Z)(t,"".concat(ae,"-grid"),!!k),(0,l.Z)(t,"".concat(ae,"-something-after-last-item"),!!(S||r||I)),(0,l.Z)(t,"".concat(ae,"-rtl"),"rtl"===$),t),E),le=(0,s.Z)((0,s.Z)((0,s.Z)({},{current:1,total:0}),{total:P.length,current:V,pageSize:H}),r||{}),ue=Math.ceil(le.total/le.pageSize);le.current>ue&&(le.current=ue);var de=r?i.createElement("div",{className:"".concat(ae,"-pagination")},i.createElement(x.Z,(0,s.Z)({},le,{onChange:ne,onShowSizeChange:re}))):null,me=(0,o.Z)(P);r&&P.length>(le.current-1)*le.pageSize&&(me=(0,o.Z)(P).splice((le.current-1)*le.pageSize,le.pageSize));var fe=Object.keys(k||{}).some((function(e){return["xs","sm","md","lg","xl","xxl"].includes(e)})),pe=(0,v.Z)(fe),he=i.useMemo((function(){for(var e=0;e<Z.c4.length;e+=1){var t=Z.c4[e];if(pe[t])return t}}),[pe]),ge=i.useMemo((function(){if(k){var e=he&&k[he]?k[he]:k.column;return e?{width:"".concat(100/e,"%"),maxWidth:"".concat(100/e,"%")}:void 0}}),[null===k||void 0===k?void 0:k.column,he]),ve=ce&&i.createElement("div",{style:{minHeight:53}});if(me.length>0){var xe=me.map((function(e,t){return function(e,t){return D?((n="function"===typeof A?A(e):A?e[A]:e.key)||(n="list-item-".concat(t)),ee[t]=n,D(e,t)):null;var n}(e,t)})),ye=i.Children.map(xe,(function(e,t){return i.createElement("div",{key:ee[t],style:ge},e)}));ve=k?i.createElement(g.Z,{gutter:k.gutter},ye):i.createElement("ul",{className:"".concat(ae,"-items")},xe)}else b||ce||(ve=function(e,t){return i.createElement("div",{className:"".concat(e,"-empty-text")},F&&F.emptyText||t("List"))}(ae,U||h.Z));var Ze=le.position||"bottom",Ne=i.useMemo((function(){return{grid:k,itemLayout:j}}),[JSON.stringify(k),j]);return i.createElement(w.Provider,{value:Ne},i.createElement("div",(0,s.Z)({className:se},L),("top"===Ze||"both"===Ze)&&de,z&&i.createElement("div",{className:"".concat(ae,"-header")},z),i.createElement(y.Z,(0,s.Z)({},ie),ve,b),I&&i.createElement("div",{className:"".concat(ae,"-footer")},I),S||("bottom"===Ze||"both"===Ze)&&de))}k.Item=S;var O=k,P=n(1095),q=n(419),z=n(7309),I=n(177),T=n(5433),M=n(50),A={page:"index_page__DwyF5",questions:"index_questions__+zbRm",list:"index_list__-8BNp",makeQuestion:"index_makeQuestion__FVQJs",ask:"index_ask__WsriT"},D=n(184);function F(){var e=P.Z.useForm(),t=(0,a.Z)(e,1)[0],n=(0,i.useState)(!1),o=(0,a.Z)(n,2),s=o[0],l=o[1],u=(0,i.useState)(!1),d=(0,a.Z)(u,2),m=d[0],f=d[1],p=(0,i.useState)(),h=(0,a.Z)(p,2),g=h[0],v=h[1],x=(0,i.useState)([]),y=(0,a.Z)(x,2),Z=y[0],N=y[1],_=(0,i.useState)(0),E=(0,a.Z)(_,2),b=(E[0],E[1]),j=function(){(0,M.tI)().then((function(e){e.success&&(N(e.data.list),b(e.data.total))}))};return(0,i.useEffect)((function(){j()}),[]),(0,D.jsxs)("div",{className:A.page,children:[(0,D.jsx)("div",{className:A.questions,children:(0,D.jsx)(T.Z,{title:c.N.get("Question_List"),extra:(0,D.jsx)(z.Z,{type:"link",onClick:function(){f(!1),v(void 0),t.resetFields()},children:c.N.get("newly_added")}),children:(0,D.jsx)(O,{size:"small",className:A.list,dataSource:Z,renderItem:function(e){return(0,D.jsx)(O.Item,{onClick:function(){var n;(n=e.id)&&(0,M.a5)(n).then((function(e){if(e.success){var r=e.data;v(n),f(!1),t.setFieldsValue({question:r.question,explanation:r.explanation})}}))},children:e.question})}})})}),(0,D.jsx)("div",{className:A.makeQuestion,children:(0,D.jsx)(T.Z,{title:g?"".concat(c.N.get("ViewEdit_Question"),"\uff08#").concat(g,"\uff09"):c.N.get("New_problems"),extra:(0,D.jsx)(z.Z,{onClick:function(){t.validateFields().then((function(e){l(!0),(0,M.Cx)((0,r.Z)((0,r.Z)({},e),{},{id:g})).then((function(e){e.success?(q.ZP.success(c.N.get("Saving_succeeded")),f(!1),j()):q.ZP.error(c.N.get("Save_failed"))})).catch((function(e){console.log(c.N.get("Save_failed"),e),q.ZP.error(c.N.get("Save_failed"))})).finally((function(){l(!1)}))}))},type:"primary",size:"small",loading:s,disabled:!m,children:c.N.get("preservation")}),children:(0,D.jsxs)(P.Z,{form:t,children:[(0,D.jsxs)("div",{className:A.ask,children:[(0,D.jsx)("p",{children:c.N.get("Problem_description")}),(0,D.jsx)(P.Z.Item,{name:"question",rules:[{required:!0,message:c.N.get("Problem_description_is_required")}],children:(0,D.jsx)(I.Z.TextArea,{rows:5,placeholder:c.N.get("Problem_description"),onChange:function(){return f(!0)}})})]}),(0,D.jsxs)("div",{className:A.answer,children:[(0,D.jsx)("p",{children:c.N.get("Answer_analysis")}),(0,D.jsx)(P.Z.Item,{name:"explanation",rules:[{required:!0,message:c.N.get("Answer_resolution_is_required")}],children:(0,D.jsx)(I.Z.TextArea,{rows:5,placeholder:c.N.get("Answer_analysis"),onChange:function(){return f(!0)}})})]})]})})})]})}},5433:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(1413),a=n(4925),i=(n(2791),n(5254)),c="index_card__503-P",o=n(184),s=["title","extra","children"];function l(e){var t=e.title,n=e.extra,l=e.children,u=(0,a.Z)(e,s);return(0,o.jsx)(i.Z,(0,r.Z)((0,r.Z)({className:c,title:t,extra:n},u),{},{children:l}))}}}]);
//# sourceMappingURL=185.b536b1b6.chunk.js.map