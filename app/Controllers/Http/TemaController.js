'use strict'
const Tema = use('App/Models/Tema')
const Database = use('Database')
class TemaController {
	

	///Eliminar padre secundario
	async deleteNodoSecundarioRelation({response,request}){
			const {id_padre,id_hijo}= request.only(['id_padre','id_hijo']) 
			const array=[id_padre,id_hijo,'secundarias']
			const eliminarPadreSecundario = await Database.table('relacion_primarias').whereRaw('id_padre = ? AND id_hijo = ? AND tipo = ?',array).delete()

			return response.json({message:'Actualizado'})
		}	
	//const eliminarPadreSecundario = await Database.table('relacion_primarias').whereRaw('id_padre = ? AND id_hijo = ? AND tipo = ?',array).delete()
	//Cambia el padre y modifica el nombre del nodo
	async editarNodo({response,request}){
    const{id_nodo,id_padre,nombre_nodo,textPosition}= request.only(
        [
            'id_nodo',
						'nombre_nodo',
						'textPosition'
        ]) 
	 
		const cambiaNombre = await Database
		.table('temas')
		.where('id', id_nodo)
		.update({'nombre_tema': nombre_nodo,'textPosition':textPosition})
 
		
    return response.json({message:'Actualizado'})
  }	
	///Cambia padre y elimina nodo
	async deleteandcambiarPadre({response,request}){
    const{id,id2}= request.only(
        [
            'id',
						'id2'
           
        ]) 
    
		const affectedRows = await Database
		.table('relacion_primarias')
		.where('id_padre', id)
		.where('tipo', "primarias")
		.update('id_padre', id2)
    
   await this.deleteTemaAndHijosRecursive(id)
     await  this.updateLevels(id2)
		//const eliminarRelacionPerdida= await Database.table('relacion_primarias').where('id_padre', id).delete()//Debemos de eliminar la relacion
	//	const eliminarTema = await Database.table('temas').where('id', id).delete()
    return response.json({message:'Eliminado'})
  }	
  
  	async hacerHijoPadre({response,request}){
    const{id,id2}= request.only(
        [
            'id',
						'id2'
           
        ]) 
    
		const affectedRows = await Database
		.table('relacion_primarias')
		.where('id_hijo', id2)
		.where('tipo', "primarias")
		.delete()
    
    
    await Database
		.table('relacion_primarias')
		.where('id_hijo', id)
		.where('tipo', "primarias")
		.update('id_hijo',id2)
      
    const temaPadre=await Database.table("temas").where('id',id);
      
    await Database
      .table('temas')
      .where('id',id2)
      .update('nivel', temaPadre[0].nivel)
      .update('freex', temaPadre[0].freex)
      .update('freey', temaPadre[0].freey)
    
      await Database
		.table('relacion_primarias')
		.where('id_padre', id)
		.where('tipo', "primarias")
		.update('id_padre',id2)
      
      
   await this.deleteTemaAndHijosRecursive(id)
     await  this.updateLevels(id2)
		//const eliminarRelacionPerdida= await Database.table('relacion_primarias').where('id_padre', id).delete()//Debemos de eliminar la relacion
	//	const eliminarTema = await Database.table('temas').where('id', id).delete()
    return response.json({message:'Eliminado'})
  }	
  
  	///Cambia padre 
	async cambiarPadre({response,request}){
    const{id,id2}= request.only(
        [
            'id',
						'id2'
           
        ]) 
    
		const affectedRows = await Database
		.table('relacion_primarias')
		.where('id_hijo', id)
		.where('tipo', "primarias")
		.update('id_padre', id2)
     
    await  this.updateLevels(id2)
		return response.json({message:'Cambo padre'})
  }	
	
