-- create replication role
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'replica_pass';


-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    match_wins INT DEFAULT 0,
    match_losses INT DEFAULT 0,
    match_ties INT DEFAULT 0,
    total_matches INT DEFAULT 0,
    status VARCHAR(50),
    currency_balance DECIMAL(12,2) DEFAULT 0,
    purchased_items JSONB,
    rating FLOAT
);

-- BANS
CREATE TABLE bans (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL REFERENCES users(id),
    admin_id INT NOT NULL REFERENCES users(id),
    reason VARCHAR(50),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP
);

-- CURRENCIES
CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    symbol VARCHAR(10)
);

-- MATCHES
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    moves JSONB,
    result VARCHAR(50),
    player_white INT REFERENCES users(id),
    player_black INT REFERENCES users(id),
    winner INT REFERENCES users(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    used_skins JSONB,
    rating_change_white FLOAT,
    rating_change_black FLOAT
);

-- SHOPS
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    name VARCHAR(255)
);

-- CATEGORIES
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(255)
);

-- ITEMS
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(12,2),
    picture VARCHAR(255),
    status VARCHAR(50),
    category INT REFERENCES categories(id),
    shop_id INT REFERENCES shops(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
);

-- TRANSACTIONS
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    player_id INT REFERENCES users(id),
    purchased_item_id INT REFERENCES items(id),
    price DECIMAL(12,2),
    currency INT REFERENCES currencies(id),
    payment_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 30 users with even IDs (ID % 2 = 0) -> PRIMARY shard
