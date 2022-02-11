CREATE TABLE public.historicals (
    id integer NOT NULL,
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
    ADD CONSTRAINT historicals_id_pkey PRIMARY KEY (id);
    
