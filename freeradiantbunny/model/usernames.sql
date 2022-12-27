CREATE SEQUENCE public.usernames_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.usernames_id_seq OWNER TO freerad2_special;

CREATE TABLE public.usernames (
    id integer DEFAULT nextval('public.usernames_id_seq'::regclass) NOT NULL,
    username character varying(12) NOT NULL,
    email_address_id text,
    password character(100) NOT NULL,
    coded_cookie_word text
);

ALTER TABLE public.usernames OWNER TO freerad2_special;

ALTER TABLE ONLY public.usernames
    ADD CONSTRAINT usernames_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.usernames
    ADD CONSTRAINT usernames_email_address_id_fk FOREIGN KEY (email_address_id) REFERENCES public.email_address(id);
