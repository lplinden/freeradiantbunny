CREATE TABLE public.application_email_addresses (
    id integer NOT NULL,
    application_id integer,
    email_address_id integer
);


ALTER TABLE public.application_email_addresses OWNER TO freerad2_special;

ALTER TABLE ONLY public.application_email_addresses
    ADD CONSTRAINT application_email_id_pkey PRIMARY KEY (id);
