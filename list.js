const all_checkboxes_query_selector = ".card>input[type=checkbox]";
//used in check_checker()

var lists;
var index_list_selected;
load();
render_lists();
load_event_listener();




/*

[{
		name: "TODO: todo list app",
		items: [
			{
				text: "rename items",
				checked: false
			},
			{
				text: "prerequisites? (ie require a previous item to be compleated before this one appears)",
				checked: false
			},
			{
				text: "change color of checked off items",
				checked: true
			}
		]
	},
	{
		name: "test",
		items: []
	},
	{
		name: "empty list",
		items: [
			{
				text: "a",
				checked: false
			},
			{
				text: "c",
				checked: true
			},
			{
				text: "d",
				checked: true
			},
			{
				text: "e",
				checked: false
			}
		]
	}
]
*/






function generate_item_Html(item, index) {
	//should not be used directly because of the link between item and idex
	const trash = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="4" y1="7" x2="20" y2="7"></line><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>`;
	const sublist = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-subtask" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="6" y1="9" x2="12" y2="9"></line><line x1="4" y1="5" x2="8" y2="5"></line><path d="M6 5v11a1 1 0 0 0 1 1h5"></path><rect x="12" y="7" width="8" height="4" rx="1"></rect><rect x="12" y="15" width="8" height="4" rx="1"></rect></svg>`;
	const rename = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cursor-text" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 12h4"></path><path d="M9 4a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3"></path><path d="M15 4a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3"></path></svg>`

	return `
	<div class="card${item.checked ? ' checked' : ''}" >
	<input type="checkbox" id="li_${index}" ${item.checked ? 'checked="checked"' : ''} oninput="check_checker()">
	<label for="li_${index}">
		<p>${item.text}</p>
	</label>
	<div class="icons">
		<a href="#" class="icon_white" onclick="card_button_rename(${index})">
			${rename}
		</a>
		<a href="#" class="icon_white" onclick="card_button_sublist(${index})">
			${sublist}
		</a>
		<a href="#" class="icon_trash" onclick="card_button_trash(${index})">
			${trash}
		</a></div></div>`
	// return `<label class="card" for="li_${index}"><input type="checkbox" id="li_${index}" ${item.checked ? 'checked="checked"' : ''} oninput="check_checker()"><p>${item.text}</p></label>`;
}
// unused but works
function generate_item_Html_from_index(index) {
	return generate_item_Html(lists[index_list_selected].items[index], index);
}
// unused but works
function generate_item_Html_last() {
	return generate_item_Html_from_index(lists[index_list_selected].items.length - 1);
}


function render_items() {
	const trashIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
	<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
	<line x1="4" y1="7" x2="20" y2="7"></line>
	<line x1="10" y1="11" x2="10" y2="17"></line>
	<line x1="14" y1="11" x2="14" y2="17"></line>
	<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
	<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
 </svg>`;
	let listHtml = "";
	if (lists.length === 0) {
		listHtml = `<div class="empty"><p>&lt;----- create a new list to start</p></div>`;
		document.querySelector("#add_item").disabled = true;
	} else {
		lists[index_list_selected].items.forEach((item, index) => {
			listHtml += generate_item_Html(item, index);
		})
		document.querySelector("#add_item").disabled = false;
	}
	// listHtml += `<div class="edit"><input placeholder="+ add new item" id="add_item"></input></div>`
	let list_name = document.querySelector("#list-name");
	list_name.setAttribute("placeholder", lists[index_list_selected].name + ":");
	list_name.value = "";

	document.querySelector("#list").innerHTML = listHtml;

}

function render_lists() {
	let list_o_listsHtml = "";
	lists.forEach((item, index) => {
		list_o_listsHtml += `
		<input id="lists_${index}" onclick="changed_selected_list(${index});" ${index == index_list_selected ? 'checked="checked"' : ''}type="radio" name="selected-list" style="display:none;">
		<label for="lists_${index}">
			<div><p class="list-name">${item.name}</p></div>
		</label>`
	});

	list_o_listsHtml += `
	<a onclick="new_list();">
		<div>
			<p>&lt;new list&gt;</p>
		</div>
	</a>`;

	document.querySelector("#list-o-lists").innerHTML = list_o_listsHtml;
	render_items();
}


function changed_selected_list(new_index) {
	index_list_selected = new_index;
	render_items();
	save();
}

function new_list() {
	let name = prompt("Name of new List:", "unnamed list");
	if (name == null) {
		return;
	}
	name = sanitize(name);
	lists.push({ name: name, items: [] })
	index_list_selected = lists.length - 1;
	render_lists();
	render_items();
	save();
}

function sanitize(input) {
	console.error("TODO: implement HTML sanitizer");
	return input;
}




function textbox_update(event) {
	if (event.key === "Enter") {

		let input = document.querySelector("#add_item"); //text input
		if (input.value != ""){
			event.preventDefault(); //dont let the enter key scroll the page
	
	
			let item_to_push = { text: input.value, checked: false };
			let index = lists[index_list_selected].items.length; //off by one accounted for below
			lists[index_list_selected].items.push(item_to_push); //add the thing
	
			input.value = ""; //clears the textbox again
	
	
			render_items();
			save();
		}
	}
}


