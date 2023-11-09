CREATE SEQUENCE public.pickup_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.pickup_details_id_seq OWNER TO freerad2_special;

CREATE TABLE public.pickup_details (
    id integer DEFAULT nextval('public.pickup_details_id_seq'::regclass) NOT NULL,
    land_id integer,
    date text
);

ALTER TABLE public.pickup_details OWNER TO freerad2_special;

ALTER TABLE ONLY public.pickup_details
    ADD CONSTRAINT pickup_details_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.pickup_details
    ADD CONSTRAINT pickup_details_land_id_fk FOREIGN KEY (land_id) REFERENCES public.lands(id);
