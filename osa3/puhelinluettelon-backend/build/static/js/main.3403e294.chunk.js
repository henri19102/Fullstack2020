(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(13),l=t.n(r),c=(t(19),t(2)),o=function(e){var n=e.nameFilter,t=e.handleNameFilter;return u.a.createElement("div",null,"filter shown with:",u.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.addName,t=e.newName,a=e.newNumber,r=e.handleNumberChange,l=e.handlePersonChange;return u.a.createElement("div",null,u.a.createElement("form",{onSubmit:n},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:t,onChange:l})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:a,onChange:r})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.persons,t=e.nameFilter,a=e.deleteName;return u.a.createElement("div",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return u.a.createElement("form",{key:e.id},u.a.createElement("p",null,e.name," ",e.number," "),u.a.createElement("button",{id:e.id,onClick:a},"Delete"))})))},d=t(3),s=t.n(d),f="/api/persons",h=function(){return s.a.get(f).then((function(e){return e.data}))},b=function(e){return s.a.post(f,e).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"error"},n)},v=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],l=Object(a.useState)("Add name..."),d=Object(c.a)(l,2),s=d[0],f=d[1],v=Object(a.useState)("Add number..."),g=Object(c.a)(v,2),N=g[0],j=g[1],w=Object(a.useState)(""),O=Object(c.a)(w,2),C=O[0],k=O[1],S=Object(a.useState)(null),F=Object(c.a)(S,2),y=F[0],D=F[1];Object(a.useEffect)((function(){h().then((function(e){r(e)}))}),[]);return u.a.createElement("div",null,u.a.createElement(p,{message:y}),u.a.createElement("h1",null,"Phonebook"),u.a.createElement(o,{nameFilter:C,handleNameFilter:function(e){k(e.target.value)}}),u.a.createElement("h2",null,"add a new"),u.a.createElement(i,{newName:s,newNumber:N,addName:function(e){(e.preventDefault(),t.some((function(e){return e.name===s})))?(D("".concat(s," is already added to phonebook")),setTimeout((function(){D(null)}),5e3)):(b({name:s,number:N}).then((function(e){r(t.concat(e)),f(""),j("")})),D("".concat(s," added to phonebook")),setTimeout((function(){D(null)}),5e3))},handleNumberChange:function(e){j(e.target.value)},handlePersonChange:function(e){f(e.target.value)}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement(m,{persons:t,nameFilter:C,deleteName:function(e){e.preventDefault();var n=e.target.id;E(n).then((function(e){return e})),h().then((function(e){r(e)})),D("Succesfully deleted"),setTimeout((function(){D(null)}),5e3)}}))};l.a.render(u.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.3403e294.chunk.js.map