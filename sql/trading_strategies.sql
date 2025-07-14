CREATE SEQUENCE public.trading_strategies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.trading_strategies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.trading_strategies (
    id integer DEFAULT nextval('public.trading_strategies_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.trading_strategies OWNER TO freerad2_special;

ALTER TABLE ONLY public.trading_strategies
    ADD CONSTRAINT trading_strategies_pk PRIMARY KEY (id);

