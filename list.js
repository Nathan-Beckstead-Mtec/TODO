const all_checkboxes_query_selector = "label.card>input[type=checkbox]";
//used in check_checker()


var lists = [
	{name: "list a",items: [
		{text:"clean bathroom", checked: true},
		{text: "clean car",checked: false}
	]},
	{name: "list 2",items: [
		{text: "hello", checked:false},
		{text: "world", checked:false},
		{text: "!!!!!", checked:true}
	]},
	{name: "empty list",items: []}
];

var index_list_selected = 0;



function generate_item_Html(item, index){
	//should not be used directly because of the link between item and idex
	return `<label class="card" for="li_${index}"><input type="checkbox" id="li_${index}" ${item.checked ? 'checked="checked"' : ''} oninput="check_checker()"><p>${item.text}</p></label>`;
}
// unused but works
function generate_item_Html_from_index(index){
	return generate_item_Html(lists[index_list_selected].items[index],index);
}
// unused but works
function generate_item_Html_last(){
	return generate_item_Html_from_index(lists[index_list_selected].items.length -1);
}


function render_items(){

    let listHtml = "";
    lists[index_list_selected].items.forEach((item,index) => {
        listHtml += generate_item_Html(item, index);
    })
	// listHtml += `<div class="edit"><input placeholder="+ add new item" id="add_item"></input></div>`


	unload_event_listener();
	document.querySelector("#list").innerHTML = listHtml;
	load_event_listener();


}

function render_lists(){
	let list_o_listsHtml = "";
	lists.forEach((item,index) => {
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
}


function changed_selected_list(new_index){
	index_list_selected = new_index;
	render_items();
}

function new_list(){
	let name = prompt("Name of new List:", "unnamed list");
	name = sanitize(name);
	lists.push({name: name,items: []})
	index_list_selected = lists.length - 1;
	render_lists();
	render_items();
}

function sanitize(input){
	console.error("TODO: implement HTML sanitizer");
	return input;
}




function textbox_update(event){
    if (event.key === "Enter"){
        event.preventDefault(); //dont let the enter key scroll the page
		let input = document.querySelector("#add_item"); //text input
		
		
		let item_to_push = {text: input.value, checked:false};
		let index = lists[index_list_selected].items.length; //off by one accounted for below
		lists[index_list_selected].items.push(item_to_push); //add the thing
		
		input.value = ""; //clears the textbox again


		render_items();

    }
}
function unload_event_listener(){
	document.querySelector("#add_item").removeEventListener("keypress", textbox_update);
}
function load_event_listener(){
	document.querySelector("#add_item").addEventListener("keypress", textbox_update);
}


function check_checker(){
	let num_changed = 0;
	all_checkboxes = document.querySelectorAll(all_checkboxes_query_selector); //variable is a const declared on line 1
	all_checkboxes.forEach(elem => {
		let bool = elem.checked;
		let id = parseInt(elem.id.slice(3));
		if (isNaN(id)){
			console.error("check_checker(): Error Parsing:" + elem.id);
			return;
		}
		console.log(bool + id);
		lists[index_list_selected].items[id].checked = bool;

	});
}







render_lists();
render_items();