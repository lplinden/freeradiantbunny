CREATE SEQUENCE public.land_city_states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.land_city_states_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_city_states (
    id integer DEFAULT nextval('public.land_city_states_id_seq'::regclass) NOT NULL,
    land_id integer,
    city text,
    state text
);

ALTER TABLE public.land_city_states OWNER TO freerad2_special;

ALTER TABLE ONLY public.land_city_states
    ADD CONSTRAINT land_city_states_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.land_city_states
    ADD CONSTRAINT land_city_states_land_id_fk FOREIGN KEY (land_id) REFERENCES public.lands(id);
