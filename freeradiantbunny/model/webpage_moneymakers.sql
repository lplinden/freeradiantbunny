CREATE SEQUENCE public.webpage_moneymakers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpage_moneymakers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpage_moneymakers (
    id integer DEFAULT nextval('public.webpage_moneymakers_id_seq'::regclass) NOT NULL,
    webpages_id integer,
    moneymakers_id integer
);

ALTER TABLE public.webpage_moneymakers OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpage_moneymakers
    ADD CONSTRAINT webpage_moneymakers_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpage_moneymakers
    ADD CONSTRAINT webpage_moneymakers_webpages_id_fk FOREIGN KEY (webpages_id) REFERENCES public.webpages(id);

ALTER TABLE ONLY public.webpage_moneymakers
    ADD CONSTRAINT webpage_moneymakers_moneymakers_id_fk FOREIGN KEY (moneymakers_id) REFERENCES public.moneymakers(id);
