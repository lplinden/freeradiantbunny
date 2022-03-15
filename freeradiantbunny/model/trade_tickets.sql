CREATE SEQUENCE public.trade_ticket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.trade_ticket_id_seq OWNER TO freerad2_special;

CREATE TYPE trade_state AS ENUM ('planned','ordered','traded','closed','audited');

CREATE TABLE public.trade_tickets (
    id integer DEFAULT nextval('public.trade_ticket_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    generated_ts text,
    coin_id integer,
    base_coin_id integer,
    trading_pair text,
    market_id integer,
    trade_state trade_state DEFAULT 'planned',
    signal_buy_stories text,
    entry_setup_price text,
    target_price text,
    stoploss_price text,
    risk_ratio text,
    amount text,
    enter_transaction_id integer,
    trade_ts text,
    entry_actual_price text,
    signal_sell_stories text,
    stoploss_triggered_ts text,
    exit_transaction_id integer,
    exit_price text,
    exit_amount text,
    partial_amount text,	
    partial_trade_ticket_id integer,
    performance_measures text
);

ALTER TABLE public.trade_tickets OWNER TO freerad2_special;

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_ticket_id_pkey PRIMARY KEY (id);
