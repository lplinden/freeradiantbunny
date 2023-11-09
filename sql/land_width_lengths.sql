CREATE SEQUENCE public.land_width_lengths_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.land_width_lengths_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_width_lengths (
    id integer DEFAULT nextval('public.land_width_lengths_id_seq'::regclass) NOT NULL,
    land_id integer,
    width text,
    length text,
    soil_area_id integer
);

ALTER TABLE public.land_width_lengths OWNER TO freerad2_special;

ALTER TABLE ONLY public.land_width_lengths
    ADD CONSTRAINT land_width_lengths_pk PRIMARY KEY (id);
