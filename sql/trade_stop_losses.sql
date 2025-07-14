CREATE SEQUENCE public.trade_stop_losses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.trade_stop_losses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.trade_stop_losses (
    id integer DEFAULT nextval('public.trade_stop_losses_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    stop_price numeric(20,10),
    current_price numeric(20,10),
    trailing_stops text,	
    triggered_date timestamp with time zone
);

ALTER TABLE public.trade_stop_losses OWNER TO freerad2_special;

ALTER TABLE ONLY public.trade_stop_losses
    ADD CONSTRAINT trade_stop_losses_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.trade_stop_losses
    ADD CONSTRAINT trade_stop_losses_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.trade_stop_losses
    ADD CONSTRAINT trade_stop_losses_coins_symbol_unique UNIQUE (coins_symbol, last_updated);