-- Sharding rule: User ID % 2 = 0 -> PRIMARY, User ID % 2 = 1 -> SHARD
INSERT INTO users (id, email, password, full_name, role, match_wins, match_losses, match_ties, total_matches, status, currency_balance, purchased_items, rating) VALUES
(2, 'alice.johnson@email.com', 'pass123', 'Alice Johnson', 'player', 15, 10, 5, 30, 'active', 1250.50, '["skin1", "skin2"]'::jsonb, 1850.5),
(4, 'bob.smith@email.com', 'pass456', 'Bob Smith', 'player', 20, 8, 2, 30, 'active', 2100.75, '["skin3"]'::jsonb, 1920.3),
(6, 'charlie.brown@email.com', 'pass789', 'Charlie Brown', 'admin', 12, 15, 3, 30, 'active', 980.25, '[]'::jsonb, 1750.8),
(8, 'diana.prince@email.com', 'pass101', 'Diana Prince', 'player', 18, 9, 3, 30, 'active', 1650.00, '["skin4", "skin5", "skin6"]'::jsonb, 1880.2),
(10, 'edward.norton@email.com', 'pass202', 'Edward Norton', 'player', 10, 18, 2, 30, 'inactive', 750.50, '["skin7"]'::jsonb, 1680.5),
(12, 'fiona.apple@email.com', 'pass303', 'Fiona Apple', 'player', 22, 5, 3, 30, 'active', 2300.25, '["skin8", "skin9"]'::jsonb, 1950.7),
(14, 'george.washington@email.com', 'pass404', 'George Washington', 'player', 14, 12, 4, 30, 'active', 1100.75, '[]'::jsonb, 1800.1),
(16, 'hannah.montana@email.com', 'pass505', 'Hannah Montana', 'player', 16, 11, 3, 30, 'active', 1400.50, '["skin10"]'::jsonb, 1820.4),
(18, 'isaac.newton@email.com', 'pass606', 'Isaac Newton', 'admin', 19, 8, 3, 30, 'active', 1950.00, '["skin11", "skin12"]'::jsonb, 1900.6),
(20, 'julia.roberts@email.com', 'pass707', 'Julia Roberts', 'player', 11, 16, 3, 30, 'active', 850.25, '["skin13"]'::jsonb, 1720.3),
(22, 'kevin.hart@email.com', 'pass808', 'Kevin Hart', 'player', 17, 10, 3, 30, 'active', 1500.75, '["skin14", "skin15"]'::jsonb, 1850.9),
(24, 'lisa.simpson@email.com', 'pass909', 'Lisa Simpson', 'player', 13, 14, 3, 30, 'active', 1050.50, '[]'::jsonb, 1780.2),
(26, 'michael.jackson@email.com', 'pass010', 'Michael Jackson', 'player', 21, 6, 3, 30, 'active', 2200.25, '["skin16", "skin17", "skin18"]'::jsonb, 1930.5),
(28, 'nancy.drew@email.com', 'pass111', 'Nancy Drew', 'player', 9, 19, 2, 30, 'inactive', 650.75, '["skin19"]'::jsonb, 1650.8),
(30, 'oscar.wilde@email.com', 'pass212', 'Oscar Wilde', 'player', 15, 12, 3, 30, 'active', 1300.00, '["skin20"]'::jsonb, 1810.4),
(32, 'patricia.highsmith@email.com', 'pass313', 'Patricia Highsmith', 'player', 18, 9, 3, 30, 'active', 1700.50, '["skin21", "skin22"]'::jsonb, 1870.6),
(34, 'quentin.tarantino@email.com', 'pass414', 'Quentin Tarantino', 'admin', 20, 7, 3, 30, 'active', 2050.25, '["skin23"]'::jsonb, 1910.3),
(36, 'rachel.green@email.com', 'pass515', 'Rachel Green', 'player', 12, 15, 3, 30, 'active', 950.75, '[]'::jsonb, 1760.7),
(38, 'steve.jobs@email.com', 'pass616', 'Steve Jobs', 'player', 16, 11, 3, 30, 'active', 1450.50, '["skin24", "skin25"]'::jsonb, 1830.2),
(40, 'tina.turner@email.com', 'pass717', 'Tina Turner', 'player', 14, 13, 3, 30, 'active', 1200.00, '["skin26"]'::jsonb, 1790.5),
(42, 'ursula.le.guin@email.com', 'pass818', 'Ursula Le Guin', 'player', 19, 8, 3, 30, 'active', 1900.75, '["skin27", "skin28"]'::jsonb, 1890.8),
(44, 'victor.hugo@email.com', 'pass919', 'Victor Hugo', 'player', 10, 17, 3, 30, 'inactive', 700.25, '["skin29"]'::jsonb, 1700.1),
(46, 'wendy.darling@email.com', 'pass020', 'Wendy Darling', 'player', 17, 10, 3, 30, 'active', 1550.50, '["skin30"]'::jsonb, 1840.4),
(48, 'xavier.musk@email.com', 'pass121', 'Xavier Musk', 'player', 13, 14, 3, 30, 'active', 1000.75, '[]'::jsonb, 1770.6),
(50, 'yoko.onno@email.com', 'pass222', 'Yoko Onno', 'player', 15, 12, 3, 30, 'active', 1350.00, '["skin31", "skin32"]'::jsonb, 1800.3),
(52, 'zoe.saldana@email.com', 'pass323', 'Zoe Saldana', 'player', 18, 9, 3, 30, 'active', 1750.25, '["skin33"]'::jsonb, 1860.7),
(54, 'adam.sandler@email.com', 'pass424', 'Adam Sandler', 'player', 11, 16, 3, 30, 'active', 900.50, '["skin34", "skin35"]'::jsonb, 1730.2),
(56, 'beth.harmon@email.com', 'pass525', 'Beth Harmon', 'player', 22, 5, 3, 30, 'active', 2250.75, '["skin36"]'::jsonb, 1940.5),
(58, 'carl.sagan@email.com', 'pass626', 'Carl Sagan', 'admin', 16, 11, 3, 30, 'active', 1480.00, '[]'::jsonb, 1820.8),
(60, 'donna.summers@email.com', 'pass727', 'Donna Summers', 'player', 14, 13, 3, 30, 'active', 1150.25, '["skin37", "skin38"]'::jsonb, 1780.1);

-- Reset sequence to continue from 61
SELECT setval('users_id_seq', 60);

-- Insert 2 currencies
INSERT INTO currencies (name, symbol) VALUES
('Gold Coins', 'GC'),
('Silver Pieces', 'SP');

-- Insert 2 shops
INSERT INTO shops (type, name) VALUES
('premium', 'Elite Chess Store'),
('standard', 'Classic Chess Shop');

