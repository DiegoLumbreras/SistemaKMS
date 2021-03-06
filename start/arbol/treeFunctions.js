

function rename_node() {
    let hasDuplicated = false;

    if (node_to_rename && rename_node_modal_active) {

        name = $('#RenameNodeName').val();

        hasDuplicated = checkhasDuplicated(name, node_to_rename.id);



        if (hasDuplicated) {
            swal({
                title: "Ya existe un nodo llamado así",
                text: "¿Esta seguro que desea renombrar el nodo actual?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        node_to_rename.name = name;
                        node_to_rename.textPosition = textPosition ? 1 : 0;
                        rename_node_modal_active = false;
                        textPosition = false;
                        saveNewName(node_to_rename)
                    }

                    closeModal();
                    outer_update(node_to_rename);
                });
        }

        if (!hasDuplicated) {
            node_to_rename.name = name;
            rename_node_modal_active = false;
            node_to_rename.textPosition = textPosition ? 1 : 0;
            textPosition = false;

            saveNewName(node_to_rename)

        }



    }

    if (!hasDuplicated) {
        closeModal();
        outer_update(node_to_rename);
    }

}


async function saveNewName(node_to_rename) {

    await axios({
        method: 'post',
        url: "http://64.227.7.32/tema/editarNodo/" + node_to_rename.id + "?id_nodo=" + node_to_rename.id + "&nombre_nodo=" + node_to_rename.name + "&textPosition=" + node_to_rename.textPosition,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id_nodo: node_to_rename.id,
            nombre_nodo: node_to_rename.name,
            textPosition: node_to_rename.textPosition,
        }
    }).then(function (response) {
        console.log("EDITADO")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};



function createNodesList(tree_rootAux, level, ignore) {

    if (ignore != null) {
        if (tree_rootAux['id'] == ignore['id']) {
            return
        }
        nodesToListToDelete.push({
            id: tree_rootAux['id'],
            name: tree_rootAux['name']
        });
    } else {
        nodesToList.push({
            id: tree_rootAux['id'],
            name: tree_rootAux['name']
        });
    }




    tree_rootAux['level'] = level;
    if (tree_rootAux['children'] != undefined) {
        for (var i = 0; i < tree_rootAux['children'].length; i++) {
            createNodesList(tree_rootAux['children'][i], i, ignore)
        }
    }
    if (level == 1) {
        tree_root = tree_rootAux;
    }
}

function updateNodeToList() {
    var select = document.getElementById("nodesSelect");
    var nodesSelectAllDelete = document.getElementById("nodesSelectAllDelete");

    $('#nodesSelect').empty().trigger("change");
    $('#nodesSelectAllDelete').empty().trigger("change");
    nodesToList = [];
    createNodesList(tree_root, 1, null);
    $('#nodesSelect').select2('data', null);
    $('#nodesSelectAllDelete').select2('data', null);
    for (var i = 0; i < nodesToList.length; i++) {
        var nameNode = nodesToList[i].name;
        var idNode = nodesToList[i].id;
        var el = document.createElement("option");
        el.textContent = nameNode;
        el.value = idNode;
        nodesSelectAllDelete.appendChild(el);
        select.appendChild(el);
    }

}


function updateNodeToListToDelete() {

    var select = document.getElementById("nodesSelectAllDelete");
    $('#nodesSelectAllDelete').empty().trigger("change");
    nodesToListToDelete = [];
    createNodesList(tree_root, 1, node_to_delete);
    $('#nodesSelectAllDelete').select2('data', null);
    for (var i = 0; i < nodesToListToDelete.length; i++) {
        var nameNode = nodesToListToDelete[i].name;
        var idNode = nodesToListToDelete[i].id;
        var el = document.createElement("option");
        el.textContent = nameNode;
        el.value = idNode;
        select.appendChild(el);
    }

}

function isFamily(nodeParent, nodeSon) {
    if (nodeParent['name'] == nodeSon['name']) {
        return true;
    }
    if (nodeParent['children'] != undefined) {
        for (var i = 0; i < nodeParent['children'].length; i++) {
            if (isFamily(nodeParent['children'][i], nodeSon)) {
                return true;
            }
        }
    }
    return false;
}

function createParentConection() {

    outer_update(tree_root);

    var nodeSelected = $('#nodesSelect').select2('data')

    var nodeSelected = nodeSelected[0]['id'];
    var couplingParent = tree_d3.nodes(tree_root).filter(function (d) {
        return d['id'] == nodeSelected;
    })[0];

    var couplingChild = tree_d3.nodes(tree_root).filter(function (d) {
        return d['id'] === create_parent_relation['id'];
    })[0];
    let isFamily1 = false;
    if (couplingParent['level'] > couplingChild['level']) {
        isFamily1 = isFamily(couplingChild, couplingParent)
    }
    if (couplingParent.children) {
        couplingParent.children.forEach(function (d) {
            if (d.id == couplingChild.id) {
                isFamily1 = true;
            }
        });
    }
    multiParents.forEach(function (d) {
        if ((d.parent.id == couplingParent.id && d.child.id == couplingChild.id) || (d.parent.id == couplingChild.id && d.child.id == couplingParent.id)) {
            isFamily1 = true;
        }
    });
    if (!isFamily1) {
        multiParents.push({
            parent: couplingParent,
            child: couplingChild
        })
        registerParentConection(couplingParent, couplingChild);
        closeModal();
        outer_update(create_parent_relation);
    } else {
        alert("Son familia")
    }

}

function registerParentConection(parent, child) {
    axios({
        method: 'post',
        url: "http://64.227.7.32/tema/addsecundario?id_padre=" + parent.id + "&id_hijo=" + child.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id_padre: parent.id,
            id_hijo: child.id,
        }
    }).then(function (response) {

    }).catch(function (error) {
        console.log('Error: ' + error)
    })

}

