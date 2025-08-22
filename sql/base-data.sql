INSERT INTO tb_funcionarios 
(nome, departamento, is_active, created_at, created_by, updated_at, updated_by)
VALUES
('Ana Souza', 'Recursos Humanos', true, '2025-08-01 09:15:00', 'admin', '2025-08-01 09:15:00', 'admin'),
('Carlos Oliveira', 'Tecnologia da Informação', true, '2025-08-02 10:30:00', 'admin', '2025-08-02 10:30:00', 'admin'),
('Fernanda Lima', 'Financeiro', true, '2025-08-03 11:45:00', 'rh_user', '2025-08-03 11:45:00', 'rh_user'),
('João Pereira', 'Marketing', true, '2025-08-04 14:10:00', 'admin', '2025-08-04 14:10:00', 'admin'),
('Mariana Santos', 'Vendas', false, '2025-08-05 08:20:00', 'gestor_vendas', '2025-08-05 08:20:00', 'gestor_vendas'),
('Ricardo Alves', 'Tecnologia da Informação', true, '2025-08-06 13:55:00', 'admin', '2025-08-06 13:55:00', 'admin'),
('Beatriz Costa', 'Jurídico', true, '2025-08-07 09:40:00', 'juridico_user', '2025-08-07 09:40:00', 'juridico_user'),
('Lucas Martins', 'Operações', true, '2025-08-08 15:25:00', 'admin', '2025-08-08 15:25:00', 'admin'),
('Patrícia Ferreira', 'Financeiro', false, '2025-08-09 16:50:00', 'rh_user', '2025-08-09 16:50:00', 'rh_user'),
('Gustavo Mendes', 'Recursos Humanos', true, '2025-08-10 17:05:00', 'admin', '2025-08-10 17:05:00', 'admin');

INSERT INTO tb_tipo_equipamento 
(tipo_equipamento, status, created_at, created_by, updated_at, updated_by)
VALUES
('Notebook', true, '2025-08-01 09:15:00', 'admin', '2025-08-01 09:15:00', 'admin'),
('Desktop', true, '2025-08-01 10:00:00', 'admin', '2025-08-01 10:00:00', 'admin'),
('Impressora', true, '2025-08-02 11:30:00', 'ti_user', '2025-08-02 11:30:00', 'ti_user'),
('Scanner', true, '2025-08-02 14:45:00', 'admin', '2025-08-02 14:45:00', 'admin'),
('Monitor', true, '2025-08-03 08:50:00', 'admin', '2025-08-03 08:50:00', 'admin'),
('Teclado', true, '2025-08-03 13:10:00', 'estoque_user', '2025-08-03 13:10:00', 'estoque_user'),
('Mouse', true, '2025-08-04 09:40:00', 'admin', '2025-08-04 09:40:00', 'admin'),
('Projetor', false, '2025-08-04 15:20:00', 'ti_user', '2025-08-04 15:20:00', 'ti_user'),
('Servidor', true, '2025-08-05 16:55:00', 'admin', '2025-08-05 16:55:00', 'admin'),
('Smartphone Corporativo', true, '2025-08-06 17:30:00', 'admin', '2025-08-06 17:30:00', 'admin');


INSERT INTO tb_equipamentos
(id_tipo_equipamento, nome_equipamento, status, is_active, created_at, created_by, updated_at, updated_by)
VALUES
(1, 'Notebook Dell Latitude 5420', 'disponivel', true, '2025-08-01 09:00:00', 'admin', '2025-08-01 09:00:00', 'admin'),
(1, 'Notebook Lenovo ThinkPad X1', 'manutencao', true, '2025-08-01 10:20:00', 'ti_user', '2025-08-01 10:20:00', 'ti_user'),
(2, 'Desktop HP EliteDesk 800', 'disponivel', true, '2025-08-02 11:15:00', 'admin', '2025-08-02 11:15:00', 'admin'),
(2, 'Desktop Dell OptiPlex 7090', 'alocado', true, '2025-08-02 14:30:00', 'admin', '2025-08-02 14:30:00', 'admin'),
(3, 'Impressora HP LaserJet Pro M404dn', 'disponivel', true, '2025-08-03 08:45:00', 'estoque_user', '2025-08-03 08:45:00', 'estoque_user'),
(3, 'Impressora Epson EcoTank L3250', 'manutencao', true, '2025-08-03 12:50:00', 'admin', '2025-08-03 12:50:00', 'admin'),
(4, 'Scanner Canon DR-F120', 'disponivel', true, '2025-08-04 09:40:00', 'admin', '2025-08-04 09:40:00', 'admin'),
(5, 'Monitor LG UltraWide 29"', 'alocado', true, '2025-08-04 15:10:00', 'ti_user', '2025-08-04 15:10:00', 'ti_user'),
(6, 'Teclado Mecânico Redragon Kumara', 'disponivel', true, '2025-08-05 13:30:00', 'admin', '2025-08-05 13:30:00', 'admin'),
(7, 'Mouse Logitech MX Master 3', 'disponivel', false, '2025-08-06 16:55:00', 'estoque_user', '2025-08-06 16:55:00', 'estoque_user');


INSERT INTO tb_reservas
(funcionario_id, equipamento_id, data_inicio, data_fim)
VALUES
(1, 1, '2025-08-10 09:00:00', '2025-08-15 18:00:00'),
(2, 2, '2025-08-11 10:30:00', '2025-08-13 17:30:00'),
(3, 3, '2025-08-11 14:00:00', NULL),
(4, 4, '2025-08-12 08:45:00', '2025-08-12 18:00:00'),
(5, 5, '2025-08-12 09:15:00', NULL),
(6, 6, '2025-08-13 13:00:00', '2025-08-17 18:00:00'),
(7, 7, '2025-08-13 15:20:00', NULL),
(8, 8, '2025-08-14 09:00:00', '2025-08-20 18:00:00'),
(9, 9, '2025-08-14 11:10:00', '2025-08-14 17:00:00'),
(10, 10, '2025-08-15 16:00:00', NULL);
