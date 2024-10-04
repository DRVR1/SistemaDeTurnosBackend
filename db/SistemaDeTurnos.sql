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
select id, nombre from Especialidad
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


INSERT INTO Paciente (nombre, apellido, telefono, dni) VALUES
('Pedro', 'Sánchez', '555123456', '11122233'),
('Lucía', 'Rodríguez', '555987654', '22233344'),
('Javier', 'Moreno', '555654321', '33344455'),
('Sofía', 'García', '555345678', '44455566'),
('Diego', 'Hernández', '555456789', '55566677');

-- Insertar turnos en diferentes días y horarios en octubre de 2024 sin pacienteID
INSERT INTO Turno (fecha, pacienteID, medicoID) VALUES 
('2024-10-01 09:00:00', NULL, 1),
('2024-10-01 10:30:00', NULL, 1),
('2024-10-01 14:00:00', NULL, 2),
('2024-10-01 15:30:00', NULL, 2),
('2024-10-01 16:45:00', NULL, 3),

('2024-10-02 09:15:00', NULL, 1),
('2024-10-02 10:00:00', NULL, 3),
('2024-10-02 14:45:00', NULL, 2),
('2024-10-02 16:00:00', NULL, 3),

('2024-10-03 08:30:00', NULL, 2),
('2024-10-03 12:00:00', NULL, 1),
('2024-10-03 14:15:00', NULL, 1),

('2024-10-04 09:00:00', NULL, 2),
('2024-10-04 11:00:00', NULL, 3),
('2024-10-04 15:00:00', NULL, 2),

('2024-10-05 10:30:00', NULL, 1),
('2024-10-05 11:30:00', NULL, 1),
('2024-10-05 15:30:00', NULL, 3),

('2024-10-21 09:45:00', NULL, 2),
('2024-10-21 13:30:00', NULL, 3),
('2024-10-21 16:00:00', NULL, 1),

('2024-10-07 08:00:00', NULL, 1),
('2024-10-07 12:15:00', NULL, 2),
('2024-10-07 14:00:00', NULL, 3),

('2024-10-08 10:00:00', NULL, 1),
('2024-10-08 11:00:00', NULL, 2),
('2024-10-08 15:00:00', NULL, 3),

('2024-10-09 09:30:00', NULL, 1),
('2024-10-09 13:00:00', NULL, 2),
('2024-10-09 16:30:00', NULL, 3),

('2024-10-10 10:00:00', NULL, 2),
('2024-10-10 11:30:00', NULL, 1),
('2024-10-10 15:15:00', NULL, 1);
