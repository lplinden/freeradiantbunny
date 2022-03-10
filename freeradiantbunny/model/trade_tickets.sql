CREATE SEQUENCE public.trade_ticket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.trade_ticket_id_seq OWNER TO freerad2_special;

CREATE TYPE trade_state AS ENUM ('setup','order','trade','exited','audited');

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
    market_id integer,
    trade_state trade_state DEFAULT 'setup',
    signal_buy_stories text,
    entry_price_setup text,
    entry_price_actual text,
    target_price text,
    stoploss text,
    stoploss_triggered_ts text,
    risk_ratio text,
    amount text,
    enter_transaction_id integer,
    trade_ts text,
    signal_sell_stories text,
    exit_transaction_id integer,
    partial_trade_ticket_id integer,
    performance_measures text
);

ALTER TABLE public.trade_tickets OWNER TO freerad2_special;

ALTER TABLE ONLY public.trade_tickets
    ADD CONSTRAINT trade_ticket_id_pkey PRIMARY KEY (id);