-- Insert 30 categories
INSERT INTO categories (title, description) VALUES
('Chess Pieces', 'Various chess piece designs and styles'),
('Chess Boards', 'Different board materials and designs'),
('Chess Clocks', 'Timers and clocks for chess games'),
('Chess Sets', 'Complete chess sets with pieces and board'),
('Chess Books', 'Educational and strategy books'),
('Chess Software', 'Digital chess programs and apps'),
('Chess Accessories', 'Additional chess-related items'),
('Chess Art', 'Artistic chess-themed decorations'),
('Chess Apparel', 'Clothing with chess themes'),
('Chess Jewelry', 'Chess-inspired jewelry pieces'),
('Chess Collectibles', 'Rare and collectible chess items'),
('Chess Tournaments', 'Tournament entry and prizes'),
('Chess Lessons', 'Online and offline chess instruction'),
('Chess Analysis', 'Game analysis tools and services'),
('Chess Puzzles', 'Chess puzzle books and apps'),
('Chess History', 'Historical chess books and items'),
('Chess Memorabilia', 'Famous player memorabilia'),
('Chess Equipment', 'Professional chess equipment'),
('Chess Gifts', 'Gift items for chess enthusiasts'),
('Chess Decor', 'Home decoration with chess theme'),
('Chess Travel', 'Portable chess sets for travel'),
('Chess Electronics', 'Electronic chess boards and devices'),
('Chess Media', 'Chess DVDs, videos, and media'),
('Chess Events', 'Event tickets and passes'),
('Chess Subscriptions', 'Chess magazine and service subscriptions'),
('Chess Coaching', 'Personal chess coaching services'),
('Chess Analysis Tools', 'Software for game analysis'),
('Chess Databases', 'Chess game databases'),
('Chess Engines', 'Chess engine software'),
('Chess Communities', 'Membership to chess communities');

