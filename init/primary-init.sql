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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Insert 30 users
INSERT INTO users (email, password, full_name, role, match_wins, match_losses, match_ties, total_matches, status, currency_balance, purchased_items, rating) VALUES
('alice.johnson@email.com', 'pass123', 'Alice Johnson', 'player', 15, 10, 5, 30, 'active', 1250.50, '["skin1", "skin2"]'::jsonb, 1850.5),
('bob.smith@email.com', 'pass456', 'Bob Smith', 'player', 20, 8, 2, 30, 'active', 2100.75, '["skin3"]'::jsonb, 1920.3),
('charlie.brown@email.com', 'pass789', 'Charlie Brown', 'admin', 12, 15, 3, 30, 'active', 980.25, '[]'::jsonb, 1750.8),
('diana.prince@email.com', 'pass101', 'Diana Prince', 'player', 18, 9, 3, 30, 'active', 1650.00, '["skin4", "skin5", "skin6"]'::jsonb, 1880.2),
('edward.norton@email.com', 'pass202', 'Edward Norton', 'player', 10, 18, 2, 30, 'inactive', 750.50, '["skin7"]'::jsonb, 1680.5),
('fiona.apple@email.com', 'pass303', 'Fiona Apple', 'player', 22, 5, 3, 30, 'active', 2300.25, '["skin8", "skin9"]'::jsonb, 1950.7),
('george.washington@email.com', 'pass404', 'George Washington', 'player', 14, 12, 4, 30, 'active', 1100.75, '[]'::jsonb, 1800.1),
('hannah.montana@email.com', 'pass505', 'Hannah Montana', 'player', 16, 11, 3, 30, 'active', 1400.50, '["skin10"]'::jsonb, 1820.4),
('isaac.newton@email.com', 'pass606', 'Isaac Newton', 'admin', 19, 8, 3, 30, 'active', 1950.00, '["skin11", "skin12"]'::jsonb, 1900.6),
('julia.roberts@email.com', 'pass707', 'Julia Roberts', 'player', 11, 16, 3, 30, 'active', 850.25, '["skin13"]'::jsonb, 1720.3),
('kevin.hart@email.com', 'pass808', 'Kevin Hart', 'player', 17, 10, 3, 30, 'active', 1500.75, '["skin14", "skin15"]'::jsonb, 1850.9),
('lisa.simpson@email.com', 'pass909', 'Lisa Simpson', 'player', 13, 14, 3, 30, 'active', 1050.50, '[]'::jsonb, 1780.2),
('michael.jackson@email.com', 'pass010', 'Michael Jackson', 'player', 21, 6, 3, 30, 'active', 2200.25, '["skin16", "skin17", "skin18"]'::jsonb, 1930.5),
('nancy.drew@email.com', 'pass111', 'Nancy Drew', 'player', 9, 19, 2, 30, 'inactive', 650.75, '["skin19"]'::jsonb, 1650.8),
('oscar.wilde@email.com', 'pass212', 'Oscar Wilde', 'player', 15, 12, 3, 30, 'active', 1300.00, '["skin20"]'::jsonb, 1810.4),
('patricia.highsmith@email.com', 'pass313', 'Patricia Highsmith', 'player', 18, 9, 3, 30, 'active', 1700.50, '["skin21", "skin22"]'::jsonb, 1870.6),
('quentin.tarantino@email.com', 'pass414', 'Quentin Tarantino', 'admin', 20, 7, 3, 30, 'active', 2050.25, '["skin23"]'::jsonb, 1910.3),
('rachel.green@email.com', 'pass515', 'Rachel Green', 'player', 12, 15, 3, 30, 'active', 950.75, '[]'::jsonb, 1760.7),
('steve.jobs@email.com', 'pass616', 'Steve Jobs', 'player', 16, 11, 3, 30, 'active', 1450.50, '["skin24", "skin25"]'::jsonb, 1830.2),
('tina.turner@email.com', 'pass717', 'Tina Turner', 'player', 14, 13, 3, 30, 'active', 1200.00, '["skin26"]'::jsonb, 1790.5),
('ursula.le.guin@email.com', 'pass818', 'Ursula Le Guin', 'player', 19, 8, 3, 30, 'active', 1900.75, '["skin27", "skin28"]'::jsonb, 1890.8),
('victor.hugo@email.com', 'pass919', 'Victor Hugo', 'player', 10, 17, 3, 30, 'inactive', 700.25, '["skin29"]'::jsonb, 1700.1),
('wendy.darling@email.com', 'pass020', 'Wendy Darling', 'player', 17, 10, 3, 30, 'active', 1550.50, '["skin30"]'::jsonb, 1840.4),
('xavier.musk@email.com', 'pass121', 'Xavier Musk', 'player', 13, 14, 3, 30, 'active', 1000.75, '[]'::jsonb, 1770.6),
('yoko.onno@email.com', 'pass222', 'Yoko Onno', 'player', 15, 12, 3, 30, 'active', 1350.00, '["skin31", "skin32"]'::jsonb, 1800.3),
('zoe.saldana@email.com', 'pass323', 'Zoe Saldana', 'player', 18, 9, 3, 30, 'active', 1750.25, '["skin33"]'::jsonb, 1860.7),
('adam.sandler@email.com', 'pass424', 'Adam Sandler', 'player', 11, 16, 3, 30, 'active', 900.50, '["skin34", "skin35"]'::jsonb, 1730.2),
('beth.harmon@email.com', 'pass525', 'Beth Harmon', 'player', 22, 5, 3, 30, 'active', 2250.75, '["skin36"]'::jsonb, 1940.5),
('carl.sagan@email.com', 'pass626', 'Carl Sagan', 'admin', 16, 11, 3, 30, 'active', 1480.00, '[]'::jsonb, 1820.8),
('donna.summers@email.com', 'pass727', 'Donna Summers', 'player', 14, 13, 3, 30, 'active', 1150.25, '["skin37", "skin38"]'::jsonb, 1780.1);

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

