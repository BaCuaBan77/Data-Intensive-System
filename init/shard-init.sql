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
('john.doe@example.com', 'secure123', 'John Doe', 'player', 25, 3, 2, 30, 'active', 3200.75, '["premium_skin1", "premium_skin2", "premium_skin3"]'::jsonb, 2100.2),
('jane.smith@example.com', 'secure456', 'Jane Smith', 'player', 18, 9, 3, 30, 'active', 1950.50, '["premium_skin4"]'::jsonb, 1980.5),
('robert.wilson@example.com', 'secure789', 'Robert Wilson', 'admin', 14, 13, 3, 30, 'active', 1450.25, '[]'::jsonb, 1850.8),
('mary.jones@example.com', 'secure101', 'Mary Jones', 'player', 20, 7, 3, 30, 'active', 2250.00, '["premium_skin5", "premium_skin6"]'::jsonb, 2020.3),
('william.brown@example.com', 'secure202', 'William Brown', 'player', 8, 20, 2, 30, 'inactive', 550.75, '["premium_skin7"]'::jsonb, 1620.6),
('elizabeth.taylor@example.com', 'secure303', 'Elizabeth Taylor', 'player', 24, 4, 2, 30, 'active', 2800.50, '["premium_skin8", "premium_skin9", "premium_skin10"]'::jsonb, 2080.4),
('james.davis@example.com', 'secure404', 'James Davis', 'player', 16, 11, 3, 30, 'active', 1750.25, '[]'::jsonb, 1920.7),
('sarah.miller@example.com', 'secure505', 'Sarah Miller', 'player', 19, 8, 3, 30, 'active', 2100.00, '["premium_skin11"]'::jsonb, 1990.2),
('thomas.anderson@example.com', 'secure606', 'Thomas Anderson', 'admin', 22, 5, 3, 30, 'active', 2600.75, '["premium_skin12", "premium_skin13"]'::jsonb, 2050.9),
('emily.moore@example.com', 'secure707', 'Emily Moore', 'player', 12, 15, 3, 30, 'active', 1250.50, '["premium_skin14"]'::jsonb, 1820.1),
('david.jackson@example.com', 'secure808', 'David Jackson', 'player', 17, 10, 3, 30, 'active', 1900.25, '["premium_skin15", "premium_skin16"]'::jsonb, 1940.6),
('jennifer.white@example.com', 'secure909', 'Jennifer White', 'player', 15, 12, 3, 30, 'active', 1650.00, '[]'::jsonb, 1880.3),
('richard.harris@example.com', 'secure010', 'Richard Harris', 'player', 23, 5, 2, 30, 'active', 2700.75, '["premium_skin17", "premium_skin18", "premium_skin19"]'::jsonb, 2070.5),
('linda.martin@example.com', 'secure111', 'Linda Martin', 'player', 7, 21, 2, 30, 'inactive', 450.50, '["premium_skin20"]'::jsonb, 1580.8),
('charles.thompson@example.com', 'secure212', 'Charles Thompson', 'player', 16, 11, 3, 30, 'active', 1800.25, '["premium_skin21"]'::jsonb, 1930.4),
('patricia.garcia@example.com', 'secure313', 'Patricia Garcia', 'player', 21, 6, 3, 30, 'active', 2450.00, '["premium_skin22", "premium_skin23"]'::jsonb, 2030.7),
('daniel.martinez@example.com', 'secure414', 'Daniel Martinez', 'admin', 19, 8, 3, 30, 'active', 2200.75, '["premium_skin24"]'::jsonb, 2000.2),
('susan.robinson@example.com', 'secure515', 'Susan Robinson', 'player', 13, 14, 3, 30, 'active', 1400.50, '[]'::jsonb, 1840.9),
('matthew.clark@example.com', 'secure616', 'Matthew Clark', 'player', 18, 9, 3, 30, 'active', 2050.25, '["premium_skin25", "premium_skin26"]'::jsonb, 1970.1),
('nancy.rodriguez@example.com', 'secure717', 'Nancy Rodriguez', 'player', 15, 12, 3, 30, 'active', 1700.00, '["premium_skin27"]'::jsonb, 1890.6),
('anthony.lewis@example.com', 'secure818', 'Anthony Lewis', 'player', 20, 7, 3, 30, 'active', 2350.75, '["premium_skin28", "premium_skin29"]'::jsonb, 2010.3),
('karen.lee@example.com', 'secure919', 'Karen Lee', 'player', 9, 18, 3, 30, 'inactive', 600.50, '["premium_skin30"]'::jsonb, 1680.5),
('mark.walker@example.com', 'secure020', 'Mark Walker', 'player', 17, 10, 3, 30, 'active', 1950.25, '["premium_skin31"]'::jsonb, 1950.8),
('betty.hall@example.com', 'secure121', 'Betty Hall', 'player', 14, 13, 3, 30, 'active', 1550.00, '[]'::jsonb, 1860.2),
('paul.allen@example.com', 'secure222', 'Paul Allen', 'player', 16, 11, 3, 30, 'active', 1850.75, '["premium_skin32", "premium_skin33"]'::jsonb, 1910.4),
('helen.young@example.com', 'secure323', 'Helen Young', 'player', 22, 5, 3, 30, 'active', 2650.50, '["premium_skin34"]'::jsonb, 2060.7),
('andrew.king@example.com', 'secure424', 'Andrew King', 'player', 11, 16, 3, 30, 'active', 1150.25, '["premium_skin35", "premium_skin36"]'::jsonb, 1790.1),
('sandra.wright@example.com', 'secure525', 'Sandra Wright', 'player', 26, 2, 2, 30, 'active', 3100.00, '["premium_skin37"]'::jsonb, 2110.5),
('joseph.lopez@example.com', 'secure626', 'Joseph Lopez', 'admin', 17, 10, 3, 30, 'active', 2000.75, '[]'::jsonb, 1960.9),
('donna.hill@example.com', 'secure727', 'Donna Hill', 'player', 15, 12, 3, 30, 'active', 1600.50, '["premium_skin38", "premium_skin39"]'::jsonb, 1870.3);