function deleteParent() {
    create_node_parent['id']
    var nodeSelected = $('#deleteParentSelect').select2('data')

    var index = -1;
    for (var x = 0; x < multiParents.length; x++) {
        let child = multiParents[x].child;
        let parent = multiParents[x].parent;

        if (child['id'] == create_node_parent['id']) {
            if (parent['id'] == nodeSelected[0]['id']) {
                deleteParentDB(child, parent)
                index = x;
                break;
            }
        }
    }
    if (index >= 0) {
        multiParents.splice(index, 1);
        closeModal();
        outer_update(tree_root);
    }
}

async function deleteParentDB(child, parent) {
    await axios({
        method: 'post',
        url: "http://64.227.7.32/tema/deleteNodoSecundario?id_hijo=" + child.id + "&id_padre=" + parent.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id_hijo: child.id,
            id_padre: parent.id
        }
    }).then(function (response) {
        console.log("funciono")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}

function create_node() {
    name = $('#CreateNodeName').val();

    let hasDuplicated = checkhasDuplicated(name, null);

    if (hasDuplicated) {
        swal({
            title: "Ya existe un nodo llamado así",
            text: "¿Esta seguro que desea crear nuevo el nodo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    confirmCreateNode(name)
                }

            });
    } else {
        confirmCreateNode(name)
    }
}

async function confirmCreateNode(name) {
    if (create_node_parent && create_node_modal_active) {
        if (create_node_parent._children != null) {
            create_node_parent.children = create_node_parent._children;
            create_node_parent._children = null;
        }
        if (create_node_parent.children == null) {
            create_node_parent.children = [];
        }
        //  id = generateUUID();

        debugger;
        new_node = {
            'name': name,
            'id': 0,
            'depth': create_node_parent.depth + 1,
            'level': create_node_parent['level'] + 1,
            'level2': create_node_parent['level2'] + 1,
            'freex': create_node_parent['freex'],
            'freey': create_node_parent['freey'] + 100,
            'children': [],
            'textPosition': textPosition ? 1 : 0,
            '_children': null
        };

        textPosition = false;
        var newId = await createRequestNewNode(new_node);

        new_node['id'] = newId;
        create_node_parent.children.push(new_node);

        create_node_modal_active = false;
        $('#CreateNodeName').val('');

    }
    closeModal();
    outer_update(create_node_parent);
}


function checkhasDuplicated(name, id) {
    for (var i = 0; i < nodesToList.length; i++) {
        if ((nodesToList[i].name == name && nodesToList[i].id != id)) {
            return true;
        }
    }
    return false;
}





function visit(parent, visitFn, childrenFn) {
    if (!parent) return;

    visitFn(parent);

    var children = childrenFn(parent);
    if (children) {
        var count = children.length;
        for (var i = 0; i < count; i++) {
            visit(children[i], visitFn, childrenFn);
        }
    }
}

function makeListSons(node) {
    var nodesSelectAllDelete = document.getElementById("nodesSelectChildNewParent");

    $('#nodesSelectChildNewParent').empty().trigger("change");

    $('#nodesSelectChildNewParent').select2('data', null);

    if (node.children != null) {
        for (var i = 0; i < node.children.length; i++) {
            var nameNode = node.children[i].name;
            var idNode = node.children[i].id;
            var el = document.createElement("option");
            el.textContent = nameNode;
            el.value = idNode;
            nodesSelectChildNewParent.appendChild(el);
        }
    }
}

