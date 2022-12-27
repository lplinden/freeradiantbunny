CREATE SEQUENCE public.webpage_moneymakers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpage_moneymakers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpage_moneymakers (
    id integer DEFAULT nextval('public.webpage_moneymakers_id_seq'::regclass) NOT NULL,
    webpage_id integer,
    moneymaker_id integer
);

ALTER TABLE public.webpage_moneymakers OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpage_moneymakers
    ADD CONSTRAINT webpage_moneymakers_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpage_moneymakers
    ADD CONSTRAINT webpage_moneymakers_webpage_id_fk FOREIGN KEY (webpage_id) REFERENCES public.webpages(id);

ALTER TABLE ONLY public.webpage_moneymakers
    ADD CONSTRAINT webpage_moneymakers_moneymaker_id_fk FOREIGN KEY (moneymaker_id) REFERENCES public.moneymakers(id);
