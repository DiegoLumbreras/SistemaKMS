

<template>
	<div>
  <!--MODAL PARA RENOMBRAR NODO-->
  <div id="RenameNodeModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true"
    role="dialog">
    <h2 id="modalTitle">Rename Node</h2>
    <form id="RenameNodeForm">
      <div class="row">
        <div class="large-12 columns">
          <label>Node name
            <input type="text" class="inputName" id='RenameNodeName' placeholder="node name" />
          </label>
        </div>
      </div>
      <div class="row">
        <div class="large-8 columns">
          &nbsp;
        </div>
        <div class="large-4 columns">
          <a href="#" class="button info" onclick="close_rename_node_modal()">Cancel</a>
          <a href="#" class="button success" onclick="rename_node()">Rename</a>
        </div>
      </div>
    </form>
    <a class="close-reveal-modal" aria-label="Close">&#215;</a>
  </div>

  <!--MODAL PARA CEAR NODO-->
  <div id="CreateNodeModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true"
    role="dialog">
    <h2 id="modalTitle">Create Node</h2>
    <form id="CreateNodeForm">
      <div class="row">
        <div class="large-12 columns">
          <label>Node name
            <input type="text" class="inputName" id='CreateNodeName' placeholder="node name" />
          </label>
        </div>
      </div>
      <div class="row">
        <div class="large-8 columns">
          &nbsp;
        </div>
        <div class="large-4 columns">
          <a href="#" class="button info" onclick="close_create_node_modal()">Cancel</a>
          <a href="#" class="button success" onclick="create_node()">Create</a>
        </div>
      </div>
    </form>
    <a class="close-reveal-modal" aria-label="Close">&#215;</a>
  </div>
  <!--MODAL PARA AÑADIR UN NUEVO PADRE AL NODO-->

  <div id="NewParentModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true"
    role="dialog">
    <select id="nodesSelect" class="js-example-basic-multiple">
    </select>
    <div class="row">
      <div class="large-8 columns">
        &nbsp;
      </div>
      <div class="large-4 columns">
        <a href="#" class="button success" onclick="createParentConection()">Create</a>
      </div>
    </div>
  </div>
	
  <!--MODAL PARA BORRAR UN  PADRE AL NODO-->
  <div id="DeleteParentModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true"
    role="dialog">
    <select id="deleteParentSelect" class="js-example-basic-multiple">
    </select>
    <div class="row">
      <div class="large-8 columns">
        &nbsp;
      </div>
      <div class="large-4 columns">
        <a href="#" class="button success" onclick="deleteParent()">Delete</a>
      </div>
    </div>
  </div>
	
  <div id="DeleteNodeModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true"
    role="dialog">

    <select id="optionsDelete" class="js-example-basic-multiple">
      <option value="1">Borrar Todos</option>
      <option value="2">Hacer padre al abuelo</option>
      <option value="3">Cambiar de padre a un hijo</option>
      <option value="4">Cambiar de padre</option>
	 </select>




    <select id="nodesSelectAllDelete" name="selectName" class="js-example-basic-multiple">
    </select>


    <select id="nodesSelectChildNewParent" name="selectName" class="js-example-basic-multiple">
    </select>


    <div class="row">
      <div class="large-8 columns">
        &nbsp;
      </div>
      <div class="large-4 columns">
        <a href="#" class="button success" onclick="delete_node(node_to_delete)">Aceptar</a>
      </div>
    </div>
  </div>
	




  <div id="tree-container" style="width: 50%; height: 50%; ">
       <input type="checkbox" class="custom-control-input" id="horizontalVertical">
    <label class="custom-control-label" for="horizontalVertical">Horizontal</label>

    <input type="checkbox" class="custom-control-input" checked="true" id="showNames">
    <label class="custom-control-label" for="showNames">Mostrar nombre del nodo</label>

    <input type="checkbox" class="custom-control-input" checked="true" id="showNumber">
    <label class="custom-control-label" for="showNumber">Mostrar valor del nodo</label>		
  </div>

                    
   <!--MODAL PARA PREGUNTAS-->
  <div id="QuestionModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true"
    role="dialog">
    <h2 id="modalTitle">Preguntas</h2>
    <form id="QuestionForm">

      <div>
        <ol id="questionList">

        </ol>


      </div>
    </form>
    <a class="close-reveal-modal" aria-label="Close">&#215;</a>
  </div>
	

                    
                    


		

	</div>


</template>

<script>
//import 'select2';
import $ from 'jquery';

//import 'foundation-sites';
import axios from 'axios';

export default {
			mounted(){
				this.cristian()
			},
			methods: {
				cristian(){

					$('.js-example-basic-multiple').select2();
					$('#nodesSelect').select2();
					$('#nodesSelectAllDelete').select2();
					$('#nodesSelectChildNewParent').select2();
					$('#nodesSelectAllDelete').next(".select2-container").hide();
					$('#nodesSelectChildNewParent').next(".select2-container").hide();

					$("#horizontalVertical").change(function (e) {
						// alert("Handler for .change() called. ");

						horizontalVertical = !horizontalVertical;
						outer_update(tree_root);

					});



					$("#textPosition").change(function (e) {
						textPosition = !textPosition;
					});


					$("#textPositionRename").change(function (e) {
						textPosition = !textPosition;
					});

					$("#orienta").change(function (e) {
						outer_update(tree_root);

					});

					$("#showNames").change(function (e) {
						showNames = !showNames;
						outer_update(tree_root);

					});

					$("#showNumber").change(function (e) {
						showNumber = !showNumber;

						outer_update(tree_root);

					});

					
					
					var $optionsDelete = $("#optionsDelete").select2().on("change", function (e) {

						var optionsS = $('#optionsDelete').select2('data')
						let deleteOption = optionsS[0]['id'];
						if (deleteOption == 4) {
							$('#nodesSelectAllDelete').next(".select2-container").show();
							$('#nodesSelectChildNewParent').next(".select2-container").hide();

						} else if (deleteOption == 3) {
							$('#nodesSelectChildNewParent').next(".select2-container").show();
							$('#nodesSelectAllDelete').next(".select2-container").hide();
						} else {
							$('#nodesSelectAllDelete').next(".select2-container").hide();
							$('#nodesSelectChildNewParent').next(".select2-container").hide();

						}
						
					});


					$(document).foundation();
					$(document).on('opened', '[data-reveal]', function () {
						var element = $(".inputName:visible").first();
						element.focus(function () {
							this.selectionStart = this.selectionEnd = this.value.length;
						});
						element.focus();
					});
					$('#RenameNodeForm').submit(function (e) {
						rename_node();
						return false;
					});
					$('#CreateNodeForm').submit(function (e) {
						create_node();
						return false;
					});
					$("/public/arbol/d3.v3.min.js", function(){
           var treeJSON = d3.json("tree.json", draw_tree);
       		 });
					 
					 					
			}
			


}}
</script>