-- Insert 30 matches
INSERT INTO matches (moves, result, player_white, player_black, winner, start_time, end_time, used_skins, rating_change_white, rating_change_black) VALUES
('["e4", "e5", "Nf3", "Nc6"]'::jsonb, 'white_wins', 1, 2, 1, '2024-01-15 10:00:00', '2024-01-15 10:45:00', '["classic_white", "classic_black"]'::jsonb, 15.5, -15.5),
('["d4", "d5", "c4", "dxc4"]'::jsonb, 'black_wins', 3, 4, 4, '2024-01-15 11:00:00', '2024-01-15 11:50:00', '["modern_white", "modern_black"]'::jsonb, -18.2, 18.2),
('["Nf3", "d5", "d4", "Nf6"]'::jsonb, 'draw', 5, 6, NULL, '2024-01-15 12:00:00', '2024-01-15 12:55:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
('["e4", "c5", "Nf3", "d6"]'::jsonb, 'white_wins', 7, 8, 7, '2024-01-15 13:00:00', '2024-01-15 13:40:00', '["premium_white", "premium_black"]'::jsonb, 20.3, -20.3),
('["d4", "Nf6", "c4", "e6"]'::jsonb, 'black_wins', 9, 10, 10, '2024-01-15 14:00:00', '2024-01-15 14:48:00', '["elite_white", "elite_black"]'::jsonb, -16.7, 16.7),
('["e4", "e6", "d4", "d5"]'::jsonb, 'white_wins', 11, 12, 11, '2024-01-15 15:00:00', '2024-01-15 15:42:00', '["classic_white", "classic_black"]'::jsonb, 14.8, -14.8),
('["Nf3", "c5", "c4", "Nc6"]'::jsonb, 'draw', 13, 14, NULL, '2024-01-15 16:00:00', '2024-01-15 16:50:00', '["modern_white", "modern_black"]'::jsonb, 0.0, 0.0),
('["d4", "d5", "Nf3", "Nf6"]'::jsonb, 'black_wins', 15, 16, 16, '2024-01-15 17:00:00', '2024-01-15 17:45:00', '["vintage_white", "vintage_black"]'::jsonb, -19.1, 19.1),
('["e4", "e5", "Bc4", "Nc6"]'::jsonb, 'white_wins', 17, 18, 17, '2024-01-15 18:00:00', '2024-01-15 18:38:00', '["premium_white", "premium_black"]'::jsonb, 17.4, -17.4),
('["c4", "e5", "Nc3", "Nf6"]'::jsonb, 'white_wins', 19, 20, 19, '2024-01-15 19:00:00', '2024-01-15 19:44:00', '["elite_white", "elite_black"]'::jsonb, 13.6, -13.6),
('["d4", "Nf6", "Nf3", "g6"]'::jsonb, 'black_wins', 21, 22, 22, '2024-01-16 10:00:00', '2024-01-16 10:47:00', '["classic_white", "classic_black"]'::jsonb, -15.9, 15.9),
('["e4", "c6", "d4", "d5"]'::jsonb, 'white_wins', 23, 24, 23, '2024-01-16 11:00:00', '2024-01-16 11:41:00', '["modern_white", "modern_black"]'::jsonb, 18.7, -18.7),
('["Nf3", "d5", "d4", "c6"]'::jsonb, 'draw', 25, 26, NULL, '2024-01-16 12:00:00', '2024-01-16 12:52:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
('["e4", "e5", "Nf3", "Nc6", "Bb5"]'::jsonb, 'white_wins', 27, 28, 27, '2024-01-16 13:00:00', '2024-01-16 13:39:00', '["premium_white", "premium_black"]'::jsonb, 16.2, -16.2),
('["d4", "d5", "c4", "e6"]'::jsonb, 'black_wins', 29, 30, 30, '2024-01-16 14:00:00', '2024-01-16 14:46:00', '["elite_white", "elite_black"]'::jsonb, -14.5, 14.5),
('["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5"]'::jsonb, 'white_wins', 1, 3, 1, '2024-01-16 15:00:00', '2024-01-16 15:43:00', '["classic_white", "classic_black"]'::jsonb, 19.8, -19.8),
('["d4", "Nf6", "c4", "g6"]'::jsonb, 'black_wins', 5, 7, 7, '2024-01-16 16:00:00', '2024-01-16 16:49:00', '["modern_white", "modern_black"]'::jsonb, -17.3, 17.3),
('["Nf3", "c5", "e4", "Nc6"]'::jsonb, 'draw', 9, 11, NULL, '2024-01-16 17:00:00', '2024-01-16 17:51:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
('["e4", "c5", "Nf3", "d6", "d4"]'::jsonb, 'white_wins', 13, 15, 13, '2024-01-16 18:00:00', '2024-01-16 18:37:00', '["premium_white", "premium_black"]'::jsonb, 15.1, -15.1),
('["d4", "d5", "Nf3", "Nf6", "c4"]'::jsonb, 'white_wins', 17, 19, 17, '2024-01-16 19:00:00', '2024-01-16 19:45:00', '["elite_white", "elite_black"]'::jsonb, 12.4, -12.4),
('["e4", "e6", "d4", "d5", "Nd2"]'::jsonb, 'black_wins', 21, 23, 23, '2024-01-17 10:00:00', '2024-01-17 10:48:00', '["classic_white", "classic_black"]'::jsonb, -18.6, 18.6),
('["Nf3", "d5", "d4", "c6", "c4"]'::jsonb, 'white_wins', 25, 27, 25, '2024-01-17 11:00:00', '2024-01-17 11:40:00', '["modern_white", "modern_black"]'::jsonb, 14.9, -14.9),
('["e4", "e5", "Bc4", "Nc6", "Qf3"]'::jsonb, 'draw', 29, 1, NULL, '2024-01-17 12:00:00', '2024-01-17 12:53:00', '["vintage_white", "vintage_black"]'::jsonb, 0.0, 0.0),
('["c4", "e5", "Nc3", "Nf6", "Nf3"]'::jsonb, 'white_wins', 2, 4, 2, '2024-01-17 13:00:00', '2024-01-17 13:36:00', '["premium_white", "premium_black"]'::jsonb, 20.5, -20.5),
('["d4", "Nf6", "Nf3", "g6", "c4"]'::jsonb, 'black_wins', 6, 8, 8, '2024-01-17 14:00:00', '2024-01-17 14:44:00', '["elite_white", "elite_black"]'::jsonb, -16.8, 16.8),
('["e4", "c6", "d4", "d5", "exd5"]'::jsonb, 'white_wins', 10, 12, 10, '2024-01-17 15:00:00', '2024-01-17 15:41:00', '["classic_white", "classic_black"]'::jsonb, 17.2, -17.2),
('["Nf3", "d5", "d4", "c6", "e3"]'::jsonb, 'draw', 14, 16, NULL, '2024-01-17 16:00:00', '2024-01-17 16:54:00', '["modern_white", "modern_black"]'::jsonb, 0.0, 0.0),
('["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"]'::jsonb, 'white_wins', 18, 20, 18, '2024-01-17 17:00:00', '2024-01-17 17:38:00', '["vintage_white", "vintage_black"]'::jsonb, 13.7, -13.7),
('["d4", "d5", "c4", "e6", "Nc3"]'::jsonb, 'black_wins', 22, 24, 24, '2024-01-17 18:00:00', '2024-01-17 18:47:00', '["premium_white", "premium_black"]'::jsonb, -19.4, 19.4),
('["e4", "c5", "Nf3", "d6", "d4", "cxd4"]'::jsonb, 'white_wins', 26, 28, 26, '2024-01-17 19:00:00', '2024-01-17 19:42:00', '["elite_white", "elite_black"]'::jsonb, 11.6, -11.6);

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

-- Insert 30 transactions
INSERT INTO transactions (player_id, purchased_item_id, price, currency, payment_id, created_at) VALUES
(1, 1, 299.99, 1, 1001, '2024-01-10 09:00:00'),
(2, 2, 249.99, 2, 1002, '2024-01-10 10:15:00'),
(3, 3, 89.99, 1, 1003, '2024-01-10 11:30:00'),
(4, 4, 79.99, 2, 1004, '2024-01-10 12:45:00'),
(5, 5, 99.99, 1, 1005, '2024-01-10 14:00:00'),
(6, 6, 450.00, 2, 1006, '2024-01-10 15:15:00'),
(7, 7, 120.00, 1, 1007, '2024-01-10 16:30:00'),
(8, 8, 280.00, 2, 1008, '2024-01-10 17:45:00'),
(9, 9, 65.99, 1, 1009, '2024-01-11 09:00:00'),
(10, 10, 45.99, 2, 1010, '2024-01-11 10:15:00'),
(11, 11, 350.00, 1, 1011, '2024-01-11 11:30:00'),
(12, 12, 25.99, 2, 1012, '2024-01-11 12:45:00'),
(13, 13, 29.99, 1, 1013, '2024-01-11 14:00:00'),
(14, 14, 34.99, 2, 1014, '2024-01-11 15:15:00'),
(15, 15, 89.99, 1, 1015, '2024-01-11 16:30:00'),
(16, 16, 9.99, 2, 1016, '2024-01-11 17:45:00'),
(17, 17, 55.99, 1, 1017, '2024-01-12 09:00:00'),
(18, 18, 35.99, 2, 1018, '2024-01-12 10:15:00'),
(19, 19, 125.00, 1, 1019, '2024-01-12 11:30:00'),
(20, 20, 24.99, 2, 1020, '2024-01-12 12:45:00'),
(21, 21, 89.99, 1, 1021, '2024-01-12 14:00:00'),
(22, 22, 850.00, 2, 1022, '2024-01-12 15:15:00'),
(23, 23, 150.00, 1, 1023, '2024-01-12 16:30:00'),
(24, 24, 199.99, 2, 1024, '2024-01-12 17:45:00'),
(25, 25, 49.99, 1, 1025, '2024-01-13 09:00:00'),
(26, 26, 19.99, 2, 1026, '2024-01-13 10:15:00'),
(27, 27, 44.99, 1, 1027, '2024-01-13 11:30:00'),
(28, 28, 299.99, 2, 1028, '2024-01-13 12:45:00'),
(29, 29, 95.99, 1, 1029, '2024-01-13 14:00:00'),
(30, 30, 175.00, 2, 1030, '2024-01-13 15:15:00');