-- Insert 30 currencies
INSERT INTO currencies (name, symbol) VALUES
('Bitcoin Coins', 'BTC'),
('Ethereum Tokens', 'ETH'),
('Litecoin Pieces', 'LTC'),
('Ripple Gems', 'XRP'),
('Cardano Stones', 'ADA'),
('Polkadot Shards', 'DOT'),
('Chainlink Crystals', 'LINK'),
('Solana Fragments', 'SOL'),
('Avalanche Nuggets', 'AVAX'),
('Polygon Beads', 'MATIC'),
('Dogecoin Coins', 'DOGE'),
('Shiba Bars', 'SHIB'),
('Uniswap Ingots', 'UNI'),
('Cosmos Chips', 'ATOM'),
('Tezos Bits', 'XTZ'),
('Algorand Shards', 'ALGO'),
('Stellar Coins', 'XLM'),
('VeChain Particles', 'VET'),
('Filecoin Tokens', 'FIL'),
('TRON Gems', 'TRX'),
('Monero Coins', 'XMR'),
('Dash Crystals', 'DASH'),
('Zcash Embers', 'ZEC'),
('EOS Droplets', 'EOS'),
('NEO Stones', 'NEO'),
('IOTA Feathers', 'MIOTA'),
('Ethereum Classic Bolts', 'ETC'),
('Bitcoin Cash Fragments', 'BCH'),
('Litecoin Cash Seeds', 'LCC'),
('Ravencoin Orbs', 'RVN');

-- Insert 30 shops
INSERT INTO shops (type, name) VALUES
('standard', 'Chess Pro Shop'),
('premium', 'Master Chess Gallery'),
('standard', 'Chess Arena Store'),
('premium', 'Champion Chess World'),
('standard', 'Chess Pro Market'),
('premium', 'Elite Chess Arena'),
('standard', 'Chess Masters Pro'),
('premium', 'Royal Chess Gallery'),
('standard', 'Chess Pro Express'),
('premium', 'Grandmaster Chess Pro'),
('standard', 'Chess Arena Plus'),
('premium', 'Champion Chess Pro'),
('standard', 'Chess Masters Arena'),
('premium', 'Elite Chess Pro'),
('standard', 'Chess Pro World'),
('premium', 'Royal Chess Pro'),
('standard', 'Chess Arena World'),
('premium', 'Grandmaster Arena'),
('standard', 'Chess Pro Gallery'),
('premium', 'Champion Arena'),
('standard', 'Chess Masters Pro Plus'),
('premium', 'Elite Arena Gallery'),
('standard', 'Chess Pro Arena'),
('premium', 'Royal Arena Pro'),
('standard', 'Chess Arena Express'),
('premium', 'Grandmaster Pro Plus'),
('standard', 'Chess Pro Masters'),
('premium', 'Champion Pro Gallery'),
('standard', 'Chess Arena Masters'),
('premium', 'Elite Pro World');

