CREATE SEQUENCE public.trade_tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.trade_tickets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.trade_tickets (
    id integer DEFAULT nextval('public.trade_tickets_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    enter_transactions_id integer,
    exit_transactions_id integer,
    partial_trade_tickets_id integer,
    coins_symbol character varying(10) NOT NULL,
    base_coins_symbol character varying(10) NOT NULL,
    markets_id integer,
    generated_ts text,
    trading_pair text,
    trade_state text,
    signal_buy_stories text,
    entry_setup_price text,
    target_price text,
    stoploss_price text,
    risk_ratio text,
    amount text,
    trade_ts text,
    entry_actual_price text,
    signal_sell_stories text,
    stoploss_triggered_ts text,
    exit_price text,
    exit_amount text,
    partial_amount text,
    performance_measures text,
    tnx_ref text
);

ALTER TABLE public.trade_tickets OWNER TO freerad2_special;

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_enter_transactions_id_fk FOREIGN KEY (enter_transactions_id) REFERENCES public.transactions(id);

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_exit_transactions_id_fk FOREIGN KEY (exit_transactions_id) REFERENCES public.transactions(id);

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_partial_trade_tickets_id_fk FOREIGN KEY (partial_trade_tickets_id) REFERENCES public.trade_tickets(id);

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_base_coins_symbol_fk FOREIGN KEY (base_coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_tickets_markets_id_fk FOREIGN KEY (markets_id) REFERENCES public.markets(id);
