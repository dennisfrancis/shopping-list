(this["webpackJsonpshopping-list"]=this["webpackJsonpshopping-list"]||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},34:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(22),i=n.n(r),o=(n(28),n(5)),c=n(2),l=n(14),u=n(3),d=(n(29),n(30),n(31),n(32),new Set(["Kg","gm","Packet(s)","No"])),m=new Set(["Vegetables","Fruits","Medicines"]),b=n(9),f=n.n(b),g=n(11),v=n(16),j=n(17),h=function(){function e(t){Object(v.a)(this,e),this.db=void 0,this.listeners=new Set,this.db=t,this.invokeListeners=this.invokeListeners.bind(this)}return Object(j.a)(e,[{key:"setDB",value:function(e){this.db=e}},{key:"hasDB",value:function(){return!!this.db}},{key:"invokeListeners",value:function(e){this.listeners.forEach((function(t){t(e)}))}},{key:"fetch",value:function(){this.db&&this.db.getAllItems().then(this.invokeListeners)}},{key:"addListener",value:function(e){this.listeners.add(e)}},{key:"removeListener",value:function(e){this.listeners.delete(e)}},{key:"addUpdate",value:function(e){this.db&&this.db.addUpdateItem(e)}},{key:"delete",value:function(e){this.db&&this.db.deleteItem(e)}},{key:"clearUnsaved",value:function(){if(this.db)return this.db.clearUnsaved()}},{key:"saveUnsaved",value:function(e){if(this.db)return this.db.saveUnsaved(e)}},{key:"exportToJSONText",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null===(n=this.db)||void 0===n?void 0:n.exportToJSON();case 3:t=e.sent,e.next=9;break;case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return","");case 9:return e.abrupt("return",JSON.stringify(t));case 10:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()},{key:"importFromJSONText",value:function(){var e=Object(g.a)(f.a.mark((function e(t){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!1,e.prev=1,e.next=4,null===(a=this.db)||void 0===a?void 0:a.importFromJSON(t);case 4:n=!!e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",!1);case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e,this,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),p=s.a.createContext({}),y=p.Provider,x=(n(34),n(0));function O(e){var t=Object(a.useContext)(p),n=e.newItemStatesAndSetters,s=n.name,r=n.setName,i=n.quantity,c=n.setQuantity,l=n.unit,u=n.setUnit,b=n.comment,f=n.setComment,g=n.existing,v=n.setExisting,j=n.date,h=n.category,y=n.setCategory,O=[];return e.masterList.forEach((function(t){e.newList.find((function(e){return e.name===t}))||O.push(t)})),Object(x.jsxs)("form",{id:"item-controls",children:[Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"item-search",className:"form-label",children:"Item name"}),Object(x.jsx)("input",{type:"search",id:"item-search",className:"form-control bottom-border-only",list:"next-item-list","aria-label":"Search through master list",onChange:function(t){r(t.currentTarget.value);var n=e.masterItems.find((function(e){return e.name===t.currentTarget.value}));n&&(c(n.quantity),u(n.unit),u(n.unit),f(n.comment),y(n.category)),v(-1!==e.newList.findIndex((function(e){return e.name===t.currentTarget.value})))},value:s,required:!0})]}),Object(x.jsx)("datalist",{id:"next-item-list",children:O.map((function(e){return Object(x.jsx)("option",{value:e},e)}))}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"qty-input",className:"form-label",children:"Quantity"}),Object(x.jsx)("input",{type:"number",className:"form-control bottom-border-only",id:"qty-input","aria-label":"Quantity",min:1,required:!0,onChange:function(e){""!==e.currentTarget.value?c(parseInt(e.currentTarget.value)):c(0)},value:0===i?"":i+""})]}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"unit-input",className:"form-label",children:"Unit"}),Object(x.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"unit-input",list:"unit-list","aria-label":"Unit",required:!0,onChange:function(e){u(e.currentTarget.value)},value:l})]}),Object(x.jsx)("datalist",{id:"unit-list",children:Object(o.a)(d).map((function(e){return Object(x.jsx)("option",{value:e},e)}))}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"comments-input",className:"form-label",children:"Comments"}),Object(x.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"comments-input","aria-label":"Comments",onChange:function(e){f(e.currentTarget.value)},value:b})]}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"category-input",className:"form-label",children:"Category"}),Object(x.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"category-input",list:"category-list","aria-label":"Unit",required:!0,onChange:function(e){y(""===e.currentTarget.value?void 0:e.currentTarget.value)},value:void 0===h?"":h})]}),Object(x.jsx)("datalist",{id:"category-list",children:Object(o.a)(m).map((function(e){return Object(x.jsx)("option",{value:e},e)}))}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(x.jsx)("input",{type:"submit",value:g?"Modify":"Add",className:"btn btn-primary",onClick:function(n){n.preventDefault(),s&&i&&l&&(t.addUpdate({name:s,quantity:i,unit:l,comment:b,saved:0,date:j,category:h}),e.setNewList((function(e){var t=e.findIndex((function(e){return e.name===s}));if(-1===t)return[].concat(Object(o.a)(e),[{name:s,quantity:i,unit:l,comment:b,saved:0,date:j,category:h}]);var n=Object(o.a)(e),a=n[t];return a.quantity=i,a.unit=l,a.comment=b,a.category=h,n})),e.setMasterList((function(e){if(e.has(s))return e;var t=new Set(e);return t.add(s),t})),r(""),c(0),u(""),f(""),v(!1),y(void 0))},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){r(""),c(0),u(""),f(""),v(!1),y(void 0)},style:{flexGrow:.4}})]})]})}function w(e){var t=!!e.newItemStatesAndSetters&&e.newItemStatesAndSetters.name===e.item.name;return Object(x.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-start"+(t?" active":""),children:[Object(x.jsxs)("div",{className:"ms-2 me-auto",style:{width:"100vw"},onClick:function(){e.newItemStatesAndSetters&&(e.newItemStatesAndSetters.setName(e.item.name),e.newItemStatesAndSetters.setQuantity(e.item.quantity),e.newItemStatesAndSetters.setUnit(e.item.unit),e.newItemStatesAndSetters.setComment(e.item.comment),e.newItemStatesAndSetters.setExisting(!0),e.newItemStatesAndSetters.setCategory(e.item.category))},children:[Object(x.jsx)("div",{className:"fw-bold",style:{display:"inline"},children:e.item.name+(e.item.comment?" ("+e.item.comment+")":"")}),Object(x.jsxs)("div",{children:[e.item.quantity,"\xa0",e.item.unit,"\xa0",void 0!==e.item.category&&Object(x.jsx)("small",{style:{fontStyle:"italic",color:"red"},children:"#"+e.item.category})]})]}),e.removeItem&&Object(x.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){e.removeItem&&e.removeItem(e.item)}})]})}n(36);var S=function(e){var t=window.localStorage.getItem("settings_message"),n=t?[t,""]:["".concat(e[0].date.toLocaleDateString()),"".concat(e.length," items"),""],a=new Map;e.forEach((function(e){var t,n=void 0===(t=e.category)?"":t,s=a.get(n);s?s.push(e):a.set(n,[e])}));var s=Object(o.a)(a.keys());return s.sort(),s.forEach((function(e){""===e?n.push(""):(n.push(""),n.push(e),n.push("=".repeat(e.length))),a.get(e).forEach((function(e,t){var a=e.comment?" (".concat(e.comment,")"):"";n.push("".concat(t+1,". ").concat(e.name).concat(a," : ").concat(e.quantity," ").concat(e.unit))}))})),n.join("\n")};function I(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2),s=n[0],r=n[1];return Object(x.jsxs)("div",{children:[Object(x.jsx)("ol",{className:"list-group list-group-flush list-group-numbered",style:{maxHeight:"80vh",overflowY:"auto"},children:e.list.map((function(t){return Object(x.jsx)(w,{item:t,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:e.removeItem},t.name)}))}),Object(x.jsx)("br",{}),e.copyList&&e.list.length>0&&Object(x.jsx)("input",{type:"button",value:s?"Copied!":"Copy list",className:"btn "+(s?"btn-success":"btn-primary"),onClick:function(){navigator.clipboard.writeText(S(e.list)).then((function(){r(!0),setTimeout((function(){r(!1)}),1e3)}))}})]})}function N(e){var t=Object(a.useContext)(p),n=function(){e.newItemStatesAndSetters.setName(""),e.newItemStatesAndSetters.setQuantity(0),e.newItemStatesAndSetters.setUnit(""),e.newItemStatesAndSetters.setComment(""),e.newItemStatesAndSetters.setExisting(!1),e.newItemStatesAndSetters.setCategory(void 0)};return Object(x.jsxs)("div",{id:"new-item-list-wrapper",children:[Object(x.jsxs)("p",{children:["Shopping list(",e.list.length,")"]}),Object(x.jsx)(I,{list:e.list,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:e.removeItem}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10},children:[Object(x.jsx)("input",{type:"button",value:"Save and Copy",className:"btn btn-primary",onClick:function(){var a;if(0!==e.list.length){var s=new Date;null===(a=t.saveUnsaved(s))||void 0===a||a.then((function(){n(),e.setRunFetchEffect(!0)})),navigator.clipboard.writeText(S(e.list))}},style:{flexGrow:.4},disabled:0===e.list.length}),Object(x.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){var a;0!==e.list.length&&(null===(a=t.clearUnsaved())||void 0===a||a.then((function(){n(),e.setRunFetchEffect(!0)})))},style:{flexGrow:.4},disabled:0===e.list.length})]})]})}n(37);function k(e){var t=Object(a.useContext)(p),n=e.newItemStatesAndSetters,s=n.name,r=n.setName,i=n.setQuantity,o=n.setUnit,c=n.setComment,l=n.setExisting,u=n.setCategory;return Object(x.jsxs)("div",{id:"newlist-wrapper",children:[Object(x.jsx)(O,{masterList:e.masterList,setMasterList:e.setMasterList,newList:e.newList,setNewList:e.setNewList,masterItems:e.masterItems,newItemStatesAndSetters:e.newItemStatesAndSetters}),Object(x.jsx)("div",{className:"sepline"}),Object(x.jsx)(N,{list:e.newList,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:function(n){var a=n.name,d=e.newList.filter((function(e){return e.name!==a}));t.delete(n),e.setNewList(d),s===a&&(r(""),i(0),o(""),c(""),l(!1),u(void 0))},setRunFetchEffect:e.setRunFetchEffect}),!1]})}function C(e){return Object(x.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-start"+(e.selected?" active":""),children:[Object(x.jsxs)("div",{className:"ms-2 me-auto",style:{width:"100vw"},onClick:function(){e.setSelectedDate(e.date)},children:[Object(x.jsx)("div",{className:"fw-bold",style:{display:"inline"},children:new Date(e.date).toLocaleString()}),Object(x.jsxs)("div",{children:[e.items.length,"\xa0items"]})]}),!e.readOnly&&Object(x.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){}})]})}n(38);function A(e){var t=Object(a.useState)(0),n=Object(c.a)(t,2),s=n[0],r=n[1],i=Object(o.a)(e.dateMap.keys()).sort((function(e,t){return t.valueOf()-e.valueOf()})),l=e.dateMap.get(s);return Object(x.jsxs)("div",{style:{marginLeft:10,width:"90%"},children:[Object(x.jsxs)("p",{children:["Previous shopping lists(",e.dateMap.size,")"]}),Object(x.jsxs)("div",{id:"previous-lists-wrapper",children:[Object(x.jsx)("div",{children:Object(x.jsx)("ol",{id:"previous-lists",className:"list-group list-group-flush list-group-numbered",children:i.map((function(t){return Object(x.jsx)(C,{date:t,items:e.dateMap.get(t)||[],selected:t===s,setSelectedDate:r,readOnly:!0},t)}))})}),Object(x.jsx)("div",{className:"sepline"}),Object(x.jsx)("div",{id:"previous-list-one",children:0!==s&&void 0!==l&&Object(x.jsx)(I,{list:l,copyList:!0})})]})]})}n(39);var D=function(e){var t=Object(a.useState)(window.localStorage.getItem("settings_name")),n=Object(c.a)(t,2),s=n[0],r=n[1],i=Object(a.useState)(window.localStorage.getItem("settings_message")),o=Object(c.a)(i,2),l=o[0],u=o[1],d=Object(a.useState)(0),m=Object(c.a)(d,2),b=m[0],f=m[1],g=Object(a.useContext)(p);return Object(x.jsxs)("form",{id:"settings-form",style:{margin:20},children:[Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"settings-name",className:"form-label",children:"Name"}),Object(x.jsx)("input",{type:"text",id:"settings-name",className:"form-control","aria-label":"Your name",placeholder:"Your name",onChange:function(e){r(e.currentTarget.value)},value:s||""})]}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"settings-message",className:"form-label",children:"Custom message for delivery"}),Object(x.jsx)("textarea",{id:"settings-message",className:"form-control","aria-label":"Your message",placeholder:"Your message",onChange:function(e){u(e.currentTarget.value)},value:l||""})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(x.jsx)("input",{type:"submit",value:"Save",className:"btn btn-success",onClick:function(){s&&window.localStorage.setItem("settings_name",s),l&&window.localStorage.setItem("settings_message",l)},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){window.localStorage.removeItem("settings_name"),window.localStorage.removeItem("settings_message"),r(""),u("")},style:{flexGrow:.4}})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(x.jsx)("input",{type:"button",value:"Export",className:"btn btn-primary",onClick:function(){g.exportToJSONText().then((function(e){var t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});t.href=URL.createObjectURL(n),t.download="shopping-list-export-"+(new Date).toLocaleDateString()+".json",t.click()}))},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"button",value:0===b?"Import":-1===b?"Import failed!":"Import successful!",className:"btn btn-primary",onClick:function(){var e=document.getElementById("importFile");null===e||void 0===e||e.click()},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"file",id:"importFile",onChange:function(){var t=document.getElementById("importFile");t&&t.files&&t.files.length&&t.files[0].text().then((function(e){return g.importFromJSONText(e)})).then((function(t){return t&&(r(window.localStorage.getItem("settings_name")),u(window.localStorage.getItem("settings_message")),e.setRunFetchEffect(!0)),f(t?1:-1),setTimeout((function(){f(0)}),1e3),!0}))},style:{display:"none"},accept:".json"})]})]})};function L(e){return{name:e.name,quantity:e.quantity,unit:e.unit,comment:e.comment,date:e.date,saved:e.saved,category:e.category}}function U(e){if("object"===typeof e&&"string"===typeof e.name&&"number"===typeof e.quantity&&"string"===typeof e.unit&&"string"===typeof e.comment&&"string"===typeof e.date&&"number"===typeof e.saved&&("string"===typeof e.category||"undefined"===typeof e.category))return{name:e.name,quantity:e.quantity,unit:e.unit,comment:e.comment,date:new Date(e.date),saved:e.saved,category:e.category}}var E="shopping-list-app-db",T="shopping-list-store",q=function(){function e(t){Object(v.a)(this,e),this.db=void 0,this.db=t}return Object(j.a)(e,[{key:"getAllItems",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return new Promise((function(n,a){var s=e.db.transaction(T).objectStore(T).getAll(null,t>0?t:void 0);s.onerror=function(e){console.debug("getAllItems getAll() failed"),a(e.target?e.target.errorCode:"unknown")},s.onsuccess=function(){console.debug("getAllItems: getAll() succeeded."),n(this.result)}}))}},{key:"getItemsWithDate",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,a=arguments.length>2?arguments[2]:void 0;return new Promise((function(s,r){var i=(a||t.db.transaction(T)).objectStore(T).index("date").getAll(n(e));i.onerror=function(e){console.debug('getItemsWithDate .index("date").getAll() failed'),r(e.target?e.target.errorCode:"unknown")},i.onsuccess=function(){console.debug('getItemsWithDate .index("date").getAll() succeeded'),s(this.result)}}))}},{key:"getItemsSaved",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,a=arguments.length>2?arguments[2]:void 0;return new Promise((function(s,r){var i=(a||t.db.transaction(T)).objectStore(T).index("saved").getAll(n(e));i.onerror=function(e){console.debug('getItemsSaved .index("date").getAll() failed'),r(e.target?e.target.errorCode:"unknown")},i.onsuccess=function(){console.debug('getItemsSaved .index("date").getAll() succeeded'),s(this.result)}}))}},{key:"deleteItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,n=this.db.transaction(T,"readwrite"),a=n.objectStore(T);return this.getItemsWithDate(e.date,t,n).then((function(n){return new Promise((function(s,r){console.debug("deleteItem: getItemsWithDate succeeded");var i=!1,o=function(e){console.debug("deleteItem add/update failed"),r(e.target?e.target.errorCode:"unknown")},c=function(){console.debug("deleteItem: add/update succeeded."),s(void 0)};n.forEach((function(n){if(!i&&n.name===e.name&&n.saved===e.saved){console.debug("deleteItem: found a matching item, deleting it...");var s=a.delete(t(n.id));s.onerror=o,s.onsuccess=c,i=!0}})),i||(console.debug("warning: deleteItem no matching entry."),s(void 0))}))})).catch((function(e){return console.debug("deleteItem: getItemsWithDate() failed"),Promise.reject("shopping-list-store getItemsWithDate: reason "+e)}))}},{key:"clearAll",value:function(){var e=this;return new Promise((function(t,n){var a=e.db.transaction(T,"readwrite").objectStore(T).clear();a.onerror=function(e){console.debug("clearAll: clear() failed"),n(e.target?e.target.errorCode:"unknown")},a.onsuccess=function(){console.debug("clearAll: clear() succeeded"),t(this.result)}}))}},{key:"clearUnsaved",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:IDBKeyRange.only,n=this.db.transaction(T,"readwrite"),a=n.objectStore(T);return new Promise((function(s,r){n.onerror=function(e){console.debug("clearUnsaved: clear() failed"),r(e.target?e.target.errorCode:"unknown")},n.oncomplete=function(){console.debug("clearUnsaved: clear() succeeded"),s(void 0)},e.getItemsSaved(0,t,n).then((function(e){e.forEach((function(e){a.delete(t(e.id))}))}))}))}},{key:"addUpdateItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,n=this.db.transaction(T,"readwrite"),a=n.objectStore(T);return this.getItemsWithDate(e.date,t,n).then((function(t){return new Promise((function(n,s){console.debug("addUpdateItem: getItemsWithDate succeeded");var r=!1,i=function(e){console.debug("addUpdateItem add/update failed"),s(e.target?e.target.errorCode:"unknown")},o=function(){console.debug("addUpdateItem: add/update succeeded."),n(this.result)};if(t.forEach((function(t){if(!r&&t.name===e.name){console.debug("addUpdateItem: found a matching item, updating it...");var n=L(e);n.id=t.id;var s=a.put(n);s.onerror=i,s.onsuccess=o,r=!0}})),!r){console.debug("addUpdateItem no matching entry yet");var c=a.add(e);return c.onerror=i,void(c.onsuccess=o)}}))})).catch((function(e){return console.debug("addUpdateItem: getItemsWithDate() failed"),Promise.reject("shopping-list-store getItemsWithDate: reason "+e)}))}},{key:"saveUnsaved",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,a=this.db.transaction(T,"readwrite"),s=a.objectStore(T);return new Promise((function(r,i){a.onerror=function(e){console.debug("saveUnsaved: transaction failed"),i(e.target?e.target.errorCode:"unknown")},a.oncomplete=function(){console.debug("saveUnsaved: transaction succeeded"),r(void 0)},t.getItemsSaved(0,n,a).then((function(t){t.forEach((function(t){var n=L(t);n.date=e,n.saved=1,s.put(n)})),t.forEach((function(e){s.delete(n(e.id))}))}))}))}},{key:"exportToJSON",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,n,a=arguments;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:window.localStorage,e.prev=1,e.next=4,this.getAllItems();case 4:return n=e.sent,e.abrupt("return",{items:n,name:t.getItem("settings_name")||"",message:t.getItem("settings_message")||""});case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",{items:[],name:"",message:""});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"importFromJSON",value:function(){var e=Object(g.a)(f.a.mark((function e(t){var n,a,s,r,i,o,c=arguments;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:IDBKeyRange.only,a=c.length>2&&void 0!==c[2]?c[2]:window.localStorage,"object"===typeof(s=JSON.parse(t))){e.next=5;break}return e.abrupt("return",!1);case 5:if(Array.isArray(s.items)){e.next=7;break}return e.abrupt("return",!1);case 7:return r=[],s.items.forEach((function(e){var t=U(e);t&&r.push(t)})),i={items:r,name:"string"===typeof s.name?s.name:"",message:"string"===typeof s.message?s.message:""},e.next=12,this.clearAll();case 12:o=0;case 13:if(!(o<r.length)){e.next=26;break}return e.prev=14,e.next=17,this.addUpdateItem(r[o],n);case 17:e.next=23;break;case 19:return e.prev=19,e.t0=e.catch(14),console.debug("Error adding item : "+r[o]+" err = "+e.t0),e.abrupt("return",!1);case 23:++o,e.next=13;break;case 26:return a.setItem("settings_name",i.name),a.setItem("settings_message",i.message),e.abrupt("return",!0);case 29:case"end":return e.stop()}}),e,this,[[14,19]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),F=new h;(function(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&(console.debug=function(){}),new Promise((function(t,n){console.debug("Opening DB: "+E);var a=e.open(E,3);a.onsuccess=function(){console.debug("Opened DB: "+E),t(new q(this.result))},a.onerror=function(e){n(e.target?e.target.errorCode:"unknown")},a.onupgradeneeded=function(e){if(console.debug("openDb.onupgradeneeded : "+E),!e||!e.currentTarget||!e.currentTarget.result)return console.debug("openDb.onupgradeneeded : "+E+" no new db in event!"),void n("onupgradeneeded: no new db!");var t=e.currentTarget.result,a=e.target.transaction;if(t.objectStoreNames.contains(T)){var s=a.objectStore(T);s.indexNames.contains("saved")||s.createIndex("saved","saved",{unique:!1})}else{var r=t.createObjectStore(T,{keyPath:"id",autoIncrement:!0});r.createIndex("date","date",{unique:!1}),r.createIndex("saved","saved",{unique:!1})}},a.onblocked=function(){console.debug("openDb.onupgradeneeded : "+E+" blocked on other tabs"),n("openDb upgrade: close other tabs and try again.")}}))})(indexedDB).then((function(e){F.setDB(e),F.fetch()}));var B=function(){var e=Object(a.useState)(new Set([])),t=Object(c.a)(e,2),n=t[0],s=t[1],r=Object(a.useState)(!1),i=Object(c.a)(r,2),d=i[0],m=i[1],b=Object(a.useState)([]),f=Object(c.a)(b,2),g=f[0],v=f[1],j=Object(a.useState)([]),h=Object(c.a)(j,2),p=h[0],O=h[1],w=Object(a.useState)(new Map),S=Object(c.a)(w,2),I=S[0],N=S[1],C=Object(a.useState)(""),L=Object(c.a)(C,2),U=L[0],E=L[1],T=Object(a.useState)(0),q=Object(c.a)(T,2),B=q[0],M=q[1],P=Object(a.useState)(""),R=Object(c.a)(P,2),_=R[0],J=R[1],W=Object(a.useState)(""),G=Object(c.a)(W,2),K=G[0],Q=G[1],Y=Object(a.useState)(new Date),z=Object(c.a)(Y,2),H=z[0],V=z[1],X=Object(a.useState)(void 0),Z=Object(c.a)(X,2),$=Z[0],ee=Z[1],te=Object(a.useState)(!1),ne=Object(c.a)(te,2),ae=ne[0],se=ne[1],re=Object(a.useState)(!1),ie=Object(c.a)(re,2),oe=ie[0],ce=ie[1],le={name:U,setName:E,quantity:B,setQuantity:M,unit:_,setUnit:J,comment:K,setComment:Q,existing:ae,setExisting:se,date:H,setDate:V,category:$,setCategory:ee};return Object(a.useEffect)((function(){if(oe||!n.size&&!d){F.hasDB()&&F.fetch();var e=function(e){oe&&ce(!1),m(0===e.length),s(new Set(e.map((function(e){return e.name}))));var t=new Map,n=[],a=new Map;e.forEach((function(e){e.saved||n.push(e);var s=t.get(e.name);if(s?s.date<e.date&&t.set(e.name,e):t.set(e.name,e),e.saved){var r=a.get(e.date.valueOf());r?r.push(e):a.set(e.date.valueOf(),[e])}})),v(Object(o.a)(t.values())),O(n),n.length&&V(n[0].date),N(a)};return F.addListener(e),function(){F.removeListener(e)}}})),Object(x.jsx)(l.a,{children:Object(x.jsxs)("div",{children:[Object(x.jsx)("nav",{children:Object(x.jsxs)("ul",{className:"nav",children:[Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)(l.b,{to:"/",className:"nav-link",children:"New list"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)(l.b,{to:"/previous",className:"nav-link",children:"Previous lists"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)(l.b,{to:"/settings",className:"nav-link",children:"Settings"})})]})}),Object(x.jsx)("br",{}),Object(x.jsx)(y,{value:F,children:Object(x.jsxs)(u.c,{children:[Object(x.jsx)(u.a,{path:"/settings",children:Object(x.jsx)(D,{setRunFetchEffect:ce})}),Object(x.jsx)(u.a,{path:"/previous",children:Object(x.jsx)(A,{dateMap:I})}),Object(x.jsx)(u.a,{path:"/",children:Object(x.jsx)(k,{masterList:n,setMasterList:s,newList:p,setNewList:O,masterItems:g,newItemStatesAndSetters:le,runFetchEffect:oe,setRunFetchEffect:ce})})]})})]})})};i.a.render(Object(x.jsx)(s.a.StrictMode,{children:Object(x.jsx)(B,{})}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.4b25ff79.chunk.js.map