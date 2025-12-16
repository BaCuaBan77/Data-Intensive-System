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

-- Insert 30 users with odd IDs (ID % 2 = 1) -> SHARD shard
-- Sharding rule: User ID % 2 = 0 -> PRIMARY, User ID % 2 = 1 -> SHARD
INSERT INTO users (id, email, password, full_name, role, match_wins, match_losses, match_ties, total_matches, status, currency_balance, purchased_items, rating) VALUES
(1, 'john.doe@example.com', 'secure123', 'John Doe', 'player', 25, 3, 2, 30, 'active', 3200.75, '["premium_skin1", "premium_skin2", "premium_skin3"]'::jsonb, 2100.2),
(3, 'jane.smith@example.com', 'secure456', 'Jane Smith', 'player', 18, 9, 3, 30, 'active', 1950.50, '["premium_skin4"]'::jsonb, 1980.5),
(5, 'robert.wilson@example.com', 'secure789', 'Robert Wilson', 'admin', 14, 13, 3, 30, 'active', 1450.25, '[]'::jsonb, 1850.8),
(7, 'mary.jones@example.com', 'secure101', 'Mary Jones', 'player', 20, 7, 3, 30, 'active', 2250.00, '["premium_skin5", "premium_skin6"]'::jsonb, 2020.3),
(9, 'william.brown@example.com', 'secure202', 'William Brown', 'player', 8, 20, 2, 30, 'inactive', 550.75, '["premium_skin7"]'::jsonb, 1620.6),
(11, 'elizabeth.taylor@example.com', 'secure303', 'Elizabeth Taylor', 'player', 24, 4, 2, 30, 'active', 2800.50, '["premium_skin8", "premium_skin9", "premium_skin10"]'::jsonb, 2080.4),
(13, 'james.davis@example.com', 'secure404', 'James Davis', 'player', 16, 11, 3, 30, 'active', 1750.25, '[]'::jsonb, 1920.7),
(15, 'sarah.miller@example.com', 'secure505', 'Sarah Miller', 'player', 19, 8, 3, 30, 'active', 2100.00, '["premium_skin11"]'::jsonb, 1990.2),
(17, 'thomas.anderson@example.com', 'secure606', 'Thomas Anderson', 'admin', 22, 5, 3, 30, 'active', 2600.75, '["premium_skin12", "premium_skin13"]'::jsonb, 2050.9),
(19, 'emily.moore@example.com', 'secure707', 'Emily Moore', 'player', 12, 15, 3, 30, 'active', 1250.50, '["premium_skin14"]'::jsonb, 1820.1),
(21, 'david.jackson@example.com', 'secure808', 'David Jackson', 'player', 17, 10, 3, 30, 'active', 1900.25, '["premium_skin15", "premium_skin16"]'::jsonb, 1940.6),
(23, 'jennifer.white@example.com', 'secure909', 'Jennifer White', 'player', 15, 12, 3, 30, 'active', 1650.00, '[]'::jsonb, 1880.3),
(25, 'richard.harris@example.com', 'secure010', 'Richard Harris', 'player', 23, 5, 2, 30, 'active', 2700.75, '["premium_skin17", "premium_skin18", "premium_skin19"]'::jsonb, 2070.5),
(27, 'linda.martin@example.com', 'secure111', 'Linda Martin', 'player', 7, 21, 2, 30, 'inactive', 450.50, '["premium_skin20"]'::jsonb, 1580.8),
(29, 'charles.thompson@example.com', 'secure212', 'Charles Thompson', 'player', 16, 11, 3, 30, 'active', 1800.25, '["premium_skin21"]'::jsonb, 1930.4),
(31, 'patricia.garcia@example.com', 'secure313', 'Patricia Garcia', 'player', 21, 6, 3, 30, 'active', 2450.00, '["premium_skin22", "premium_skin23"]'::jsonb, 2030.7),
(33, 'daniel.martinez@example.com', 'secure414', 'Daniel Martinez', 'admin', 19, 8, 3, 30, 'active', 2200.75, '["premium_skin24"]'::jsonb, 2000.2),
(35, 'susan.robinson@example.com', 'secure515', 'Susan Robinson', 'player', 13, 14, 3, 30, 'active', 1400.50, '[]'::jsonb, 1840.9),
(37, 'matthew.clark@example.com', 'secure616', 'Matthew Clark', 'player', 18, 9, 3, 30, 'active', 2050.25, '["premium_skin25", "premium_skin26"]'::jsonb, 1970.1),
(39, 'nancy.rodriguez@example.com', 'secure717', 'Nancy Rodriguez', 'player', 15, 12, 3, 30, 'active', 1700.00, '["premium_skin27"]'::jsonb, 1890.6),
(41, 'anthony.lewis@example.com', 'secure818', 'Anthony Lewis', 'player', 20, 7, 3, 30, 'active', 2350.75, '["premium_skin28", "premium_skin29"]'::jsonb, 2010.3),
(43, 'karen.lee@example.com', 'secure919', 'Karen Lee', 'player', 9, 18, 3, 30, 'inactive', 600.50, '["premium_skin30"]'::jsonb, 1680.5),
(45, 'mark.walker@example.com', 'secure020', 'Mark Walker', 'player', 17, 10, 3, 30, 'active', 1950.25, '["premium_skin31"]'::jsonb, 1950.8),
(47, 'betty.hall@example.com', 'secure121', 'Betty Hall', 'player', 14, 13, 3, 30, 'active', 1550.00, '[]'::jsonb, 1860.2),
(49, 'paul.allen@example.com', 'secure222', 'Paul Allen', 'player', 16, 11, 3, 30, 'active', 1850.75, '["premium_skin32", "premium_skin33"]'::jsonb, 1910.4),
(51, 'helen.young@example.com', 'secure323', 'Helen Young', 'player', 22, 5, 3, 30, 'active', 2650.50, '["premium_skin34"]'::jsonb, 2060.7),
(53, 'andrew.king@example.com', 'secure424', 'Andrew King', 'player', 11, 16, 3, 30, 'active', 1150.25, '["premium_skin35", "premium_skin36"]'::jsonb, 1790.1),
(55, 'sandra.wright@example.com', 'secure525', 'Sandra Wright', 'player', 26, 2, 2, 30, 'active', 3100.00, '["premium_skin37"]'::jsonb, 2110.5),
(57, 'joseph.lopez@example.com', 'secure626', 'Joseph Lopez', 'admin', 17, 10, 3, 30, 'active', 2000.75, '[]'::jsonb, 1960.9),
(59, 'donna.hill@example.com', 'secure727', 'Donna Hill', 'player', 15, 12, 3, 30, 'active', 1600.50, '["premium_skin38", "premium_skin39"]'::jsonb, 1870.3);