  async updateLevels(parentId){
    const temaPadre=await Database.table("temas").where('id',parentId);
    
    const nodeSons= await Database.select('*').from('relacion_primarias').where('tipo', "primarias").where("id_padre",parentId);
    
    var totalNodeSons = nodeSons.length;
    for(var i = 0; i < totalNodeSons; i++) {
        var temaActual=await Database.table("temas").where('id',nodeSons[i].id_hijo);

      
      if((temaActual[0].nivel)!=(temaPadre[0].nivel+1)){
             await Database
      .table('temas')
      .where('id', nodeSons[i].id_hijo)
      .update('nivel', temaPadre[0].nivel+1)

       await this.updateLevels(nodeSons[i].id_hijo);
      }
   
    }
    
  }
	///eliminar el tema y sus hijos
	async deleteTemaAndHijos({response,request}){
    const{id}= request.only(
        [
            'id'		
           
        ]) 
    
    this.deleteTemaAndHijosRecursive(id)
    

 
	//const eliminarRelacionesPrimarias = await Database.table('relacion_primarias').where('id_padre', 'id').delete()
    return response.json({message:'Eliminado'})   
  }	
	
  
  async deleteTemaAndHijosRecursive(nodeId){
    const nodeSons= await Database.select('*').from('relacion_primarias').where('tipo', "primarias").where("id_padre",nodeId);
    var totalNodeSons = nodeSons.length;
    for(var i = 0; i < totalNodeSons; i++) {
        this.deleteTemaAndHijosRecursive(nodeSons[i].id_hijo);
    }
    var array=[nodeId,nodeId]; 
    const deleteRelations = await Database.table('relacion_primarias').whereRaw('id_padre = ? or id_hijo = ?',array).delete();
    const deleteTopics = await Database.table('temas').whereRaw('id = ?',nodeId).delete();
   }
	
	
  //registrar tema Echartea prueba
  async agregarTema({response,request}){
    
    const{nombre_tema,nivel_tema,id_padre,tipo_nodo} = request.only(
        [
            'nombre_tema',		
            'nivel_tema'
        ]) 
    
  
   const temaId = await Database .insert({nombre_tema:nombre_tema,nivel:nivel_tema}).into('temas')
    return response.json({message:'agregadp'})
    
  }	
  
  //mostrar el arbol base(estructura de temas) nodos primarios
    async arbol({ response }){
        const temas =await Database.select('id', 'nombre_tema as name', 'nivel as depth','nivel as level','nivel as level2','freex','freey','textPosition').from('temas').orderBy("nivel","desc")
 
        const relaciones =  await Database.select('*').from('relacion_primarias').where('tipo', 'primarias');
        const relacionesSecundarias =  await Database.select('id_padre','id_hijo').from('relacion_primarias').where('tipo', 'secundarias');
  
 
       var totalTopics = temas.length;
      
     while (totalTopics > 1) {
        totalTopics = temas.length;  
       var totalRelations = relaciones.length;
        for (var i = 0; i < totalTopics; i++) {
            var currentTopicID = temas[i]['id'];
            for (var j = 0; j < totalRelations; j++) {
                if (relaciones[j]['id_hijo'] == currentTopicID) {
                    
                    for (var h = (totalTopics - 1); h >= 0; h--) {
                        if (temas[h]['id'] == relaciones[j]['id_padre']) {
                            var temaBorrar = temas[i];
                            if (temas[h]['children'] != undefined) {
                                temas[h]['children'].push(temaBorrar);
                            } else {
                                temas[h]['children'] = [temaBorrar]
                            }
                            if (i > -1) {
                                temas.splice(i, 1);
                            }
                            if (j > -1) {
                                relaciones.splice(j, 1);
                            }
                            break;
                        }
                    }

                    break;
                }

            }
            break;
        }

    }
      
      var relations={
        "treeStructure":temas[0],
        "extraParent":relacionesSecundarias
      };
              return response.json(relations)

    }
    //mostrar el arbol base(estructura de temas) nodos secundarios
    async arbol2({response}){
      let temas2 = await Database.select('*').from('arbol2')
      return response.json(temas2)
  }



//mostrar un tema
    async show({params,response}){
        const tema = await Tema.find(params.id)
        const res = {
                id:tema.id,
                nombre_tema:tema.nombre_tema,
                nivel: tema.nivel
        }
        return response.json(res)
    }
  