-- Insert 30 categories
INSERT INTO categories (title, description) VALUES
('Piece Collections', 'Premium chess piece collections'),
('Board Materials', 'High-quality board materials'),
('Time Controls', 'Advanced timing devices'),
('Complete Sets', 'Full chess set packages'),
('Learning Materials', 'Educational chess resources'),
('Digital Tools', 'Modern chess technology'),
('Storage Solutions', 'Chess storage and organization'),
('Protection Gear', 'Chess protection equipment'),
('Decorative Items', 'Chess-themed decorations'),
('Merchandise', 'Chess branded merchandise'),
('Collector Items', 'Limited edition collectibles'),
('Competition Access', 'Competition and tournament access'),
('Training Programs', 'Structured training programs'),
('Expert Services', 'Professional chess services'),
('Puzzle Collections', 'Chess puzzle resources'),
('Historical Items', 'Chess historical artifacts'),
('Autographed Items', 'Signed chess memorabilia'),
('Pro Equipment', 'Professional-grade equipment'),
('Special Gifts', 'Unique chess gift items'),
('Home Furnishings', 'Chess-themed home decor'),
('Portable Sets', 'Travel-friendly chess sets'),
('Tech Devices', 'Chess technology devices'),
('Video Content', 'Chess video and media'),
('Event Access', 'Chess event tickets'),
('Magazine Subscriptions', 'Chess publication subscriptions'),
('Personal Training', 'One-on-one coaching'),
('Analysis Software', 'Chess analysis programs'),
('Game Archives', 'Chess game databases'),
('AI Engines', 'Chess AI software'),
('Social Networks', 'Chess community memberships');

