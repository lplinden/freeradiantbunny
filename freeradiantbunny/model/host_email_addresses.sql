CREATE TABLE public.host_email_addresses (
    domain_tli character varying(3) NOT NULL,
    email_address_id integer NOT NULL,
    id integer
);


ALTER TABLE public.host_email_addresses OWNER TO freerad2_special;

ALTER TABLE ONLY public.host_email_addresses
    ADD CONSTRAINT host_email_address_id_pkey PRIMARY KEY (id);
    
