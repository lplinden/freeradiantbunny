CREATE SEQUENCE public.hyperlink_plants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.hyperlink_plants_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_plants (
    id integer DEFAULT nextval('public.hyperlink_plants_id_seq'::regclass) NOT NULL,
    hyperlink_id integer NOT NULL,
    plant_id integer NOT NULL
);

ALTER TABLE public.hyperlink_plants OWNER TO freerad2_special;

ALTER TABLE ONLY public.hyperlink_plants
    ADD CONSTRAINT hyperlink_plants_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.hyperlink_plants
    ADD CONSTRAINT hyperlink_plants_hyperlink_id_fk FOREIGN KEY (hyperlink_id) REFERENCES public.hyperlinks(id);

ALTER TABLE ONLY public.hyperlink_plants
    ADD CONSTRAINT hyperlink_plants_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);
