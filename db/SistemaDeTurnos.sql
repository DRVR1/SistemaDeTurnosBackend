-- Creacion DP y SP

-- Crear la tabla Especialidad
CREATE TABLE Especialidad (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL
);

-- Crear la tabla Medico
CREATE TABLE Medico (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    dni VARCHAR(20) UNIQUE NOT NULL,
    especialidadID INT,
    FOREIGN KEY (especialidadID) REFERENCES Especialidad(id)
);

-- Crear la tabla Medico
CREATE TABLE Paciente (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    dni VARCHAR(20) UNIQUE NOT NULL,
);


CREATE TABLE Turno (
    id INT PRIMARY KEY IDENTITY(1,1),
    fecha DATETIME NOT NULL,
    pacienteID INT,
    medicoID INT NOT NULL,
    FOREIGN KEY (pacienteID) REFERENCES Paciente(id),
    FOREIGN KEY (medicoID) REFERENCES Medico(id)
);


CREATE PROCEDURE verEspecialidades
AS
BEGIN
select nombre from Especialidad
END;

CREATE PROCEDURE verTurnos
	@especialidadID INT
AS
BEGIN
	select t.id, t.fecha, m.nombre, m.apellido, e.nombre from Turno t 
	join Medico m on m.id = t.medicoID
	join Especialidad e on e.id = m.especialidadID
	where t.pacienteID is null and m.especialidadID = @especialidadID and t.fecha > GETDATE()
END;

DROP PROCEDURE verTurnos



CREATE PROCEDURE reservarTurno
	@turnoID INT,
	@pacienteID INT
AS
BEGIN
	update Turno set pacienteID = @pacienteID
	where Turno.id = @turnoID and Turno.pacienteID is null
END;



-- Herramientas:


--	Misc
drop procedure reservarTurno
drop table Turno
EXEC verTurnos @especialidadID = 1
EXEC verEspecialidades
exec reservarTurno @turnoID = 1, @pacienteID = 1


-- Selects
select * from Medico
select * from Paciente
select * from Especialidad
select * from Turno


-- limpiar tablas y resetear contadores
delete from Medico
delete from Especialidad
delete from Turno
delete from Paciente

DBCC CHECKIDENT ('Paciente', RESEED, 0);
DBCC CHECKIDENT ('Medico', RESEED, 0);
DBCC CHECKIDENT ('Turno', RESEED, 0);
DBCC CHECKIDENT ('Especialidad', RESEED, 0);

