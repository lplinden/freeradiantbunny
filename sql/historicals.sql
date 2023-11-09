CREATE SEQUENCE public.historicals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.historicals_id_seq OWNER TO freerad2_special;

CREATE TABLE public.historicals (
    id integer DEFAULT nextval('public.historicals_id_seq'::regclass) NOT NULL,
    exchange text,
    symbol_to text,
    symbol_from text,
    ts text,
    close_price text,
    high_price text,
    low_price text,
    open_price text,
    volume_from text,
    volume_to text,
    datafeed text
);

ALTER TABLE public.historicals OWNER TO freerad2_special;

ALTER TABLE ONLY public.historicals
    ADD CONSTRAINT historicals_pk PRIMARY KEY (id);
