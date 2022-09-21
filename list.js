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





function render_items(){

    let listHtml = "";
    lists[index_list_selected].items.forEach((item,index) => {
        listHtml += `<label class="card" for="li_${index}"><input type="checkbox" id="li_${index}" ${item.checked ? 'checked="checked"' : ''}><p>${item.text}</p></label>`
    })
	listHtml += `<div class="edit"><textarea maxlength="512" data-autosize="true" placeholder="+ add new item" id="add_item"></textarea></div>`

	document.querySelector("#list").innerHTML = listHtml;



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




function update(event){
    console.log(event);
    if (event.key === "Enter"){
        event.preventDefault();
        // add();
    }
}

var textarea = document.querySelector("#add_item");
console.log(textarea);
console.log(textarea.addEventListener("keypress", update));
// a.addEventListener("input", add);



render_lists();
render_items();