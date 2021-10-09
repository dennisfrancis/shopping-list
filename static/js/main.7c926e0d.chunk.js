(this["webpackJsonpshopping-list"]=this["webpackJsonpshopping-list"]||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),r=n(22),i=n.n(r),c=(n(28),n(8)),o=n(3),u=n(14),l=n(2),d=(n(29),new Set(["Kg","gm","Packet(s)","No"])),m=n(9),b=n.n(m),f=n(11),v=n(16),j=n(17),g=function(){function e(t){Object(v.a)(this,e),this.db=void 0,this.listeners=new Set,this.db=t,this.invokeListeners=this.invokeListeners.bind(this)}return Object(j.a)(e,[{key:"setDB",value:function(e){this.db=e}},{key:"hasDB",value:function(){return!!this.db}},{key:"invokeListeners",value:function(e){this.listeners.forEach((function(t){t(e)}))}},{key:"fetch",value:function(){this.db&&this.db.getAllItems().then(this.invokeListeners)}},{key:"addListener",value:function(e){this.listeners.add(e)}},{key:"removeListener",value:function(e){this.listeners.delete(e)}},{key:"addUpdate",value:function(e){this.db&&this.db.addUpdateItem(e)}},{key:"delete",value:function(e){this.db&&this.db.deleteItem(e)}},{key:"clearUnsaved",value:function(){if(this.db)return this.db.clearUnsaved()}},{key:"saveUnsaved",value:function(e){if(this.db)return this.db.saveUnsaved(e)}},{key:"exportToJSONText",value:function(){var e=Object(f.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null===(n=this.db)||void 0===n?void 0:n.exportToJSON();case 3:t=e.sent,e.next=9;break;case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return","");case 9:return e.abrupt("return",JSON.stringify(t));case 10:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()},{key:"importFromJSONText",value:function(){var e=Object(f.a)(b.a.mark((function e(t){var n,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!1,e.prev=1,e.next=4,null===(s=this.db)||void 0===s?void 0:s.importFromJSON(t);case 4:n=!!e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",!1);case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e,this,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),h=a.a.createContext({}),p=h.Provider,x=(n(31),n(0));function O(e){var t=Object(s.useContext)(h),n=e.newItemStatesAndSetters,a=n.name,r=n.setName,i=n.quantity,o=n.setQuantity,u=n.unit,l=n.setUnit,m=n.comment,b=n.setComment,f=n.existing,v=n.setExisting,j=n.date,g=[];return e.masterList.forEach((function(t){e.newList.find((function(e){return e.name===t}))||g.push(t)})),Object(x.jsxs)("form",{id:"item-controls",children:[Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"item-search",className:"form-label",children:"Item name"}),Object(x.jsx)("input",{type:"search",id:"item-search",className:"form-control bottom-border-only",list:"next-item-list","aria-label":"Search through master list",onChange:function(t){r(t.currentTarget.value);var n=e.masterItems.find((function(e){return e.name===t.currentTarget.value}));n&&(o(n.quantity),l(n.unit),l(n.unit),b(n.comment)),v(-1!==e.newList.findIndex((function(e){return e.name===t.currentTarget.value})))},value:a,required:!0})]}),Object(x.jsx)("datalist",{id:"next-item-list",children:g.map((function(e){return Object(x.jsx)("option",{value:e},e)}))}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"qty-input",className:"form-label",children:"Quantity"}),Object(x.jsx)("input",{type:"number",className:"form-control bottom-border-only",id:"qty-input","aria-label":"Quantity",min:1,required:!0,onChange:function(e){""!==e.currentTarget.value?o(parseInt(e.currentTarget.value)):o(0)},value:0===i?"":i+""})]}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"unit-input",className:"form-label",children:"Unit"}),Object(x.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"unit-input",list:"unit-list","aria-label":"Unit",required:!0,onChange:function(e){l(e.currentTarget.value)},value:u})]}),Object(x.jsx)("datalist",{id:"unit-list",children:Object(c.a)(d).map((function(e){return Object(x.jsx)("option",{value:e},e)}))}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"comments-input",className:"form-label",children:"Comments"}),Object(x.jsx)("input",{type:"text",className:"form-control bottom-border-only",id:"comments-input","aria-label":"Comments",onChange:function(e){b(e.currentTarget.value)},value:m})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(x.jsx)("input",{type:"submit",value:f?"Modify":"Add",className:"btn btn-primary",onClick:function(n){n.preventDefault(),a&&i&&u&&(t.addUpdate({name:a,quantity:i,unit:u,comment:m,saved:0,date:j}),e.setNewList((function(e){var t=e.findIndex((function(e){return e.name===a}));if(-1===t)return[].concat(Object(c.a)(e),[{name:a,quantity:i,unit:u,comment:m,saved:0,date:j}]);var n=Object(c.a)(e),s=n[t];return s.quantity=i,s.unit=u,s.comment=m,n})),e.setMasterList((function(e){if(e.has(a))return e;var t=new Set(e);return t.add(a),t})),r(""),o(0),l(""),b(""),v(!1))},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){r(""),o(0),l(""),b(""),v(!1)},style:{flexGrow:.4}})]})]})}function y(e){var t=!!e.newItemStatesAndSetters&&e.newItemStatesAndSetters.name===e.item.name;return Object(x.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-start"+(t?" active":""),children:[Object(x.jsxs)("div",{className:"ms-2 me-auto",style:{width:"100vw"},onClick:function(){e.newItemStatesAndSetters&&(e.newItemStatesAndSetters.setName(e.item.name),e.newItemStatesAndSetters.setQuantity(e.item.quantity),e.newItemStatesAndSetters.setUnit(e.item.unit),e.newItemStatesAndSetters.setComment(e.item.comment),e.newItemStatesAndSetters.setExisting(!0))},children:[Object(x.jsx)("div",{className:"fw-bold",style:{display:"inline"},children:e.item.name+(e.item.comment?" ("+e.item.comment+")":"")}),Object(x.jsxs)("div",{children:[e.item.quantity,"\xa0",e.item.unit]})]}),e.removeItem&&Object(x.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){e.removeItem&&e.removeItem(e.item)}})]})}n(33);var w=function(e){var t=window.localStorage.getItem("settings_message"),n=t?[t,""]:["".concat(e[0].date.toLocaleDateString()),"".concat(e.length," items"),""];return e.forEach((function(e,t){var s=e.comment?" (".concat(e.comment,")"):"";n.push("".concat(t+1,". ").concat(e.name).concat(s," : ").concat(e.quantity," ").concat(e.unit))})),n.join("\n")};function S(e){var t=Object(s.useState)(!1),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(x.jsxs)("div",{children:[Object(x.jsx)("ol",{className:"list-group list-group-numbered",style:{maxHeight:"80vh",overflowY:"auto"},children:e.list.map((function(t){return Object(x.jsx)(y,{item:t,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:e.removeItem},t.name)}))}),Object(x.jsx)("br",{}),e.copyList&&e.list.length>0&&Object(x.jsx)("input",{type:"button",value:a?"Copied!":"Copy list",className:"btn "+(a?"btn-success":"btn-primary"),onClick:function(){navigator.clipboard.writeText(w(e.list)).then((function(){r(!0),setTimeout((function(){r(!1)}),1e3)}))}})]})}function I(e){var t=Object(s.useContext)(h),n=function(){e.newItemStatesAndSetters.setName(""),e.newItemStatesAndSetters.setQuantity(0),e.newItemStatesAndSetters.setUnit(""),e.newItemStatesAndSetters.setComment(""),e.newItemStatesAndSetters.setExisting(!1)};return Object(x.jsxs)("div",{id:"new-item-list-wrapper",children:[Object(x.jsxs)("p",{children:["Shopping list(",e.list.length,")"]}),Object(x.jsx)(S,{list:e.list,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:e.removeItem}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10},children:[Object(x.jsx)("input",{type:"button",value:"Save and Copy",className:"btn btn-primary",onClick:function(){var s;if(0!==e.list.length){var a=new Date;null===(s=t.saveUnsaved(a))||void 0===s||s.then((function(){n(),e.setRunFetchEffect(!0)})),navigator.clipboard.writeText(w(e.list))}},style:{flexGrow:.4},disabled:0===e.list.length}),Object(x.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){var s;0!==e.list.length&&(null===(s=t.clearUnsaved())||void 0===s||s.then((function(){n(),e.setRunFetchEffect(!0)})))},style:{flexGrow:.4},disabled:0===e.list.length})]})]})}n(34);function k(e){var t=Object(s.useContext)(h),n=e.newItemStatesAndSetters,a=n.name,r=n.setName,i=n.setQuantity,c=n.setUnit,o=n.setComment,u=n.setExisting;return Object(x.jsxs)("div",{id:"newlist-wrapper",children:[Object(x.jsx)(O,{masterList:e.masterList,setMasterList:e.setMasterList,newList:e.newList,setNewList:e.setNewList,masterItems:e.masterItems,newItemStatesAndSetters:e.newItemStatesAndSetters}),Object(x.jsx)(I,{list:e.newList,newItemStatesAndSetters:e.newItemStatesAndSetters,removeItem:function(n){var s=n.name,l=e.newList.filter((function(e){return e.name!==s}));t.delete(n),e.setNewList(l),a===s&&(r(""),i(0),c(""),o(""),u(!1))},setRunFetchEffect:e.setRunFetchEffect}),!1]})}function N(e){return Object(x.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-start"+(e.selected?" active":""),children:[Object(x.jsxs)("div",{className:"ms-2 me-auto",style:{width:"100vw"},onClick:function(){e.setSelectedDate(e.date)},children:[Object(x.jsx)("div",{className:"fw-bold",style:{display:"inline"},children:new Date(e.date).toLocaleString()}),Object(x.jsxs)("div",{children:[e.items.length,"\xa0items"]})]}),!e.readOnly&&Object(x.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){}})]})}n(35);function C(e){var t=Object(s.useState)(0),n=Object(o.a)(t,2),a=n[0],r=n[1],i=Object(c.a)(e.dateMap.keys()).sort((function(e,t){return t.valueOf()-e.valueOf()})),u=e.dateMap.get(a);return Object(x.jsxs)("div",{style:{marginLeft:10,width:"90%"},children:[Object(x.jsxs)("p",{children:["Previous shopping lists(",e.dateMap.size,")"]}),Object(x.jsxs)("div",{id:"previous-lists-wrapper",children:[Object(x.jsx)("div",{children:Object(x.jsx)("ol",{id:"previous-lists",className:"list-group list-group-numbered",children:i.map((function(t){return Object(x.jsx)(N,{date:t,items:e.dateMap.get(t)||[],selected:t===a,setSelectedDate:r,readOnly:!0},t)}))})}),Object(x.jsx)("div",{id:"previous-list-one",children:0!==a&&void 0!==u&&Object(x.jsx)(S,{list:u,copyList:!0})})]})]})}n(36);var A=function(){var e=Object(s.useState)(window.localStorage.getItem("settings_name")),t=Object(o.a)(e,2),n=t[0],a=t[1],r=Object(s.useState)(window.localStorage.getItem("settings_message")),i=Object(o.a)(r,2),c=i[0],u=i[1],l=Object(s.useState)(0),d=Object(o.a)(l,2),m=d[0],b=d[1],f=Object(s.useContext)(h);return Object(x.jsxs)("form",{id:"settings-form",style:{margin:20},children:[Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"settings-name",className:"form-label",children:"Name"}),Object(x.jsx)("input",{type:"text",id:"settings-name",className:"form-control","aria-label":"Your name",placeholder:"Your name",onChange:function(e){a(e.currentTarget.value)},value:n||""})]}),Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"settings-message",className:"form-label",children:"Custom message for delivery"}),Object(x.jsx)("textarea",{id:"settings-message",className:"form-control","aria-label":"Your message",placeholder:"Your message",onChange:function(e){u(e.currentTarget.value)},value:c||""})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(x.jsx)("input",{type:"submit",value:"Save",className:"btn btn-success",onClick:function(){n&&window.localStorage.setItem("settings_name",n),c&&window.localStorage.setItem("settings_message",c)},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"button",value:"Clear",className:"btn btn-danger",onClick:function(){window.localStorage.removeItem("settings_name"),window.localStorage.removeItem("settings_message"),a(""),u("")},style:{flexGrow:.4}})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[Object(x.jsx)("input",{type:"button",value:"Export",className:"btn btn-primary",onClick:function(){f.exportToJSONText().then((function(e){var t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});t.href=URL.createObjectURL(n),t.download="shopping-list-export-"+(new Date).toLocaleDateString()+".json",t.click()}))},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"button",value:0===m?"Import":-1===m?"Import failed!":"Import successful!",className:"btn btn-primary",onClick:function(){var e=document.getElementById("importFile");null===e||void 0===e||e.click()},style:{flexGrow:.4}}),Object(x.jsx)("input",{type:"file",id:"importFile",onChange:function(){var e=document.getElementById("importFile");e&&e.files&&e.files.length&&e.files[0].text().then((function(e){return f.importFromJSONText(e)})).then((function(e){return b(e?1:-1),setTimeout((function(){b(0)}),1e3),!0}))},style:{display:"none"},accept:".json"})]})]})};function D(e){return{name:e.name,quantity:e.quantity,unit:e.unit,comment:e.comment,date:e.date,saved:e.saved}}function L(e){if("object"===typeof e&&"string"===typeof e.name&&"number"===typeof e.quantity&&"string"===typeof e.unit&&"string"===typeof e.comment&&"string"===typeof e.date&&"number"===typeof e.saved)return{name:e.name,quantity:e.quantity,unit:e.unit,comment:e.comment,date:new Date(e.date),saved:e.saved}}var U="shopping-list-app-db",E="shopping-list-store",T=function(){function e(t){Object(v.a)(this,e),this.db=void 0,this.db=t}return Object(j.a)(e,[{key:"getAllItems",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return new Promise((function(n,s){var a=e.db.transaction(E).objectStore(E).getAll(null,t>0?t:void 0);a.onerror=function(e){console.debug("getAllItems getAll() failed"),s(e.target?e.target.errorCode:"unknown")},a.onsuccess=function(){console.debug("getAllItems: getAll() succeeded."),n(this.result)}}))}},{key:"getItemsWithDate",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,s=arguments.length>2?arguments[2]:void 0;return new Promise((function(a,r){var i=(s||t.db.transaction(E)).objectStore(E).index("date").getAll(n(e));i.onerror=function(e){console.debug('getItemsWithDate .index("date").getAll() failed'),r(e.target?e.target.errorCode:"unknown")},i.onsuccess=function(){console.debug('getItemsWithDate .index("date").getAll() succeeded'),a(this.result)}}))}},{key:"getItemsSaved",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,s=arguments.length>2?arguments[2]:void 0;return new Promise((function(a,r){var i=(s||t.db.transaction(E)).objectStore(E).index("saved").getAll(n(e));i.onerror=function(e){console.debug('getItemsSaved .index("date").getAll() failed'),r(e.target?e.target.errorCode:"unknown")},i.onsuccess=function(){console.debug('getItemsSaved .index("date").getAll() succeeded'),a(this.result)}}))}},{key:"deleteItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,n=this.db.transaction(E,"readwrite"),s=n.objectStore(E);return this.getItemsWithDate(e.date,t,n).then((function(n){return new Promise((function(a,r){console.debug("deleteItem: getItemsWithDate succeeded");var i=!1,c=function(e){console.debug("deleteItem add/update failed"),r(e.target?e.target.errorCode:"unknown")},o=function(){console.debug("deleteItem: add/update succeeded."),a(void 0)};n.forEach((function(n){if(!i&&n.name===e.name&&n.saved===e.saved){console.debug("deleteItem: found a matching item, deleting it...");var a=s.delete(t(n.id));a.onerror=c,a.onsuccess=o,i=!0}})),i||(console.debug("warning: deleteItem no matching entry."),a(void 0))}))})).catch((function(e){return console.debug("deleteItem: getItemsWithDate() failed"),Promise.reject("shopping-list-store getItemsWithDate: reason "+e)}))}},{key:"clearAll",value:function(){var e=this;return new Promise((function(t,n){var s=e.db.transaction(E,"readwrite").objectStore(E).clear();s.onerror=function(e){console.debug("clearAll: clear() failed"),n(e.target?e.target.errorCode:"unknown")},s.onsuccess=function(){console.debug("clearAll: clear() succeeded"),t(this.result)}}))}},{key:"clearUnsaved",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:IDBKeyRange.only,n=this.db.transaction(E,"readwrite"),s=n.objectStore(E);return new Promise((function(a,r){n.onerror=function(e){console.debug("clearUnsaved: clear() failed"),r(e.target?e.target.errorCode:"unknown")},n.oncomplete=function(){console.debug("clearUnsaved: clear() succeeded"),a(void 0)},e.getItemsSaved(0,t,n).then((function(e){e.forEach((function(e){s.delete(t(e.id))}))}))}))}},{key:"addUpdateItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,n=this.db.transaction(E,"readwrite"),s=n.objectStore(E);return this.getItemsWithDate(e.date,t,n).then((function(t){return new Promise((function(n,a){console.debug("addUpdateItem: getItemsWithDate succeeded");var r=!1,i=function(e){console.debug("addUpdateItem add/update failed"),a(e.target?e.target.errorCode:"unknown")},c=function(){console.debug("addUpdateItem: add/update succeeded."),n(this.result)};if(t.forEach((function(t){if(!r&&t.name===e.name){console.debug("addUpdateItem: found a matching item, updating it...");var n=D(e);n.id=t.id;var a=s.put(n);a.onerror=i,a.onsuccess=c,r=!0}})),!r){console.debug("addUpdateItem no matching entry yet");var o=s.add(e);return o.onerror=i,void(o.onsuccess=c)}}))})).catch((function(e){return console.debug("addUpdateItem: getItemsWithDate() failed"),Promise.reject("shopping-list-store getItemsWithDate: reason "+e)}))}},{key:"saveUnsaved",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:IDBKeyRange.only,s=this.db.transaction(E,"readwrite"),a=s.objectStore(E);return new Promise((function(r,i){s.onerror=function(e){console.debug("saveUnsaved: transaction failed"),i(e.target?e.target.errorCode:"unknown")},s.oncomplete=function(){console.debug("saveUnsaved: transaction succeeded"),r(void 0)},t.getItemsSaved(0,n,s).then((function(t){t.forEach((function(t){var n=D(t);n.date=e,n.saved=1,a.put(n)})),t.forEach((function(e){a.delete(n(e.id))}))}))}))}},{key:"exportToJSON",value:function(){var e=Object(f.a)(b.a.mark((function e(){var t,n,s=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:window.localStorage,e.prev=1,e.next=4,this.getAllItems();case 4:return n=e.sent,e.abrupt("return",{items:n,name:t.getItem("settings_name")||"",message:t.getItem("settings_message")||""});case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",{items:[],name:"",message:""});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"importFromJSON",value:function(){var e=Object(f.a)(b.a.mark((function e(t){var n,s,a,r,i,c,o=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=o.length>1&&void 0!==o[1]?o[1]:IDBKeyRange.only,s=o.length>2&&void 0!==o[2]?o[2]:window.localStorage,"object"===typeof(a=JSON.parse(t))){e.next=5;break}return e.abrupt("return",!1);case 5:if(Array.isArray(a.items)){e.next=7;break}return e.abrupt("return",!1);case 7:return r=[],a.items.forEach((function(e){var t=L(e);t&&r.push(t)})),i={items:r,name:"string"===typeof a.name?a.name:"",message:"string"===typeof a.message?a.message:""},e.next=12,this.clearAll();case 12:c=0;case 13:if(!(c<r.length)){e.next=26;break}return e.prev=14,e.next=17,this.addUpdateItem(r[c],n);case 17:e.next=23;break;case 19:return e.prev=19,e.t0=e.catch(14),console.debug("Error adding item : "+r[c]+" err = "+e.t0),e.abrupt("return",!1);case 23:++c,e.next=13;break;case 26:return s.setItem("settings_name",i.name),s.setItem("settings_message",i.message),e.abrupt("return",!0);case 29:case"end":return e.stop()}}),e,this,[[14,19]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),q=new g;(function(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&(console.debug=function(){}),new Promise((function(t,n){console.debug("Opening DB: "+U);var s=e.open(U,3);s.onsuccess=function(){console.debug("Opened DB: "+U),t(new T(this.result))},s.onerror=function(e){n(e.target?e.target.errorCode:"unknown")},s.onupgradeneeded=function(e){if(console.debug("openDb.onupgradeneeded : "+U),!e||!e.currentTarget||!e.currentTarget.result)return console.debug("openDb.onupgradeneeded : "+U+" no new db in event!"),void n("onupgradeneeded: no new db!");var t=e.currentTarget.result,s=e.target.transaction;if(t.objectStoreNames.contains(E)){var a=s.objectStore(E);a.indexNames.contains("saved")||a.createIndex("saved","saved",{unique:!1})}else{var r=t.createObjectStore(E,{keyPath:"id",autoIncrement:!0});r.createIndex("date","date",{unique:!1}),r.createIndex("saved","saved",{unique:!1})}},s.onblocked=function(){console.debug("openDb.onupgradeneeded : "+U+" blocked on other tabs"),n("openDb upgrade: close other tabs and try again.")}}))})(indexedDB).then((function(e){q.setDB(e),q.fetch()}));var F=function(){var e=Object(s.useState)(new Set([])),t=Object(o.a)(e,2),n=t[0],a=t[1],r=Object(s.useState)(!1),i=Object(o.a)(r,2),d=i[0],m=i[1],b=Object(s.useState)([]),f=Object(o.a)(b,2),v=f[0],j=f[1],g=Object(s.useState)([]),h=Object(o.a)(g,2),O=h[0],y=h[1],w=Object(s.useState)(new Map),S=Object(o.a)(w,2),I=S[0],N=S[1],D=Object(s.useState)(""),L=Object(o.a)(D,2),U=L[0],E=L[1],T=Object(s.useState)(0),F=Object(o.a)(T,2),B=F[0],P=F[1],M=Object(s.useState)(""),R=Object(o.a)(M,2),J=R[0],W=R[1],_=Object(s.useState)(""),G=Object(o.a)(_,2),K=G[0],Q=G[1],Y=Object(s.useState)(new Date),z=Object(o.a)(Y,2),H=z[0],V=z[1],X=Object(s.useState)(!1),Z=Object(o.a)(X,2),$=Z[0],ee=Z[1],te=Object(s.useState)(!1),ne=Object(o.a)(te,2),se=ne[0],ae=ne[1],re={name:U,setName:E,quantity:B,setQuantity:P,unit:J,setUnit:W,comment:K,setComment:Q,existing:$,setExisting:ee,date:H,setDate:V};return Object(s.useEffect)((function(){if(se||!n.size&&!d){q.hasDB()&&q.fetch();var e=function(e){se&&ae(!1),m(0===e.length),a(new Set(e.map((function(e){return e.name}))));var t=new Map,n=[],s=new Map;e.forEach((function(e){e.saved||n.push(e);var a=t.get(e.name);if(a?a.date<e.date&&t.set(e.name,e):t.set(e.name,e),e.saved){var r=s.get(e.date.valueOf());r?r.push(e):s.set(e.date.valueOf(),[e])}})),j(Object(c.a)(t.values())),y(n),n.length&&V(n[0].date),N(s)};return q.addListener(e),function(){q.removeListener(e)}}})),Object(x.jsx)(u.a,{children:Object(x.jsxs)("div",{children:[Object(x.jsx)("nav",{children:Object(x.jsxs)("ul",{className:"nav",children:[Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)(u.b,{to:"/",className:"nav-link",children:"New list"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)(u.b,{to:"/previous",className:"nav-link",children:"Previous lists"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)(u.b,{to:"/settings",className:"nav-link",children:"Settings"})})]})}),Object(x.jsx)(p,{value:q,children:Object(x.jsxs)(l.c,{children:[Object(x.jsx)(l.a,{path:"/settings",children:Object(x.jsx)(A,{})}),Object(x.jsx)(l.a,{path:"/previous",children:Object(x.jsx)(C,{dateMap:I})}),Object(x.jsx)(l.a,{path:"/",children:Object(x.jsx)(k,{masterList:n,setMasterList:a,newList:O,setNewList:y,masterItems:v,newItemStatesAndSetters:re,runFetchEffect:se,setRunFetchEffect:ae})})]})})]})})};i.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(F,{})}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.7c926e0d.chunk.js.map