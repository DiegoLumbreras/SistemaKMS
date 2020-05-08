'use strict'
const Database = use('Database')

class PreguntaController {
  //almacenar pregunta
  async store({request,response}){
     const{pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema} = request.only(
        [
          'pregunta',
          'respuesta',
          'tipo',
          'opcion',
          'opcion2',
          'opcion3',
          'opcion4',
          'id_tema',
        ]) 
    	//const banco_preguntas = await Database.raw('INSERT INTO banco_preguntas(pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema) VALUES(?,?,?,?,?,?,?,?)',[pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema])
 			const preguntas = await Database .insert({pregunta:pregunta,respuesta:respuesta,tipo:tipo,opcion:opcion,opcion2:opcion2,opcion3:opcion3,opcion4:opcion4,id_tema:id_tema}).into('banco_preguntas')
      return response.json({message:'Se ha registrado la pregunta'})
      
      }
  
   async showall({response}){
    const banco_preguntas = await Database.raw('SELECT b.id as id_pregunta,b.id_tema as id_tema,b.pregunta as pregunta,b.respuesta as respuesta,b.tipo as tipo,b.opcion as opcion,b.opcion2 as opcion2,b.opcion3 as opcion3,b.opcion4 as opcion4,t.nombre_tema as tema FROM banco_preguntas b INNER JOIN temas t on t.id = b.id_tema')
    return response.json(banco_preguntas)
  }
  
  
   async update({request,response}){
    
    const{id,pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema} = request.only(
        [
          'id',
          'pregunta',
          'respuesta',
          'tipo',
          'opcion',
          'opcion2',
          'opcion3',
          'opcion4',
          'id_tema',
        ]) 
    
    const banco_preguntas = await Database.raw('UPDATE banco_preguntas SET pregunta = ?,respuesta = ?,tipo = ?, opcion = ?, opcion2 = ?, opcion3 = ?,opcion4 = ?, id_tema = ? WHERE id = ?',[pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema,id])
    
    return response.json({message:'Se ha modificado la pregunta'})
  }
  
   async delete({request,response}){
      const{id} = request.only(
        [
          'id'
         
        ]) 
    const banco_preguntas = await Database.raw('DELETE FROM banco_preguntas WHERE id = ?',[id])
    return response.json({message:'Se ha eliminado la pregunta'})
  }
  
   async preguntanodo({request,response}){
    
    const{id} = request.only(
        [
          'id'
        
        ]) 
    
    const banco_preguntas = await Database.select('id','pregunta','respuesta').from('banco_preguntas').where('id_tema',id)
   
    return response.json(banco_preguntas)
  }
  async preguntacount({response}){
         const pregunta = await Database.raw('SELECT COUNT(id) FROM banco_preguntas ')
        return response.json(pregunta)
  }
  
}

module.exports = PreguntaController
