CREATE SEQUENCE public.coin_wizard_indicators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_wizard_indicators_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_wizard_indicators (
    id integer DEFAULT nextval('public.coin_wizard_indicators_id_seq'::regclass) NOT NULL,
    date timestamp with time zone,
    symbol TEXT NOT NULL,
    higher_highs_and_higher_lows CHAR(1),
    simple_moving_average_golden_cross CHAR(1),
    relative_strength_index_bullish_divergence CHAR(1),
    high_volume_breakout_above_resistance CHAR(1),
    moving_average_convergence_divergence_crossover CHAR(1)
);

ALTER TABLE public.coin_wizard_indicators OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_wizard_indicators
    ADD CONSTRAINT coin_wizard_indicators_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_wizard_indicators
    ADD CONSTRAINT coin_wizard_indicators_symbol_fk FOREIGN KEY (symbol) REFERENCES public.coins(symbol);
