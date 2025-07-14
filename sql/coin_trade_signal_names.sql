
CREATE TABLE public.coin_trade_signal_names (
    id integer NOT NULL,
    name character varying(45) NOT NULL
);

ALTER TABLE public.coin_trade_signal_names OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_trade_signal_names
    ADD CONSTRAINT coin_trade_signal_names_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_trade_signal_names
    ADD CONSTRAINT coin_trade_signal_names_name_unique UNIQUE (name);

INSERT INTO coin_trade_signal_names (id, name) VALUES (1, 'Pumps_percent_delta_1h_now');	
INSERT INTO coin_trade_signal_names (id, name) VALUES (2, 'Pumps_percent_delta_24h_now');
INSERT INTO coin_trade_signal_names (id, name) VALUES (3, 'Pumps_volume_percent_delta_24h_now');
INSERT INTO coin_trade_signal_names (id, name) VALUES (4, 'PercentDeltaPrices_percent_delta_price');
INSERT INTO coin_trade_signal_names (id, name) VALUES (5, 'PercentDeltaPrices_streak');
INSERT INTO coin_trade_signal_names (id, name) VALUES (6, 'MovingAverages_stack_pattern');
INSERT INTO coin_trade_signal_names (id, name) VALUES (7, 'MovingAverages_stack_patterns_cross');
INSERT INTO coin_trade_signal_names (id, name) VALUES (8, 'RecentPrices_price');
INSERT INTO coin_trade_signal_names (id, name) VALUES (9, 'RecentPrices_last_updated');
INSERT INTO coin_trade_signal_names (id, name) VALUES (10, 'RecentPrices_percent_delta_1h_direction');
INSERT INTO coin_trade_signal_names (id, name) VALUES (11, 'RecentPrices_percent_delta_24h_direction');
INSERT INTO coin_trade_signal_names (id, name) VALUES (12, 'RecentPrices_percent_delta_v24h_direction');
INSERT INTO coin_trade_signal_names (id, name) VALUES (13, 'RecentPrices_leader');
INSERT INTO coin_trade_signal_names (id, name) VALUES (14, 'RecentPrices_runner_up');
INSERT INTO coin_trade_signal_names (id, name) VALUES (15, 'RelativeStrengths_rsi_strategy_level');
INSERT INTO coin_trade_signal_names (id, name) VALUES (16, 'RelativeStrengths_rsi_strategy_level_cross');
INSERT INTO coin_trade_signal_names (id, name) VALUES (17, 'MovingAverages_slow_up_or_down');
INSERT INTO coin_trade_signal_names (id, name) VALUES (18, 'MovingAverages_fast_up_or_down');
INSERT INTO coin_trade_signal_names (id, name) VALUES (19, 'MovingAverages_cross');
INSERT INTO coin_trade_signal_names (id, name) VALUES (20, 'ZigZags_last_pivot');
INSERT INTO coin_trade_signal_names (id, name) VALUES (21, 'ZigZags_trend_up');
INSERT INTO coin_trade_signal_names (id, name) VALUES (22, 'ZigZags_trend_down');


