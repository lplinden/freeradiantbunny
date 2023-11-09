CREATE SEQUENCE public.hyperlink_reasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.hyperlink_reasons_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_reasons (
    id integer DEFAULT nextval('public.hyperlink_reasons_id_seq'::regclass) NOT NULL,
    hyperlink_id integer,
    reason_id integer
);

ALTER TABLE public.hyperlink_reasons OWNER TO freerad2_special;

ALTER TABLE ONLY public.hyperlink_reasons
    ADD CONSTRAINT hyperlink_reasons_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.hyperlink_reasons
    ADD CONSTRAINT hyperlink_reasons_hyperlink_id_fk FOREIGN KEY (hyperlink_id) REFERENCES public.hyperlinks(id);

ALTER TABLE ONLY public.hyperlink_reasons
    ADD CONSTRAINT hyperlink_reasons_reason_id_fk FOREIGN KEY (reason_id) REFERENCES public.reasons(id);
