CREATE VIEW arbol as SELECT t1.id as id, t1.nombre_tema as name, t1.nivel as nivel_padre, t2.id as id_hijo,t2.nombre_tema as name_hijo,t2.nivel as nivel_hijo
FROM temas t1 
INNER JOIN relacion_primarias rp ON t1.id = rp.id_padre
INNER JOIN temas t2 ON t2.id = rp.id_hijo
WHERE rp.tipo = "primarias";


CREATE VIEW arbol2 as SELECT t1.id as id, t1.nombre_tema as name, t1.nivel as nivel_padre, t2.id as id_hijo,t2.nombre_tema as name_hijo,t2.nivel as nivel_hijo
FROM temas t1 
INNER JOIN relacion_primarias rp ON t1.id = rp.id_padre
INNER JOIN temas t2 ON t2.id = rp.id_hijo
WHERE rp.tipo = "secundarias";