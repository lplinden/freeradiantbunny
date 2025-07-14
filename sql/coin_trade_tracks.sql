CREATE SEQUENCE public.coin_trade_tracks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_trade_tracks_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_trade_tracks (
    id integer DEFAULT nextval('public.coin_trade_tracks_id_seq'::regclass) NOT NULL,
    last_updated timestamp with time zone,
    symbol text,
    track_text text
);

ALTER TABLE public.coin_trade_tracks OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_trade_tracks
    ADD CONSTRAINT coin_trade_tracks_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_trade_tracks
    ADD CONSTRAINT coin_trade_tracks_symbol_fk FOREIGN KEY (symbol) REFERENCES public.coins(symbol);