-- Insert 30 matches (only referencing PRIMARY users with even IDs: 2, 4, 6, ...)
-- Matches table on primary only has even IDs
INSERT INTO matches (id, moves, result, player_white, player_black, winner, start_time, end_time, used_skins, rating_change_white, rating_change_black) VALUES
(2, '["e4", "e5", "Nf3", "Nc6"]'::jsonb, 'white_wins', 2, 4, 2, '2025-12-12 10:00:00', '2025-12-12 10:45:00', '["classic_white", "classic_black"]'::jsonb, 15.5, -15.5),
(4, '["d4", "d5", "c4", "dxc4"]'::jsonb, 'black_wins', 6, 8, 8, '2025-12-12 11:00:00', '2025-12-12 11:50:00', '["modern_white", "modern_black"]'::jsonb, -18.2, 18.2),
(6, '["Nf3", "d5", "d4", "Nf6"]'::jsonb, 'draw', 10, 12, NULL, '2025-12-13 12:00:00', '2025-12-13 12:55:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
(8, '["e4", "c5", "Nf3", "d6"]'::jsonb, 'white_wins', 14, 16, 14, '2025-12-13 13:00:00', '2025-12-13 13:40:00', '["premium_white", "premium_black"]'::jsonb, 20.3, -20.3),
(10, '["d4", "Nf6", "c4", "e6"]'::jsonb, 'black_wins', 18, 20, 20, '2025-12-13 14:00:00', '2025-12-13 14:48:00', '["elite_white", "elite_black"]'::jsonb, -16.7, 16.7),
(12, '["e4", "e6", "d4", "d5"]'::jsonb, 'white_wins', 22, 24, 22, '2025-12-14 15:00:00', '2025-12-14 15:42:00', '["classic_white", "classic_black"]'::jsonb, 14.8, -14.8),
(14, '["Nf3", "c5", "c4", "Nc6"]'::jsonb, 'draw', 26, 28, NULL, '2025-12-14 16:00:00', '2025-12-14 16:50:00', '["modern_white", "modern_black"]'::jsonb, 0.0, 0.0),
(16, '["d4", "d5", "Nf3", "Nf6"]'::jsonb, 'black_wins', 30, 32, 32, '2025-12-15 17:00:00', '2025-12-15 17:45:00', '["vintage_white", "vintage_black"]'::jsonb, -19.1, 19.1),
(18, '["e4", "e5", "Bc4", "Nc6"]'::jsonb, 'white_wins', 34, 36, 34, '2025-12-15 18:00:00', '2025-12-15 18:38:00', '["premium_white", "premium_black"]'::jsonb, 17.4, -17.4),
(20, '["c4", "e5", "Nc3", "Nf6"]'::jsonb, 'white_wins', 38, 40, 38, '2025-12-15 19:00:00', '2025-12-15 19:44:00', '["elite_white", "elite_black"]'::jsonb, 13.6, -13.6),
(22, '["d4", "Nf6", "Nf3", "g6"]'::jsonb, 'black_wins', 42, 44, 44, '2025-12-15 10:00:00', '2025-12-15 10:47:00', '["classic_white", "classic_black"]'::jsonb, -15.9, 15.9),
(24, '["e4", "c6", "d4", "d5"]'::jsonb, 'white_wins', 46, 48, 46, '2025-12-15 11:00:00', '2025-12-15 11:41:00', '["modern_white", "modern_black"]'::jsonb, 18.7, -18.7),
(26, '["Nf3", "d5", "d4", "c6"]'::jsonb, 'draw', 50, 52, NULL, '2025-12-16 12:00:00', '2025-12-16 12:52:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
(28, '["e4", "e5", "Nf3", "Nc6", "Bb5"]'::jsonb, 'white_wins', 54, 56, 54, '2025-12-16 13:00:00', '2025-12-16 13:39:00', '["premium_white", "premium_black"]'::jsonb, 16.2, -16.2),
(30, '["d4", "d5", "c4", "e6"]'::jsonb, 'black_wins', 58, 60, 60, '2025-12-16 14:00:00', '2025-12-16 14:46:00', '["elite_white", "elite_black"]'::jsonb, -14.5, 14.5),
(32, '["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5"]'::jsonb, 'white_wins', 2, 6, 2, '2025-12-16 15:00:00', '2025-12-16 15:43:00', '["classic_white", "classic_black"]'::jsonb, 19.8, -19.8),
(34, '["d4", "Nf6", "c4", "g6"]'::jsonb, 'black_wins', 10, 14, 14, '2025-12-16 16:00:00', '2025-12-16 16:49:00', '["modern_white", "modern_black"]'::jsonb, -17.3, 17.3),
(36, '["Nf3", "c5", "e4", "Nc6"]'::jsonb, 'draw', 18, 22, NULL, '2025-12-16 17:00:00', '2025-12-16 17:51:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
(38, '["e4", "c5", "Nf3", "d6", "d4"]'::jsonb, 'white_wins', 26, 30, 26, '2025-12-16 18:00:00', '2025-12-16 18:37:00', '["premium_white", "premium_black"]'::jsonb, 15.1, -15.1),
(40, '["d4", "d5", "Nf3", "Nf6", "c4"]'::jsonb, 'white_wins', 34, 38, 34, '2025-12-16 19:00:00', '2025-12-16 19:45:00', '["elite_white", "elite_black"]'::jsonb, 12.4, -12.4),
(42, '["e4", "e6", "d4", "d5", "Nd2"]'::jsonb, 'black_wins', 42, 46, 46, '2025-12-17 10:00:00', '2025-12-17 10:48:00', '["classic_white", "classic_black"]'::jsonb, -18.6, 18.6),
(44, '["Nf3", "d5", "d4", "c6", "c4"]'::jsonb, 'white_wins', 50, 54, 50, '2025-12-17 11:00:00', '2025-12-17 11:40:00', '["modern_white", "modern_black"]'::jsonb, 14.9, -14.9),
(46, '["e4", "e5", "Bc4", "Nc6", "Qf3"]'::jsonb, 'draw', 58, 2, NULL, '2025-12-17 12:00:00', '2025-12-17 12:53:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
(48, '["c4", "e5", "Nc3", "Nf6", "Nf3"]'::jsonb, 'white_wins', 4, 8, 4, '2025-12-17 13:00:00', '2025-12-17 13:36:00', '["premium_white", "premium_black"]'::jsonb, 20.5, -20.5),
(50, '["d4", "Nf6", "Nf3", "g6", "c4"]'::jsonb, 'black_wins', 12, 16, 16, '2025-12-17 14:00:00', '2025-12-17 14:44:00', '["elite_white", "elite_black"]'::jsonb, -16.8, 16.8),
(52, '["e4", "c6", "d4", "d5", "exd5"]'::jsonb, 'white_wins', 20, 24, 20, '2025-12-17 15:00:00', '2025-12-17 15:41:00', '["classic_white", "classic_black"]'::jsonb, 17.2, -17.2),
(54, '["Nf3", "d5", "d4", "c6", "e3"]'::jsonb, 'draw', 28, 32, NULL, '2025-12-17 16:00:00', '2025-12-17 16:54:00', '["modern_white", "modern_black"]'::jsonb, 0.0, 0.0),
(56, '["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"]'::jsonb, 'white_wins', 36, 40, 36, '2025-12-17 17:00:00', '2025-12-17 17:38:00', '["vintage_white", "vintage_black"]'::jsonb, 13.7, -13.7),
(58, '["d4", "d5", "c4", "e6", "Nc3"]'::jsonb, 'black_wins', 44, 48, 48, '2025-12-17 18:00:00', '2025-12-17 18:47:00', '["premium_white", "premium_black"]'::jsonb, -19.4, 19.4),
(60, '["e4", "c5", "Nf3", "d6", "d4", "cxd4"]'::jsonb, 'white_wins', 52, 56, 52, '2025-12-17 19:00:00', '2025-12-17 19:42:00', '["elite_white", "elite_black"]'::jsonb, 11.6, -11.6);

-- Insert 30 items
INSERT INTO items (name, description, price, picture, status, category, shop_id) VALUES
('Royal King Piece', 'Premium gold-plated king piece', 299.99, '/images/royal_king.jpg', 'available', 1, 1),
('Elite Queen Piece', 'Luxury silver queen piece', 249.99, '/images/elite_queen.jpg', 'available', 1, 2),
('Classic Rook Set', 'Traditional wooden rook pieces', 89.99, '/images/classic_rook.jpg', 'available', 1, 1),
('Modern Bishop Pair', 'Contemporary design bishops', 79.99, '/images/modern_bishop.jpg', 'available', 1, 2),
('Knight Collection', 'Handcrafted knight pieces', 99.99, '/images/knight_collection.jpg', 'available', 1, 1),
('Marble Chess Board', 'Premium marble 8x8 board', 450.00, '/images/marble_board.jpg', 'available', 2, 2),
('Wooden Tournament Board', 'Professional tournament board', 120.00, '/images/wooden_board.jpg', 'available', 2, 1),
('Glass Chess Board', 'Elegant glass board design', 280.00, '/images/glass_board.jpg', 'available', 2, 2),
('Digital Chess Clock', 'Electronic tournament clock', 65.99, '/images/digital_clock.jpg', 'available', 3, 1),
('Analog Chess Timer', 'Classic analog timer', 45.99, '/images/analog_timer.jpg', 'available', 3, 2),
('Staunton Chess Set', 'Complete Staunton design set', 350.00, '/images/staunton_set.jpg', 'available', 4, 1),
('Travel Chess Set', 'Compact portable set', 25.99, '/images/travel_set.jpg', 'available', 4, 2),
('Chess Strategy Book', 'Advanced strategy guide', 29.99, '/images/strategy_book.jpg', 'available', 5, 1),
('Opening Theory Book', 'Comprehensive opening guide', 34.99, '/images/opening_book.jpg', 'available', 5, 2),
('Chess Master Software', 'Professional analysis software', 89.99, '/images/master_software.jpg', 'available', 6, 1),
('Chess App Premium', 'Mobile app premium version', 9.99, '/images/app_premium.jpg', 'available', 6, 2),
('Chess Piece Storage', 'Elegant storage box', 55.99, '/images/storage_box.jpg', 'available', 7, 1),
('Chess Board Cover', 'Protective board cover', 35.99, '/images/board_cover.jpg', 'available', 7, 2),
('Chess Wall Art', 'Decorative chess artwork', 125.00, '/images/wall_art.jpg', 'available', 8, 1),
('Chess T-Shirt', 'Official chess club t-shirt', 24.99, '/images/chess_tshirt.jpg', 'available', 9, 2),
('Chess Pendant', 'Silver chess piece pendant', 89.99, '/images/chess_pendant.jpg', 'available', 10, 1),
('Vintage Chess Set', 'Rare vintage collectible set', 850.00, '/images/vintage_set.jpg', 'available', 11, 2),
('Tournament Entry', 'Premium tournament entry', 150.00, '/images/tournament_entry.jpg', 'available', 12, 1),
('Online Chess Lessons', '10-hour lesson package', 199.99, '/images/lessons.jpg', 'available', 13, 2),
('Game Analysis Service', 'Professional game analysis', 49.99, '/images/analysis_service.jpg', 'available', 14, 1),
('Puzzle Collection Book', '1000 chess puzzles', 19.99, '/images/puzzle_book.jpg', 'available', 15, 2),
('Chess History Volume', 'Complete chess history', 44.99, '/images/history_book.jpg', 'available', 16, 1),
('Champion Memorabilia', 'Signed champion items', 299.99, '/images/memorabilia.jpg', 'available', 17, 2),
('Professional Clock', 'FIDE approved clock', 95.99, '/images/professional_clock.jpg', 'available', 18, 1),
('Chess Gift Set', 'Complete gift package', 175.00, '/images/gift_set.jpg', 'available', 19, 2);

-- Insert 30 transactions (only referencing PRIMARY users with even IDs: 2, 4, 6, ...)
-- Transactions table on primary only has even IDs
INSERT INTO transactions (id, player_id, purchased_item_id, price, currency, payment_id, created_at) VALUES
(2, 2, 1, 299.99, 1, 1001, '2024-01-10 09:00:00'),
(4, 4, 2, 249.99, 2, 1002, '2024-01-10 10:15:00'),
(6, 6, 3, 89.99, 1, 1003, '2024-01-10 11:30:00'),
(8, 8, 4, 79.99, 2, 1004, '2024-01-10 12:45:00'),
(10, 10, 5, 99.99, 1, 1005, '2024-01-10 14:00:00'),
(12, 12, 6, 450.00, 2, 1006, '2024-01-10 15:15:00'),
(14, 14, 7, 120.00, 1, 1007, '2024-01-10 16:30:00'),
(16, 16, 8, 280.00, 2, 1008, '2024-01-10 17:45:00'),
(18, 18, 9, 65.99, 1, 1009, '2024-01-11 09:00:00'),
(20, 20, 10, 45.99, 2, 1010, '2024-01-11 10:15:00'),
(22, 22, 11, 350.00, 1, 1011, '2024-01-11 11:30:00'),
(24, 24, 12, 25.99, 2, 1012, '2024-01-11 12:45:00'),
(26, 26, 13, 29.99, 1, 1013, '2024-01-11 14:00:00'),
(28, 28, 14, 34.99, 2, 1014, '2024-01-11 15:15:00'),
(30, 30, 15, 89.99, 1, 1015, '2024-01-11 16:30:00'),
(32, 32, 16, 9.99, 2, 1016, '2024-01-11 17:45:00'),
(34, 34, 17, 55.99, 1, 1017, '2024-01-12 09:00:00'),
(36, 36, 18, 35.99, 2, 1018, '2024-01-12 10:15:00'),
(38, 38, 19, 125.00, 1, 1019, '2024-01-12 11:30:00'),
(40, 40, 20, 24.99, 2, 1020, '2024-01-12 12:45:00'),
(42, 42, 21, 89.99, 1, 1021, '2024-01-12 14:00:00'),
(44, 44, 22, 850.00, 2, 1022, '2024-01-12 15:15:00'),
(46, 46, 23, 150.00, 1, 1023, '2024-01-12 16:30:00'),
(48, 48, 24, 199.99, 2, 1024, '2024-01-12 17:45:00'),
(50, 50, 25, 49.99, 1, 1025, '2024-01-13 09:00:00'),
(52, 52, 26, 19.99, 2, 1026, '2024-01-13 10:15:00'),
(54, 54, 27, 44.99, 1, 1027, '2024-01-13 11:30:00'),
(56, 56, 28, 299.99, 2, 1028, '2024-01-13 12:45:00'),
(58, 58, 29, 95.99, 1, 1029, '2024-01-13 14:00:00'),
(60, 60, 30, 175.00, 2, 1030, '2024-01-13 15:15:00');

-- Index for the metrics
CREATE INDEX idx_matches_start_time
ON matches (start_time);

CREATE INDEX idx_matches_players
ON matches (player_white, player_black);