function unload_event_listener() { //unused
	document.querySelector("#add_item").removeEventListener("keypress", textbox_update);
}
function load_event_listener() { //used once (move to start of prog?)
	document.querySelector("#add_item").addEventListener("keypress", textbox_update);
}


function check_checker() {
	// let num_changed = 0;
	// let num_elem = 0;
	// console.clear();
	console.log("check checker");

	all_checkboxes = document.querySelectorAll(all_checkboxes_query_selector); //variable is a const declared on line 1
	all_checkboxes.forEach(elem => {
		// num_elem++;
		let bool = elem.checked;
		let id = parseInt(elem.id.slice(3));

		if (isNaN(id)) {
			console.error("check_checker(): Couldn't parse id from " + elem.id);
			return;
		}

		elem.parentElement.classList.toggle("checked", bool);
		// old = lists[index_list_selected].items[id].checked;
		lists[index_list_selected].items[id].checked = bool;

		// if (bool != old){
		// 	console.log("changed " + id + " from " + old + " to " + bool);
		// 	num_changed++;
		// }else{
		// 	console.log("did not change " + id);
		// }

	});
	save();
	// console.log("changed: " + num_changed + " of " + num_elem);
}


function save() {
	localStorage.setItem('currentList', JSON.stringify(index_list_selected));
	localStorage.setItem('lists', JSON.stringify(lists));
	console.log("saved");
}

function load() {
	let temp_lists = localStorage.getItem("lists");
	let temp_index = localStorage.getItem("currentList");
	if (temp_lists == null) {
		lists = [];
		console.log("couldn't accsess or find saved list");
	} else {
		lists = JSON.parse(temp_lists);
	}
	if (temp_index == null) {
		index_list_selected = 0;
		console.log("couldn't accsess or find saved list");
	} else {
		index_list_selected = JSON.parse(temp_index);
	}
}



function card_button_rename(id){
	console.log("click");
	let placeholder = lists[index_list_selected].items[id].text;
	let html = `<input class="rename_item" onblur="item_rename_close(this,${id})" onchange="item_rename_save(this, ${id})" value="${placeholder}">`;
	label = document.querySelector("label[for='li_" + id + "']");
	console.log(label);
	label.innerHTML = html;
	console.log(label.innerHTML);
	input = label.children[0]
	// input.focus();
	input.select();
	// input.setSelectionRange(0,input.value);
}
function item_rename_save(thus, id){
	console.log(thus);
	lists[index_list_selected].items[id].text = thus.value;
	item_rename_close(thus, id);
	save();
}
function item_rename_close(thus, id){
	html = `<p>`;
	html += lists[index_list_selected].items[id].text;
	html += `</p>`;
	thus.parentElement.innerHTML = html;
}

function card_button_sublist(id) {

}
function card_button_trash(index) {
	moveToTrash({
		from: lists[index_list_selected].name,
		item: lists[index_list_selected].items[index]
	});

	lists[index_list_selected].items.splice(index, 1);
	save();
	render_items();
}


function moveToTrash(input) {
	console.log("deleated:");
	console.log(input)
}





//list-nav

function nav_sort() {
	console.log("sort");
	lists[index_list_selected].items.sort((a, b) => {
		console.log(JSON.stringify(a) + ", " + JSON.stringify(b));
		if (a.checked == b.checked) {
			return 0;
		}
		if (a.checked) {
			return 1;
		}
		//a != b and a == false \implies b == true
		return -1;
	})
	save();
	render_items();
}


function nav_delete_selected() {
	console.log("delete selected");
	check_checker();
	lists[index_list_selected].items = lists[index_list_selected].items.filter((item, index) => {
		if (!item.checked) {
			return true; //keep element
		}
		moveToTrash({
			from: lists[index_list_selected].name,
			item: item
		});
		return false; //toss the element
	});
	save();
	render_items();
}
function nav_delete_list() {
	console.log("delete all");
	//confirm
	if (!confirm("Delete list: " + lists[index_list_selected].name + "?")) {
		return;
	}
	//send  to trash as sublist
	// moveToTrash()

	//delete list
	lists.splice(index_list_selected, 1);

	//ui
	// animation?

	//send to different list

	index_list_selected--; //underflow?
	//do something if index == 0 (before dec) then 
	// either go to next list
	// or generate the null list.
	render_lists();
	save();

}

function nav_list_rename(thus){
	let value = thus.value;
	lists[index_list_selected].name = value;
	document.querySelector(`label[for="lists_${index_list_selected}"] p`).textContent = value;
	render_items();
	save();


}

function nav_list_download(){
	
	let text = lists[index_list_selected];
	let name = text.name;
	text = JSON.stringify(text, null, 4);

	let element = document.createElement("a");
	let file = new Blob([text], {
		type: "text/plain",
	});
	element.href = URL.createObjectURL(file);

	const illegalCharRegex = new RegExp("[!@#$%^&*(){}\\[\\]<>?/\\|'\";:` ]","g");
	name = "list-" + name + "-" + ((new Date).toISOString()) + ".json"
	name = name.replaceAll(illegalCharRegex, "-");
	console.log(name);
	element.download = name;
	document.body.appendChild(element);
	element.click();

	

	
}
