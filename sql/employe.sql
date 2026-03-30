CREATE DATABASE IF NOT EXISTS employes_db;
USE employes_db;
CREATE TABLE IF NOT EXISTS Employe (
    numEmp INT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    salaire DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (numEmp)
);
INSERT INTO Employe (numEmp, nom, salaire) VALUES
(1, 'Fafara Deteline', 2000.00),
(2, 'Fifty One', 1500.00);