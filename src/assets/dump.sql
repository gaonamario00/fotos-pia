CREATE TABLE IF NOT EXISTS fotos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    descrip TEXT,
    imagen TEXT,
    fecha TEXT
);

INSERT or IGNORE INTO fotos(id,titulo,descrip,imagen,fecha) VALUES (1,"Mario Gaona", "Bonito Paisaje :)","https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg","16/05/2021");
