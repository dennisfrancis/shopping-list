(this["webpackJsonpshopping-list"]=this["webpackJsonpshopping-list"]||[]).push([[0],{29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(23),i=n.n(r),c=(n(29),n(5)),o=n(2),l=n(12),u=n(3),d=(n(30),n(31),n(32),new Set(["Kg","gm","Packet(s)","No"])),m=new Set(["Vegetables","Fruits","Medicines"]),b=n(9),f=n.n(b),v=n(11),h=n(16),j=n(17),g=function(){function e(t){Object(h.a)(this,e),this.db=void 0,this.listeners=new Set,this.db=t,this.invokeListeners=this.invokeListeners.bind(this)}return Object(j.a)(e,[{key:"setDB",value:function(e){this.db=e}},{key:"hasDB",value:function(){return!!this.db}},{key:"invokeListeners",value:function(e){this.listeners.forEach((function(t){t(e)}))}},{key:"fetch",value:function(){this.db&&this.db.getAllItems().then(this.invokeListeners)}},{key:"addListener",value:function(e){this.listeners.add(e)}},{key:"removeListener",value:function(e){this.listeners.delete(e)}},{key:"addUpdate",value:function(e){this.db&&this.db.addUpdateItem(e)}},{key:"delete",value:function(e){this.db&&this.db.deleteItem(e)}},{key:"clearUnsaved",value:function(){return this.db?this.db.clearUnsaved():new Promise((function(){}))}},{key:"saveUnsaved",value:function(e){return this.db?this.db.saveUnsaved(e):new Promise((function(){}))}},{key:"exportToJSONText",value:function(){var e=Object(v.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null===(n=this.db)||void 0===n?void 0:n.exportToJSON();case 3:t=e.sent,e.next=9;break;case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return","");case 9:return e.abrupt("return",JSON.stringify(t));case 10:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()},{key:"importFromJSONText",value:function(){var e=Object(v.a)(f.a.mark((function e(t){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!1,e.prev=1,e.next=4,null===(a=this.db)||void 0===a?void 0:a.importFromJSON(t);case 4:n=!!e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",!1);case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e,this,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),p=s.a.createContext({}),x=p.Provider,y=n(0);function O(e){var t=!!e.newItemStatesAndSetters&&e.newItemStatesAndSetters.name===e.item.name;return Object(y.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-start"+(t?" active":"")+(e.disabled?" disabled":""),children:[Object(y.jsxs)("div",{className:"ms-2 me-auto",style:{width:"100vw"},onClick:function(){e.disabled||e.newItemStatesAndSetters&&(e.newItemStatesAndSetters.setName(e.item.name),e.newItemStatesAndSetters.setQuantity(e.item.quantity),e.newItemStatesAndSetters.setUnit(e.item.unit),e.newItemStatesAndSetters.setComment(e.item.comment),e.newItemStatesAndSetters.setExisting(!0),e.newItemStatesAndSetters.setCategory(e.item.category),e.setSearchListVisible&&(e.setSearchListVisible(!1),e.newItemStatesAndSetters&&e.newItemStatesAndSetters.setExisting(!1)))},children:[Object(y.jsx)("div",{className:"fw-bold",style:{display:"inline"},children:e.item.name+(e.item.comment?" ("+e.item.comment+")":"")}),Object(y.jsxs)("div",{children:[e.item.quantity,"\xa0",e.item.unit,"\xa0",void 0!==e.item.category&&Object(y.jsx)("small",{style:{fontStyle:"italic",color:"red"},children:"#"+e.item.category})]})]}),e.removeItem&&Object(y.jsx)("button",{type:"button",className:t?"btn-close btn-close-white":"btn-close","aria-label":"Close",onClick:function(){e.removeItem&&e.removeItem(e.item)}})]})}n(35);function w(e){var t=Object(a.useContext)(p),n=e.newItemStatesAndSetters,s=n.name,r=n.setName,i=n.quantity,o=n.setQuantity,l=n.unit,u=n.setUnit,b=n.comment,f=n.setComment,v=n.existing,h=n.setExisting,j=n.date,g=n.category,x=n.setCategory,O=[];return e.masterList.forEach((function(t){e.newList.find((function(e){return e.name===t}))||O.push(t)})),Object(y.jsxs)("form",{id:"item-controls",children:[Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"item-search",className:"form-label",children:"Item name"}),Object(y.jsx)("input",{type:"search",id:"item-search",className:"form-control bottom-border-only",list:"next-item-list","aria-label":"Search through master list",onChange:function(t){r(t.currentTarget.value);var n=e.masterItems.find((function(e){return e.name===t.currentTarget.value}));n&&(o(n.quantity),u(n.unit),u(n.unit),f(n.comment),x(n.category)),h(-1!==e.newList.findIndex((function(e){return e.name===t.currentTarget.value})))},onContextMenu:function(t){t.preventDefault(),e.setSearchListVisible(!0)},value:s,required:!0})]}),Object(y.jsx)("datalist",{id:"next-item-list",children:O.map((function(e){return Object(y.jsx)("option",{value:e},e)}))}),Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"qty-input",className:"form-label",children:"Quantity"}),Object(y.jsx)("input",{type:"number",className:"form-control bottom-border-only",id:"qty-input","aria-label":"Quantity",min:1,required:!0,onChange:function(e){if(""!==e.currentTarget.value){var t=parseFloat(e.currentTarget.value);o(Math.round(10*t)/10)}else o(0)},value:0===i?"":i+""})]}),Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"unit-input",className:"form-label",children:"Unit"}),Object(y.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"unit-input",list:"unit-list","aria-label":"Unit",required:!0,onChange:function(e){u(e.currentTarget.value)},value:l})]}),Object(y.jsx)("datalist",{id:"unit-list",children:Object(c.a)(d).map((function(e){return Object(y.jsx)("option",{value:e},e)}))}),Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"comments-input",className:"form-label",children:"Comments"}),Object(y.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"comments-input","aria-label":"Comments",onChange:function(e){f(e.currentTarget.value)},value:b})]}),Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"category-input",className:"form-label",children:"Category"}),Object(y.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"category-input",list:"category-list","aria-label":"Unit",required:!0,onChange:function(e){x(""===e.currentTarget.value?void 0:e.currentTarget.value)},value:void 0===g?"":g})]}),Object(y.jsx)("datalist",{id:"category-list",children:Object(c.a)(m).map((function(e){return Object(y.jsx)("option",{value:e},e)}))}),Object(y.jsx)("br",{}),Object(y.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(y.jsx)("input",{type:"submit",value:v?"Modify":"Add",className:"btn btn-primary",onClick:function(n){n.preventDefault(),s&&i&&l&&(t.addUpdate({name:s,quantity:i,unit:l,comment:b,saved:0,date:j,category:g}),e.setNewList((function(e){var t=e.findIndex((function(e){return e.name===s}));if(-1===t)return[].concat(Object(c.a)(e),[{name:s,quantity:i,unit:l,comment:b,saved:0,date:j,category:g}]);var n=Object(c.a)(e),a=n[t];return a.quantity=i,a.unit=l,a.comment=b,a.category=g,n})),e.setMasterList((function(e){if(e.has(s))return e;var t=new Set(e);return t.add(s),t})),r(""),o(0),u(""),f(""),h(!1),x(void 0))},style:{flexGrow:.4}}),Object(y.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){r(""),o(0),u(""),f(""),h(!1),x(void 0)},style:{flexGrow:.4}})]})]})}function S(e){var t=Object(a.useRef)(null);Object(a.useLayoutEffect)((function(){t.current&&(t.current.scrollTop=e.searchYPosition)}));var n=[];return e.masterItems.forEach((function(t){n.push(Object(y.jsx)(O,{item:t,newItemStatesAndSetters:e.newItemStatesAndSetters,disabled:!!e.newList.find((function(e){return e.name===t.name})),setSearchListVisible:e.setSearchListVisible},t.name))})),Object(y.jsx)("div",{id:"item-search-list",ref:t,style:{height:"calc(100vh - 220px)",overflowY:"scroll"},onScroll:function(t){e.setSearchYPosition(t.currentTarget.scrollTop)},children:n})}function I(e){return{name:e.name,quantity:e.quantity,unit:e.unit,comment:e.comment,date:e.date,saved:e.saved,category:e.category}}function N(e){if("object"===typeof e){var t=e;if("string"===typeof t.name&&"number"===typeof t.quantity&&"string"===typeof t.unit&&"string"===typeof t.comment&&"string"===typeof t.date&&"number"===typeof t.saved&&("string"===typeof t.category||"undefined"===typeof t.category))return{name:t.name,quantity:t.quantity,unit:t.unit,comment:t.comment,date:new Date(t.date),saved:t.saved,category:t.category}}}n(36);var k=function(e){var t=window.localStorage.getItem("settings_message"),n=t?[t,""]:["".concat(e[0].date.toLocaleDateString()),"".concat(e.length," items"),""],a=new Map;e.forEach((function(e){var t,n=void 0===(t=e.category)?"":t,s=a.get(n);s?s.push(e):a.set(n,[e])}));var s=Object(c.a)(a.keys());return s.sort(),s.forEach((function(e){""===e?n.push(""):(n.push(""),n.push(e),n.push("=".repeat(e.length))),a.get(e).forEach((function(e,t){var a=e.comment?" (".concat(e.comment,")"):"";n.push("".concat(t+1,". ").concat(e.name).concat(a," : ").concat(e.quantity," ").concat(e.unit))}))})),n.join("\n")};function C(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),s=n[0],r=n[1],i=Object(a.useContext)(p),c=Object(u.f)();return Object(y.jsxs)("div",{style:{height:"calc(100vh - 220px)"},children:[Object(y.jsx)("ol",{className:"list-group list-group-flush list-group-numbered",style:{height:"100%",overflowY:"auto"},children:e.list.map((function(t){return Object(y.jsx)(O,{item:t,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:e.removeItem},t.name)}))}),Object(y.jsx)("br",{}),e.copyList&&e.list.length>0&&Object(y.jsx)("input",{type:"button",value:s?"Copied!":"Copy list",className:"btn "+(s?"btn-success":"btn-primary"),onClick:function(){navigator.clipboard.writeText(k(e.list)).then((function(){r(!0),setTimeout((function(){r(!1)}),1e3)}))}}),e.setNewList&&e.date&&e.list.length>0&&Object(y.jsx)("input",{type:"button",value:"Create new list",className:"btn btn-primary",onClick:function(t){t.preventDefault(),e.setNewList&&(e.setNewList((function(t){if(!e.list)return t;var n=e.date||new Date,a=new Map;t.forEach((function(e){a.set(e.name,e)})),e.list.forEach((function(e){(e=I(e)).saved=0,e.date=n,a.set(e.name,e)}));var s=[];return a.forEach((function(e){s.push(e),i.addUpdate(e)})),s})),c.push("/"))}})]})}function L(e){var t=Object(a.useContext)(p),n=function(){e.newItemStatesAndSetters.setName(""),e.newItemStatesAndSetters.setQuantity(0),e.newItemStatesAndSetters.setUnit(""),e.newItemStatesAndSetters.setComment(""),e.newItemStatesAndSetters.setExisting(!1),e.newItemStatesAndSetters.setCategory(void 0)};return Object(y.jsxs)("div",{id:"new-item-list-wrapper",children:[Object(y.jsxs)("p",{children:["Shopping list(",e.list.length,")"]}),Object(y.jsx)(C,{list:e.list,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:e.removeItem}),Object(y.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:25},children:[Object(y.jsx)("input",{type:"button",value:"Save and Copy",className:"btn btn-primary",onClick:function(){var a;if(0!==e.list.length){var s=new Date;null===(a=t.saveUnsaved(s))||void 0===a||a.then((function(){n(),e.setRunFetchEffect(!0)})),navigator.clipboard.writeText(k(e.list))}},style:{flexGrow:.4},disabled:0===e.list.length}),Object(y.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){var a;0!==e.list.length&&(null===(a=t.clearUnsaved())||void 0===a||a.then((function(){n(),e.setRunFetchEffect(!0)})))},style:{flexGrow:.4},disabled:0===e.list.length})]})]})}n(45);function A(e){var t=Object(a.useContext)(p),n=e.newItemStatesAndSetters,s=n.name,r=n.setName,i=n.setQuantity,c=n.setUnit,l=n.setComment,u=n.setExisting,d=n.setCategory,m=Object(a.useState)(!1),b=Object(o.a)(m,2),f=b[0],v=b[1],h=Object(a.useState)(0),j=Object(o.a)(h,2),g=j[0],x=j[1];return Object(y.jsxs)("div",{id:"newlist-wrapper",children:[f?Object(y.jsx)(S,{masterItems:e.masterItems,masterList:e.masterList,newList:e.newList,newItemStatesAndSetters:e.newItemStatesAndSetters,searchListVisible:f,setSearchListVisible:v,searchYPosition:g,setSearchYPosition:x}):Object(y.jsx)(w,{masterList:e.masterList,setMasterList:e.setMasterList,newList:e.newList,setNewList:e.setNewList,masterItems:e.masterItems,newItemStatesAndSetters:e.newItemStatesAndSetters,searchListVisible:f,setSearchListVisible:v}),Object(y.jsx)("div",{className:"sepline"}),Object(y.jsx)(L,{list:e.newList,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:function(n){var a=n.name,o=e.newList.filter((function(e){return e.name!==a}));t.delete(n),e.setNewList(o),s===a&&(r(""),i(0),c(""),l(""),u(!1),d(void 0))},setRunFetchEffect:e.setRunFetchEffect}),!1,Object(y.jsx)("br",{})]})}function D(e){return Object(y.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-start"+(e.selected?" active":""),children:[Object(y.jsxs)("div",{className:"ms-2 me-auto",style:{width:"100vw"},onClick:function(){e.setSelectedDate(e.date)},children:[Object(y.jsx)("div",{className:"fw-bold",style:{display:"inline"},children:new Date(e.date).toLocaleString()}),Object(y.jsxs)("div",{children:[e.items.length,"\xa0items"]})]}),!e.readOnly&&Object(y.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){}})]})}n(46);function E(e){var t=Object(a.useState)(0),n=Object(o.a)(t,2),s=n[0],r=n[1],i=Object(c.a)(e.dateMap.keys()).sort((function(e,t){return t.valueOf()-e.valueOf()})),l=e.dateMap.get(s);return Object(y.jsxs)("div",{style:{marginLeft:10,width:"90%"},children:[Object(y.jsxs)("p",{children:["Previous shopping lists(",e.dateMap.size,")"]}),Object(y.jsxs)("div",{id:"previous-lists-wrapper",children:[Object(y.jsx)("div",{children:Object(y.jsx)("ol",{id:"previous-lists",className:"list-group list-group-flush list-group-numbered",children:i.map((function(t){return Object(y.jsx)(D,{date:t,items:e.dateMap.get(t)||[],selected:t===s,setSelectedDate:r,readOnly:!0},t)}))})}),0!==i.length&&Object(y.jsx)("div",{className:"sepline"}),Object(y.jsx)("div",{id:"previous-list-one",children:0!==s&&void 0!==l&&Object(y.jsx)(C,{list:l,copyList:!0,setNewList:e.setNewList,date:e.date})})]}),Object(y.jsx)("br",{})]})}n(47);var U=function(e){var t=Object(a.useState)(window.localStorage.getItem("settings_name")),n=Object(o.a)(t,2),s=n[0],r=n[1],i=Object(a.useState)(window.localStorage.getItem("settings_message")),c=Object(o.a)(i,2),l=c[0],u=c[1],d=Object(a.useState)(0),m=Object(o.a)(d,2),b=m[0],f=m[1],v=Object(a.useContext)(p);return Object(y.jsxs)("div",{id:"data-page",children:[Object(y.jsxs)("div",{id:"import-export",children:[Object(y.jsx)("input",{type:"button",value:"Export Data",className:"data-button data-export-button",onClick:function(){v.exportToJSONText().then((function(e){var t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});t.href=URL.createObjectURL(n),t.download="shopping-list-export-"+(new Date).toLocaleDateString()+".json",t.click()}))},style:{marginBottom:20}}),Object(y.jsx)("input",{type:"button",value:0===b?"Import from file":-1===b?"Import failed!":"Import successful!",className:"data-button data-import-button",onClick:function(){var e=document.getElementById("importFile");null===e||void 0===e||e.click()}}),Object(y.jsx)("input",{type:"file",id:"importFile",onChange:function(){var t=document.getElementById("importFile");t&&t.files&&t.files.length&&t.files[0].text().then((function(e){return v.importFromJSONText(e)})).then((function(t){return t&&(r(window.localStorage.getItem("settings_name")),u(window.localStorage.getItem("settings_message")),e.setRunFetchEffect(!0)),f(t?1:-1),setTimeout((function(){f(0)}),1e3),!0}))},style:{display:"none"},accept:".json"})]}),Object(y.jsx)("br",{}),Object(y.jsx)("div",{className:"sepline-horiz"}),Object(y.jsxs)("form",{id:"settings-form",children:[Object(y.jsx)("h5",{children:"Delivery Information"}),Object(y.jsx)("br",{}),Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"settings-name",className:"form-label",children:"Name"}),Object(y.jsx)("input",{type:"text",id:"settings-name",className:"form-control","aria-label":"Your name",placeholder:"Your name",onChange:function(e){r(e.currentTarget.value)},value:s||""})]}),Object(y.jsxs)("div",{className:"mb-3",children:[Object(y.jsx)("label",{htmlFor:"settings-message",className:"form-label",children:"Custom message for delivery"}),Object(y.jsx)("textarea",{id:"settings-message",className:"form-control",rows:6,"aria-label":"Your message",placeholder:"Your message",onChange:function(e){u(e.currentTarget.value)},value:l||""})]}),Object(y.jsx)("br",{}),Object(y.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(y.jsx)("input",{type:"submit",value:"Save",className:"btn btn-success",onClick:function(){s&&window.localStorage.setItem("settings_name",s),l&&window.localStorage.setItem("settings_message",l)},style:{flexGrow:.4}}),Object(y.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){window.localStorage.removeItem("settings_name"),window.localStorage.removeItem("settings_message"),r(""),u("")},style:{flexGrow:.4}})]}),Object(y.jsx)("br",{})]})]})},T=n(22),F="shopping-list-app-db",q="shopping-list-store",P=function(){function e(t){Object(h.a)(this,e),this.db=void 0,this.db=t}return Object(j.a)(e,[{key:"getAllItems",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return new Promise((function(n,a){var s=e.db.transaction(q).objectStore(q).getAll(null,t>0?t:void 0);s.onerror=function(e){console.debug("getAllItems getAll() failed"),a(new Error("".concat(q," getAll: errCode = ").concat(s.error)))},s.onsuccess=function(){console.debug("getAllItems: getAll() succeeded."),n(this.result)}}))}},{key:"getItemsWithDate",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,a=arguments.length>2?arguments[2]:void 0;return new Promise((function(s,r){var i=(a||t.db.transaction(q)).objectStore(q).index("date").getAll(n(e));i.onerror=function(e){console.debug('getItemsWithDate .index("date").getAll() failed'),r(new Error("".concat(q,' index("date").getAll: errCode = ').concat(i.error)))},i.onsuccess=function(){console.debug('getItemsWithDate .index("date").getAll() succeeded'),s(this.result)}}))}},{key:"getItemsSaved",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,a=arguments.length>2?arguments[2]:void 0;return new Promise((function(s,r){var i=(a||t.db.transaction(q)).objectStore(q).index("saved").getAll(n(e));i.onerror=function(e){console.debug('getItemsSaved .index("date").getAll() failed'),r(new Error("".concat(q,' index("date").getAll: errCode').concat(i.error)))},i.onsuccess=function(){console.debug('getItemsSaved .index("date").getAll() succeeded'),s(this.result)}}))}},{key:"deleteItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,n=this.db.transaction(q,"readwrite"),a=n.objectStore(q);return this.getItemsWithDate(e.date,t,n).then((function(n){return new Promise((function(s,r){console.debug("deleteItem: getItemsWithDate succeeded");var i=!1,c=function(e){console.debug("deleteItem add/update failed"),r(new Error("".concat(q," add/update failed")))},o=function(){console.debug("deleteItem: add/update succeeded."),s(void 0)};n.forEach((function(n){if(!i&&n.name===e.name&&n.saved===e.saved){console.debug("deleteItem: found a matching item, deleting it...");var s=a.delete(t(n.id));s.onerror=c,s.onsuccess=o,i=!0}})),i||(console.debug("warning: deleteItem no matching entry."),s(void 0))}))})).catch((function(e){return console.debug("deleteItem: getItemsWithDate() failed"),Promise.reject(new Error("".concat(q," getItemsWithDate: reason ").concat(e)))}))}},{key:"clearAll",value:function(){var e=this;return new Promise((function(t,n){var a=e.db.transaction(q,"readwrite").objectStore(q).clear();a.onerror=function(e){console.debug("clearAll: clear() failed"),n(new Error("".concat(q," clear: errCode").concat(a.error)))},a.onsuccess=function(){console.debug("clearAll: clear() succeeded"),t(this.result)}}))}},{key:"clearUnsaved",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:IDBKeyRange.only,n=this.db.transaction(q,"readwrite"),a=n.objectStore(q);return new Promise((function(s,r){n.onerror=function(e){console.debug("clearUnsaved: clear() failed"),r(new Error("".concat(q," clear: errCode").concat(n.error)))},n.oncomplete=function(){console.debug("clearUnsaved: clear() succeeded"),s(void 0)},e.getItemsSaved(0,t,n).then((function(e){e.forEach((function(e){a.delete(t(e.id))}))}))}))}},{key:"addUpdateItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,n=this.db.transaction(q,"readwrite"),a=n.objectStore(q);return this.getItemsWithDate(e.date,t,n).then((function(t){return new Promise((function(n,s){console.debug("addUpdateItem: getItemsWithDate succeeded");var r=!1,i=function(e){console.debug("addUpdateItem add/update failed"),s(new Error("".concat(q," add/update failed")))},c=function(){console.debug("addUpdateItem: add/update succeeded."),n(this.result)};if(t.forEach((function(t){if(!r&&t.name===e.name){console.debug("addUpdateItem: found a matching item, updating it...");var n=Object(T.a)(Object(T.a)({},e),{},{id:0});n.id=t.id;var s=a.put(n);s.onerror=i,s.onsuccess=c,r=!0}})),!r){console.debug("addUpdateItem no matching entry yet");var o=a.add(e);o.onerror=i,o.onsuccess=c}}))})).catch((function(e){return console.debug("addUpdateItem: getItemsWithDate() failed"),Promise.reject(new Error("".concat(q," getItemsWithDate: reason ").concat(e)))}))}},{key:"saveUnsaved",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,a=this.db.transaction(q,"readwrite"),s=a.objectStore(q);return new Promise((function(r,i){a.onerror=function(e){console.debug("saveUnsaved: transaction failed"),i(new Error("".concat(q," transaction: errCode").concat(a.error)))},a.oncomplete=function(){console.debug("saveUnsaved: transaction succeeded"),r(void 0)},t.getItemsSaved(0,n,a).then((function(t){t.forEach((function(t){var n=I(t);n.date=e,n.saved=1,s.put(n)})),t.forEach((function(e){s.delete(n(e.id))}))}))}))}},{key:"exportToJSON",value:function(){var e=Object(v.a)(f.a.mark((function e(){var t,n,a=arguments;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:window.localStorage,e.prev=1,e.next=4,this.getAllItems();case 4:return n=e.sent,e.abrupt("return",{items:n,name:t.getItem("settings_name")||"",message:t.getItem("settings_message")||""});case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",{items:[],name:"",message:""});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"importFromJSON",value:function(){var e=Object(v.a)(f.a.mark((function e(t){var n,a,s,r,i,c,o,l=arguments;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=l.length>1&&void 0!==l[1]?l[1]:IDBKeyRange.only,a=l.length>2&&void 0!==l[2]?l[2]:window.localStorage,e.prev=2,s=JSON.parse(t),e.next=9;break;case 6:return e.prev=6,e.t0=e.catch(2),e.abrupt("return",!1);case 9:if("object"===typeof s){e.next=11;break}return e.abrupt("return",!1);case 11:if(Array.isArray(s.items)){e.next=13;break}return e.abrupt("return",!1);case 13:if(r=[],s.items.forEach((function(e){var t=N(e);t&&r.push(t)})),i={items:r,name:"string"===typeof s.name?s.name:"",message:"string"===typeof s.message?s.message:""},c=!1,!r.length){e.next=35;break}return e.next=20,this.clearAll();case 20:o=0;case 21:if(!(o<r.length)){e.next=34;break}return e.prev=22,e.next=25,this.addUpdateItem(r[o],n);case 25:e.next=31;break;case 27:return e.prev=27,e.t1=e.catch(22),console.debug("Error adding item : ".concat(r[o]," err = ").concat(e.t1)),e.abrupt("return",!1);case 31:++o,e.next=21;break;case 34:c=!0;case 35:return""!==i.name&&(a.setItem("settings_name",i.name),c=!0),""!==i.message&&(a.setItem("settings_message",i.message),c=!0),e.abrupt("return",c);case 38:case"end":return e.stop()}}),e,this,[[2,6],[22,27]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),B=s.a.useEffect,M=s.a.useState,R=new g;(function(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&(console.debug=function(){}),new Promise((function(t,n){console.debug("Opening DB: ".concat(F));var a=e.open(F,3);a.onsuccess=function(){console.debug("Opened DB: ".concat(F)),t(new P(this.result))},a.onerror=function(e){n(new Error("openDb failed errCode: ".concat(a.error)))},a.onupgradeneeded=function(e){if(console.debug("openDb.onupgradeneeded : ".concat(F)),!e||!e.currentTarget||!e.currentTarget.result)return console.debug("openDb.onupgradeneeded : ".concat(F," no new db in event!")),void n(new Error("onupgradeneeded: no new db!"));var t=e.currentTarget.result,a=e.target.transaction;if(t.objectStoreNames.contains(q)){var s=a.objectStore(q);s.indexNames.contains("saved")||s.createIndex("saved","saved",{unique:!1})}else{var r=t.createObjectStore(q,{keyPath:"id",autoIncrement:!0});r.createIndex("date","date",{unique:!1}),r.createIndex("saved","saved",{unique:!1})}},a.onblocked=function(){console.debug("openDb.onupgradeneeded : ".concat(F," blocked on other tabs")),n(new Error("openDb upgrade: close other tabs and try again."))}}))})(indexedDB).then((function(e){R.setDB(e),R.fetch()}));var _=function(){var e=M(new Set([])),t=Object(o.a)(e,2),n=t[0],a=t[1],s=M(!1),r=Object(o.a)(s,2),i=r[0],d=r[1],m=M([]),b=Object(o.a)(m,2),f=b[0],v=b[1],h=M([]),j=Object(o.a)(h,2),g=j[0],p=j[1],O=M(new Map),w=Object(o.a)(O,2),S=w[0],I=w[1],N=M(""),k=Object(o.a)(N,2),C=k[0],L=k[1],D=M(0),T=Object(o.a)(D,2),F=T[0],q=T[1],P=M(""),_=Object(o.a)(P,2),J=_[0],W=_[1],V=M(""),Y=Object(o.a)(V,2),K=Y[0],Q=Y[1],G=M(new Date),z=Object(o.a)(G,2),H=z[0],X=z[1],Z=M(void 0),$=Object(o.a)(Z,2),ee=$[0],te=$[1],ne=M(!1),ae=Object(o.a)(ne,2),se=ae[0],re=ae[1],ie=M(!1),ce=Object(o.a)(ie,2),oe=ce[0],le=ce[1],ue={name:C,setName:L,quantity:F,setQuantity:q,unit:J,setUnit:W,comment:K,setComment:Q,existing:se,setExisting:re,date:H,setDate:X,category:ee,setCategory:te};return B((function(){if(oe||!n.size&&!i){R.hasDB()&&R.fetch();var e=function(e){oe&&le(!1),d(0===e.length),a(new Set(e.map((function(e){return e.name}))));var t=new Map,n=[],s=new Map;e.forEach((function(e){e.saved||n.push(e);var a=t.get(e.name);if(a?a.date<e.date&&t.set(e.name,e):t.set(e.name,e),e.saved){var r=s.get(e.date.valueOf());r?r.push(e):s.set(e.date.valueOf(),[e])}})),v(Object(c.a)(t.values())),p(n),n.length&&X(n[0].date),I(s)};return R.addListener(e),function(){R.removeListener(e)}}})),Object(y.jsx)(l.a,{children:Object(y.jsxs)("div",{children:[Object(y.jsx)("nav",{children:Object(y.jsxs)("ul",{className:"nav",children:[Object(y.jsx)("li",{className:"nav-item",children:Object(y.jsx)(l.b,{to:"/",className:"nav-link",children:"New list"})}),Object(y.jsx)("li",{className:"nav-item",children:Object(y.jsx)(l.b,{to:"/previous",className:"nav-link",children:"Previous lists"})}),Object(y.jsx)("li",{className:"nav-item",children:Object(y.jsx)(l.b,{to:"/data",className:"nav-link",children:"Data"})})]})}),Object(y.jsx)("div",{className:"nav-space"}),Object(y.jsx)("br",{}),Object(y.jsx)(x,{value:R,children:Object(y.jsxs)(u.c,{children:[Object(y.jsx)(u.a,{path:"/data",children:Object(y.jsx)(U,{setRunFetchEffect:le})}),Object(y.jsx)(u.a,{path:"/previous",children:Object(y.jsx)(E,{dateMap:S,setNewList:p,date:H})}),Object(y.jsx)(u.a,{path:"/",children:Object(y.jsx)(A,{masterList:n,setMasterList:a,newList:g,setNewList:p,masterItems:f,newItemStatesAndSetters:ue,runFetchEffect:oe,setRunFetchEffect:le})})]})}),Object(y.jsx)("footer",{children:Object(y.jsx)("small",{children:"\xa9 Dennis Francis 2021"})})]})})};i.a.render(Object(y.jsx)(s.a.StrictMode,{children:Object(y.jsx)(_,{})}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.9cb749b9.chunk.js.map