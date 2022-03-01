CREATE SEQUENCE public.hyperlink_reasons_id_seq
    START WITH 44
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.hyperlink_reasons_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_reasons (
    hyperlink_id integer NOT NULL,
    reason_id integer NOT NULL,
    id integer DEFAULT nextval('public.hyperlink_reasons_id_seq'::regclass) NOT NULL
);

ALTER TABLE public.hyperlink_reasons OWNER TO freerad2_special;
