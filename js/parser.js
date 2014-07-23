var JSON_TREE_HOLDER_ID = 'chrome-json-tree-holder',
    parsed = false,
    json_holder = (document.body.childElementCount == 0) ? document.body : document.body.children[0];
document.onkeydown = function(e){
    if(e.ctrlKey && e.keyCode == 13) {
        if(parsed) {
            revert();
        }
        else {
            parse_json();
        }
    }
};

function parse_json(){
    var json_tree_holder = get_json_holder();
    if(json_tree_holder !== null) {
        json_tree_holder.style.display = 'block';
        return;
    }
    var json = JSON.parse(json_holder.innerHTML);
    init_json_tree(json);
    json_holder.style.display = "none";
    parsed = true;
}

function revert(){
    json_holder.style.display = "block";
    parsed = false;
}

function init_json_tree(json){
    var json_tree_holder = document.createElement('div');
    json_tree_holder.setAttribute('id', JSON_TREE_HOLDER_ID);
    document.body.appendChild(json_tree_holder);
    for(node in json) {
        add_node(get_json_holder(), node, json[node]);
    }
}

function add_node(holder, node, value){
    var item = document.createElement('div'),
        node_label = document.createElement('span'),
        node_value = document.createElement('span');
    item.setAttribute('class', item.getAttribute('class') + ' json-tree-item');
    node_label.setAttribute('class', 'json-tree-item-node-label');
    node_value.setAttribute('class', 'json-tree-item-node-value');
    node_label.innerText = '"' + node + '" : ';
    node_value.innerText = value;
    item.appendChild(node_label);
    item.appendChild(node_value);
    holder.appendChild(item);
}

function get_json_holder(){
    return document.getElementById(JSON_TREE_HOLDER_ID);
}