-- Insert 30 matches
INSERT INTO matches (moves, result, player_white, player_black, winner, start_time, end_time, used_skins, rating_change_white, rating_change_black) VALUES
('["e4", "e5", "Nf3", "Nc6", "Bb5"]'::jsonb, 'white_wins', 1, 2, 1, '2024-02-10 08:00:00', '2024-02-10 08:50:00', '["pro_white", "pro_black"]'::jsonb, 22.3, -22.3),
('["d4", "d5", "c4", "dxc4", "e4"]'::jsonb, 'black_wins', 3, 4, 4, '2024-02-10 09:00:00', '2024-02-10 09:55:00', '["master_white", "master_black"]'::jsonb, -24.1, 24.1),
('["Nf3", "d5", "d4", "Nf6", "c4"]'::jsonb, 'draw', 5, 6, NULL, '2024-02-10 10:00:00', '2024-02-10 10:58:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
('["e4", "c5", "Nf3", "d6", "d4", "cxd4"]'::jsonb, 'white_wins', 7, 8, 7, '2024-02-10 11:00:00', '2024-02-10 11:43:00', '["elite_white", "elite_black"]'::jsonb, 19.7, -19.7),
('["d4", "Nf6", "c4", "e6", "Nc3"]'::jsonb, 'black_wins', 9, 10, 10, '2024-02-10 12:00:00', '2024-02-10 12:51:00', '["pro_white", "pro_black"]'::jsonb, -21.5, 21.5),
('["e4", "e6", "d4", "d5", "Nd2", "Nf6"]'::jsonb, 'white_wins', 11, 12, 11, '2024-02-10 13:00:00', '2024-02-10 13:45:00', '["master_white", "master_black"]'::jsonb, 18.4, -18.4),
('["Nf3", "c5", "c4", "Nc6", "e3"]'::jsonb, 'draw', 13, 14, NULL, '2024-02-10 14:00:00', '2024-02-10 14:59:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
('["d4", "d5", "Nf3", "Nf6", "c4", "e6"]'::jsonb, 'black_wins', 15, 16, 16, '2024-02-10 15:00:00', '2024-02-10 15:48:00', '["elite_white", "elite_black"]'::jsonb, -23.2, 23.2),
('["e4", "e5", "Bc4", "Nc6", "Qf3", "Nf6"]'::jsonb, 'white_wins', 17, 18, 17, '2024-02-10 16:00:00', '2024-02-10 16:41:00', '["pro_white", "pro_black"]'::jsonb, 17.6, -17.6),
('["c4", "e5", "Nc3", "Nf6", "Nf3", "Nc6"]'::jsonb, 'white_wins', 19, 20, 19, '2024-02-10 17:00:00', '2024-02-10 17:47:00', '["master_white", "master_black"]'::jsonb, 16.8, -16.8),
('["d4", "Nf6", "Nf3", "g6", "c4", "Bg7"]'::jsonb, 'black_wins', 21, 22, 22, '2024-02-11 08:00:00', '2024-02-11 08:52:00', '["champion_white", "champion_black"]'::jsonb, -20.9, 20.9),
('["e4", "c6", "d4", "d5", "exd5", "cxd5"]'::jsonb, 'white_wins', 23, 24, 23, '2024-02-11 09:00:00', '2024-02-11 09:44:00', '["elite_white", "elite_black"]'::jsonb, 15.3, -15.3),
('["Nf3", "d5", "d4", "c6", "c4", "e6"]'::jsonb, 'draw', 25, 26, NULL, '2024-02-11 10:00:00', '2024-02-11 10:57:00', '["pro_white", "pro_black"]'::jsonb, 0.0, 0.0),
('["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4"]'::jsonb, 'white_wins', 27, 28, 27, '2024-02-11 11:00:00', '2024-02-11 11:42:00', '["master_white", "master_black"]'::jsonb, 14.5, -14.5),
('["d4", "d5", "c4", "e6", "Nc3", "Nf6"]'::jsonb, 'black_wins', 29, 30, 30, '2024-02-11 12:00:00', '2024-02-11 12:49:00', '["champion_white", "champion_black"]'::jsonb, -22.7, 22.7),
('["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4"]'::jsonb, 'white_wins', 1, 3, 1, '2024-02-11 13:00:00', '2024-02-11 13:46:00', '["elite_white", "elite_black"]'::jsonb, 21.8, -21.8),
('["d4", "Nf6", "c4", "g6", "Nc3", "Bg7"]'::jsonb, 'black_wins', 5, 7, 7, '2024-02-11 14:00:00', '2024-02-11 14:53:00', '["pro_white", "pro_black"]'::jsonb, -19.6, 19.6),
('["Nf3", "c5", "e4", "Nc6", "d4", "cxd4"]'::jsonb, 'draw', 9, 11, NULL, '2024-02-11 15:00:00', '2024-02-11 15:56:00', '["master_white", "master_black"]'::jsonb, 0.0, 0.0),
('["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4"]'::jsonb, 'white_wins', 13, 15, 13, '2024-02-11 16:00:00', '2024-02-11 16:40:00', '["champion_white", "champion_black"]'::jsonb, 13.2, -13.2),
('["d4", "d5", "Nf3", "Nf6", "c4", "e6", "Nc3"]'::jsonb, 'white_wins', 17, 19, 17, '2024-02-11 17:00:00', '2024-02-11 17:48:00', '["elite_white", "elite_black"]'::jsonb, 11.9, -11.9),
('["e4", "e6", "d4", "d5", "Nd2", "Nf6", "e5"]'::jsonb, 'black_wins', 21, 23, 23, '2024-02-12 08:00:00', '2024-02-12 08:54:00', '["pro_white", "pro_black"]'::jsonb, -18.1, 18.1),
('["Nf3", "d5", "d4", "c6", "c4", "e6", "e3"]'::jsonb, 'white_wins', 25, 27, 25, '2024-02-12 09:00:00', '2024-02-12 09:43:00', '["master_white", "master_black"]'::jsonb, 10.7, -10.7),
('["e4", "e5", "Bc4", "Nc6", "Qf3", "Nf6", "Nc3"]'::jsonb, 'draw', 29, 1, NULL, '2024-02-12 10:00:00', '2024-02-12 10:55:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
('["c4", "e5", "Nc3", "Nf6", "Nf3", "Nc6", "d4"]'::jsonb, 'white_wins', 2, 4, 2, '2024-02-12 11:00:00', '2024-02-12 11:39:00', '["elite_white", "elite_black"]'::jsonb, 25.4, -25.4),
('["d4", "Nf6", "Nf3", "g6", "c4", "Bg7", "Nc3"]'::jsonb, 'black_wins', 6, 8, 8, '2024-02-12 12:00:00', '2024-02-12 12:50:00', '["pro_white", "pro_black"]'::jsonb, -17.3, 17.3),
('["e4", "c6", "d4", "d5", "exd5", "cxd5", "c4"]'::jsonb, 'white_wins', 10, 12, 10, '2024-02-12 13:00:00', '2024-02-12 13:44:00', '["master_white", "master_black"]'::jsonb, 9.8, -9.8),
('["Nf3", "d5", "d4", "c6", "e3", "Nf6"]'::jsonb, 'draw', 14, 16, NULL, '2024-02-12 14:00:00', '2024-02-12 14:58:00', '["champion_white", "champion_black"]'::jsonb, 0.0, 0.0),
('["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6"]'::jsonb, 'white_wins', 18, 20, 18, '2024-02-12 15:00:00', '2024-02-12 15:41:00', '["elite_white", "elite_black"]'::jsonb, 8.4, -8.4),
('["d4", "d5", "c4", "e6", "Nc3", "Nf6", "cxd5"]'::jsonb, 'black_wins', 22, 24, 24, '2024-02-12 16:00:00', '2024-02-12 16:51:00', '["pro_white", "pro_black"]'::jsonb, -16.2, 16.2),
('["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6"]'::jsonb, 'white_wins', 26, 28, 26, '2024-02-12 17:00:00', '2024-02-12 17:45:00', '["master_white", "master_black"]'::jsonb, 7.1, -7.1);

-- Insert 30 items
INSERT INTO items (name, description, price, picture, status, category, shop_id) VALUES
('Premium King Piece', 'Exclusive diamond-encrusted king', 599.99, '/images/premium_king.jpg', 'available', 1, 1),
('Master Queen Piece', 'Platinum queen with gemstones', 499.99, '/images/master_queen.jpg', 'available', 1, 2),
('Pro Rook Collection', 'Professional tournament rooks', 189.99, '/images/pro_rook.jpg', 'available', 1, 3),
('Champion Bishop Set', 'Championship-grade bishops', 159.99, '/images/champion_bishop.jpg', 'available', 1, 4),
('Elite Knight Pair', 'Elite tournament knights', 199.99, '/images/elite_knight.jpg', 'available', 1, 5),
('Crystal Chess Board', 'Premium crystal 8x8 board', 850.00, '/images/crystal_board.jpg', 'available', 2, 6),
('Professional Tournament Board', 'FIDE approved tournament board', 220.00, '/images/professional_board.jpg', 'available', 2, 7),
('Carbon Fiber Board', 'Lightweight carbon fiber design', 480.00, '/images/carbon_board.jpg', 'available', 2, 8),
('Smart Chess Clock', 'Bluetooth enabled smart clock', 125.99, '/images/smart_clock.jpg', 'available', 3, 9),
('Tournament Timer', 'FIDE certified tournament timer', 85.99, '/images/tournament_timer.jpg', 'available', 3, 10),
('Championship Chess Set', 'Complete championship set', 650.00, '/images/championship_set.jpg', 'available', 4, 11),
('Executive Travel Set', 'Luxury portable set', 45.99, '/images/executive_set.jpg', 'available', 4, 12),
('Master Strategy Guide', 'Grandmaster strategy book', 49.99, '/images/master_strategy.jpg', 'available', 5, 13),
('Complete Opening Guide', 'Comprehensive opening reference', 54.99, '/images/opening_guide.jpg', 'available', 5, 14),
('Pro Analysis Software', 'Advanced analysis platform', 179.99, '/images/pro_analysis.jpg', 'available', 6, 15),
('Chess Pro App', 'Professional mobile application', 19.99, '/images/pro_app.jpg', 'available', 6, 16),
('Deluxe Storage Case', 'Premium storage solution', 105.99, '/images/deluxe_storage.jpg', 'available', 7, 17),
('Professional Board Cover', 'Tournament-grade protection', 65.99, '/images/professional_cover.jpg', 'available', 7, 18),
('Artisan Chess Art', 'Handcrafted chess artwork', 225.00, '/images/artisan_art.jpg', 'available', 8, 19),
('Chess Pro Jersey', 'Official pro team jersey', 44.99, '/images/pro_jersey.jpg', 'available', 9, 20),
('Diamond Chess Pendant', 'Luxury diamond pendant', 179.99, '/images/diamond_pendant.jpg', 'available', 10, 21),
('Collector Chess Set', 'Limited edition collectible', 1500.00, '/images/collector_set.jpg', 'available', 11, 22),
('Championship Entry', 'Elite championship entry', 300.00, '/images/championship_entry.jpg', 'available', 12, 23),
('Master Class Package', '20-hour master class', 399.99, '/images/master_class.jpg', 'available', 13, 24),
('Expert Analysis Service', 'Grandmaster analysis', 99.99, '/images/expert_analysis.jpg', 'available', 14, 25),
('Advanced Puzzle Book', '2000 advanced puzzles', 39.99, '/images/advanced_puzzles.jpg', 'available', 15, 26),
('Chess History Collection', 'Complete historical collection', 64.99, '/images/history_collection.jpg', 'available', 16, 27),
('Legend Memorabilia', 'Signed legend items', 599.99, '/images/legend_memorabilia.jpg', 'available', 17, 28),
('Elite Tournament Clock', 'World championship clock', 195.99, '/images/elite_clock.jpg', 'available', 18, 29),
('Luxury Gift Collection', 'Premium gift package', 325.00, '/images/luxury_gift.jpg', 'available', 19, 30);

-- Insert 30 transactions
INSERT INTO transactions (player_id, purchased_item_id, price, currency, payment_id, created_at) VALUES
(1, 1, 599.99, 1, 2001, '2024-02-05 08:00:00'),
(2, 2, 499.99, 2, 2002, '2024-02-05 09:15:00'),
(3, 3, 189.99, 3, 2003, '2024-02-05 10:30:00'),
(4, 4, 159.99, 4, 2004, '2024-02-05 11:45:00'),
(5, 5, 199.99, 5, 2005, '2024-02-05 13:00:00'),
(6, 6, 850.00, 6, 2006, '2024-02-05 14:15:00'),
(7, 7, 220.00, 7, 2007, '2024-02-05 15:30:00'),
(8, 8, 480.00, 8, 2008, '2024-02-05 16:45:00'),
(9, 9, 125.99, 9, 2009, '2024-02-06 08:00:00'),
(10, 10, 85.99, 10, 2010, '2024-02-06 09:15:00'),
(11, 11, 650.00, 11, 2011, '2024-02-06 10:30:00'),
(12, 12, 45.99, 12, 2012, '2024-02-06 11:45:00'),
(13, 13, 49.99, 13, 2013, '2024-02-06 13:00:00'),
(14, 14, 54.99, 14, 2014, '2024-02-06 14:15:00'),
(15, 15, 179.99, 15, 2015, '2024-02-06 15:30:00'),
(16, 16, 19.99, 16, 2016, '2024-02-06 16:45:00'),
(17, 17, 105.99, 17, 2017, '2024-02-07 08:00:00'),
(18, 18, 65.99, 18, 2018, '2024-02-07 09:15:00'),
(19, 19, 225.00, 19, 2019, '2024-02-07 10:30:00'),
(20, 20, 44.99, 20, 2020, '2024-02-07 11:45:00'),
(21, 21, 179.99, 21, 2021, '2024-02-07 13:00:00'),
(22, 22, 1500.00, 22, 2022, '2024-02-07 14:15:00'),
(23, 23, 300.00, 23, 2023, '2024-02-07 15:30:00'),
(24, 24, 399.99, 24, 2024, '2024-02-07 16:45:00'),
(25, 25, 99.99, 25, 2025, '2024-02-08 08:00:00'),
(26, 26, 39.99, 26, 2026, '2024-02-08 09:15:00'),
(27, 27, 64.99, 27, 2027, '2024-02-08 10:30:00'),
(28, 28, 599.99, 28, 2028, '2024-02-08 11:45:00'),
(29, 29, 195.99, 29, 2029, '2024-02-08 13:00:00'),
(30, 30, 325.00, 30, 2030, '2024-02-08 14:15:00');
