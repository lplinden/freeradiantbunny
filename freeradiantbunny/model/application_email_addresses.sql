CREATE SEQUENCE public.application_email_addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.application_email_addresses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.application_email_addresses (
    id integer DEFAULT nextval('public.application_email_addresses_id_seq'::regclass) NOT NULL,
    application_id integer,
    email_address_id integer
);

ALTER TABLE public.application_email_addresses OWNER TO freerad2_special;

ALTER TABLE ONLY public.application_email_addresses
    ADD CONSTRAINT application_email_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.applicatino_email_addresses
    ADD CONSTRAINT application_email_addresses_application_id_fk FOREIGN KEY (application_id) REFERENCES public.applications(id);

ALTER TABLE ONLY public.applicatino_email_addresses
    ADD CONSTRAINT application_email_addresses_email_address_id_fk FOREIGN KEY (email_address_id) REFERENCES public.email_addresses(id);
