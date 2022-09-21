function render() {
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    lists.forEach((list) => {
      listsHtml += `<li class="list-group-item">${list.name}</li>`;
    });
   
    listsHtml += '</ul>';
    // print out the lists
   
    document.getElementById('lists').innerHTML = listsHtml;
    // print out the name of the current list
   
    document.getElementById('current-list-name').innerText = currentList.name;
    // iterate over the todos in the current list
   
    // let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((list) => {
      todosHtml += `<li class="list-group-item">${todo.text}</li>`;
    });
    // print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}

function render(){

    let listHtml = "";
    a.forEach((item,index) => {
        listHtml += `<label class="card" for="li_${index}"><input type="checkbox" id="li_${index}" ${item.checked ? 'checked="checked"' : ''}><p>${item.text}</p></label>`
    });
	listHtml += `<div class="edit"><textarea maxlength="512" data-autosize="true" placeholder="+ add new item" id="add_item"></textarea></div>`

	document.querySelector("#list").innerHTML = listHtml;


}






