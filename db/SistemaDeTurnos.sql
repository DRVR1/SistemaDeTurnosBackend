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
    dni VARCHAR(25) UNIQUE NOT NULL,
	mail varchar(100) not null,
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
	select id, nombre from Especialidad
END;


-- Ver turnos disponibles
CREATE PROCEDURE verTurnos
	@especialidadID INT
AS
BEGIN
	select t.id, t.fecha, m.nombre, m.apellido, e.nombre from Turno t 
	join Medico m on m.id = t.medicoID
	join Especialidad e on e.id = m.especialidadID
	where t.pacienteID is null and m.especialidadID = @especialidadID and t.fecha > GETDATE()
END;

CREATE PROCEDURE verTurnosReservados
	@pacienteID INT
AS
BEGIN
	select T.id, T.fecha, M.nombre, M.apellido, E.nombre as especialidad from Turno T
	join Medico M on M.id = T.medicoID
	join Especialidad E on M.especialidadID = E.id
	where T.pacienteID = @pacienteID
END;


CREATE PROCEDURE reservarTurno
	@turnoID INT,
	@pacienteID INT
AS
BEGIN
	update Turno set pacienteID = @pacienteID
	where Turno.id = @turnoID and Turno.pacienteID is null
END;


CREATE PROCEDURE cancelarTurno
	@turnoID INT
AS
BEGIN
	update Turno set pacienteID = null
	where Turno.id = @turnoID
END;


-- Herramientas:

-- Eliminar tablas (ejecutar varias veces)
DROP table Turno
DROP table Paciente
DROP table Especialidad
DROP table Medico

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

-- crear datos

INSERT INTO Especialidad (nombre) VALUES
('Pediatría'),
('Cardiología'),
('Dermatología'),
('Ginecología'),
('Psiquiatría');

INSERT INTO Medico (nombre, apellido, telefono, dni, especialidadID) VALUES
('Juan', 'Pérez', '123456789', '12345678', 1),  -- Pediatría
('Ana', 'Gómez', '987654321', '87654321', 2),   -- Cardiología
('Luis', 'Martínez', '456789123', '11223344', 3), -- Dermatología
('María', 'López', '321654987', '22334455', 4),  -- Ginecología
('Carlos', 'Fernández', '654321789', '33445566', 5); -- Psiquiatría


INSERT INTO Paciente (nombre, apellido, telefono, dni,mail) VALUES
('Pedro', 'Sánchez', '555123456', '11122233','pedro@gmail.com.ar'),
('Lucía', 'Rodríguez', '555987654', '22233344','lucia@gmail.com.ar'),
('Javier', 'Moreno', '555654321', '33344455','javier@gmail.com.ar'),
('Sofía', 'García', '555345678', '44455566','sofia@gmail.com.ar'),
('Diego', 'Hernández', '555456789', '55566677','diego@gmail.com.ar');

-- Insertar turnos en diferentes días y horarios en octubre de 2024 sin pacienteID
INSERT INTO Turno (fecha, pacienteID, medicoID) VALUES 
('2024-10-20 09:00:00', NULL, 1),
('2024-10-20 10:30:00', NULL, 1),
('2024-10-20 14:00:00', NULL, 2),
('2024-10-20 15:30:00', NULL, 2),
('2024-10-20 16:45:00', NULL, 3),

('2024-10-21 09:15:00', NULL, 1),
('2024-10-21 10:00:00', NULL, 3),
('2024-10-21 11:30:00', NULL, 2),
('2024-10-21 14:45:00', NULL, 2),
('2024-10-21 16:00:00', NULL, 3),

('2024-10-22 08:30:00', NULL, 2),
('2024-10-22 10:30:00', NULL, 1),
('2024-10-22 12:00:00', NULL, 1),
('2024-10-22 14:15:00', NULL, 1),
('2024-10-22 16:00:00', NULL, 3),

('2024-10-23 09:00:00', NULL, 2),
('2024-10-23 11:00:00', NULL, 3),
('2024-10-23 13:30:00', NULL, 1),
('2024-10-23 15:00:00', NULL, 2),
('2024-10-23 16:45:00', NULL, 3),

('2024-10-24 08:00:00', NULL, 1),
('2024-10-24 09:30:00', NULL, 3),
('2024-10-24 12:15:00', NULL, 2),
('2024-10-24 14:00:00', NULL, 3),
('2024-10-24 15:30:00', NULL, 1),

('2024-10-25 09:00:00', NULL, 2),
('2024-10-25 10:00:00', NULL, 1),
('2024-10-25 11:00:00', NULL, 2),
('2024-10-25 14:30:00', NULL, 3),
('2024-10-25 15:30:00', NULL, 2),

('2024-10-26 09:30:00', NULL, 1),
('2024-10-26 11:00:00', NULL, 3),
('2024-10-26 13:00:00', NULL, 2),
('2024-10-26 14:45:00', NULL, 1),
('2024-10-26 16:30:00', NULL, 3),

('2024-10-27 10:00:00', NULL, 2),
('2024-10-27 11:30:00', NULL, 1),
('2024-10-27 13:00:00', NULL, 2),
('2024-10-27 15:15:00', NULL, 1),
('2024-10-27 16:30:00', NULL, 3);
