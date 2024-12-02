let elementsvalues = [];
let n = 0;
let form = document.getElementById("frm");
AddRow();

function updateIds() {
	let i;
	for (i = 0; i < form.length; i += 5) {
		form.elements[i].parentNode.id = i/5;
		form.elements[i].id = "text" + i/5;
		form.elements[i+1].id = "number" + i/5;
		form.elements[i+2].id = "upbutton" + i/5;
		form.elements[i+3].id = "downbutton" + i/5;
		form.elements[i+4].id = "delbutton" + i/5;
	}
}

function deletion(element) {
	element.remove();
	n--;
	updateIds();
}

function DeleteRow(event) {
	let elnumber = event.target.id.slice(9);
	const el = document.getElementById(elnumber);
	deletion(el);
}

function MoveUp(event) {
	let elnumber = event.target.id.slice(8);
	const el = document.getElementById(elnumber);
	if (elnumber != 0) {
		deletion(el);
		form.insertBefore(el, form.children[elnumber-1]);
		updateIds();
	}
}

function MoveDown(event) {
	let elnumber = event.target.id.slice(10);
	const el = document.getElementById(elnumber);
	if (elnumber != form.length-1) {
		deletion(el);
		elnumber++;
		form.insertBefore(el, form.children[elnumber]);
		updateIds();
	}
}

function AddRow() {
	const r = document.createElement("div");
	const text = document.createElement("input");
	const number = document.createElement("input");
	const b1 = document.createElement("input");
	const b2 = document.createElement("input");
	const b3 = document.createElement("input");
	r.setAttribute("id", n);
	text.setAttribute("type", "text");
	text.setAttribute("id", "text" + n);
	number.setAttribute("type", "number");
	number.setAttribute("id", "number" + n);
	b1.setAttribute("type", "button");
	b1.setAttribute("id", "upbutton" + n);
	b1.setAttribute("value", "↑");
	b1.setAttribute("onclick", "MoveUp(event)");
	b2.setAttribute("type", "button");
	b2.setAttribute("id", "downbutton" + n);
	b2.setAttribute("value", "↓");
	b2.setAttribute("onclick", "MoveDown(event)");
	b3.setAttribute("type", "button");
	b3.setAttribute("value", "x");
	b3.setAttribute("id", "delbutton" + n);
	b3.setAttribute("onclick", "DeleteRow(event)");
	r.appendChild(text);
	r.appendChild(number);
	r.appendChild(b1);
	r.appendChild(b2);
	r.appendChild(b3);
	const form = document.getElementById("frm");
	form.appendChild(r);
	n++;
}

function Save() {
	let text = "";
	let i;
	try {
		for (i = 1; i < elementsvalues.length; i++) {
			elementsvalues.pop();
		}
		text += "{";
		for (i = 0; i < form.length; i += 5) {
			if (!form.elements[i].value || !form.elements[i+1].value) {throw "Все поля должны быть заполнены";}
			elementsvalues[i/5] = {
				txt: form.elements[i].value,
				num: form.elements[i+1].value,
			};
		}
		for (i = 0; i < elementsvalues.length; i++) {
			text += '"' + elementsvalues[i].txt + '":"' + elementsvalues[i].num + '"';
			if (i != elementsvalues.length - 1) text += ",";
		}
		text += "}";
		document.getElementById("result").innerHTML = text;
	}
	catch(err) { document.getElementById("result").innerHTML = err; }
}