function delete_node(node1) {



    var optionsS = $('#optionsDelete').select2('data')
    let deleteOption = optionsS[0]['id'];



    let permiteDelete = true;

    if (node1.children != undefined) {
        permiteDelete = false;

        if (deleteOption == 1) {
            swal({
                title: "Este nodo tiene hijos",
                text: "¿Esta seguro que desea eliminar el nodo?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        confirmDeleteNode(node1);
                        deleteAllSons(node1.id);
                    }
                });
        } else if (deleteOption == 2) {
            swal({
                title: "Este nodo tiene hijos",
                text: "¿Esta seguro que desea pasar los hijos al nodo abuelo?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        let parent = node1.parent;

                        for (var i = 0; i < node1['children'].length; i++) {
                            parent.children.push(node1.children[i]);
                        }

                        node1['children'] = null;
                        deleteandcambiarPadre(node1, parent);

                        confirmDeleteNode(node1);
                        outer_update(parent);

                    }
                });
        } else if (deleteOption == 3) {
            swal({
                title: "Este nodo tiene hijos",
                text: "¿Esta seguro que desea pasar los hijos a un nodo hijo?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        let parent = node1.parent;
                        let newChildParent = null;

                        if (node1['children'] != undefined) {
                            debugger;
                            var nodeSelectedS = $('#nodesSelectChildNewParent').select2('data');



                            newChildParent = tree_d3.nodes(tree_root).filter(function (d) {
                                return d['id'] == nodeSelectedS[0].id;
                            })[0];

                            newChildParent['freex'] = node1['freex']
                            newChildParent['freey'] = node1['freey']
                            if (newChildParent['children'] == undefined) {
                                newChildParent['children'] = [];
                            }


                            for (var i = 1; i < node1['children'].length; i++) {
                                newChildParent.children.push(node1.children[i]);
                            }
                        }
                        parent.children.push(newChildParent)

                        node1['children'] = null;
                        hacerHijoPadre(node1, newChildParent);
                        confirmDeleteNode(node1);
                        outer_update(parent);

                    }
                });
        } else if (deleteOption == 4) {
            swal({
                title: "Este nodo tiene hijos",
                text: "¿Esta seguro que desea pasar los hijos al nodo seleccionado?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        var nodeSelectedS = $('#nodesSelectAllDelete').select2('data')
                        var nodeSelected = tree_d3.nodes(tree_root).filter(function (d) {
                            return d['id'] == nodeSelectedS[0].id;
                        })[0];

                        if (nodeSelected['children'] == undefined) {
                            nodeSelected['children'] = [];
                        }

                        for (var i = 0; i < node1['children'].length; i++) {
                            nodeSelected.children.push(node1.children[i]);
                        }

                        node1['children'] = null;
                        deleteandcambiarPadre(node1, nodeSelected);

                        confirmDeleteNode(node1);
                        outer_update(nodeSelected);

                    }
                });
        }
    }
    if (permiteDelete) {
        deleteAllSons(node1.id);
        confirmDeleteNode(node1);
    }






}
function hacerHijoPadre(oldParent, newChildParent) {
    axios({
        method: 'post',
        url: "http://64.227.7.32/tema/hacerHijoPadre/" + oldParent.id + "?id=" + oldParent.id + "&id2=" + newChildParent.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id: oldParent.id,
            id2: newChildParent.id
        }
    }).then(function (response) {
        console.log("funciono")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}


function cambiarPadre(nodeToChange, newParent) {
    axios({
        method: 'post',
        url: "http://64.227.7.32/tema/cambiarPadre/" + nodeToChange.id + "?id=" + nodeToChange.id + "&id2=" + newParent.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id: nodeToChange.id,
            id2: newParent.id
        }
    }).then(function (response) {
        console.log("funciono")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}

function deleteandcambiarPadre(oldParent, newParent) {
    axios({
        method: 'post',
        url: "http://64.227.7.32/tema/deleteandcambiarPadre/" + oldParent.id + "?id=" + oldParent.id + "&id2=" + newParent.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id: oldParent.id,
            id2: newParent.id
        }
    }).then(function (response) {
        console.log("funciono")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}



function deleteAllSons(idNode) {
    debugger;
    axios({
        method: 'post',
        url: "http://64.227.7.32/tema/deleteTema1/" + idNode + "?id=" + idNode,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            id: idNode
        }
    }).then(function (response) {
        console.log("funciono")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}
function confirmDeleteNode(node1) {
    visit(tree_root, function (d) {
        if (d.children) {
            for (var child of d.children) {
                if (child == node1) {

                    d.children = _.without(d.children, child);
                    getAllNodesDeleted(node1);
                    outer_update(tree_root);
                    break;
                }
            }
        }
    },
        function (d) {
            return d.children && d.children.length > 0 ? d.children : null;
        });

    updateNodeToList();





}

function getAllNodesDeleted(node1) {
    var index = -1;
    for (var x = 0; x < multiParents.length; x++) {
        let child = multiParents[x].child;
        let parent = multiParents[x].parent;
        if (child['id'] == node1['id'] || parent['id'] == node1['id']) {
            index = x;
            break;
        }
    }

    if (index >= 0) {
        multiParents.splice(index, 1);
    }


    if (node1.children) {
        for (var x = 0; x < node1.children.length; x++) {
            getAllNodesDeleted(node1.children[x])
        }
    }
}

async function deleteNodeConfirm() {
    try {
        let result = await swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        });
        // SUCCESS
        return result;
    } catch (e) {
        // Fail!
        console.error(e);
    }
}


function deleteRecursiveNode(node, nodeToDelete) {
    if (node['name'] == nodeToDelete['name']) {
        return true;
    }
    if (node['children'] != undefined) {
        for (var i = 0; i < node['children'].length; i++) {
            if (deleteRecursiveNode(node['children'][i], nodeToDelete)) {
                if (node['children'][i]['name'] == nodeToDelete['name']) {
                    node.children = _.without(node.children, node['children'][i]);
                }
                return true;
            }
        }
    }
    return false;
}

async function updatePosition(draggingNode) {
    await axios({
        method: 'post',
        url: "http://64.227.7.32/tema/posicion?newx=" + draggingNode.freex + "&newy=" + draggingNode.freey + "&id=" + draggingNode.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            newy: draggingNode.freey,
            newy: draggingNode.freex,
            id: draggingNode.id
        }
    }).then(function (response) {
        console.log("funciono")
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
}

async function createRequestNewNode(new_node) {
    var newId;
    await axios({
        method: 'post',
        url: "http://64.227.7.32/tema/addTema?nombre_tema=" + new_node.name + "&nivel_tema=" + (create_node_parent.level2 + 1) + "&id_padre=" + create_node_parent.id +
            "&freex=" + new_node.freex + "&freey=" + new_node.freey + "&textPosition=" + new_node.textPosition,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
            nombre_tema: new_node.name,
            id_padre: create_node_parent.id,
            nivel_tema: create_node_parent.level2 + 1,
            freex: new_node.freex,
            freey: new_node.freey,
            textPosition: new_node.textPosition

        }
    }).then(function (response) {
        debugger;
        newId = response['data']['newId']
    }).catch(function (error) {
        console.log('Error: ' + error)
    })
    return newId[0];

}


async function getTreeFromBD() {
    debugger;
    let treeData = null;
    treeExtraConections = null;
    let tree = null;
    await axios({
        method: 'get',
        url: "http://64.227.7.32/temas/arbol",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }).then(function (response) {
        treeData = response['data']['treeStructure'];

        treeExtraConections = response['data']['extraParent'];
    }).catch(function (error) {
        console.log('Error: ' + error)
    });





    return treeData;
}

function createExtraConectionStructure(treeData) {
    var couplingParent = null;
    var couplingChild = null;
    treeExtraConections.forEach(function (d1) {
        couplingParent = tree_d3.nodes(treeData).filter(function (d) {
            return d['id'] == d1['id_padre'];
        })[0];
        couplingChild = tree_d3.nodes(treeData).filter(function (d) {
            return d['id'] == d1['id_hijo'];
        })[0];

        multiParents.push({
            parent: couplingParent,
            child: couplingChild,
        })
    });
}


function loadQuestions(d) {

    axios({
        method: 'get',
        url: "http://64.227.7.32/preguntas/nodo?id=" + d.id,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }).then(function (response) {
        var questions = response.data;
        $('#questionList').empty();

        questions.forEach(question => {
            $("#questionList").append('<li><p style="font-weight: bold;"> ' + question.pregunta + '</p> <p>*' + question.respuesta + '</p></li>');
        });
        if(questions.length==0){
            $("#questionList").append('<li><p style="font-weight: bold;">No hay preguntas que mostrar.</p></li>');

        }

    }).catch(function (error) {
        console.log('Error: ' + error)
    });

    $('#QuestionModal').foundation('reveal', 'open');
}