-- Reset sequence to continue from 61
SELECT setval('users_id_seq', 60);

-- Insert 2 currencies (same as primary)
INSERT INTO currencies (name, symbol) VALUES
('Gold Coins', 'GC'),
('Silver Pieces', 'SP');

-- Insert 2 shops (same as primary)
INSERT INTO shops (type, name) VALUES
('premium', 'Elite Chess Store'),
('standard', 'Classic Chess Shop');

-- Insert 30 categories (same as primary)
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

-- Insert 30 matches (only referencing SHARD users with odd IDs: 1, 3, 5, ...)
-- Matches table on shard only has odd IDs
INSERT INTO matches (id, moves, result, player_white, player_black, winner, start_time, end_time, used_skins, rating_change_white, rating_change_black) VALUES
(1, '["e4", "e5", "Nf3", "Nc6", "Bb5"]'::jsonb, 'white_wins', 1, 3, 1, '2025-11-02 08:00:00', '2025-11-02 08:50:00', '["pro_white", "pro_black"]'::jsonb, 22.3, -22.3),
(3, '["d4", "d5", "c4", "dxc4", "e4"]'::jsonb, 'black_wins', 5, 7, 7, '2025-11-03 09:00:00', '2025-11-03 09:55:00', '["master_white", "master_black"]'::jsonb, -24.1, 24.1),
(5, '["Nf3", "d5", "d4", "Nf6", "c4"]'::jsonb, 'draw', 9, 11, NULL, '2025-11-30 10:00:00', '2025-11-30 10:58:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
(7, '["e4", "c5", "Nf3", "d6", "d4", "cxd4"]'::jsonb, 'white_wins', 13, 15, 13, '2025-12-10 11:00:00', '2025-12-10 11:43:00', '["elite_white", "elite_black"]'::jsonb, 19.7, -19.7),
(9, '["d4", "Nf6", "c4", "e6", "Nc3"]'::jsonb, 'black_wins', 17, 19, 19, '2025-12-10 12:00:00', '2025-12-10 12:51:00', '["pro_white", "pro_black"]'::jsonb, -21.5, 21.5),
(11, '["e4", "e6", "d4", "d5", "Nd2", "Nf6"]'::jsonb, 'white_wins', 21, 23, 21, '2025-12-10 13:00:00', '2025-12-10 13:45:00', '["master_white", "master_black"]'::jsonb, 18.4, -18.4),
(13, '["Nf3", "c5", "c4", "Nc6", "e3"]'::jsonb, 'draw', 25, 27, NULL, '2025-12-10 14:00:00', '2025-12-10 14:59:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
(15, '["d4", "d5", "Nf3", "Nf6", "c4", "e6"]'::jsonb, 'black_wins', 29, 31, 31, '2025-12-10 15:00:00', '2025-12-10 15:48:00', '["elite_white", "elite_black"]'::jsonb, -23.2, 23.2),
(17, '["e4", "e5", "Bc4", "Nc6", "Qf3", "Nf6"]'::jsonb, 'white_wins', 33, 35, 33, '2025-12-10 16:00:00', '2025-12-10 16:41:00', '["pro_white", "pro_black"]'::jsonb, 17.6, -17.6),
(19, '["c4", "e5", "Nc3", "Nf6", "Nf3", "Nc6"]'::jsonb, 'white_wins', 37, 39, 37, '2025-12-10 17:00:00', '2025-12-10 17:47:00', '["master_white", "master_black"]'::jsonb, 16.8, -16.8),
(21, '["d4", "Nf6", "Nf3", "g6", "c4", "Bg7"]'::jsonb, 'black_wins', 41, 43, 43, '2025-12-11 08:00:00', '2025-12-11 08:52:00', '["champion_white", "champion_black"]'::jsonb, -20.9, 20.9),
(23, '["e4", "c6", "d4", "d5", "exd5", "cxd5"]'::jsonb, 'white_wins', 45, 47, 45, '2025-12-11 09:00:00', '2025-12-11 09:44:00', '["elite_white", "elite_black"]'::jsonb, 15.3, -15.3),
(25, '["Nf3", "d5", "d4", "c6", "c4", "e6"]'::jsonb, 'draw', 49, 51, NULL, '2025-12-11 10:00:00', '2025-12-11 10:57:00', '["pro_white", "pro_black"]'::jsonb, 0.0, 0.0),
(27, '["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4"]'::jsonb, 'white_wins', 53, 55, 53, '2025-12-11 11:00:00', '2025-12-11 11:42:00', '["master_white", "master_black"]'::jsonb, 14.5, -14.5),
(29, '["d4", "d5", "c4", "e6", "Nc3", "Nf6"]'::jsonb, 'black_wins', 57, 59, 59, '2025-12-11 12:00:00', '2025-12-11 12:49:00', '["champion_white", "champion_black"]'::jsonb, -22.7, 22.7),
(31, '["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4"]'::jsonb, 'white_wins', 1, 5, 1, '2025-12-11 13:00:00', '2025-12-11 13:46:00', '["elite_white", "elite_black"]'::jsonb, 21.8, -21.8),
(33, '["d4", "Nf6", "c4", "g6", "Nc3", "Bg7"]'::jsonb, 'black_wins', 9, 13, 13, '2025-12-11 14:00:00', '2025-12-11 14:53:00', '["pro_white", "pro_black"]'::jsonb, -19.6, 19.6),
(35, '["Nf3", "c5", "e4", "Nc6", "d4", "cxd4"]'::jsonb, 'draw', 17, 21, NULL, '2025-12-11 15:00:00', '2025-12-11 15:56:00', '["master_white", "master_black"]'::jsonb, 0.0, 0.0),
(37, '["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4"]'::jsonb, 'white_wins', 25, 29, 25, '2025-12-11 16:00:00', '2025-12-11 16:40:00', '["champion_white", "champion_black"]'::jsonb, 13.2, -13.2),
(39, '["d4", "d5", "Nf3", "Nf6", "c4", "e6", "Nc3"]'::jsonb, 'white_wins', 33, 37, 33, '2025-12-11 17:00:00', '2025-12-11 17:48:00', '["elite_white", "elite_black"]'::jsonb, 11.9, -11.9),
(41, '["e4", "e6", "d4", "d5", "Nd2", "Nf6", "e5"]'::jsonb, 'black_wins', 41, 45, 45, '2025-12-12 08:00:00', '2025-12-12 08:54:00', '["pro_white", "pro_black"]'::jsonb, -18.1, 18.1),
(43, '["Nf3", "d5", "d4", "c6", "c4", "e6", "e3"]'::jsonb, 'white_wins', 49, 53, 49, '2025-12-12 09:00:00', '2025-12-12 09:43:00', '["master_white", "master_black"]'::jsonb, 10.7, -10.7),
(45, '["e4", "e5", "Bc4", "Nc6", "Qf3", "Nf6", "Nc3"]'::jsonb, 'draw', 57, 1, NULL, '2025-12-12 10:00:00', '2025-12-12 10:55:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
(47, '["c4", "e5", "Nc3", "Nf6", "Nf3", "Nc6", "d4"]'::jsonb, 'white_wins', 3, 7, 3, '2025-12-12 11:00:00', '2025-12-12 11:39:00', '["elite_white", "elite_black"]'::jsonb, 25.4, -25.4),
(49, '["d4", "Nf6", "Nf3", "g6", "c4", "Bg7", "Nc3"]'::jsonb, 'black_wins', 11, 15, 15, '2025-12-12 12:00:00', '2025-12-12 12:50:00', '["pro_white", "pro_black"]'::jsonb, -17.3, 17.3),
(51, '["e4", "c6", "d4", "d5", "exd5", "cxd5", "c4"]'::jsonb, 'white_wins', 19, 23, 19, '2025-12-12 13:00:00', '2025-12-12 13:44:00', '["master_white", "master_black"]'::jsonb, 9.8, -9.8),
(53, '["Nf3", "d5", "d4", "c6", "e3", "Nf6"]'::jsonb, 'draw', 27, 31, NULL, '2025-12-12 14:00:00', '2025-12-12 14:58:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
(55, '["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6"]'::jsonb, 'white_wins', 35, 39, 35, '2025-12-12 15:00:00', '2025-12-12 15:41:00', '["elite_white", "elite_black"]'::jsonb, 8.4, -8.4),
(57, '["d4", "d5", "c4", "e6", "Nc3", "Nf6", "cxd5"]'::jsonb, 'black_wins', 43, 47, 47, '2025-12-12 16:00:00', '2025-12-12 16:51:00', '["pro_white", "pro_black"]'::jsonb, -16.2, 16.2),
(59, '["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6"]'::jsonb, 'white_wins', 51, 55, 51, '2025-12-12 17:00:00', '2025-12-12 17:45:00', '["master_white", "master_black"]'::jsonb, 7.1, -7.1);

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

-- Insert 30 transactions (only referencing SHARD users with odd IDs: 1, 3, 5, ...)
-- Transactions table on shard only has odd IDs
INSERT INTO transactions (id, player_id, purchased_item_id, price, currency, payment_id, created_at) VALUES
(1, 1, 1, 599.99, 1, 2001, '2024-02-05 08:00:00'),
(3, 3, 2, 499.99, 2, 2002, '2024-02-05 09:15:00'),
(5, 5, 3, 189.99, 1, 2003, '2024-02-05 10:30:00'),
(7, 7, 4, 159.99, 2, 2004, '2024-02-05 11:45:00'),
(9, 9, 5, 199.99, 1, 2005, '2024-02-05 13:00:00'),
(11, 11, 6, 850.00, 2, 2006, '2024-02-05 14:15:00'),
(13, 13, 7, 220.00, 1, 2007, '2024-02-05 15:30:00'),
(15, 15, 8, 480.00, 2, 2008, '2024-02-05 16:45:00'),
(17, 17, 9, 125.99, 1, 2009, '2024-02-06 08:00:00'),
(19, 19, 10, 85.99, 2, 2010, '2024-02-06 09:15:00'),
(21, 21, 11, 650.00, 1, 2011, '2024-02-06 10:30:00'),
(23, 23, 12, 45.99, 2, 2012, '2024-02-06 11:45:00'),
(25, 25, 13, 49.99, 1, 2013, '2024-02-06 13:00:00'),
(27, 27, 14, 54.99, 2, 2014, '2024-02-06 14:15:00'),
(29, 29, 15, 179.99, 1, 2015, '2024-02-06 15:30:00'),
(31, 31, 16, 19.99, 2, 2016, '2024-02-06 16:45:00'),
(33, 33, 17, 105.99, 1, 2017, '2024-02-07 08:00:00'),
(35, 35, 18, 65.99, 2, 2018, '2024-02-07 09:15:00'),
(37, 37, 19, 225.00, 1, 2019, '2024-02-07 10:30:00'),
(39, 39, 20, 44.99, 2, 2020, '2024-02-07 11:45:00'),
(41, 41, 21, 179.99, 1, 2021, '2024-02-07 13:00:00'),
(43, 43, 22, 1500.00, 2, 2022, '2024-02-07 14:15:00'),
(45, 45, 23, 300.00, 1, 2023, '2024-02-07 15:30:00'),
(47, 47, 24, 399.99, 2, 2024, '2024-02-07 16:45:00'),
(49, 49, 25, 99.99, 1, 2025, '2024-02-08 08:00:00'),
(51, 51, 26, 39.99, 2, 2026, '2024-02-08 09:15:00'),
(53, 53, 27, 64.99, 1, 2027, '2024-02-08 10:30:00'),
(55, 55, 28, 599.99, 2, 2028, '2024-02-08 11:45:00'),
(57, 57, 29, 195.99, 1, 2029, '2024-02-08 13:00:00'),
(59, 59, 30, 325.00, 2, 2030, '2024-02-08 14:15:00');

-- Index for the metrics
CREATE INDEX idx_matches_start_time
ON matches (start_time);

CREATE INDEX idx_matches_players
ON matches (player_white, player_black);