  //mostrar temas hijos
    async showTemasHijos({response,request}){
       // const temas = await Tema.query().fetch();
    	const{id} = request.only(
        [
            'id'
        ]) 	
     
        //await Tema.all()
			const temas = await Database.raw('SELECT t.id as id, t.nombre_tema as nombre_tema,t.freex,t.freey, t.nivel as nivel FROM temas t RIGHT JOIN relacion_primarias rp ON ? = rp.id_padre WHERE rp.tipo = "primarias"',id)
    		
       // const temas= await Database.select('*').from('temas').innerJoin('relacion_primarias', 'temas.id', 'relacion_primarias.id_hijo')
        return response.json(temas)     
    }	
  //mostrar temas con sus temas padres
    async showall({response}){
       // const temas = await Tema.query().fetch();
        const relaciones =  await Database.select('*').from('relacion_primarias').where('tipo', 'primarias');
        //await Tema.all()
			const temas = await Database.raw('SELECT t.id as id, t.nombre_tema as nombre_tema,t.freex,t.freey, t.nivel as nivel, t2.nombre_tema as padre, rp.id_padre as id_padre FROM temas t INNER JOIN relacion_primarias rp ON t.id = rp.id_hijo INNER JOIN temas t2 ON t2.id = rp.id_padre WHERE rp.tipo = "primarias"')
    		
       // const temas= await Database.select('*').from('temas').innerJoin('relacion_primarias', 'temas.id', 'relacion_primarias.id_hijo')
        return response.json(temas)     
    }
	//Ver solo los temas
   async showOnlyTemas({response}){
       // const temas = await Tema.query().fetch();
      const relaciones =  await Database.select('*').from('relacion_primarias').where('tipo', 'primarias');
        //await Tema.all()
			const temas = await Database.raw('SELECT * FROM temas')
    		
       // const temas= await Database.select('*').from('temas').innerJoin('relacion_primarias', 'temas.id', 'relacion_primarias.id_hijo')
        return response.json(temas)     
    }	
  //registrar nodo con padre principal - listo
  async registrar({response,request}){
    const{nombre_tema,id_padre,textPosition} = request.only(
        [
            'nombre_tema',
            'id_padre',
						'textPosition'
        ]) 
		const tema_padre= await Database.select('*').from('temas').where('id', id_padre);
		const nivel_tema= tema_padre[0].nivel+1
		const freey= tema_padre[0].freey+100
		const freex= tema_padre[0].freex
   	const temaId = await Database .insert({nombre_tema:nombre_tema,nivel:nivel_tema,freex:freex,freey:freey,textPosition:textPosition}).into('temas')
   	const dametema = await Database.from('temas').getMax('id')                                
   
   	const relacion= await Database .insert({id_padre:id_padre,id_hijo:dametema,tipo:'primarias'}).into('relacion_primarias')
    return response.json({message:'Creado',newId:temaId})
  }
  
  //registrarpadre secundario - listo
   async registrar_secundario({response,request}){
    const{id_padre,id_hijo} = request.only(
        [
            'id_padre',
            'id_hijo'
          
        ])                      
    const relacion= await Database .insert({id_padre:id_padre,id_hijo:id_hijo,tipo:'secundarias'}).into('relacion_primarias')
    return response.json({message:'Creado'})
  }
  
  
  
  
  //ver de relaciones
  async verrelacion({response}){
    const relacion = await Database.select('*').from('relacion_primarias')
    return response.json(relacion)
  }
  //eliminar nodo
  async eliminarnodo({response,request}){
    
    const{id}= request.only(
        [
            'id'		
           
        ]) 
    const tema = await Tema.find(id)

    await tema.delete()
  
    return response.json({message:'Eliminado'})
  }
  
  //actualizar
async actualizar({request,response}){
    
   const{id,nombre}= request.only(
        [
            'id',
            'nombre'
           
        ])  
    await Tema
  .query()
  .where('id', id)
  .update({ nombre_tema:nombre})
   
  return response.json({message:'Actualizado'})  
  
  }
  async posicion({request,response}){
    const{id,newx,newy}=request.only([
      'id',
      'newx',
      'newy'
    ])
    
    await Tema.query().where('id',id).update({freex:newx,freey:newy})
    
    
    return response.json({message:'Actualizado'})
  }
  
  async temacount({response}){
         const tema = await Database.raw('SELECT COUNT(id) FROM temas')
        return response.json(tema)
  }

  
}

module.exports = TemaController